import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, LogOut, ShoppingBag, } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'
const UserHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [profilemodal, setprofileModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setLogoutConfirm } = useAuth();

  const routes = {
    Shop: "/",
    // Shop: "/shop",
    Policies: "/policies",
    About: "/about",
    Contact: "/contact",
  };


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle route navigation at pagsara ng mobile drawer
  const handleNav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <motion.header
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`mx-auto flex flex-col md:flex-row md:items-center justify-between bg-amber-50 backdrop-blur-md  border-zinc-100 text-black transition-all duration-500 ${
          mobileMenuOpen ? "px-6 py-4" : ""
        } ${
          scrolled && !mobileMenuOpen
            ? "max-w-none px-6 md:px-8"
            : "max-w-none px-6 md:px-8"
        }`}
      >
        {/* TOP BAR: Logo, Desktop Nav, and Controls */}
        <div className="flex w-full items-center py-3  mx-auto max-w-7xl">
          
          {/* LEFT: LOGO */}
          <div className='flex gap-2 items-center'>
           <img 
            alt="" 
            src={logo} 
            onClick={() => handleNav('/')} 
            className='object-contain w-14'
          />
          <h1 className=' text-xl object-contain  tracking-widest cursor-pointer select-none hover:opacity-80 transition-opacity'>BONITA</h1>
            </div>
          
        
          {/* CENTER: DESKTOP NAV */}
          <nav className='hidden w-full md:flex justify-center gap-8  tracking-wide uppercase'>
            {Object.keys(routes).map((item) => {
              const isActive = location.pathname === routes[item];
              return (
                <span
                  key={item}
                  onClick={() => handleNav(routes[item])}
                  className={`relative group font-bold text-[12px] transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-black" : "text-black hover:text-black"
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-black transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </span>
              );
            })}
          </nav>

          {/* RIGHT: CONTROLS & MOBILE HAMBURGER */}
          <div className="flex justify-end  w-full gap-5 md:gap-5"> 
             {/* Rental Cart Quick Icon */}
            <button 
                  onClick={() => navigate("/rentalcart")}
                  className="p-2 rounded-full hover:bg-neutral-100 relative transition-colors duration-200 group"
                  title="Rental Cart"
                >
                  <ShoppingBag  color='black'  className="group-hover:scale-105 transition-transform" />
            </button>
                
{user?.email ? (

  <div className='flex items-center gap-2 md:gap-3 relative'>

    {/* Profile Trigger */}
    <div
      onClick={() => setprofileModal(prev => !prev)}
      className='items-center flex gap-1 cursor-pointer bg-neutral-50 hover:bg-neutral-100 border border-zinc-200/80 shadow-sm pl-1 pr-2 py-1 rounded-full transition-all duration-300'
    >
      <img
        className='w-7 h-7 rounded-full object-cover border border-zinc-200'
        src={user?.picture}
        referrerPolicy="no-referrer"
        alt="Profile"
      />

      <ChevronDown
        color='black'
        size={14}
        className={`text-neutral-500 transition-transform duration-300 ${
          profilemodal ? 'rotate-180' : ''
        }`}
      />
    </div>

    {/* DROPDOWN MODAL */}
    <AnimatePresence>
      {profilemodal && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setprofileModal(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 top-13 w-72 bg-white shadow-xl border border-zinc-100 text-black rounded-2xl p-4 z-50 overflow-hidden'
          >

            <p className='text-zinc-400 text-[10px] font-bold tracking-wider uppercase mb-3'>
              Account
            </p>

            {/* User Info Card */}
            <div className='flex items-center gap-3 p-2.5 bg-zinc-50 rounded-xl mb-3 border border-zinc-100'>

              {user?.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  className='w-10 h-10 rounded-full border border-zinc-200 object-cover shadow-sm'
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-stone-800 text-white flex items-center justify-center text-xs font-semibold">
                  {user?.name
                    ? user.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </div>
              )}

              <div className='flex flex-col min-w-0'>

                <h2 className='text-xs font-semibold truncate text-black'>
                  {user?.name || "User"}
                </h2>

                <p className='text-[11px] truncate text-zinc-500 font-light'>
                  {user?.email}
                </p>

              </div>

            </div>

            {/* Menu Options */}
            <div className='flex flex-col gap-0.5'>

              {/* Mobile Navigation */}
              <div className="flex flex-col md:hidden gap-1.5 pt-5 pb-2 border-t border-zinc-100 mt-4">

                {Object.keys(routes).map((item) => {

                  const isActive =
                    location.pathname === routes[item];

                  return (
                    <button
                      key={item}
                      onClick={() => handleNav(routes[item])}
                      className={`w-full text-left py-2.5 px-4 text-xs font-medium tracking-wide uppercase rounded-xl transition-all ${
                        isActive
                          ? "text-zinc-500 font-semibold hover:bg-zinc-50"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-600"
                      }`}
                    >
                      {item}
                    </button>
                  );

                })}

              </div>

              {/* Wishlist */}
              <button
                onClick={() => {
                  navigate("/Wishlist");
                  setprofileModal(false);
                }}
                className='flex items-center justify-between text-left text-xs font-medium text-zinc-700 px-3 py-2.5 hover:bg-zinc-50 rounded-xl transition-all duration-200 group'
              >
                <div className="flex items-center gap-2.5">
                  <Heart
                    size={14}
                    className="text-zinc-400 group-hover:text-rose-500 transition-colors"
                  />

                  <span>My Wishlist</span>
                </div>
              </button>

              <hr className="border-zinc-100 my-1" />

              {/* Logout */}
              <button
                onClick={() => {
                  setLogoutConfirm(true);
                  setprofileModal(false);
                }}
                className='flex items-center gap-2.5 text-left text-xs font-medium text-rose-500 px-3 py-2.5 hover:bg-rose-50/50 rounded-xl transition-all duration-200'
              >
                <LogOut size={14} />
                <span>Log out</span>
              </button>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>

  </div>

) : (

  <button
    onClick={() => navigate("/login")}
    className='py-2 px-5 rounded-full relative right-5 bg-[#0D0D0D] hover:bg-stone-800 text-sm uppercase text-amber-100 font-light'
  >
    Sign up
  </button>

)}



           
          </div>
          
          
        </div>

      </motion.header>
    </div>
  );
};

export default UserHeader;
