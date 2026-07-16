import React from 'react'
import Sidebar from '../components/Sidebar'
import HeaderAdmin from '../components/HeaderAdmin'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen'>

      {/* Sidebar fixed left */}
      <Sidebar />

      {/* Main content area */}
      <div className='flex flex-col flex-1'>

        {/* Header top */}
        <HeaderAdmin />

        {/* Page content */}
        <main className='flex-1'>
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default AdminLayout