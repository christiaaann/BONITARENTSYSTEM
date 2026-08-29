import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';
import HeroSection from '../components/sections/HeroSection';
import GoogleAuthModal from '../components/GoogleAuthModal';
import CtaBanner from '../components/CtaBanner';
const Mainlayout = () => {
  const location = useLocation();
  const isShopHome = location.pathname === '/';

  return (
    <>
    <UserHeader />
    {isShopHome && <HeroSection />}
    <main className={`max-w-7xl mx-auto ${isShopHome ? '' : 'mt-24'}`}>
        <Outlet />
    </main>
    {/* <div className='max-w-7xl mx-auto px-4 w-full'>
   <CtaBanner />  
    </div> */}
    
    <div className='mt-4'>
        <Footer />  
    </div>


    <GoogleAuthModal />
    </>
  )
}

export default Mainlayout
