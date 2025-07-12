import express from 'express';
import verifyUserToken from '../middlewares/user.middleware.js';
import {
    getAllCourses, getCourseById,
    createCourse, getCreatedCourses, updateCourse, 
    enrollInCourse, getEnrolledCourses, getEnrolledCourseDetails
} from "../controllers/courseControllers.js";
import {authorizeRoles} from "../middlewares/authorizeRoles.js"

const router = express.Router();

// Only teacher can access. 
router.use(verifyUserToken)
router.post("/create", authorizeRoles('teacher'), createCourse, );
router.get("/my-courses", authorizeRoles('teacher'), getCreatedCourses, );
router.put("/update/:id", authorizeRoles('teacher'), updateCourse, );

// Only student can access.
router.post("/enroll/:id", authorizeRoles('student'), enrollInCourse);
router.get("/enrolled", authorizeRoles('student'), getEnrolledCourses);
router.get("/enrolled/:id", authorizeRoles('student'), getEnrolledCourseDetails);

// Public routes anyone can access.
router.get("/all", getAllCourses);
router.get("/:id", getCourseById);
export default router;