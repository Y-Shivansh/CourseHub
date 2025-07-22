import HeroImage from "../../assets/hero.svg"

import { useLocation } from 'react-router-dom'
import LoginForm from "../auth/LoginForm"
import SignupForm from "../auth/SignupForm"
import { motion } from "framer-motion"




const Hero = () => {
    const location = useLocation();
    const isSignup = location.pathname === "/signup"

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <section className='flex flex-col md:flex-row justify-between items-center gap-8 px-4 sm:px-8 md:px-16 py-8 sm:py-12 max-w-6xl mx-auto w-full'>

                {/* Left Side */}
                <div className="flex flex-col items-center md:items-start justify-center mb-8 md:mb-0 w-full md:w-1/2">
                    <img src={HeroImage} alt="hero" className="w-40 sm:w-64 md:w-full max-w-md mx-auto mb-4" />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-light to-green-400 bg-clip-text text-transparent text-center md:text-left">
                        Learn Smarter. Grow Faster.
                    </h1>
                    <p className="text-text-muted text-center md:text-left mt-2 text-sm sm:text-base md:text-lg">
                        Discover high-quality courses curated by top educators.
                    </p>
                </div>

                {/* Right Side */}
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md flex-shrink-0">
                    {isSignup ? <SignupForm /> : <LoginForm />}
                </div>
            </section>
        </motion.div>
    )
}

export default Hero
