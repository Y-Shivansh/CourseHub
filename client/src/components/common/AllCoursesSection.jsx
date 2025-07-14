import { useEffect, useState } from "react";
import { publicApi } from "../../services/axios.config";
import CourseCard from "./CourseCard";

const AllCoursesSection = () => {
    const [courses, setCourses] = useState([]);
    const[showAll, setShowAll] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const res = await publicApi.get("/course/all");
                setCourses(res.data.courses || []);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        })();
    }, []);

    const visibleCourses = showAll ? courses : courses.slice(0,4); 
    return (
        <div className="max-w-7xl mx-auto px-4 py-10 border-t  border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
                Explore Courses
            </h2>

            {courses.length === 0 ? (
                <p className="text-gray-500">No courses available right now.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {visibleCourses.map((course) => (
                        <CourseCard key={course._id} course={course} /> // key is a special prop that helps React identify which list items have changed, added, or removed.
                    ))}
                </div>
            )}
            
            {courses.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-block bg-primary-light dark:bg-primary-dark text-white text-sm px-6 py-2 rounded hover:opacity-90 transition"
              >
                {showAll ? "Show Less" : "Show All Courses"}
              </button>
            </div>
          )}
        </div>
    )
}

export default AllCoursesSection
