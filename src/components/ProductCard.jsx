import React from 'react'
import { Maximize2, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ProductCard = ( {
    item,
    wishlist,
    toggleWishlist,
    setPreview,
    // handleRent,
    user
} ) => {
    const navigate = useNavigate();
    // const isWishlisted = wishlist.includes(item.id);

  return (
   <>
   <div className="space-y-4">
         <div className="overflow-x-auto lg:overflow-x-hidden">
           <div className="grid grid-flow-col auto-cols-[247px] gap-2">
               <div>
                <div 
                     onClick={() => navigate(`/product/${item.id}`)}
                     key={item.id}
                     className=" cursor-pointer group relative bg-white border border-neutral-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                   >
                     {/* IMAGE ACCENT */}
                     <div
                     className="relative h-80 w-full overflow-hidden bg-neutral-100 flex items-center justify-center">
                       <img
                         src={item.image}
                         alt={item.name}
                         className="h-full w-full object-fill transition-transform duration-700 group-hover:scale-105"
                       />
                       
                       {/* Floating Action Buttons */}
                       <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                       
                    <button
                        className='absolute left-4 top-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 flex items-center justify-center bg-white/90 backdrop-blur-md shadow-sm border border-neutral-200/50 w-9 h-9 rounded-full text-neutral-700 hover:bg-white hover:text-amber-900'
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview(item.image);
                        }   
                      }
                       >
                    <Maximize2 size={16} />
                       </button>
      {user && (
        <button
        onClick={(e) => {
        e.stopPropagation(); 
        toggleWishlist(item.id);
      }}
        className={`absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 flex items-center justify-center bg-white/90 backdrop-blur-md shadow-sm border border-neutral-200/50 w-9 h-9 rounded-full hover:bg-white ${
          wishlist.includes(item.id)
          ? "text-red-500"
          : "text-neutral-500 hover:text-red-500"
      }`}
      >
        <Heart size={16} fill={wishlist.includes(item.id) ? "currentColor" : "none"} />
        </button>
      )}
      </div>
                     
                     {/* INFO DETAILS */}
                     <div
                     className="p-4 flex flex-col grow justify-between gap-3">
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
   
                       <div className='flex items-center justify-end border-t border-neutral-100 pt-3 mt-1'>
                         {/* <span className="text-xs text-neutral-400 font-medium">Size: Standard</span>  */}
                         {/* <button
                            onClick={() => handleRent(item.id)}
                          onClick={() => navigate(`/product/${item.id}`)}
                           className='inline-flex items-center gap-1.5 bg-[#0D0D0D] hover:bg-stone-800 text-sm uppercase text-amber-100 font-light px-4 py-2 rounded-full transition-colors duration-200'
                         >
                           ADDTOCART
                           <ArrowRight size={12} />
                         </button> */}
                       </div>
                     </div>
                   </div>
               </div>
         
           </div>
         </div>
     </div>
   </>
  )
}

export default ProductCard