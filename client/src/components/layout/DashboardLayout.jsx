import { useState } from 'react'
import BlobBackground from '../design/BlobBackground'
import DashboardNavbar from '../Navbar/DashboardNavbar'
import Sidebar from '../Navbar/sidebar/Sidebar'

const DashboardLayout = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <div className="relative min-h-screen">
      <BlobBackground />
      
      <div className="relative z-10">
        <DashboardNavbar onMenuClick={() => setIsSideBarOpen(true)} />
        <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout