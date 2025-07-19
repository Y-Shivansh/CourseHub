import { useState } from "react"
import { toast } from "react-toastify";
import BaseModal from "../../common/BaseModal";
import Button from "../../common/Button";
import { privateApi } from "../../../services/axios.config";
import { useNavigate } from "react-router-dom";

const EnrollPopup = ({ isOpen, onClose, courseId }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEnroll = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await privateApi.post(`/course/enroll/${courseId}`)

            // Update localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                user.enrolledIn = user.enrolledIn || [];
                if (!user.enrolledIn.includes(courseId)) {
                    user.enrolledIn.push(courseId);
                }
                localStorage.setItem('user', JSON.stringify(user));
            }
            toast.success("Enrolled Successfully")
            onClose();
            navigate(`/my-enrolled-courses/${courseId}`, {replace:true});
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Can not enroll, something went wrong.";
            toast.error(errorMsg);
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={"Confirm Enroll"}>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col text-center mb-6 gap-2">
                    <p className="text-primary-light font-semibold">Are you sure you want to enroll in this course?</p>
                    <p className="text-text-muted">Once enrolled, you'll have access to all course materials and can start learning immediately.</p>
                </div>
                <div className="flex justify-around w-full">
                    <Button 
                        className="w-1/3 bg-text-muted" 
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="w-1/3" 
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