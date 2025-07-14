import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary-light dark:text-primary-dark mb-4">404</h1>
      <p className="text-xl text-text-muted mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      
      <Link
        to="/"
        className="bg-primary-light dark:bg-primary-dark text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
