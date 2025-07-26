import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicApi } from "../../services/axios.config";
import defaultThumbnail from "../../assets/defaultThumbnail.png";
import defaultprofile from "../../assets/profileAvatar.svg";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EnrollPopup from "../../components/auth/modals/EnrollPopup";
import BlobBackground from "../../components/design/BlobBackground";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";
import Sidebar from "../../components/Navbar/sidebar/Sidebar";
import ChatbotPopup from "../../components/chatbot/ChatbotPopup";
import { BotMessageSquare } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [showEnrollPopup, setShowEnrollPopup] = useState(false);
  const [otherCourses, setOtherCourses] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    (async () => {
      try {
        const res1 = await publicApi.get(`/course/${id}`);
        setCourse(res1.data.course);

        const res2 = await publicApi.get(`/course/teacher/${res1.data.course.createdBy._id}`);
        setOtherCourses(res2.data.courses || []);

        setLoading(false);
      } catch (error) {
        console.error("Error loading course or teacher courses", error);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="relative bg-background-light dark:bg-background-dark min-h-screen">
      {/* Background blob layer - can toggle this via theme */}
      <BlobBackground />
      {user && <div className="relative z-10">
        <DashboardNavbar onMenuClick={() => setIsSideBarOpen(true)} />
        <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      </div>}


      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT - Course Content */}
          <div className="md:col-span-2 space-y-6">
            <img
              src={course.thumbnail || defaultThumbnail}
              alt={course.name}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />

            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
              {course.name}
            </h1>

            <p className="text-text-muted text-sm">
              Instructor: <span className="font-semibold">{course.createdBy?.name}</span>
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-text-muted">
              <span>📚 {course.category}</span>
              <span>⏱️ {course.duration}</span>
            </div>

            <p className="text-text-light dark:text-text-dark text-lg leading-relaxed">
              {course.description}
            </p>

            {/* ENROLL BUTTON*/}
            {!token ? (
              <Button disabled={true} children="Login to Enroll" />
            ) : user.role === "teacher" ? (
              <Button disabled={true} children="Teachers can't enroll" />
            ) : user.role === "student" ? (
              <Button onClick={() => setShowEnrollPopup(true)} children="Enroll" />
            ) : (
              <Button disabled={true} children="Access Denied" />
            )}
          </div>
          {showEnrollPopup && (
            <EnrollPopup isOpen={showEnrollPopup}
              onClose={() => setShowEnrollPopup(false)}
              courseId={id}
            />
          )}

          {/* RIGHT - Teacher Info + Other Courses */}
          <div className="space-y-6">
            <div className="bg-secondary-light dark:bg-secondary-dark rounded-xl p-6 shadow text-center">
              <img
                src={course.createdBy?.profile || defaultprofile}
                alt="Teacher"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">
                {course.createdBy.name}
              </h3>
              <p className="text-sm text-text-muted">{course.createdBy.email}</p>
              <p className="mt-2 text-sm text-text-light dark:text-text-dark">
                {course.createdBy.bio || "No bio provided."}
              </p>
            </div>

            {/* Other Courses */}
            {otherCourses.length > 1 && (
              <div className="bg-secondary-light dark:bg-secondary-dark rounded-xl p-4 shadow">
                <h3 className="text-lg font-semibold mb-4 text-text-light dark:text-text-dark text-center">
                  More by {course?.createdBy?.name}
                </h3>

                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {otherCourses
                    .filter((c) => c._id !== course._id)
                    .map((c) => (
                      <div key={c._id} className="flex items-center gap-3 bg-background-light dark:bg-background-dark p-3 rounded-md shadow-sm">
                        <img
                          src={c.thumbnail || defaultThumbnail}
                          alt={c.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="text-sm text-text-light dark:text-text-dark font-medium">{c.name}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {(user && user.role === 'student') &&
          <div className="flex justify-end items-end">

            <Button 
              className="flex gap-3 bg-red-900 rounded-full"
              onClick={() => setShowChatbot(true)}
            >
              Ask Assistant <BotMessageSquare />
            </Button>

            {showChatbot && (
              <ChatbotPopup
                isOpen={showChatbot}
                onClose={() => setShowChatbot(false)}
                courseId={id}
              />
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default CourseDetails;
