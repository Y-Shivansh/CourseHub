import React, { useState } from 'react'
import BaseModal from '../../common/BaseModal'
import Button from '../../common/Button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../../common/Loader'

const LogoutPopup = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            toast.success("Logged out successfully");
            onClose();
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.success("Logged out successfully");
            navigate("/");
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <Loader />

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={"Confirm Logout"}>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col text-center mb-6 gap-2">
                    <p className="text-red-500 font-semibold">Are you sure you want to logout?</p>
                    <p className="text-text-muted">You will need to login again to access your account.</p>
                </div>

                <div className="flex justify-around w-full">
                    <Button
                        className="w-1/3 bg-text-muted hover:bg-gray-600"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-1/3 bg-red-500 hover:bg-red-600"
                        onClick={handleLogout}
                        disabled={loading}
                    >
                        {loading ? "Logging out..." : "Logout"}
                    </Button>
                </div>
            </div>
        </BaseModal>
    )
}

export default LogoutPopup
