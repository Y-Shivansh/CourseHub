import { Link } from "react-router-dom"
import ThemeToggle from "../common/ThemeToggle"

const PublicNavbar = () => {
    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">

            {/*Logo and Name */}
            <Link to="/" className="flex items-center gap-2 text-lg font-medium text-text-light dark:text-text-dark" >
                <img src="/src/assets/logo.png" alt="logo" className="w-10 h-10 object-contain rounded-md" />
                CourseHub
            </Link>

            {/* Nav Links */}
            <div className="flex gap-6 items-center text-sm font-medium">
                <a href="#showCourses" className="hover:text-primary-light dark:hover:text-primary-dark hover:underline">
                    Show Courses
                </a>
                <Link to={"/"} className="hover:text-primary-light dark:hover:text-primary-dark hover:underline">
                    Login
                </Link>
                <Link to={"/signup"} className="hover:text-primary-light dark:hover:text-primary-dark hover:underline">
                    Signup
                </Link>
                <ThemeToggle withText={false} size={16}/>
            </div>
        </nav>
    )
}

export default PublicNavbar
