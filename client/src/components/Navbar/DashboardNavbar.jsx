import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import DefaultProfile from '../../assets/profileAvatar.svg'
import courseHubLogo from '../../assets/logo.png'
import { useLocation } from 'react-router-dom'

const DashboardNavbar = ({ onMenuClick }) => {
  const user = JSON.parse(localStorage.getItem('coursehub_user'));
  const currentPathName = useLocation().pathname;

  return (
    <>
      <nav className="flex items-center justify-between px-2 sm:px-4 py-2 bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">

        {/* Logo and Name */}
        <Link to="/" className="flex items-center gap-2 text-base sm:text-lg font-medium">
          <img src={courseHubLogo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-md" />
          CourseHub
        </Link>
        {/* Enroll to Course link for students only (desktop) */}
        {(user?.role === 'student' && currentPathName === '/dashboard-student') && (
          <a href="#enroll-courses" className="hidden sm:inline-block px-3 py-1 rounded text-primary-light font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-light transition text-sm">Enroll to Course</a>
        )}
        {/* Right Side */}
        <div
          onClick={onMenuClick}
          className="cursor-pointer flex items-center gap-2 sm:gap-3 p-1 rounded-lg hover:bg-text-muted/10 transition-colors"
          role="button"
          aria-label="Open user menu"
        >
          <img
            className='w-8 h-8 sm:w-9 sm:h-9 object-cover border dark:border-gray-300 border-gray-600 rounded-full cover'
            src={user.profile || DefaultProfile} alt={`${user.name}'s profile`}
          />
          <div className="pl-2 sm:pl-3 border-l border-gray-300 dark:border-gray-600">
            <p className="text-xs sm:text-sm font-semibold text-text-light dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </nav>
      {/* Enroll to Course button for students only (mobile) */}
      {(user?.role === 'student' && currentPathName === '/dashboard-student') && (
        <a href="#enroll-courses" className="flex justify-center mx-2 px-3 rounded-full items-center bg-black dark:bg-white sm:hidden text-center text-xs py-1 my-2 text-text-dark dark:text-text-light font-light ">Enroll to Course</a>
      )}
    </>
  );
};

export default DashboardNavbar;
