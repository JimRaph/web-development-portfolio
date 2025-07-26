import  { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import StudentForm from './StudentForm';
import Modal from './Modal';
import FileSaver from 'file-saver';
import Toast from './Toast';
import { Pencil, Trash2 } from 'lucide-react';


const PAGE_SIZE = 10;

interface StudentProp {
  _id: string;
  name: string;
  max_rating: number;
  email: string;
  cf_handle: string;
  current_rating: number;
  phone:string,
  last_sync: Date
}

interface StudentTableProps {
  // students: StudentProp[]; 
  onViewDetails: (student: StudentProp) => void;
}

export default function StudentTable({ onViewDetails }: StudentTableProps) {
  const [students, setStudents] = useState<StudentProp[]>([]);
  // const [filter, setFilter] = useState('');
  // const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const filter = searchParams.get('filter') || '';
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentProp | null>(null);
  const [addingStudent, setAddingStudent] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [studentToDelete, setStudentToDelete] = useState<StudentProp | null>(null);


  // Fetch students from backend API with Axios
  const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await api.get('/students/', {
          params: { filter, page, pageSize: PAGE_SIZE },
        });
        const data = response.data;
        console.log('fetched: ', response)
        if (data.success) {
          setStudents(data.data.students);
          setTotalPages(data.data.pagination.totalPages);
        } else {
          setToastMessage('Failed to fetch students: ' + data.error);
        }
      } catch (error) {
          if (error instanceof Error) {
        setToastMessage('Error fetching students: ' + error.message);
        console.log(error)
      } else {
        setToastMessage('An unexpected error occurred.');
        console.log(error)
      }
      }
      setLoading(false);
    };


  useEffect(() => {
    fetchStudents();
  }, [filter, page]);


    const handleEdit = (student: StudentProp) => {
    setEditingStudent(student);
  };


  const handlePageChange = (newPage:number) => {
    setSearchParams({ page: newPage.toString(), filter });
  };

  // Handlers
  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ page: '1', filter: e.target.value });
  };

