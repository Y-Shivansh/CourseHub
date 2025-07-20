import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'

const DashboardNavbar = ({ onMenuClick }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">

      {/* Logo and Name */}
      <Link to="/" className="flex items-center gap-2 text-lg font-medium">
        <img src="/src/assets/logo.png" alt="logo" className="w-10 h-10 object-contain rounded-md" />
        CourseHub
      </Link>

      {/* Right Side */}
      <div className="focus:outline-none cursor-pointer flex items-center gap-3" onClick={onMenuClick}>
        <img className='w-9 h-9 rounded-full' src={user.profile} alt="" />
        <div className='border-l border-text-muted px-3 flex flex-col items-center'>
          <p className=' text-xs font-medium'>{user.name}</p>
          <p className=' text-xs text-gray-400 font-semibold capitalize'>{user.role}</p>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
