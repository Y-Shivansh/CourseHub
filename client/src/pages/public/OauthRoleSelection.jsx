import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { publicApi } from "../../services/axios.config";
import BlobBackground from "../../components/design/BlobBackground";
import { getUserRoleFromToken } from "../../utils/getUserRoleFromToken";
import Loader from "../../components/common/Loader";

const OauthRoleSelection = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const { isAuthenticated, user, isLoading } = useAuth0();
    const [isNewUser, setIsNewUser] = useState(false);
    const navigate = useNavigate();

    // Attemot auto login if user exists.
    useEffect(() => {
        const autoLoginForExistingUser = async () => {
            if (isLoading || !isAuthenticated || !user) return; 
            // Don't run anything below this line until Auth0 is done loading AND the user is logged in AND we have the user details.

            try {
                const res = await publicApi.post("/user/oauth-login", {
                    name: user.name,
                    email: user.email,
                    profile: user.picture,
                    authId: user.sub,
                });

                localStorage.setItem("authToken", res.data.token);
                const role = getUserRoleFromToken();
                console.log(role);
                

                navigate(role === "student" ? "/dashboard-student" : "/dashboard-teacher");
                toast.success("Welcome back!");

            } catch (error) {
                console.warn("New User", error.message);
                setIsNewUser(true);
            }
        }
        autoLoginForExistingUser();
    }, [isLoading, isAuthenticated, user, navigate]);

    
    const handleSubmit = async () => {
        if (!selectedRole) return toast.error("Please select a role", { toastId: "Selection Error" });
        try {
            const res = await publicApi.post("/user/oauth-login", {
                name: user.name,
                email: user.email,
                profile: user.picture,
                authId: user.sub,
                role: selectedRole,
            });

            localStorage.setItem("authToken", res.data.token);
            toast.success("Login successful");

            navigate(
                selectedRole === 'student' ? '/dashboard-student' : '/dashboard-teacher'
            )

        } catch (error) {
            console.error(error);
            toast.error("OAuth login failed");
        }
    }

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/');
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) return <Loader />

    return (
        isNewUser && (
            <div className="relative min-h-screen flex justify-center items-center px-4 sm:px-6">
                <BlobBackground />

                <div className="bg-white flex flex-col gap-8 items-center w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-10 rounded-xl border-2 border-gray-300 shadow-lg">

                    <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
                        Select Your Role
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full justify-center">
                        <button
                            onClick={() => setSelectedRole("teacher")}
                            className={`w-full sm:w-auto px-10 py-3 rounded-lg shadow font-semibold transition
                                ${selectedRole === "teacher"
                                    ? "bg-primary-dark text-white border-2 border-primary-dark"
                                    : "bg-white text-gray-800 border-2 border-gray-300 hover:bg-gray-100"}`}
                        >
                            Teacher
                        </button>
                        <button
                            onClick={() => setSelectedRole("student")}
                            className={`w-full sm:w-auto px-10 py-3 rounded-lg shadow font-semibold transition
                                ${selectedRole === "student"
                                    ? "bg-primary-dark text-white border-2 border-primary-dark"
                                    : "bg-white text-gray-800 border-2 border-gray-300 hover:bg-gray-100"}`}
                        >
                            Student
                        </button>

                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full sm:w-auto px-6 py-3 bg-secondary-dark text-white font-semibold rounded-lg shadow hover:bg-black cursor-pointer transition"
                    >
                        Continue
                    </button>

                </div>
            </div>
        )
    )
}
export default OauthRoleSelection