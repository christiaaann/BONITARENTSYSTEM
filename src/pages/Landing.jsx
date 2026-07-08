import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import UserHeader from '../components/layout/UserHeader';
import HeroSection from '../components/sections/HeroSection';
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Maximize2, X, MapPin, Phone, ArrowRight } from 'lucide-react';
import googleicon from '../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalGoogleAccount, setmodalGoogleAccount] = useState(false);
  const [step, setStep] = useState("google");
  

  useEffect(() => {
  if (!user) return;

  fetch(`http://localhost:3000/api/wishlist/${user.id}`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        setWishlist([]);
        return;
      }

      setWishlist(data.map(item => item.product_id));
    })
    .catch(err => console.log(err));
}, [user]);


const toggleWishlist = async (productId) => {
  const isInWishlist = wishlist.includes(productId);

  if (!isInWishlist) {
    await fetch("http://localhost:3000/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        product_id: productId,
      }),
    });

    setWishlist(prev => [...prev, productId]);
  } 
  else {
    await fetch("http://localhost:3000/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        product_id: productId,
      }),
    });

    setWishlist(prev => prev.filter(id => id !== productId));
  }
};
  


  const handleCompleteProfile = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:3000/api/complete-profile", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, contact }),
      });

      if (res.ok) {
        const data = await res.json();
        setTimeout(() => {
          setmodalGoogleAccount(false);
          window.location.assign("/");
        }, 1500);
      } else {
        setIsSubmitting(false);
        alert("May error sa pag-save.");
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  // Auth States Checking
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
        return;
      }
      if (!user.address || !user.contact) {
        setStep("complete");
        setmodalGoogleAccount(true);
      } else {
        setmodalGoogleAccount(false);
      }
    } else if (user === null) {
      const timer = setTimeout(() => {
        setmodalGoogleAccount(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/apparel');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log('Error Fetching Data', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.log('Error Categories', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  
  // Socket Realtime Listeners
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["polling", "websocket"]
    });

    socket.on("productAdded", (newProduct) => {
      setProducts(prev => prev.some(p => p.id === newProduct.id) ? prev : [newProduct, ...prev]);
    });

    socket.on("categoryAdded", (newCategory) => {
      setCategories(prev => prev.some(c => c.id === newCategory.id) ? prev : [newCategory, ...prev]);
    });

    socket.on("categoryDeleted", (categoryId) => {
      setCategories(prev => prev.filter(c => c.id !== categoryId));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="bg-neutral min-h-screen font-sans antialiased selection:bg-amber-900/10 selection:text-amber-900">
      
      {/* <section id='home' className="overflow-hidden">
        <HeroSection />
      </section> */}

      {/* Main Content Area */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-16 flex flex-col gap-12'>
        
        {/* Modern Tab Categories */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200/60 pb-5">
          <div>
            <h2 className='text-xs font-bold tracking-widest text-neutral-400 uppercase'>Collection</h2>
            <h1 className='text-3xl font-serif font-medium text-neutral-900 mt-1'>Browse Categories</h1>
          </div>

          <div className="flex gap-2 flex-wrap items-center bg-neutral-100 p-1.5 rounded-full border border-neutral-200/40">
            {/* All Category Button */}
            <button
              onClick={() => setSelectedCategory("")}
              className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {selectedCategory === "" && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white shadow-sm rounded-full border border-neutral-200/50"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${
                selectedCategory === "" ? "text-amber-900 font-semibold" : "text-neutral-500 hover:text-neutral-900"
              }`}>
                All Collection
              </span>
            </button>


            {/* Dynamic Categories */}
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-white shadow-sm rounded-full border border-neutral-200/50"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${
                    isActive ? "text-amber-900 font-semibold" : "text-neutral-500 hover:text-neutral-900"
                  }`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>


        {/* Dynamic Products Grid */}
        <motion.div layout className='grid gap-2 grid-cols-5 flex-wrap w-full'>
          <AnimatePresence mode="popLayout">
            {products
              .filter(item => selectedCategory === "" || item.category_id == selectedCategory)
              .map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative bg-white border border-neutral-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  {/* IMAGE ACCENT */}
                  <div className="relative h-80 w-full overflow-hidden bg-neutral-100 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-fill transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Floating Action Buttons */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <button
                      className='absolute left-4 top-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 flex items-center justify-center bg-white/90 backdrop-blur-md shadow-sm border border-neutral-200/50 w-9 h-9 rounded-full text-neutral-700 hover:bg-white hover:text-amber-900'
                      onClick={() => setPreview(item.image)}
                    >
                      <Maximize2 size={16} />
                    </button>

                <button
                  onClick={() => toggleWishlist(item.id)}
                  className={`absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 flex items-center justify-center bg-white/90 backdrop-blur-md shadow-sm border border-neutral-200/50 w-9 h-9 rounded-full hover:bg-white ${
                    wishlist.includes(item.id)
                      ? "text-red-500"
                      : "text-neutral-500 hover:text-red-500"
                  }`}
                >
                  <Heart
                    size={16}
                    fill={wishlist.includes(item.id) ? "currentColor" : "none"}
                  />
                </button>
                  </div>

                  {/* INFO DETAILS */}
                  <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <div className='flex items-start justify-between gap-2'>
                        <h3 className="font-medium text-neutral-800 text-sm line-clamp-1 group-hover:text-amber-900 transition-colors">
                          {item.name}
                        </h3>
                        {item.discount > 0 && (
                          <span className='bg-red-50 text-[10px] font-bold text-red-600 px-2 py-0.5 rounded-full border border-red-200/60 uppercase tracking-wider shrink-0'>
                            Save ₱{Number(item.discount)}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-1">
                        {item.discount > 0 ? (
                          <div className='flex items-baseline gap-2'>
                            <span className='text-sm text-neutral-400 line-through'>₱{item.price}</span>
                            <span className='text-base font-semibold text-neutral-900'>₱{item.final_price}</span>
                          </div>
                        ) : (
                          <span className='text-base font-semibold text-neutral-900'>₱{item.final_price}</span>
                        )}
                      </div>
                    </div>

                    <div className='flex items-center justify-between border-t border-neutral-100 pt-3 mt-1'>
                      <span className="text-xs text-neutral-400 font-medium">Size: Standard</span> 
                      <button
                        onClick={() => navigate(`/product/${item.id}`)} 
                        className='inline-flex items-center gap-1.5 bg-neutral-900 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-amber-900 transition-colors duration-200'
                      >
                        Rent Now
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Global Image Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bg-neutral-950/90 backdrop-blur-md inset-0 flex items-center justify-center z-50 p-4"
            onClick={() => setPreview(null)}
          >
            <button 
              onClick={() => setPreview(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-sm transition-colors"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={preview}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div> 
        )}
      </AnimatePresence>

      {/* Authentication & Profile Completion Modal */}
      <AnimatePresence>
        {modalGoogleAccount && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white relative rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-neutral-100 flex flex-col"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {step === "google" && (
                <div className="p-8 flex flex-col items-center justify-center text-center gap-6">
                  <div className="space-y-2">
                    <h1 className="font-serif text-4xl tracking-wide text-neutral-900">BONITA</h1>
                    <div className="w-8 h-[2px] bg-amber-800/40 mx-auto rounded"></div>
                  </div>

                  <p className="text-sm leading-relaxed text-neutral-500 max-w-xs">
                    An elegant rental platform for premium gowns and items. Reserve what you need with simplicity and absolute ease.
                  </p>

                  <button 
                    onClick={loginWithGoogle} 
                    className="w-full mt-2 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 py-3 px-4 flex justify-center items-center rounded-full gap-3 shadow-sm hover:bg-neutral-50 active:scale-[0.99] transition-all font-medium text-sm"
                  >
                    <img src={googleicon} className="w-5 h-5 object-contain" alt="Google icon" />
                    Continue with Google
                  </button>

                  <footer className='text-[11px] text-neutral-400 tracking-wider uppercase font-medium mt-4'>
                    © Bonita Rental Platform
                  </footer>
                </div>
              )}
              
              {step === "complete" && (
                <div className="flex flex-col">
                  {/* Modal Visual Header */}
                  <div className='bg-gradient-to-br from-neutral-900 to-amber-950 flex flex-col justify-center items-center relative p-8 h-44 text-center'>
                    <h1 className="text-2xl font-serif tracking-widest text-neutral-100">BONITA</h1>
                    <p className="text-xs text-neutral-300/80 font-sans tracking-wide mt-1">Refining your rental experience</p>
                    
                    <div className="absolute -bottom-8 left-6 flex items-center gap-3">
                      <img 
                        className='rounded-full w-16 h-16 border-4 border-white shadow-md object-cover' 
                        referrerPolicy='no-referrer'
                        src={user?.picture} 
                        alt="Profile image" 
                      />
                    </div>
                  </div>

                  {/* Form Body */}
                  <div className='p-6 pt-12 flex flex-col gap-6'>
                    <div>
                      <h2 className="text-lg font-semibold text-neutral-800">{user?.name}</h2>
                      <p className="text-xs text-amber-900/80 bg-amber-50 border border-amber-200/40 px-2.5 py-0.5 rounded-full inline-block mt-1 font-medium">
                        Complete Profile Required
                      </p>
                    </div>
                    
                    <div className='flex flex-col gap-3.5'>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-neutral-400"><MapPin size={18} /></span>
                        <input
                          type="text"
                          placeholder="Complete Delivery Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 focus:border-neutral-400 focus:bg-white rounded-xl text-sm transition-all outline-none"
                        />
                      </div>

                      <div className="relative">
                        <span className="absolute left-3 top-3 text-neutral-400"><Phone size={18} /></span>
                        <input
                          type="text"
                          value={contact}
                          placeholder="Active Contact Number"
                          onChange={(e) => setContact(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 focus:border-neutral-400 focus:bg-white rounded-xl text-sm transition-all outline-none"
                        />
                      </div>
                           
                      <button
                        disabled={isSubmitting || !address || !contact}
                        onClick={handleCompleteProfile} 
                        className="w-full mt-2 bg-neutral-900 text-white hover:bg-amber-950 font-medium py-3 rounded-xl disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed shadow-sm transition-colors text-sm flex justify-center items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Updating profile...</span>
                          </>
                        ) : (
                          "Save and Continue"
                        )}
                      </button>       
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;