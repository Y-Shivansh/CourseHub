import { Link, useLocation } from "react-router-dom"
import ThemeToggle from "../common/ThemeToggle"
import courseHubLogo from '../../assets/logo.png'

const PublicNavbar = () => {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const isLogin = location.pathname === "/" || location.pathname === "/login";
  return (
    <nav className="flex items-center justify-between px-4 py-2 text-text-light dark:text-text-dark w-full">
      {/* Logo and Name */}
      <Link to="/" className="flex items-center gap-2 text-lg font-medium text-text-light dark:text-text-dark">
        <img src={courseHubLogo} alt="logo" className="md:w-10 md:h-10 h-7 w-7 object-contain rounded-md" />
        <span className="md:text-xl text-sm font-semibold text-center md:text-left">
          CourseHub
        </span>
      </Link>
      {/* Nav Links */}
      <div className="flex gap-4 sm:gap-6 items-center text-sm font-medium">
        <a href="#showCourses" className="hover:text-primary-light dark:hover:text-primary-dark hover:underline">
          Show Courses
        </a>
        {isLogin && (
          <Link to="/signup" replace={true} className="hover:text-primary-light dark:hover:text-primary-dark hover:underline">
            Signup
          </Link>
        )}
        {isSignup && (
          <Link to="/" replace={true} className="hover:text-primary-light dark:hover:text-primary-dark hover:underline">
            Login
          </Link>
        )}
        <ThemeToggle withText={false} size={16} />
      </div>
    </nav>
  );
}

export default PublicNavbar
