import HeroImage from "../../assets/hero.svg"

import { useLocation } from 'react-router-dom'
import LoginForm from "../auth/LoginForm"
import SignupForm from "../auth/SignupForm"
import { Link } from "react-router-dom"
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
            <section className='flex md:flex-row flex-col justify-between items-center gap-8 px-4 py-12 mx-32'>

                {/* Left Side */}
                <div className=" flex flex-col items-center justify-center mb-8 md:mb-0">
                    {/* <img src={HeroImage} alt="hero" className="w-full max-w-md mx-auto" /> */}

                    <img src={HeroImage} alt="hero" className="w-full max-w-md mx-auto" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-light to-green-400 bg-clip-text text-transparent">
                        Learn Smarter. Grow Faster.
                    </h1>
                    <p className="text-text-muted text-center md:text-left mt-2">
                        Discover high-quality courses curated by top educators.
                    </p>

                </div>

                {/* Right Side */}
                <div className=" max-w-md w-full">
                    {isSignup ? <SignupForm /> : <LoginForm />}
                    {/* <Link
                    to="/"
                    className="mt-1 block text-center text-primary-dark dark:text-white py-1 px-4 hover:text-primary-light dark:hover:text-text-muted transition"
                >
                    Explore Courses
                </Link> */}
                </div>
            </section>
        </motion.div>
    )
}

export default Hero
