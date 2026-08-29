import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "../context/AuthContext";
const GoogleAuthModal = () => {
  const { user, showGoogleModal, closeGoogleModal, authStep } = useAuth();  

  const loginWithGoogle = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};
  return (
   <>
      <AnimatePresence>
        {showGoogleModal && (
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
              {authStep=== "google" && (
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
                    <img  className="w-5 h-5 object-contain" alt="Google icon" />
                    Continue with Google
                  </button>

                  <footer className='text-[11px] text-neutral-400 tracking-wider uppercase font-medium mt-4'>
                    © Bonita Rental Platform
                  </footer>
                </div>
              )}
              
              {authStep === "complete" && (
                <div className="flex flex-col">
                  {/* Modal Visual Header */}
                  <div className='bg-linear-to-br from-neutral-900 to-amber-950 flex flex-col justify-center items-center relative p-8 h-44 text-center'>
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
   </>
  )
}

export default GoogleAuthModal