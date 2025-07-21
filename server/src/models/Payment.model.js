import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        paidBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Student
            required: true,
        },
        paidTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Teacher
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },

        paymentId: String,  // fron razorPay
        orderId: String,    // from razorPay
        receipt: String,    // your internal receipt ID.

        /*
            receipt is an internal identifier (not Razorpay's ID) used for: (use nanoid)
                - Linking the payment to a course/user.
                - Referencing the transaction in UI or support queries    
                - Generating invoices
        */

        status: {
            type: String,
            enum: ['success', 'failed'],

        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
)

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;