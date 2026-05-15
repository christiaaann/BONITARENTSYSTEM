import React, { useState } from 'react'
import { ArchiveRestore, Ellipsis, Trash2 } from 'lucide-react';
import { useUsers } from '../context/UserContext'
const Trash = () => {
    const {trashUsers, 
           fetchTrashUsers, 
           restoreUser,
           permanentDeleteUser 
           } = useUsers();

    const [modal, setModal] = useState(false);
  return (
    <>
   <div className='p-2 grid grid-cols-3 gap-2'>
      {trashUsers.map((user) => (
     <div key={user.id} className=" bg-white relative flex items-center shadow p-2 rounded-lg mb-2">
   
     <div className='p-2'>
        {user.picture ? (
         <img
          className=' w-12 h-12 rounded-full' 
          referrerpolicy="no-referrer"
          src={user.picture} 
          alt="" 
        />
        ):(
    <div className="w-12 h-12 bg-gray-400 text-white flex items-center justify-center rounded-full">
        {user?.name.split(" ").map(n => n[0]).join("")}
    </div>       
    )}
   </div>  
    <div>
    <p className='font-semibold'>{user.name}</p>
    <p className='text-gray-400'>{user.email}</p>
    <p className='text-gray-400 border w-12 bg-blue-400/10 text-sm rounded-lg flex justify-center border-dashed'>{user.role}</p>
   </div>
    
    <button
     className=' absolute right-3 top-1 cursor-pointer'
     onClick={() =>setModal(prev => (prev === user.id ? null : user.id))}
     ><Ellipsis strokeWidth={1}/>
   </button>

   {modal === user.id && (
   <div className=' absolute flex flex-col right-10 top-6 z-10 gap-1 bg-white p-2 shadow rounded-lg w-40 h-26'>
    <button 
      className='flex items-center py-2 bg-gray-50 shadow px-2 gap-1 rounded-lg'
      onClick={() => restoreUser(user.id)}    
    >
    <ArchiveRestore strokeWidth={1}/>
    restore
  </button>
    
    <button 
      className='flex items-center  bg-gray-50 shadow px-2 py-2 gap-1 rounded-lg'
      onClick={() => permanentDeleteUser(user.id)}
     > 
     <Trash2 color='red' strokeWidth={1}/>
     Permanent
  </button>
   </div>
   )}
  </div>

))}
</div> 
    </>
  )
}

export default Trash