// handle student modal deletion
  const handleDelete = (student: StudentProp) => {
  setStudentToDelete(student);
};


  const handleFormSubmit = async (data: StudentProp) => {
  try {
    const response = await api.put(`/students/${editingStudent?._id}`, data);
    console.log('Update: ', response)
    if (response.data.success) {
      setToastMessage('Student updated successfully');
      setEditingStudent(null);
      fetchStudents();
    } else {
      setToastMessage('Update failed: ' + response.data.error);
    }
  } catch (error) {
        if (error instanceof Error) {
    setToastMessage('Error updating student: ' + error.message);
  } else {
    setToastMessage('Error updating student.');
  }
  }
};


 const handleAdd = () => {
    setAddingStudent(true);
  };

  const handleAddSubmit = async (data: StudentProp) => {
    try {
      const response = await api.post('/students', data);
      if (response.data.success) {
        setToastMessage('Student added successfully');
        setAddingStudent(false);
        fetchStudents();
      } else {
        setToastMessage('Add failed: ' + response.data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
      setToastMessage('Error adding student: ' + error.message);
    } else {
      setToastMessage('Error adding student.');
    }
    }
  };

  const handleAddCancel = () => {
    setAddingStudent(false);
  };


  const handleFormCancel = () => {
    setEditingStudent(null);
  };


  const handleDeletefun = async () => {
    try {
      const response = await api.delete(`/students/${studentToDelete?._id}`);
      if (response.data.success) {
        setToastMessage('Student deleted');
        fetchStudents();
      } else {
        setToastMessage('Delete failed: ' + response.data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        setToastMessage('Error deleting student: ' + error.message);
      } else {
        setToastMessage('Error deleting student.');
      }
    } finally {
      setStudentToDelete(null);
    }
  }

const handleExportCsv = async () => {
  try {
    setToastMessage('Preparing CSV export...');
    const response = await api.get('/students/export/csv', {
      params: { filter },
      responseType: 'blob', // important for binary data
    });

    // Create a blob from the response
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });

    // Use FileSaver to trigger download with a filename
    FileSaver.saveAs(blob, 'students.csv');

    setToastMessage('CSV download started');
  } catch (error) {
    if (error instanceof Error) {
      setToastMessage('Error downloading csv: ' + error.message);
    } else {
      setToastMessage('Error downloading csv.');
    }
  }
};

  return (
    <div className="max-w-7xl mx-auto p-4 py-8 dark:bg-gray-800
     dark:text-gray-50 " >
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 
      dark:text-gray-50">Enrolled Students</h1>

      <div className="flex flex-col sm:flex-row sm:items-center 
      sm:justify-between mb-4 space-y-2 sm:space-y-0 dark:bg-gray-800">
        <input
          type="text"
          placeholder="Search by name, email, or handle"
          value={filter}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full 
          sm:w-96 focus:outline-none focus:ring-1 focus:ring-gray-800
          dark:bg-gray-500"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Add Student
          </button>
          <button
            onClick={handleExportCsv}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg 
      shadow-sm ">
        <table className="min-w-full divide-y divide-gray-200 dark:bg-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className='dark:bg-gray-700 dark:text-gray-50'>
              <th className="px-4 py-3 text-left text-xs font-medium
              dark:text-gray-50 text-gray-500 uppercase tracking-wider"
              >Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium
              dark:text-gray-50 text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium
              dark:text-gray-50 text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium
              dark:text-gray-50 text-gray-500 uppercase tracking-wider">CF Handle</th>
              <th className="px-4 py-3 text-right text-xs font-medium
              dark:text-gray-50 text-gray-500 uppercase tracking-wider">Current Rating</th>
              <th className="px-4 py-3 text-right text-xs font-medium
              dark:text-gray-50 text-gray-500 uppercase tracking-wider">Max Rating</th>
              <th className="px-4 py-3 text-left text-xs font-medium
              dark:text-gray-50 text-gray-500 uppercase tracking-wider">Last Sync</th>
              <th className="px-4 py-3 text-center text-xs font-medium
              dark:text-gray-50 text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200
           dark:text-gray-50 dark:bg-gray-700">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map(student => (
                <tr
                  key={student._id}
                  className="hover:bg-indigo-50 cursor-pointer dark:hover:bg-gray-800"
                  onClick={() => onViewDetails && onViewDetails(student)}
                >
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.phone || '-'}</td>
                  <td className="px-4 py-3">{student.cf_handle || '-'}</td>
                  <td className="px-4 py-3 text-right">{student.current_rating ?? '-'}</td>
                  <td className="px-4 py-3 text-right">{student.max_rating ?? '-'}</td>
                  <td className="px-4 py-3">{student.last_sync ? new Date(student.last_sync).toLocaleString() : '-'}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleEdit(student);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                      aria-label={`Edit ${student.name}`}
                    >
                      <Pencil />
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleDelete(student);
                      }}
                      className="text-red-600 hover:text-red-900"
                      aria-label={`Delete ${student.name}`}
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-4">
        <button
          // onClick={() => setPage(p => Math.max(p - 1, 1))}
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded-md border ${
            page === 1 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 
            'border-indigo-600 text-indigo-600 dark:text-gray-50'
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-gray-50">
          Page {page} of {totalPages}
        </span>
        <button
          // onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          onClick={() => handlePageChange(Math.max(page + 1, 1))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded-md border ${
            page === totalPages ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 
            'border-indigo-600 text-indigo-600 dark:text-gray-50'
          }`}
        >
          Next
        </button>
      </div>

            {/* Edit Modal */}
<Modal isOpen={!!editingStudent} onClose={handleFormCancel} title="Edit Student">
        {editingStudent && (
          <StudentForm
            initialData={editingStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}
      </Modal>

       {/* Add Modal */}
      <Modal isOpen={addingStudent} onClose={handleAddCancel} title="Add Student">
        <StudentForm onSubmit={handleAddSubmit} onCancel={handleAddCancel} />
      </Modal>

      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}


      {studentToDelete && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg space-y-4 w-80 text-center">
      <p className="text-lg text-gray-900 dark:text-gray-100">
        Are you sure you want to delete <strong>{studentToDelete.name}</strong>?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setStudentToDelete(null)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleDeletefun}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
