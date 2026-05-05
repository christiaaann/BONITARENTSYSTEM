import { UserRoundPlusIcon } from 'lucide-react'
import React, { useState } from 'react'

const HeaderAdmin = () => {
   const [modalAdmin, setModalAdmin] = useState(false); 
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
        <div className='shadow-sm rounded-lg bg-white relative h-200 w-250 p-2'>
          
          <button 
            onClick={() => setModalAdmin(false)}
            className='absolute cursor-pointer -right-11 -top-4 bg-red-600 text-white w-10 h-10 rounded-full'
            >
            X
        </button>
        </div>
      </div>  
     )}
    </header>
  )
}

export default HeaderAdmin