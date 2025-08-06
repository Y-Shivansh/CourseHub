import DashboardNavbar from "../../../components/Navbar/DashboardNavbar"
import { useEffect, useState } from 'react'
import { privateApi } from '../../../services/axios.config'
import AllCoursesSection from "../../../components/common/AllCoursesSection"
import DashboardStats from "../../../components/common/DashboardStats"

import BlobBackground from "../../../components/design/BlobBackground"
import Sidebar from "../../../components/Navbar/sidebar/Sidebar"
import Loader from "../../../components/common/Loader"
import Footer from "../../../components/common/Footer"

const StudentDashboard = () => {

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await privateApi.get('/user/me');
        localStorage.setItem('coursehub_user', JSON.stringify(res.data.user));
      } catch (error) {
        console.error("User fetch failed", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;
  
  return (
    <>
      <div className="relative min-h-screen ">
        <BlobBackground />
        {/* NAV */}
        <div className="relative z-10">
          <DashboardNavbar onMenuClick={() => setIsSideBarOpen(true)} />
          <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
        </div>

        {/* Dashboard Stats */}
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-text-light dark:text-text-dark mb-1 sm:mb-2">
              Welcome back! <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-dark to-green-400 bg-clip-text text-transparent">{JSON.parse(localStorage.getItem('coursehub_user')).name}</span> 👋 
            </h1>
            <p className="text-text-light font-light dark:text-text-dark text-sm sm:text-base">
              Here's your learning overview
            </p>
          </div>
          <DashboardStats userRole="student" />
        </div>

        {/* Available Courses */}
        <div className="relative z-10" id="enroll-courses">
          <AllCoursesSection user={JSON.parse(localStorage.getItem('coursehub_user'))} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StudentDashboard