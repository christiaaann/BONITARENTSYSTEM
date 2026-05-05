import React from 'react'
import { Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import LoginSuccess from '../pages/LoginSuccess';
const PublicRoutes = () => {
  return (
    <>
    <Route path='/' element={<Landing/>}/>
    <Route path='/login-success'element={<LoginSuccess />}/>
    </>
  )
}

export default PublicRoutes