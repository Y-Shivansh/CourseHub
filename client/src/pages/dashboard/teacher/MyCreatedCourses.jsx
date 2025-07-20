import { useState } from "react";
import TeacherBlobBackground from "../../../components/design/TeacherBlobBackgroung"
import DashboardNavbar from "../../../components/Navbar/DashboardNavbar"
import Sidebar from "../../../components/Navbar/sidebar/Sidebar";
import AllCreatedCourses from "../../../components/profile/AllCreatedCourses";


const MyCreatedCourses = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <div className="relative min-h-screen">
      <TeacherBlobBackground />
      {/* NAV */}
      <div className="relative z-10">
        <DashboardNavbar onMenuClick={() => setIsSideBarOpen(true)} />
        <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      </div>
      <AllCreatedCourses />
    </div>
  )
}

export default MyCreatedCourses

