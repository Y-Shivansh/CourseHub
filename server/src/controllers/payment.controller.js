import { razorpayInstance } from "../utils/razorpay.js"
import crypto from 'crypto' // to verify razorpay signature
import { nanoid } from "nanoid"

// Models
import Payment from "../models/Payment.model.js"
import Course from "../models/Course.model.js"
import User from "../models/User.model.js"

// Controller which actually enrolls student to a course.
import { enrollUserToCourse } from "../services/enrollUserToCourse.js"


/*
POST /api/v1/payment/create-order
    ➤ Creates a razorpay order for given course.
*/
export const createOrder = async (req, res) => {
    try {
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const amount = course.price * 100; // ₹ -> paisa
        const receiptId = `receipt_${nanoid(10)}`;

        // Creating Razorpay order config
        const options = {
            amount: amount,
            currency: "INR",
            receipt: receiptId
        }

        // create order using the options
        const order = await razorpayInstance.orders.create(options);
        console.log(order);
        
        //send order details to frontend.
        res.status(200).json({
            success: true,
            order,
            receipt: receiptId,
            courseName: course.name,
            amount: options.amount,
            currency: options.currency,
            paidTo: course.createdBy,
        })

    } catch (error) {
        console.error("Error in createOrderController:", error);
        res.status(500).json({ success: false, message: "Something went wrong while creating order" });
    }
}

/*
POST /api/v1/payment/verify
    ➤ Called after successful Razorpay payment on frontend
    ➤ Verifies the payment signature
    ➤ Saves the payment info in DB
    ➤ Enrolls the student into the course
*/

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            courseId,
            receipt,
            amount,
            paidTo
        } = req.body;

        const userId = req.user.userId

        // regenerate expected signature.
        /*
            When the user completes payment, Razorpay sends you (see req.body)
             - How do you know this signature wasn’t faked by someone on the frontend?
             - You rebuild the signature on your backend using HMAC + Razorpay Secret,
               and compare it with the signature Razorpay gave you.
        */

               // HMAC = Hash-based Message Authentication Code checks if Data is tamper-free & Data genuine sender se aaya hai, 
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`) // Add this string to the HMAC hash output
            .digest("hex"); // Final hashed output and in format of hex


        // Compare Razorpay signature with ours
        const isValid = expectedSignature === razorpay_signature;
        if (!isValid) {
            console.warn("Signature mismatch:", {
                expectedSignature,
                razorpay_signature
            });
            return res.status(400).json({
                success: false,
                message: "Invalid razorpay signature. Payment failed"
            });
        }

        // Enroll user to course if valid
        await enrollUserToCourse(userId, courseId);

        // Store payment details
        const payment = await Payment.create({
            course: courseId,
            paidBy: userId,
            paidTo: paidTo,
            amount,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            receipt,
            status: "success",
        })

        return res.status(200).json({
            success: true,
            message: "Payment verified and user enrolled successfully.",
            paymentId: payment._id,
            courseId: courseId
        });

    } catch (error) {
        console.error("Error in verifyPaymentController:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during payment verification.",
            error: error.message || error
        });
    }
}