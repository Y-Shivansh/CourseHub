import { useState } from "react";
import BlobBackground from "../../../components/design/BlobBackground"
import DashboardNavbar from "../../../components/Navbar/DashboardNavbar"
import Sidebar from "../../../components/Navbar/sidebar/Sidebar";
import AllEnrolledCourses from "../../../components/profile/AllEnrolledCOurses";


const MyEnrolledCourses = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <div className="relative min-h-screen">
      <BlobBackground />
      {/* NAV */}
      <div className="relative z-10">
        <DashboardNavbar onMenuClick={() => setIsSideBarOpen(true)} />
        <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      </div>
      <AllEnrolledCourses />
    </div>
  )
}

export default MyEnrolledCourses

