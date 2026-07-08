import React from 'react'

const ApparelToolbar = () => {
  return (
     <>
     <div className='bg-white flex justify-center mt-2 rounded'>
      <input className=' outline-none shadow rounded-full py-2 bg-gray-100 px-6' 
         type="text" 
         placeholder='Search Product' />
     </div>
     </>
  )
}

export default ApparelToolbar