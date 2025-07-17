import { useState, useEffect } from 'react';
import api from '../api';

export default function SyncConfig() {
  const [cronTime, setCronTime] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchConfig() {
      const res = await api.get('/sync-config');
      if (res.data.success) {
        setCronTime(res.data.data.cronTime);
        setEnabled(res.data.data.enabled);
      }
    }
    fetchConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.put('/sync-config', { cronTime, enabled });
    console.log(res.data.error)
    if (res.data.success) {
      setMessage('Sync schedule updated');
    } else {
      // Backend responded with success: false but no HTTP error
      setMessage(res.data.error || 'Unknown error occurred');
    }
    } catch (error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as any).response === 'object' &&
    (error as any).response !== null &&
    'data' in (error as any).response
  ) {
    setMessage(
      ((error as any).response.data.error as string) || 'Server returned an error'
    );
    console.error('Backend error:', (error as any).response.data);
  } else {
    setMessage('Network or unexpected error occurred');
    console.error('Unexpected error:', error);
  }
}


  // Clear the message after 3 seconds
  setTimeout(() => {
    setMessage('');
  }, 5000);
  };

  return (
    <div className=' overflow-hidden flex flex-col items-center'>

 <h1 className="text-2xl font-bold mb-4 text-center dark:text-gray-50">Sync Job Configuration</h1>
   <form onSubmit={handleSubmit} className="max-w-md p-4 bg-white rounded 
    shadow-lg space-y-4 dark:bg-gray-700">
    

      <label className="block font-medium text-gray-900 dark:text-gray-100">Cron Schedule (e.g. 0 2 * * *)</label>
      <input
        value={cronTime}
        onChange={(e) => setCronTime(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 
        rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900
         dark:text-gray-100"
      />
      <label className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className="form-checkbox"
        />
        <span className='dark:text-gray-50'>Enable Sync Job</span>
      </label>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 
      rounded hover:bg-indigo-700 ml-5">
        Save
      </button>
      {message && <p className="text-green-600">{message}</p>}
    </form>

    <div className='dark:text-gray-50 mt-10 flex items-center gap-10'>
      <div>
        <p className='text-xl font-extrabold underline cursor-default'>Guide</p>
      <ul>
        <li>You have to enter five values (* * * * *)</li>
        <li><span className='mr-3 font-bold'>First *: </span>Every minute (0 - 59) </li>
        <li><span className='mr-3 font-bold'>Second *:</span> Every hour (0 - 23)</li>
        <li><span className='mr-3 font-bold'>Third *: </span>Every day of the month (1 - 31)</li>
        <li><span className='mr-3 font-bold'>Fourth *:</span> Every month (1 - 12)</li>
        <li><span className='mr-3 font-bold'>Fifth *: </span>Every day of the week (0 - 7)</li>
      </ul>
      </div>

      <div>
        <p className='text-xl font-extrabold underline cursor-default'>Examples</p>
        <ul>
          <li><span className='font-bold mr-3'>* * * * *:</span> run every minute</li>
          <li><span className='font-bold mr-3'>0 2 * * *:</span> run at 2:00 AM every day</li>
          <li><span className='font-bold mr-3'>0 */6 * * *:</span> run every 6 hours</li>
          <li><span className='font-bold mr-3'>0 0 3 * *:</span> run every third day of the month</li>
          <li><span className='font-bold mr-3'>* * * * 1:</span> run every minute of everyday of every month</li>
          <li><span className='font-bold mr-3'>30 9 * * 1-5:</span> run at 9:30 AM, Monday through Friday</li>
        </ul>
      </div>
    </div>


    </div>
  );
}
