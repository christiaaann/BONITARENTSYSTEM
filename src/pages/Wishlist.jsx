import React, { useEffect, useState } from "react";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { user } = useAuth();
  const { setWishlist } = useWishlist();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/wishlist/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setWishlist(Array.isArray(data) ? data.map((item) => item.product_id) : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user]);

  const removeWishlist = async (productId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          product_id: productId,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to remove wishlist item");
      }

      setItems((prev) => prev.filter((item) => item.id !== productId));
      setWishlist((prev) => prev.filter((id) => id !== productId));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfbfa] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#191919]/20 border-t-[#191919] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-[#fbfbfa] text-[#191919] font-sans antialiased selection:bg-[#f3f3ee]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">

        {/* HEADER ARCHITECTURE */}
        <div className="border-b border-[#e5e5e0] pb-8 mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-serif tracking-tight text-[#191919] font-normal">
              My Wishlist
            </h1>
            <p className="text-sm text-[#6b6b63]">
              A curated lookbook of your premium selected garments.
            </p>
          </div>
        </div>

        {/* EMPTY STATE */}
        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className=" py-24 px-6 text-center max-w-md mx-auto"
            >
              <div className="w-12 h-12 rounded-full bg-[#fbfbfa] border border-[#e5e5e0] flex items-center justify-center text-[#c2c2bb] mx-auto mb-5">
                <Heart size={18} />
              </div>
              <h2 className="text-base font-medium text-[#191919] tracking-tight">
                Your curation is empty
              </h2>
              <p className="text-sm text-[#6b6b63] max-w-xs mx-auto mt-2 leading-relaxed">
                Explore the main showroom catalog and tap the heart icon to save garments for later reference.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="mt-6 inline-flex items-center gap-2 bg-[#191919] hover:bg-[#e05252] text-white text-xs font-medium px-5 py-2.5 rounded-lg transition-colors duration-300 tracking-wide"
              >
                Browse
                <ShoppingBag size={12} />
              </button>
            </motion.div>
          ) : (
            /* SHOWROOM LAYOUT GRID */
            <motion.div 
              layout
              className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-10"
            >
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="group flex flex-col bg-white border border-[#e5e5e0]/80 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#c2c2bb]"
                  >
                    {/* IMAGE PORTRAIT CONTROLLER */}
                    <div className="relative aspect-[3/4] w-full bg-[#f5f5f0] overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />

                      {/* HIGH-CONTRAST ACTION BUTTON */}
                      <button
                        onClick={() => removeWishlist(item.id)}
                        className="absolute top-4 right-4 bg-white text-[#e05252] border border-[#e5e5e0] shadow-sm w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 hover:border-[#c2c2bb] active:scale-95"
                        title="Remove from wishlist"
                      >
                        <Heart size={15} fill="currentColor" />
                      </button>
                    </div>

                    {/* PREMIUM TEXT & CONTENT ARCHITECTURE */}
                    <div className="p-4 flex flex-col flex-grow justify-between gap-4 border-t border-[#f5f5f0]">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="font-medium text-sm text-[#191919] uppercase tracking-tight line-clamp-1 group-hover:text-[#e05252] transition-colors duration-200">
                            {item.name}
                          </h2>
                          {item.discount > 0 && (
                            <span className="bg-[#e05252]/10 text-[#e05252] text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0">
                              PROMO
                            </span>
                          )}
                        </div>
                        {item.description ? (
                          <p className="text-xs text-[#6b6b63] leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        ) : (
                          <p className="text-xs text-[#8a8a80] font-light">Standard Luxury Edition</p>
                        )}
                      </div>

                      {/* PRICE & ACTION SEGMENT */}
                      <div className="space-y-3 pt-2 border-t border-[#fbfbfa] mt-auto">
                        <div>
                          {item.discount > 0 ? (
                            <div className="flex items-baseline gap-2">
                              <span className="text-xs text-[#8a8a80] line-through font-light">
                                ₱{item.price}
                              </span>
                              <span className="text-base font-semibold text-[#191919]">
                                ₱{item.final_price}
                              </span>
                            </div>
                          ) : (
                            <span className="text-base font-semibold text-[#191919]">
                              ₱{item.final_price}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => navigate(`/product/${item.id}`)}
                          className="w-full bg-[#191919] hover:bg-[#e05252] text-white text-xs font-medium py-2.5 rounded-lg transition-colors duration-300 tracking-wide shadow-sm flex items-center justify-center gap-1.5"
                        >
                          View Garment
                          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5 duration-200" />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
    </>
  );
};

export default Wishlist;
