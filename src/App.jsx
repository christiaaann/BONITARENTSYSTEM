import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AdminRoutes from './router/AdminRoutes';
import PublicRoutes from './router/PublicRoutes'; 
function App() {
  return (
   <BrowserRouter>
      <Routes>
      {PublicRoutes()}
      {AdminRoutes()}
      </Routes>
   </BrowserRouter>
  )
}

export default App
