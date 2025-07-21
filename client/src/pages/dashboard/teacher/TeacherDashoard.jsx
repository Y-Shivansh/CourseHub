import DashboardNavbar from "../../../components/Navbar/DashboardNavbar"
import { useEffect, useState } from 'react'
import { privateApi } from '../../../services/axios.config'
import DashboardStats from "../../../components/common/DashboardStats"

import TeacherBlobBackground from "../../../components/design/TeacherBlobBackgroung"
import Sidebar from "../../../components/Navbar/sidebar/Sidebar"
import Loader from "../../../components/common/Loader"
import Footer from "../../../components/common/Footer"

const TeacherDashboard = () => {

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
      <div className="relative min-h-screen">
        <TeacherBlobBackground />
        <div className="relative z-10">
          <DashboardNavbar onMenuClick={() => setIsSideBarOpen(true)} />
          <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
        </div>

        {/* Dashboard Stats */}
        <div className="relative -z-10 max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
              Teacher Dashboard 📚
            </h1>
            <p className="text-text-muted">
              Manage your courses and track student progress
            </p>
          </div>
          <DashboardStats userRole="teacher" />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TeacherDashboard;