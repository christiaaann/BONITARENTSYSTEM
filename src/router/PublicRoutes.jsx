import React from 'react';
import { Route, Outlet } from 'react-router-dom';
import Landing from '../pages/Landing';
import LoginSuccess from '../pages/LoginSuccess';
import ProductDetail from '../pages/ProductDetail';
import Wishlist from '../pages/Wishlist';
import Policies from '../pages/Policies';
import About from '../pages/About';
import UserHeader from '../components/layout/UserHeader'; 
import Footer from '../components/layout/Footer'; 
import Contact from '../pages/Contact';
const PublicRoutes = () => {
  return (
    /* Parent Route*/
    <Route
      element={
        <>
          <UserHeader/>
          
        
          <main className="min-h-screen pt-20">
            {/* Ang <Outlet /> ang magpapakita kung anong page ang active (e.g., Landing, Wishlist) */}
            <Outlet />
          </main>
          
          <Footer />
        </>
      }
    >
      {/* Dito sa loob nakalatag ang mga active pages mo */}
      <Route path='/' element={<Landing/>}/>
      <Route path='/login-success' element={<LoginSuccess />}/>
      <Route path='/Wishlist' element={<Wishlist />}/>
      <Route path='/product/:id' element={<ProductDetail />} />
      <Route path='/policies' element={<Policies />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/contact' element={<Contact />}/>
    </Route>
  );
};

export default PublicRoutes;