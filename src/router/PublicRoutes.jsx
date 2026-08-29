import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import LoginSuccess from '../pages/LoginSuccess';
import ProductDetail from '../pages/ProductDetail';
import Wishlist from '../pages/Wishlist';
import Policies from '../pages/Policies';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Mainlayout from '../layouts/Mainlayout';
import LoginPage from '../pages/LoginPage';
import RentalCart from '../components/RentalCart';
const PublicRoutes = () => {
  return (
    <Route
      element={ <Mainlayout /> } >
      <Route path='/' element={<Landing/>}/>
      <Route path='/login-success' element={<LoginSuccess />}/>
      <Route path='/Wishlist' element={<Wishlist />}/>
      <Route path='/rentalcart' element={<RentalCart />}/>
      <Route path='/product/:id' element={<ProductDetail />} />
      <Route path='/policies' element={<Policies />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/contact' element={<Contact />}/>
      <Route path="/login" element={<LoginPage />} />
    </Route>
  );
};

export default PublicRoutes;
