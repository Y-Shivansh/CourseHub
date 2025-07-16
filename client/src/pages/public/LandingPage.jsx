import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PublicNavbar from "../../components/Navbar/PublicNavbar";
import Footer from "../../components/common/Footer";
import Hero from '../../components/Landing/Hero';
import { getUserRoleFromToken } from '../../utils/getUserRoleFromToken';
import AllCoursesSection from '../../components/common/AllCoursesSection';
import BlobBackground from '../../components/design/BlobBackground'
import Loader from '../../components/common/Loader';

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // If already logged in navigate to dashboard.
  useEffect(() => {
    const role = getUserRoleFromToken();

    if (role) {
      navigate('/dashboard'); // redirect if logged-in
    }else{
      setTimeout(() => setLoading(false), 300); // show landing after 300ms
    }
  }, [navigate]);
   if (loading) return <Loader />;

  return (
    <div className='relative'>
      <BlobBackground/>
      <PublicNavbar />
      <Hero />
      
      <AllCoursesSection/>
      <Footer />
    </div>
  )
}

export default LandingPage