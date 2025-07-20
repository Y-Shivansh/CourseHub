import DashboardNavbar from "../../../components/Navbar/DashboardNavbar"
import { useEffect, useState } from 'react'
import { privateApi } from '../../../services/axios.config'

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

      </div>
      <Footer />
    </>
  )
}

export default TeacherDashboard;
