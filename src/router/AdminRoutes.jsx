import React, { useState, useEffect } from 'react'
import { Route, Navigate } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import Users from '../admin/Users'
import Dashboard from '../admin/Dashboard'
import Inventory from '../admin/Inventory'
const AdminRoutes = () => {
   const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
    })
    useEffect(() =>{
      const root = document.documentElement;
      if (theme === 'dark'){
        root.classList.add('dark');
      }else{
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    },[theme]) 
  return (
     <Route path='/admin' element={<AdminLayout/>}>
     <Route index element={<Navigate to='dashboard'/>}/> 
     <Route path='dashboard' element={<Dashboard/>}/>   
     <Route path='users' element={<Users setTheme={setTheme}/>}/>
     <Route path='inventory' element={<Inventory/>}/>
    </Route>
  )
}

export default AdminRoutes