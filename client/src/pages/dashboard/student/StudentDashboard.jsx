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
        localStorage.setItem('user', JSON.stringify(res.data.user));
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-2">
              Welcome back! {JSON.parse(localStorage.getItem('user')).name}👋 
            </h1>
            <p className="text-text-light font-light dark:text-text-dark">
              Here's your learning overview
            </p>
          </div>
          <DashboardStats userRole="student" />
        </div>

        {/* Available Courses */}
        <div className="relative z-10">
          <AllCoursesSection user={JSON.parse(localStorage.getItem('user'))} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StudentDashboard