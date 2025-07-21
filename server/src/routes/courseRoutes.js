import express from 'express';
import verifyUserToken from '../middlewares/user.middleware.js';
import {
    getAllCourses, getCourseById, getOtherCoursesByTeacher,
    createCourse, getCreatedCourses, updateCourse, 
    getEnrolledCourses, getEnrolledCourseDetails, getUnEnrolledCourses
} from "../controllers/courseControllers.js";
import {authorizeRoles} from "../middlewares/authorizeRoles.js"
import {upload} from '../middlewares/multer.middleware.js'

const router = express.Router();


// Only teacher can access. 
router.post("/create", verifyUserToken, authorizeRoles('teacher'), upload.single('thumbnail'), createCourse, );
router.get("/my-courses", verifyUserToken, authorizeRoles('teacher'), getCreatedCourses, );
router.put("/update/:id", verifyUserToken, authorizeRoles('teacher'), upload.single('thumbnail'),updateCourse, );

// Only student can access.
router.get("/unenrolled", verifyUserToken, authorizeRoles('student'), getUnEnrolledCourses);
router.get("/enrolled", verifyUserToken, authorizeRoles('student'), getEnrolledCourses);
router.get("/enrolled/:id", verifyUserToken, authorizeRoles('student'), getEnrolledCourseDetails);

// Public routes anyone can access.
router.get("/all", getAllCourses);
router.get("/:id", getCourseById);
router.get("/teacher/:id", getOtherCoursesByTeacher);

export default router;