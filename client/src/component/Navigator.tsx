import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  return (
    <div className='m-auto text-center px-2 py-3 border-gray-50 border-b-2 
    shadow-lg flex dark:bg-gray-800'>
      <nav className='border-gray-500 border-[1px] w-fit m-auto shadow-lg 
      rounded-lg font-semibold text-lg bg-gray-200 dark:bg-gray-400'>
        <Link to="/" className='hover:bg-gray-800 px-4 hover:rounded-md 
        inline-block hover:text-gray-50'>Students</Link>
      <Link to="/admin" className=" px-4 hover:rounded-md hover:bg-gray-800 inline-block hover:text-gray-50">Admin</Link>
      </nav >
      <ThemeToggle />
    </div>
  );
}

export default Navigation