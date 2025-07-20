import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { publicApi } from '../../../services/axios.config';
import { toast } from 'react-toastify';
import Button from "../../../components/common/Button";
import Loader from '../../../components/common/Loader';
import DashboardNavbar from '../../../components/Navbar/DashboardNavbar';
import Sidebar from '../../../components/Navbar/sidebar/Sidebar';
import TeacherBlobBackground from '../../../components/design/TeacherBlobBackgroung';
import MyCreatedCourseDetail from '../../../components/profile/teacher/MyCreatedCourseDetail';
import EditCourseDetails from '../../../components/profile/teacher/EditCourseDetails';

const CourseUpdate = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await publicApi.get(`/course/${id}`)
        setCourse(res.data.course);

      } catch (error) {
        console.error("Error loading course or teacher courses", error);
        toast.error("Could not load course.", {
          toastId: "courseError"
        })
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />

  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark">
      <TeacherBlobBackground />
      <div className="relative z-10">
        <DashboardNavbar onMenuClick={() => setIsSideBarOpen(true)} />
        <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      </div>

      <div className="relative z-0 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Course Detail - 60% */}
          <div className="md:col-span-3">
            <MyCreatedCourseDetail course={course} showEnrolled={false} />
          </div>

          {/* Edit Form - 40% */}
          <div className="md:col-span-2">
            <EditCourseDetails />
          </div>

        </div>
      </div>
    </div>

  );
}

export default CourseUpdate
