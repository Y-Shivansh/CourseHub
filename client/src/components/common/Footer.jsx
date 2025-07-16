import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

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
                    <p className="text-sm text-text-muted text-center md:text-left">
                        Empowering modern education with smart technology.
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <h3 className="text-sm font-semibold mb-1">Connect With Us</h3>
                    <div className="flex flex-col gap-3 space-x-4">
                        <a href="https://github.com/Y-Shivansh" className="hover:text-primary-light dark:hover:text-primary-dark transition flex items-center gap-2 text-sm">
                             <Github size={18} />Github
                        </a>
                        <a href="https://x.com/shivansh_zz" className="hover:text-primary-light dark:hover:text-primary-dark transition flex items-center gap-2 text-sm">
                            <Twitter size={18} />Twitter 
                        </a>
                        <a href="https://www.linkedin.com/in/shivansh-sharma-73270724b/" className="hover:text-primary-light dark:hover:text-primary-dark transition flex items-center gap-2 text-sm">
                            <Linkedin size={18} />Linkedin
                        </a>
                    </div>
                </div>


                {/* Navigation Links again */}
                <div className="flex flex-col items-center md:items-start gap-4 text-sm font-medium">
                    <Link to="/" className="hover:text-primary-light dark:hover:text-primary-dark hover:underline transition">
                        Show Courses
                    </Link>
                    <Link to="/" className="hover:text-primary-light dark:hover:text-primary-dark hover:underline transition">
                        Login
                    </Link>
                    <Link to="/signup" className="hover:text-primary-light dark:hover:text-primary-dark hover:underline transition">
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
