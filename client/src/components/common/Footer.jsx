import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark border-t border-gray-300 dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Logo + Name */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <img src="/src/assets/logo.png" alt="logo" className="w-16 h-16 object-contain rounded-lg" />
                    <div className="text-xl font-semibold text-center md:text-left">
                        CourseHub | Learn Smart
                    </div>
                </div>


                {/* Navigation Links again */}
                <div className="flex flex-col items-center md:items-start gap-4 text-sm font-medium">
                    <Link to="/" className="hover:text-primary-light dark:hover:text-primary-dark hover:underline transition-all duration-200">
                        Show Courses
                    </Link>
                    <Link to="/" className="hover:text-primary-light dark:hover:text-primary-dark hover:underline transition-all duration-200">
                        Login
                    </Link>
                    <Link to="/signup" className="hover:text-primary-light dark:hover:text-primary-dark hover:underline transition-all duration-200">
                        Signup
                    </Link>
                </div>
            </div>

            {/* Bottom copyright */}
            <p className="text-center text-xs py-4 border-t border-gray-200 dark:border-gray-700">© 2025 CourseHub. All rights reserved.</p>
        </footer>
    )
}

export default Footer
