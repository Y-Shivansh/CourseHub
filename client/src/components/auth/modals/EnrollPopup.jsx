import { useState } from "react"
import { toast } from "react-toastify";
import BaseModal from "../../common/BaseModal";
import Button from "../../common/Button";
import { privateApi } from "../../../services/axios.config";
import { useNavigate } from "react-router-dom";

const EnrollPopup = ({ isOpen, onClose, courseId }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleEnroll = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // create order
            const orderRes = await privateApi.post("/payment/create-order", {
                courseId: courseId
            })

            const { order, receipt, courseName, amount, currency, paidTo } = orderRes.data

            if (!order || !order.id) {
                toast.error("Failed to create Razorpay order.");
                setLoading(false);
                return;
            }

            // open razorpay checkout
            const razorpay = new window.Razorpay({
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount,
                currency,
                name: "CourseHub",
                description: `Enroll in ${courseName}`,
                order_id: order.id,
                handler: async (response) => { // response is automatically provided by Razorpay after a successful payment from the checkout popup
                    // On successful payment
                    try {
                        await privateApi.post("/payment/verify-payment", {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            courseId,
                            receipt,
                            amount,
                            paidTo
                        })

                        // updating local storage

                        if (user) {
                            user.enrolledIn = user.enrolledIn || [];
                            if (!user.enrolledIn.includes(courseId)) {
                                user.enrolledIn.push(courseId);
                            }
                            localStorage.setItem('user', JSON.stringify(user));
                        }
                        onClose();
                        toast.success("Payment successful! Redirecting...");
                        setTimeout(() => {
                            navigate("/dashboard-student", { replace: true });
                        }, 1200);
                    } catch (verifyErr) {
                        console.error("Payment verification failed:", verifyErr);
                        toast.error("Payment verification failed.");
                    }
                },
                prefill: {
                    name: user?.name || "Student",
                    email: user?.email || "student@email.com"
                },
                theme: {
                    color: "#1e2531"
                },
            })
            razorpay.open();
            /* .open() is a method provided by Razorpay Checkout JS SDK that:
                - Opens the Razorpay payment popup
                - shows UI to the user to pay using UPI, card, netbanking, etc.
                - after successful payment, it automatically triggers the handler function you defined.
            */
        } catch (error) {
            console.error("Error during enrollment/payment:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <BaseModal position={'center'} isOpen={isOpen} onClose={onClose} title={"Confirm Enroll"}>
            <div className="flex flex-col items-center justify-center px-2 sm:px-0">
                <div className="flex flex-col text-center mb-4 sm:mb-6 gap-1 sm:gap-2">
                    <p className="text-primary-light font-semibold text-sm sm:text-base">Are you sure you want to enroll in this course?</p>
                    <p className="text-text-muted text-xs sm:text-sm">Once enrolled, you'll have access to all course materials and can start learning immediately.</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-around w-full gap-2 sm:gap-0">
                    <Button
                        className="w-full sm:w-1/3 bg-text-muted"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-full sm:w-1/3"
                        onClick={handleEnroll}
                        disabled={loading}
                    >
                        {loading ? "Enrolling..." : "Enroll"}
                    </Button>
                </div>
            </div>
        </BaseModal>
    )
}

export default EnrollPopup