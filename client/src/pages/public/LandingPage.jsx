import React from 'react'
import PublicNavbar from "../../components/Navbar/PublicNavbar";
import Footer from "../../components/common/Footer";
import Hero from '../../components/Landing/Hero';

const LandingPage = () => {
  return (
    <>
      <PublicNavbar />
          <Hero/>
      <Footer />
    </>
  )
}

export default LandingPage
