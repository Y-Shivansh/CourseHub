import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Public
import LandingPage from "../pages/public/LandingPage";
import CourseDetails from "../pages/public/CourseDetails";
import AllCourses from "../pages/public/AllCourses";

// Protected Pages (Dashboard)
import Dashboard from "../pages/dashboard/Dashboard";
import UpdateField from "../pages/dashboard/UpdateField";

// Teacher Pages
import MyCreatedCourses from "../pages/dashboard/teacher/MyCreatedCourses";
import CreateCourse from "../pages/dashboard/teacher/CreateCourse";
import CourseUpdate from "../pages/dashboard/teacher/CourseUpdate";

// Student Pages
import MyEnrolledCourses from "../pages/dashboard/student/MyEnrolledCourses";
import EnrollCourse from "../pages/dashboard/student/EnrollCourse";
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
                <Route path='/courses' element={<AllCourses />} />
                <Route path='/course/:id' element={<CourseDetails />} />

                {/* Protected Routes */}
                <Route element={<ProtectedLayout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/update' element={<UpdateField />} />

                    {/* Students */}
                    <Route path='/courses/:id/enroll' element={<EnrollCourse />} />
                    <Route path='/my-enrolled-courses/:id' element={<EnrolledCourse />} />
                    <Route path='/my-enrolled-courses' element={<MyEnrolledCourses />} />

                    {/* Teacher */}
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