import { generateToken } from "../utils/generateToken.js";
import { createCourseSchema } from "../schemas/course.schema.js";
import Course from "../models/Course.model.js";
// Public routes controllers anyone can access.
export const getAllCourses = async (req, res) => {

}

export const getCourseById = () => {

}

// Teacher Course Routes Controllers Only Teacher Can Access.
export const createCourse = async (req, res) => {
    const result = createCourseSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Validation Failed" })
    }
    const { name, duration, description, category } = result.data;
    try {
        let course = await Course.findOne({
            name: name,
            createdBy: req.user.userId
        })
        if (course) {
            return res.status(400).json({ message: "You already created a course with this name." });
        }
        course = new Course({
            name, duration, description, category,
            thumbnail: req.body.thumbnail || "",
            createdBy: req.user.userId
        })

        await course.save();
        return res.status(201).json({
            message: "Course Created.",
            courseId: course._id,
            name: course.name
        })
    } catch (error) {
        console.error("All Course Error", error.message);
        res.status(500).json({
            message: "Server Error",
            error: error
        })
    }
}

export const getCreatedCourses = async(req, res) => {
    try{
        const courses = await Course.find({ createdBy: req.user.userId });
        
        if(courses.length === 0){
            return res.status(404).json({
                message: "No course found for this user."
            })
        }
        return res.status(200).json({
            message: "Courses Fetched",
            count: courses.length,
            courses
        })
    }catch(error){
        console.error("get MyCourses Error", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export const updateCourse = () => {

}

// Student Course Routes Controllers Only Student Can Access.
export const enrollInCourse = () => {

}

export const getEnrolledCourses = () => {

}

export const getEnrolledCourseDetails = () => {

}