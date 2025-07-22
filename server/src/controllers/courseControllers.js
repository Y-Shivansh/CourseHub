import { generateToken } from "../utils/generateToken.js";
import { createCourseSchema, updateCourseSchema } from "../schemas/course.schema.js";
import Course from "../models/Course.model.js";
import User from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs'


// Public routes controllers anyone can access.
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .select('_id name duration category thumbnail createdBy price')
            .populate('createdBy', 'name'); // creastedBy me ab name bhi ayega

        if (!courses || courses.lentgh === 0) {
            return res.status(400).json({ message: "No course is uploaded as of now." });
        }
        return res.status(200).json({
            message: "All Courses Fetched",
            count: courses.length,
            courses
        })
    } catch (error) {
        console.error("All Courses Error", error.message);
        res.status(500).json({
            message: "Server Error",
            error: error.message || error
        })
    }
}

export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId)
            .populate('createdBy', 'name bio profile') // populate only safe fields
            .select('-enrolledStudents'); // exclude enrolledStudents from response

        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        return res.status(200).json({
            message: "Course fetched successfully",
            course,
        });

    } catch (error) {
        console.error("Get Course By ID Error:", error.message);
        return res.status(500).json({
            message: "Server error",
            error: error.message || error
        });
    }
};


export const getOtherCoursesByTeacher = async (req, res) => {
    try {
        const courses = await Course.find({ createdBy: req.params.id }).select("name thumbnail category");
        res.status(200).json({ courses });
    } catch (error) {
        console.error("Failed to fetch teacher courses", error);
        res.status(500).json({ message: "Failed to fetch teacher courses" });
    }
}

// Teacher Course Routes Controllers Only Teacher Can Access.
export const createCourse = async (req, res) => {
    const result = createCourseSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Validation Failed" })
    }
    const { name, duration, description, category, price } = result.data;
    const userId = req.user.userId;
    try {
        // Add Course
        let course = await Course.findOne({
            name: name,
            createdBy: userId,
        })
        if (course) {
            return res.status(400).json({ message: "You already created a course with this name." });
        }

        course = new Course({
            name, duration, description, category, price,
            thumbnail: "",
            createdBy: userId
        })
        if (req.file) {
            const localFilePath = req.file.path;
            const cloudinaryRes = await uploadOnCloudinary(localFilePath);

            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
            }

            if (!cloudinaryRes) {
                return res.status(500).json({ message: "Cloudinary upload failed" });
            }
            course.thumbnail = cloudinaryRes.secure_url;
        }

        // Update User Also. (Created Courses)
        let user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { courseCreated: course._id } },
            { new: true }
        );
        if (!user) {
            await Course.findByIdAndDelete(course._id);
            console.error("Create Course Error - User Not Found.")
            return res.status(404).json({
                message: "Creation Failed, User Not Found"
            })
        }

        await course.save();

        return res.status(201).json({
            message: "Course Created.",
            courseId: course._id,
            name: course.name
        })
    } catch (error) {
        console.error("Create Course Error", error.message);
        res.status(500).json({
            message: "Server Error",
            error: error.message || error
        })
    }
}

export const getCreatedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ createdBy: req.user.userId })
            .populate('createdBy', 'name')
            .populate("enrolledStudents", "name email");

        if (courses.length === 0) {
            return res.status(404).json({
                message: "No course found for this user."
            })
        }
        return res.status(200).json({
            message: "My Courses Fetched",
            count: courses.length,
            courses
        })
    } catch (error) {
        console.error("My Courses Error", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message || error
        })
    }
}

export const updateCourse = async (req, res) => {
    const result = updateCourseSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Validation Failed." })
    }
    const { name, duration, description, thumbnail, category } = result.data;
    try {
        const courseId = req.params.id;
        const existing = await Course.findOne({
            name: name,
            createdBy: req.user.userId,
            _id: { $ne: courseId } // course id not equal to ocurreect course id.
        });
        if (existing) {
            console.error("You already have a course with this name.");
            return res.status(400).json({ message: "Course with this name already exists." })
        }

        // If no duplicate name problem, allow update
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        course.name = name?.trim() || course.name;
        course.duration = duration?.trim() || course.duration;
        course.description = description?.trim() || course.description;
        course.category = category?.trim() || course.category;

        if (req.file) {
            const localFilePath = req.file.path;
            const cloudinaryRes = await uploadOnCloudinary(localFilePath);

            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
            }

            if (!cloudinaryRes) {
                return res.status(500).json({ message: "Cloudinary upload failed" });
            }
            course.thumbnail = cloudinaryRes.secure_url;
        }

        await course.save();

        return res.status(200).json({
            message: "Course Details Updated.",
            course: {
                name, duration, description, thumbnail, category
            }
        })
    } catch (error) {
        console.error("Updating Course Error.", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message || error
        });
    }
}

export const getUnEnrolledCourses = async (req, res) => {
    const userId = req.user.userId;
    try {

        const user = await User.findById(userId).select("enrolledIn");
        const allCourses = await Course.find().populate('createdBy', 'name');

        // Ids of enrolled
        const enrolledIds = user.enrolledIn.map(id => id.toString());

        // Filtering enrolled
        const unEnrolledCourses = allCourses.filter(
            course => !enrolledIds.includes(course._id.toString())
        )
        return res.status(200).json({ courses: unEnrolledCourses });
    } catch (error) {
        console.error("Failed to get unenrolled courses", error);
        return res.status(500).json({ message: "Server error arha hai" });
    }
}


export const getEnrolledCourses = async (req, res) => {
    const userId = req.user.userId;
    try {
        const courses = await Course.find({ enrolledStudents: userId })
            .select("name description duration thumbnail category")
            .populate('createdBy', 'name');
        if (!courses || courses.length === 0) {
            console.error("No Courses Found.");
            return res.status(404).json({
                success: false,
                message: "No Course Found."
            })
        }
        return res.status(200).json({
            success: true,
            message: "Courses Fetched.",
            count: courses.length,
            courses
        })
    } catch (error) {
        console.error("Fetch Enrolled Courses Error");
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getEnrolledCourseDetails = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;

    try {
        const course = await Course.findOne({
            _id: id,
            enrolledStudents: userId,
        })
            .select("-enrolledStudents")
            .populate("createdBy", "name");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found or you're not enrolled.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course details fetched.",
            course,
        });

    } catch (error) {
        console.error("getEnrolledCourseDetails Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching course details.",
        });
    }
};
