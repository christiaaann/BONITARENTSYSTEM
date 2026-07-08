import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const UserHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profilemodal, setprofileModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setLogoutConfirm } = useAuth();

  const routes = {
    Home: "/",
    Shop: "/shop",
    Policies: "/policies",
    About: "/about",
    Contact: "/contact",
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide/Show logic habang nag-scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
        setprofileModal(false);
        setMobileMenuOpen(false); // Sinasara ang mobile menu kapag nagscroll pababa
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle route navigation at pagsara ng mobile drawer
  const handleNav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div 
      className={`fixed left-0 w-full z-50 px-4 sm:px-6 md:px-8 transition-all duration-500 ${
        visible ? "top-3" : "top-[-120px]"
      }`}
    >
      <motion.header
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`mx-auto flex flex-col md:flex-row md:items-center justify-between bg-white/90 backdrop-blur-md border border-zinc-100 text-black shadow-sm transition-all duration-500 overflow-hidden ${
          mobileMenuOpen ? " rounded-xl py-4 px-6" : " rounded-xl  py-3.5"
        } ${
          scrolled && !mobileMenuOpen
            ? "max-w-6xl px-8"
            : "max-w-7xl px-6 md:px-10"
        }`}
      >
        {/* TOP BAR: Logo, Desktop Nav, and Controls */}
        <div className="flex items-center justify-between w-full">
          
          {/* LEFT: LOGO */}
          <h1 
            onClick={() => handleNav('/')} 
            className='font-serif italic text-xl font-bold tracking-widest cursor-pointer select-none hover:opacity-80 transition-opacity'
          >
            BONITA
          </h1>

          {/* CENTER: DESKTOP NAV */}
          <nav className='hidden md:flex items-center gap-8 font-sans text-[12px] font-medium tracking-wide uppercase'>
            {Object.keys(routes).map((item) => {
              const isActive = location.pathname === routes[item];
              return (
                <span
                  key={item}
                  onClick={() => handleNav(routes[item])}
                  className={`relative group transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-black" : "text-neutral-500 hover:text-black"
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
          <div className="flex items-center gap-2 md:gap-3">
            {user && user.email && user.address && user.contact ? (
              <div className='flex items-center gap-2 md:gap-3 relative'>
                {/* Wishlist Quick Icon */}
                <button 
                  onClick={() => navigate("/Wishlist")}
                  className="p-2 rounded-full hover:bg-neutral-100 relative transition-colors duration-200 group"
                  title="Wishlist"
                >
                  <Heart color='black' size={18} className="group-hover:scale-105 transition-transform" />
                  <span className='absolute top-0.5 right-0.5 bg-rose-500 text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full text-white scale-90'>
                    2
                  </span>
                </button>

                {/* Profile Trigger */}
                <div 
                  onClick={() => setprofileModal(prev => !prev)}
                  className='flex items-center gap-1 cursor-pointer bg-neutral-50 hover:bg-neutral-100 border border-zinc-200/80 shadow-sm pl-1 pr-2 py-1 rounded-full transition-all duration-300'
                >
                  <img 
                    className='w-7 h-7 rounded-full object-cover border border-zinc-200' 
                    src={user?.picture} 
                    referrerPolicy="no-referrer" 
                    alt="Profile" 
                  />
                  <ChevronDown color='black' size={14} className={`text-neutral-500 transition-transform duration-300 ${profilemodal ? 'rotate-180' : ''}`} />
                </div>

                {/* DROPDOWN MODAL (Desktop Only Aspect Fixed) */}
                <AnimatePresence>
                  {profilemodal && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setprofileModal(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className='absolute right-0 top-12 w-72 bg-white shadow-xl border border-zinc-100 text-black rounded-2xl p-4 z-50 overflow-hidden'
                      >
                        <p className='text-zinc-400 text-[10px] font-bold tracking-wider uppercase mb-3'>Account</p>

                        {/* User Info Card */}
                        <div className='flex items-center gap-3 p-2.5 bg-zinc-50 rounded-xl mb-3 border border-zinc-100'>
                          <img
                            src={user?.picture}
                            alt="Profile"
                            referrerPolicy="no-referrer" 
                            className='w-10 h-10 rounded-full border border-zinc-200 object-cover shadow-sm'
                          />
                          <div className='flex flex-col min-w-0'>
                            <h2 className='text-xs font-semibold truncate text-black'>
                              {user?.name}
                            </h2>
                            <p className='text-[11px] truncate text-zinc-500 font-light'>
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        
                        {/* Menu Options */}
                        <div className='flex flex-col gap-0.5'>
                          <button 
                            onClick={() => {
                              navigate("/Wishlist");
                              setprofileModal(false);
                            }}
                            className='flex items-center justify-between text-left text-xs font-medium text-zinc-700 px-3 py-2.5 hover:bg-zinc-50 rounded-xl transition-all duration-200 group'
                          >
                            <div className="flex items-center gap-2.5">
                              <Heart size={14} className="text-zinc-400 group-hover:text-rose-500 transition-colors" />
                              <span>My Wishlist</span>
                            </div>
                          </button>                        
                   
                          <hr className="border-zinc-100 my-1" />

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
              <div className='w-8'></div> 
            )}

            {/* TOGGLE BUTTON FOR MOBILE NAV */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 md:hidden rounded-ful hover:bg-neutral-100 text-black transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* MOBILE DROPDOWN LINKS */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full md:hidden"
            >
              <div className="flex flex-col gap-1.5 pt-5 pb-2 border-t border-zinc-100 mt-4">
                {Object.keys(routes).map((item) => {
                  const isActive = location.pathname === routes[item];
                  return (
                    <button
                      key={item}
                      onClick={() => handleNav(routes[item])}
                      className={`w-full text-left py-2.5 px-4 text-xs font-medium tracking-wide uppercase rounded-xl transition-all ${
                        isActive 
                          ? "bg-zinc-950 text-white font-semibold" 
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.header>
    </div>
  );
};

export default UserHeader;