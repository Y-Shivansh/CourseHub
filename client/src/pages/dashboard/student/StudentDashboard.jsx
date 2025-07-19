import DashboardNavbar from "../../../components/Navbar/DashboardNavbar"
import { useEffect, useState } from 'react'
import { privateApi } from '../../../services/axios.config'
import AllCoursesSection from "../../../components/common/AllCoursesSection"

import BlobBackground from "../../../components/design/BlobBackground"
import Sidebar from "../../../components/Navbar/sidebar/Sidebar"
import Loader from "../../../components/common/Loader"

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
      }finally{
        setLoading(false);
      }
    })();
  },[]);

  if (loading) return <Loader />;
  return (
    <div className="relative min-h-screen ">
      <BlobBackground />

      <div className="relative z-10">
        <DashboardNavbar onMenuClick={() => setIsSideBarOpen(true)} />
        <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      </div>
      <AllCoursesSection user = {JSON.parse(localStorage.getItem('user'))}/>
    </div>
  )
}

export default StudentDashboard
