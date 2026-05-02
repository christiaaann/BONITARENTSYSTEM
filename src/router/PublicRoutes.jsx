import React from 'react'
import { Route } from 'react-router-dom';
import Landing from '../pages/Landing';
const PublicRoutes = () => {
  return (
    <>
    <Route path='/' element={<Landing/>}/>
    </>
  )
}

export default PublicRoutes