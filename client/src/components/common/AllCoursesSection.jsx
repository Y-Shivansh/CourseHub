import { useEffect, useState } from "react";
import { privateApi, publicApi } from "../../services/axios.config";
import CourseCard from "./CourseCard";
import Input from "./Input";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

const AllCoursesSection = ({ user = null }) => {

    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchCourse, setSearchCourse] = useState("");
    const [showAll, setShowAll] = useState(false);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        (async () => {
            try {
                if (user !== null) {
                    const res = await privateApi.get("/course/unenrolled");
                    console.log(res.data);
                    setCourses(res.data.courses || []);
                    setFilteredCourses(res.data.courses || []);
                } else {
                    const res = await publicApi.get("/course/all");
                    setCourses(res.data.courses || []);
                    setFilteredCourses(res.data.courses || []);
                }
            } catch (error) {
                toast.error("Failed to fetch courses");
                console.error("Failed to fetch courses", error);
            }
        })(); // IIFE
    }, []);

    const visibleCourses = showAll ? filteredCourses : (token ? filteredCourses.slice(0, 6) : filteredCourses.slice(0, 4));

    const handleSearch = () => {
        const term = searchCourse.trim().toLowerCase();

        const filtered = courses.filter((course) =>
            course.name.toLowerCase().includes(term)
        );

        setFilteredCourses(filtered);
        setShowAll(true);
    };


    return (
        <div className="max-w-7xl mx-auto px-4 py-10 border-t  border-gray-300 dark:border-gray-600">
            <h2 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">
                {token ? "Enroll to any course" : "Explore Courses"}
            </h2>

            {/* Search Courses */}
            <div className="mb-6 flex items-center">
                <div className="w-full relative">
                    <Input
                        placeholder="Search Courses..."
                        value={searchCourse}
                        onChange={(e) => setSearchCourse(e.target.value)}
                        className="pr-12 dark:bg-secondary-light"
                        applyDark={false}
                        labelDark={false}
                    />

                    <button
                        onClick={handleSearch}
                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark hover:opacity-80 transition"
                    >
                        <Search />
                    </button>
                </div>
                {searchCourse && (
                    <button onClick={() => {
                        setSearchCourse("");
                        setFilteredCourses(courses);
                        setShowAll(false);
                    }}
                        className="cursor-pointer ml-2 text-sm underline text-primary-light dark:text-text-dark"
                    >
                        Clear
                    </button>
                )}
            </div>


            {filteredCourses.length === 0 ? (
                <p className="text-gray-500">No courses available right now.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {visibleCourses.map((course) => (
                        <CourseCard key={course._id} course={course} /> // key is a special prop that helps React identify which list items have changed, added, or removed.
                    ))}
                </div>
            )}

            {(token ? filteredCourses.length > 6 : filteredCourses.length > 4) && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="inline-block text-primary-light dark:text-white underline cursor-pointer text-sm px-3 py-1 rounded-2xl hover:opacity-90 transition"
                    >
                        {showAll ? "Show Less" : "Show All"}
                    </button>
                </div>
            )}
        </div>
    )
}

export default AllCoursesSection
