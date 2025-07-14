import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PublicNavbar from "../../components/Navbar/PublicNavbar";
import Footer from "../../components/common/Footer";
import Hero from '../../components/Landing/Hero';
import { getUserRoleFromToken } from '../../utils/getUserRoleFromToken';
import AllCoursesSection from '../../components/common/AllCoursesSection';

const LandingPage = () => {
  const navigate = useNavigate();
  const role = getUserRoleFromToken();

  useEffect(() => {
    if (role) {
      navigate('/dashboard');
    }
  }, [role, navigate]);

  return (
    <div className='bg-background-light dark:bg-background-dark min-h-screen'>
      <PublicNavbar />
      <Hero />
      <AllCoursesSection/>
      <Footer />
    </div>
  )
}

export default LandingPage