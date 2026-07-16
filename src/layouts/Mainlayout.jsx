import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';
import HeroSection from '../components/sections/HeroSection';
const Mainlayout = () => {
  return (
    <>
    <UserHeader />

    <main className=' min-h-screen py-20'>
        {/* <HeroSection />  */}
        <Outlet />
    </main>

    <Footer />
    </>
  )
}

export default Mainlayout