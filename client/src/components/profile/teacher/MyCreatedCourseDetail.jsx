// src/components/teacher/MyCreatedCourseDetail.jsx
import { Book, Clock } from "lucide-react";
import defaultThumbnail from "../../../assets/defaultThumbnail.png";

const MyCreatedCourseDetail = ({ course, showEnrolled = true }) => {
  if (!course) return null;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
        Course Details
      </h2>
      <div className="h-px bg-gray-300 dark:bg-gray-600" />

      {/* Thumbnail + Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thumbnail & Basic Info */}
        <div className="space-y-4">
          <img
            src={course.thumbnail || defaultThumbnail}
            alt={course.name}
            className="w-full h-48 object-cover rounded-lg shadow"
          />

          <div className="bg-secondary-light dark:bg-secondary-dark p-4 rounded-lg space-y-1">
            <h3 className="dark:text-text-dark text-lg font-semibold">{course.name}</h3>
            <p className="text-sm text-text-muted flex items-center gap-2"><Book size={14}/> {course.category}</p>
            <p className="text-sm text-text-muted flex items-center gap-2"><Clock size={14}/> {course.duration}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-secondary-light dark:bg-secondary-dark p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-2 text-text-light dark:text-text-dark">Description</h4>
          <p className="text-sm text-text-muted font-medium leading-relaxed">{course.description}</p>
        </div>
      </div>

      {/* Enrolled Students */}
      {showEnrolled && course.enrolledStudents && (
        <>
          <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">
            Enrolled Students ({course.enrolledStudents.length})
          </h3>

          {course.enrolledStudents.length === 0 ? (
            <p className="text-sm text-text-muted">No students enrolled yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {course.enrolledStudents.map((student) => (
                <div key={student._id} className="bg-secondary-light dark:bg-secondary-dark rounded p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center text-white font-semibold">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-light dark:text-text-dark">{student.name}</p>
                    <p className="text-xs text-text-muted">{student.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCreatedCourseDetail;
