import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence } from "framer-motion";
const Categories = ({selectedCategory, setSelectedCategory}) => { 
   const [categories, setCategories] = useState([]);

   useEffect(() => {
   const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.log('Error Categories', err);
    }
    };
    fetchCategories();
   }, []);

    return (
   <>
         {/* Modern Tab Categories */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200/60 pb-5">
          <div>
            <h2 className='text-xs font-bold tracking-widest text-neutral-400 uppercase'>Collection</h2>
            <h1 className='text-3xl font-serif font-medium text-neutral-900 mt-1'>Browse Categories</h1>
          </div>

          <div className="flex gap-2 overflow-x-auto text-nowrap items-center bg-neutral-100 p-1.5 lg:rounded-full rounded-xl  border border-neutral-200/40">
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

        
   </>
  )
}

export default Categories