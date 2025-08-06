import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserRoleFromToken } from '../utils/getUserRoleFromToken';
import Loader from '../components/common/Loader';

const ProtectedLayout = () => {
  const location = useLocation();
  const token = localStorage.getItem('coursehub_authToken');

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      toast.error("Login or Signup First", {
        toastId: 'error-unique-id'
      });
      setLoading(false); // Even for unauthenticated, finish loading
    } else {
      const userRole = getUserRoleFromToken(token);
      setRole(userRole);
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <Loader />; // Don't render until role is fetched

  // role-specific path rules
  const isTeacherRoute = location.pathname.startsWith('/dashboard-teacher')
    || location.pathname.startsWith('/create-course')
    || location.pathname.startsWith('/update-teacher')
    || location.pathname.startsWith('/update-course')
    || location.pathname.startsWith('/my-courses');

  const isStudentRoute = location.pathname.startsWith('/dashboard-student')
    || location.pathname.startsWith('/update-student')
    || location.pathname.startsWith('/my-enrolled-courses')
    || location.pathname.includes('/enroll')
    || location.pathname.includes('/ai');

  // Redirecting if role mismatch
  if (isTeacherRoute && role !== 'teacher') {
    toast.error("Access denied: Teachers only", {
      toastId: 'error-unique-id' // so that toast does not appear twice
    });
    return <Navigate to="/dashboard-student" replace />;
  }
  if (isStudentRoute && role !== 'student') {
    toast.error("Access denied: Students only", {
      toastId: 'error-unique-id'
    });
    return <Navigate to="/dashboard-teacher" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
