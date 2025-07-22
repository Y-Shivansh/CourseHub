import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import DefaultProfile from '../../assets/profileAvatar.svg'
import courseHubLogo from '../../assets/logo.png'

const DashboardNavbar = ({ onMenuClick }) => {
  const user = JSON.parse(localStorage.getItem('user'));


  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">

      {/* Logo and Name */}
      <Link to="/" className="flex items-center gap-2 text-lg font-medium">
        <img src={courseHubLogo} alt="logo" className="w-10 h-10 object-contain rounded-md" />
        CourseHub
      </Link>

      {/* Right Side */}
      <div
        onClick={onMenuClick}
        className="cursor-pointer flex items-center gap-3 p-1 rounded-lg hover:bg-text-muted/10 transition-colors"
        role="button"
        aria-label="Open user menu"
      >
        <img
          className='w-9 h-9 object-cover border dark:border-gray-300 border-gray-600 rounded-full cover'
          src={user.profile || DefaultProfile} alt={`${user.name}'s profile`}
        />
        <div className="pl-3 border-l border-gray-300 dark:border-gray-600">
          <p className="text-sm font-semibold text-text-light dark:text-white">{user.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
