import User from "../models/user.model.js";
import Course from "../models/Course.model.js";

export const enrollUserToCourse = async (userId, courseId) => {
    try {
        // updating course enrollment
        let course = await Course.findOneAndUpdate(
            { _id: courseId },
            // $set is used to replace the entire value at a path.
            // $addToSet ensures no duplicates
            // $push blindly adds
            { $addToSet: { enrolledStudents: userId } },
            { new: true }
        );
        if (!course) {
            throw new Error("Course not found or enrollment failed.");
        }

        // Updating User(student) DB, field -> Enrolled Courses 
        let user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { enrolledIn: courseId } },
            { new: true },
        );
        if (!user) {
            throw new Error("User not found or enrollment failed.");
        }

        return {
            message: "Enrolled successfully.",
            courseId,
            studentId: userId
        };
    } catch (error) {
        console.error("Error enrolling user to course:", error);
        throw error; 
    }
}