import { Ellipsis, Plus, Trash, UserRoundPlusIcon, Users } from 'lucide-react'
import React, { useState, useEffect } from 'react'

const HeaderAdmin = () => {
   const [modalAdmin, setModalAdmin] = useState(false); 
   const [admins, setAdmins] = useState([]);
   const [boxadmin, setBoxAdmin]= useState(null);
useEffect(() => {
  fetch("http://localhost:3000/api/users")
    .then(res => res.json())
    .then(data => {
      const onlyAdmins = data.filter(user => user.role === 'admin');
      setAdmins(onlyAdmins);
    });
}, []);
  return (
    <header className=' border-b border-gray-200 bg-white flex items-center justify-end pr-8 h-16'>
     <button
      onClick={() => setModalAdmin(true)}
      className='cursor-pointer bg-gray-100 flex justify-center items-center  w-10 h-10 rounded-full shadow font-semibold text-lg text-gray-600'
      >
      <UserRoundPlusIcon strokeWidth={1}/>
     </button>

     {modalAdmin && (
      <div className='fixed inset-0 z-20 flex backdrop-blur-sm justify-center items-center'>
        
        <div className='shadow-sm rounded-lg bg-white relative h-200 w-250'>
         
          <div className='bg-gray-100 flex items-center justify-between w-full h-20 p-5'
          >
          <div className='flex gap-2 items-center'>
           <div className='bg-white px-2 py-2 rounded-lg shadow'><Users color='blue'/></div>
           
           <div className='flex flex-col'>
           <h1 className='font-semibold'>Admin</h1>
           <p className='text-sm text-gray-400'>Manage your admin account</p> 
           </div>
          </div>

          <button className='flex text-sm bg-blue-800 rounded-lg text-white px-2 py-1'><Plus size={20}/>Add Admin</button>  
          </div>
          
          <button 
            onClick={() => setModalAdmin(false)}
            className='absolute cursor-pointer -right-11 -top-4 bg-red-600 text-white w-10 h-10 rounded-full'
            >
            X
        </button>
         <div className='p-2'>
         <div className=' grid grid-cols-1 gap-2  '>
          {admins.map((admin) => (
            <div
            key={admin.id}
            className='bg-gray-50 shadow p-2 rounded-lg'
            >
             <div className='flex items-center gap-2 '>
             <div className='flex items-center w-full gap-2'>
             {/* profile */}
             <div className='p-2'>
              {admin.picture ? (
              <img
                className=' w-12 h-12 rounded-full' 
                src={admin.picture} 
                alt="" 
              />
              ):(
            <div className="w-12 h-12 bg-gray-400 text-white flex items-center justify-center rounded-full">
               {admin?.name.split(" ").map(n => n[0]).join("")}
            </div>
              
             )}
             </div>
          
             {/* Admin details */}
             <div>
             <p className='font-semibold'>{admin.name}</p>
             <p className='text-gray-400'>{admin.email}</p>
             </div>
             </div>
             
             <div className='w-full relative flex items-center justify-between'>
              <p className='border border-dashed border-green-900 text-sm text-green-900 px-2 py-1 rounded-lg'>{admin.role}</p>
            <button
              onClick={() => setBoxAdmin(admin.id)}
              className='cursor-pointer'
              >
              <Ellipsis/>
            </button>
             {boxadmin === admin.id && (
              <div className=' flex flex-col gap-1 absolute z-10 rounded-lg right-0 top-6 w-36 h-20 shadow bg-white p-2'>
              <button className='bg-gray-50 shadow py-1 rounded-lg text-sm'>Delete</button>
              <button className='bg-gray-50 shadow py-1 rounded-lg text-sm'>Block</button>
              </div>
             )}
              </div>
             </div> 
            </div>
          ))}
         </div>
       </div>

        </div>
      </div>  
     )}
    </header>
  )
}

export default HeaderAdmin