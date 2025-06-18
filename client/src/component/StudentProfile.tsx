import React, { useState, useEffect } from 'react';
import api from '../api';
import ProblemsBarChart from '../charts/ProblemsBarChart';
import RatingLineChart from '../charts/RatingLineChart';
import SubmissionHeatmap from '../charts/SubmissionHeatmap';
import Toast from './Toast';

type Contest = {
  contest_id: number;
  contest_name: string;
  rank: number;
  old_rating: number;
  new_rating: number;
  rating_change: number;
  contest_date: string;
  unsolved_problems: number;
};

type ProblemStats = {
  most_difficult: number;
  total_solved: number;
  avg_rating: number;
  avg_problems_per_day: number;
  problems_per_rating_bucket: Record<string, number>;
  submission_heatmap: Record<string, number>;
};

interface StudentProfileProps {
  studentId: string;
  studentName: string
}

const StudentProfile: React.FC<StudentProfileProps> = ({ studentId, studentName }) => {

  const [contestHistory, setContestHistory] = useState<Contest[]>([]);
  const [problemStats, setProblemStats] = useState<ProblemStats | null>(null);
  const [ratingGraph, setRatingGraph] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [contestDays, setContestDays] = useState(365);
  const [problemDays, setProblemDays] = useState(90);
  
  const [reminderCount, setReminderCount] = useState<number | null>(null);
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);
  const [reminderLoading, setReminderLoading] = useState<boolean>(true);
  const [reminderError, setReminderError] = useState<string | null>(null);
  
  const [toastMessage, setToastMessage] = useState('');

  async function fetchReminderInfo() {
  setReminderLoading(true);
  setReminderError(null);
  try {
    const res = await api.get(`/students/${studentId}/reminder-info`);
    console.log("RES", res)
    if (res.request.status == 200) {
      setReminderCount(res.data.reminder_email_count);
      setReminderEnabled(res.data.reminders_enabled);
      
    } else {
      setReminderError('Failed to load reminder info');
    }
  } catch (error) {
    console.error('Error fetching reminder info:', error);
    setReminderError('Error fetching reminder info');
  } finally {
    setReminderLoading(false);
  }
}

async function toggleReminder(enabled: boolean) {
  setReminderEnabled(enabled); // optimistic update

  try {
    const res = await api.post(`/students/${studentId}/disable-reminder`, { enabled });
    if (res.data.success) {
      setReminderEnabled(Boolean(res.data.reminders_enabled));
      setToastMessage(`Reminder is ${res.data.reminders_enabled == true ? 'enabled':'disabled'}`)
    } else {
      setToastMessage('Failed to update reminder setting');
      setReminderEnabled(!enabled); // revert if failed
    }
  } catch (error) {
    setToastMessage('Error updating reminder setting');
    setReminderEnabled(!enabled); // revert if error
  }
}



  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [contestsRes, problemStatsRes, ratingGraphRes] = await Promise.all([
          api.get(`/students/${studentId}/contest-history`, { params: { days: contestDays } }),
          api.get(`/students/${studentId}/problem-stats`, { params: { days: problemDays } }),
          api.get(`/students/${studentId}/rating-graph`, { params: { days: contestDays } }),
        ]);
        if (contestsRes.data.success) setContestHistory(contestsRes.data.data);
        if (problemStatsRes.data.success) setProblemStats(problemStatsRes.data.data);
        if (ratingGraphRes.data.success) setRatingGraph(ratingGraphRes.data.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    fetchReminderInfo();
  }, [studentId, contestDays, problemDays]);

  if (loading) return <div className='dark:dark:text-gray-50
   dark:bg-gray-800 flex items-center justify-center'>Loading student profile...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-10">Student Profile: {studentName}</h2>

      {/* Contest History Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Contest History Filter:</label>
        {[30, 90, 365].map((d) => (
          <button
            key={d}
            onClick={() => setContestDays(d)}
            className={`mr-2 px-3 py-1 rounded ${
              contestDays === d ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:text-gray-800'
            }`}
          >
            Last {d} days
          </button>
        ))}
      </div>

      {/* Contest History List */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Contest History</h3>
        {contestHistory.length === 0 ? (
          <p>No contests found in this period.</p>
        ) : (
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Contest</th>
                <th className="border px-2 py-1">Rank</th>
                <th className="border px-2 py-1">Rating Change</th>
                <th className="border px-2 py-1">Unsolved Problems</th>
              </tr>
            </thead>
            <tbody>
              {contestHistory.map((contest) => (
                <tr key={contest.contest_id}>
                  <td className="border px-2 py-1">{new Date(contest.contest_date).toLocaleDateString()}</td>
                  <td className="border px-2 py-1">{contest.contest_name}</td>
                  <td className="border px-2 py-1">{contest.rank}</td>
                  <td className="border px-2 py-1">{contest.rating_change}</td>
                  <td className="border px-2 py-1">{contest.unsolved_problems}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>


      {ratingGraph.length > 0 && (
        <div className="mb-6 mt-6">
          <RatingLineChart ratingData={ratingGraph} />
        </div>
      )}


      {/* Problem Stats Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Problem Stats Filter:</label>
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setProblemDays(d)}
            className={`mr-2 px-3 py-1 rounded ${
              problemDays === d ? 'bg-indigo-600 text-white' : 
              'bg-gray-200 dark:text-gray-800'
            }`}
          >
            Last {d} days
          </button>
        ))}
      </div>

      {/* Problem Stats Summary */}
      {problemStats && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Problem Solving Data</h3>
          <ul className="list-disc pl-5 space-y-1 mb-7">
            <li>Most Difficult Problem Solved: {problemStats.most_difficult}</li>
            <li>Total Problems Solved: {problemStats.total_solved}</li>
            <li>Average Rating: {problemStats.avg_rating.toFixed(2)}</li>
            <li>Average Problems Per Day: {problemStats.avg_problems_per_day.toFixed(2)}</li>
          </ul>
          
          <ProblemsBarChart problemsPerRatingBucket={problemStats.problems_per_rating_bucket} />
    <div className="mt-6">
      <SubmissionHeatmap submissionHeatmap={problemStats.submission_heatmap} />
    </div>

        </div>
      )}

      <div className="mb-6 p-4 border rounded bg-gray-50 dark:bg-gray-700">
        <h3 className="text-lg font-semibold mb-2">Reminder Email Settings</h3>

        {reminderLoading ? (
          <p>Loading reminder info...</p>
        ) : reminderError ? (
          <p className="text-red-500">{reminderError}</p>
        ) : (
          <>
            <p>Reminder emails sent: <strong>{reminderCount ?? 0}</strong></p>
            <label className="inline-flex items-center mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!reminderEnabled}
                onChange={(e) => toggleReminder(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2">Enable reminder emails</span>
            </label>
          </>
        )}
      </div>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}


    </div>
  );
};

export default StudentProfile;
