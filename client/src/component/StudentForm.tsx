import React, { useState, useEffect } from 'react';
import Toast from './Toast';


interface StudentFormProps {
  initialData?: {
    name: string;
    email: string;
    phone?: string;
    cf_handle?: string;
    current_rating?: number | null;
    max_rating?: number | null;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

interface StudentProp {
  name: string;
  max_rating: number | null;
  email: string;
  cf_handle: string;
  current_rating: number | null;
  phone:string
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<StudentProp>({
    name: '',
    email: '',
    phone: '',
    cf_handle: '',
    current_rating: null,
    max_rating: null,
  });
  const [toastMessage, setToastMessage] = useState('');


  useEffect(() => {
     if (initialData) {
      setFormData({
        name: initialData.name ?? '',
        email: initialData.email ?? '',
        phone: initialData.phone ?? '',
        cf_handle: initialData.cf_handle ?? '',
        current_rating: initialData.current_rating ?? null,
        max_rating: initialData.max_rating ?? null,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'current_rating' || name === 'max_rating' ? (value ? Number(value) : null) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setToastMessage('Name and Email are required');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 ">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1
        dark:text-gray-50">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 px-3 py-2
           focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-800"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1
        dark:text-gray-50">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 px-3 py-2
           focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-800"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1
        dark:text-gray-50">Phone</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 px-3 py-2
           focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1
        dark:text-gray-50">Codeforces Handle</label>
        <input
          name="cf_handle"
          value={formData.cf_handle}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 px-3 
          py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1
        dark:text-gray-50">Current Rating</label>
        <input
          name="current_rating"
          type="number"
          value={formData.current_rating ?? ''}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 px-3 
          py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1
        dark:text-gray-50">Max Rating</label>
        <input
          name="max_rating"
          type="number"
          value={formData.max_rating ?? ''}
          onChange={handleChange}
          className="block w-full rounded-md border
           border-gray-300 px-3 py-2 focus:border-indigo-500
            focus:ring-indigo-500 dark:text-gray-800"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm 
          font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-50
          dark:hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Save
        </button>
      </div>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
      
    </form>
  );
};

export default StudentForm;
