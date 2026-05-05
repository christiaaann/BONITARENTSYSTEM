import React, { useState } from 'react'
import { ChevronUp, House, LogOut, Motorbike, Settings, ShelvingUnit, SquareChevronLeft, UserPen, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Sidebar = () => {
   const [isCollapsed, setIsCollapsed] = useState(false);
   const [openMenu, setOpenMenu] = useState(false);
   const {user} = useAuth();
   const {logout} = useAuth(); 
   const adminLogout = () => {
   logout();
   window.location.href = "/"
   }
    // logout
  //  const logout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //  
  //  }

    const loggedIn = { firstName: 'Nicole Apolonio'};

  return (
    <>
    {/* className=' w-64 bg-white shadow-sm p-5' */}
     <aside
       className={`bg-white relative dark:bg-[#121A2B] dark:text-white/65 border border-white/5 shadow-sm transition-all duration-300 p-5 
       ${isCollapsed ? 'w-20' : 'w-64'}`
       }>
      <div className='flex justify-between'>
        {!isCollapsed && 
        <h1 className='text-2x dark:text-white font-bold'>
          BONITA INVENTORY
       </h1>}
       <div
        className='bg-gray-100 w-9 h-9 rounded-full flex items-center justify-center dark:bg-violet-400/5'>
        <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        >
        <SquareChevronLeft 
         className={` transition-all duration-300
         ${isCollapsed ? ' rotate-180' : ''}`} 
         strokeWidth={1}/></button></div>
     </div> 

      <hr className='my-2 border-gray-300' />
       <div className='flex justify-between items-center gap-2'>
        <span 
          className='bg-gray-100 dark:bg-blue-400/5 w-10 h-10 rounded-full flex items-center justify-center'>
          {user?.name.split(" ").map(n => n[0]).join("")}
        </span>
          
          {!isCollapsed && 
          <h1 className='text-nowrap'>
           {user?.name || 'Admin'}
          </h1>
          }

          {!isCollapsed && 
          <span className=' cursor-pointer' 
             onClick={() => setOpenMenu(!openMenu)}>
             <ChevronUp className={`transition-transform duration-300 ${openMenu ? 'rotate-180' : 'rotate-0'}`} 
             strokeWidth={1}/>
          </span>} 
       </div>

       <div
        className={`flex flex-col items-end overflow-hidden transition-all duration-300
        ${openMenu || isCollapsed ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
        >
        <button 
          className= {` group flex text-left px-3 py-2 hover:bg-gray-100 rounded-xl dark:hover:bg-blue-400/5 
          ${isCollapsed ? 'w-full flex items-center justify-center' : 'w-36'}`
          }>
          <div className='flex items-center justify-center'>
        
          {isCollapsed && <UserPen strokeWidth={1}/>}
        
          {!isCollapsed && <span>MyAccount</span>} 
          
          {isCollapsed && 
            <span className=' group-hover:block px-2 py-2 rounded-bl-xl hidden text-gray-400 shadow-sm absolute left-16 bg-white dark:bg-blue-400/5 backdrop-blur-sm z-10'
            >
            MyAccount
            </span>
            }
        </div>
        </button>
        
        <button 
           className={`flex group text-left px-3 py-2 hover:bg-gray-100 rounded-xl dark:hover:bg-blue-400/5 
           ${isCollapsed ? 'w-full flex items-center justify-center' : 'w-36'}`}
           >
          <div className=' '>
            {isCollapsed && <Settings strokeWidth={1}/>
            } 
            
            {!isCollapsed &&
             <span>Settings</span>
             } 
            {isCollapsed && 
             <span 
              className=' absolute top-40 left-16 group-hover:block dark:bg-blue-400/10 backdrop-blur-sm hidden text-gray-400 bg-white shadow-sm px-2 py-2 z-10 rounded-bl-xl'
              >
              Settings
              </span>
            }
         </div>

        </button>
        <button 
          onClick={adminLogout}
          className={`flex group text-left px-3 py-2 hover:bg-gray-100 rounded-xl dark:hover:bg-blue-400/5 
          ${isCollapsed ? 'w-full flex items-center justify-center' : 'w-36'}`
          }>
          <div>
            {isCollapsed && 
             <LogOut strokeWidth={1}/>
             } 
             {!isCollapsed && 
               <span>Logout</span>
             }
         </div>
        </button>
        </div>
       <hr className='my-2 border-gray-300' /> 

       <div className='flex justify-between flex-col'>
        <NavLink 
          to='dashboard' 
          className='w-full text-left flex gap-3 hover:bg-gray-100 rounded-xl dark:hover:bg-blue-400/5 py-2 px-2'
          >
          <House strokeWidth={1}/>
          {!isCollapsed && 
         <span>Overview</span>
          }
      </NavLink>

        <NavLink 
          to='users' 
          className='w-full text-left flex gap-3 hover:bg-gray-100 rounded-xl dark:hover:bg-blue-400/5 py-2 px-2'
          >
          <UserRound strokeWidth={1}/>
          {!isCollapsed && 
          <span>Users</span>
          }
       </NavLink>
      
      <NavLink 
          to='inventory' 
          className='w-full text-left flex gap-3 hover:bg-gray-100 rounded-xl dark:hover:bg-blue-400/5 py-2 px-2'
          >
          <ShelvingUnit strokeWidth={1}/>
          {!isCollapsed && 
          <span>Inventory</span>
          }
      </NavLink>
       
      </div> 
     </aside>
    </>
  )
}

export default Sidebar