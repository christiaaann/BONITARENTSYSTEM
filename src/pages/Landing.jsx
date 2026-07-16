import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, } from 'lucide-react';
import googleicon from '../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import Categories from '../components/Home/Categories';
import FilterProductCategory from '../components/Home/FilterProductCategory';
const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
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


  useEffect(() => {
    const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/apparel');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log('Error Fetching Data', err);
    }
  };
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

      {/* Main Content Area */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-16 flex flex-col gap-12'>
        
        {/* Modern Tab Categories */}
        <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        />


        {/* Dynamic Products Grid */}
       <FilterProductCategory
        products={products}
        selectedCategory={selectedCategory}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        setPreview={setPreview}
        navigate={navigate}
      />
   
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