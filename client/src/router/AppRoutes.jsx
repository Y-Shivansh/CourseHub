import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Public
import LandingPage from "../pages/public/LandingPage";
import CourseDetails from "../pages/public/CourseDetails";

// : Protected :
// Teacher Pages
import TeacherDashboard from '../pages/dashboard/teacher/TeacherDashoard'
import MyCreatedCourses from "../pages/dashboard/teacher/MyCreatedCourses";
import CreateCourse from "../pages/dashboard/teacher/CreateCourse";
import CourseUpdate from "../pages/dashboard/teacher/CourseUpdate";

// Student Pages
import StudentDashboard from '../pages/dashboard/student/StudentDashboard'
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import MyEnrolledCourses from "../pages/dashboard/student/MyEnrolledCourses";
import EnrolledCourse from "../pages/dashboard/student/EnrolledCourse";

// Others
import NotFound from "../pages/NotFound";
import ProtectedLayout from '../layout/ProtectedLayout';


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path='/' element={<LandingPage />} />
                <Route path='/signup' element={<LandingPage />} />
                <Route path='/course/:id' element={<CourseDetails />} />

                {/* Protected Routes */}
                <Route element={<ProtectedLayout />}>

                    {/* Students */}
                    <Route path='/dashboard-student' element={<StudentDashboard />} />
                    <Route path='/update-student' element={<UpdateProfile/>} />
                    <Route path='/courses/:id/enroll' element={<CourseDetails />} />
                    <Route path='/my-enrolled-courses' element={<MyEnrolledCourses />} />
                    <Route path='/my-enrolled-courses/:id' element={<EnrolledCourse />} />

                    {/* Teacher */}
                    <Route path='/dashboard-teacher' element={<TeacherDashboard />} />
                    <Route path='/update-teacher' element={<UpdateProfile />} />
                    <Route path='/create-course' element={<CreateCourse />} />
                    <Route path='/update-course/:id' element={<CourseUpdate />} />
                    <Route path='/my-courses' element={<MyCreatedCourses />} />
                </Route>

                {/* Catch All */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}