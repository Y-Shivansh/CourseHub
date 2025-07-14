import HeroImage from "../../assets/hero.svg"

import { useLocation } from 'react-router-dom'
import LoginForm from "../auth/LoginForm"
import SignupForm from "../auth/SignupForm"


const Hero = () => {
    const location = useLocation();
    const isSignup = location.pathname === "/signup"

    return (
        <section className='flex md:flex-row flex-col justify-between items-center gap-8 px-4 py-12 mx-32'>

            {/* Left Side */}
            <div className=" flex flex-col items-center justify-center mb-8 md:mb-0">
                <img src={HeroImage} alt="hero" className="w-full max-w-md mx-auto" />
                <h1 className="text-3xl font-bold mt-6 text-center md:text-left text-primary-light">
                    Learn Smarter. Grow Faster.
                </h1>
                <p className="text-text-muted text-center md:text-left mt-2">
                    Discover high-quality courses curated by top educators.
                </p>
            </div>

            {/* Right Side */}
            <div className=" max-w-md w-full">
                {isSignup ? <SignupForm /> : <LoginForm />}
            </div>
        </section>
    )
}

export default Hero
