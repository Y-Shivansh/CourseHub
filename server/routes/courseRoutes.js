import express from 'express';
import verifyUserToken from '../middlewares/user.middleware';
import {
    getAllCourses, getCourseById,
    createCourse, getCreatedCourses, updateCourse, 
    enrollInCourse, getEnrolledCourses, getEnrolledCourseDetails
} from "../controllers/courseControllers"


const router = express.Router();

// Public routes anyone can access.
router.get("/all", getAllCourses);
router.get("/:id", getCourseById);

// Only teacher can access. 
router.use(verifyUserToken)
router.post("/create", createCourse);
router.get("/my-courses", getCreatedCourses);
router.post("/update:id", updateCourse);

// Only student can access.
router.post("/enroll:id", enrollInCourse);
router.get("/my-courses", getEnrolledCourses);
router.get("/my-course:id", getEnrolledCourseDetails);

export default router;