import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ProtectedLayout = () => {
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      toast.error("Login or Signup First");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace/>
  }

  return (
      <Outlet />
  )
}

export default ProtectedLayout
