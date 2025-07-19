import { Link } from 'react-router-dom'
import ThemeToggle from '../common/ThemeToggle'
import { Menu } from 'lucide-react'
import SidebarMenu from './sidebar/Sidebar';

const DashboardNavbar = ({onMenuClick}) => {

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">

      {/* Logo and Name */}
      <Link to="/" className="flex items-center gap-2 text-lg font-medium">
        <img src="/src/assets/logo.png" alt="logo" className="w-10 h-10 object-contain rounded-md" />
        CourseHub
      </Link>

      {/* Right Side */}
        <button className="focus:outline-none cursor-pointer">
          <Menu onClick={onMenuClick} className="w-6 h-6" />
        </button>
        {/* <ThemeToggle /> */}
    </nav>
  );
};

export default DashboardNavbar;
