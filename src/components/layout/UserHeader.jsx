import React, {useState, useEffect} from 'react'
import { motion } from "framer-motion";
import { ChevronDown, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
const UserHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [profilemodal, setprofileModal] = useState(false); 
 
  const {user, logout, showLogoutConfirm, setLogoutConfirm,  loading} = useAuth();
  const handleLogout = () => {
  setprofileModal(false);
  logout();
  window.location.href = "/";
};

  
  // logout
//   const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   setprofileModal(false);
//   setUser(null);
//   window.location.href = "/";
// }; 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <header className={`fixed top-0 p-3 w-full z-50 flex items-center justify-between  transition-all duration-300 ${
  scrolled ? " bg-amber-900/20 backdrop-blur-sm text-white" : "bg-transparent text-white/50"
}`}>
  
  {/* LEFT (LOGO) */}
  <h1 className=' font-serif text-2xl'>BONITA</h1>

  {/* CENTER NAV */}
  <nav className='flex gap-8 font-serif'>
  <motion.a
    whileHover={{ scale: 1.1, color: "#fff" }}
    whileTap={{ scale: 0.95 }}
    href="#home"
  >
    Home
  </motion.a>
  <motion.a
  whileHover={{ scale: 1.1, color: "#fff" }}
  whileTap={{ scale: 0.95 }}
  href="#shop"
>
  Shop
</motion.a>
 
 <motion.a
  whileHover={{ scale: 1.1, color: "#fff" }}
  whileTap={{ scale: 0.95 }}
  href="#"
>
  Policies
</motion.a>
  </nav>


{user && user.email && user.address && user.contact ? (
  <div className='flex gap-2 items-center relative'>
    <img 
      className='w-9 h-9 rounded-full' 
      src={user?.picture} 
      referrerPolicy="no-referrer" 
      alt="" 
    />

    <button
      onClick={() => setprofileModal(prev => !prev)}
      className='cursor-pointer'
    >
      <ChevronDown color='white' />
    </button>

    {profilemodal && (
      <div className='absolute p-5 bg-white w-80 h-80 right-1 top-10 rounded-lg shadow'>
        <h1 className='text-gray-400 text-sm px-2'>Currently in</h1>

        <div className='flex items-center mt-3 gap-3'>
          <img
            src={user?.picture}
            alt=""
            referrerPolicy="no-referrer" 
            className='w-16 h-16 rounded-full shadow-xl'
          />

          <div className='flex flex-col'>
            <h1 className='text-gray-500 text-lg font-semibold'>
              {user?.name}
            </h1>
            <p className='text-gray-500 text-[13px] font-semibold'>
              {user?.email}
            </p>
          </div>
        </div>
        
        <div className='flex flex-col mt-10'>
          <h1 className='text-gray-400 text-sm px-2'>Your Account</h1>
          <button 
            className='flex items-center gap-2 text-black text-xl font-serif px-2 hover:bg-gray-50 w-full rounded-lg py-2'
          >
            Wishlist
            <Heart/>
          </button>                                                
   
          <button
            onClick={() => {
              setLogoutConfirm(true);
              setprofileModal(false);
            }}
            className='flex px-2 font-serif text-xl cursor-pointer text-black py-2 w-full rounded-lg hover:bg-gray-50'
          >
            Logout
          </button>
        </div>
      </div>
    )}
  </div>
) : (
  <div className='w-10'></div> 
)}
</header>

    </>
 
  )
}

export default UserHeader