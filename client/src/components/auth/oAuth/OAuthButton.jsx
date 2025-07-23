import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { FcGoogle } from 'react-icons/fc';

const OAuthButton = () => {
    const { loginWithRedirect } = useAuth0();

    const handleOauthLogin = () => {
        loginWithRedirect({
            authorizationParams: {
                connection: "google-oauth2",
                prompt: "select_account",
                redirect_uri: `${window.location.origin}/oauth/choose-role`
            }
        });
    };

    return (
        <button
            onClick={handleOauthLogin}
            className="w-fit m-auto text-sm flex justify-center items-center gap-2 border-2 border-gray-300  px-4 py-2 cursor-pointer font-semibold rounded-full bg-white transition"
        >
            <FcGoogle size={24} /> Continue with Google
        </button>
    );
};

export default OAuthButton;
