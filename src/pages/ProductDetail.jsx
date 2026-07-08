import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProductDetail = () => {
   const { id } = useParams();
   const [product, setProduct] = useState(null);
   const [showSizeChart, setShowSizeChart] = useState(false);
   
   // Rental States
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [selectedSize, setSelectedSize] = useState('');
   const [agreeTerms, setAgreeTerms] = useState(false);
   const [checkoutMethod, setCheckoutMethod] = useState('online');

   useEffect(() => {
      fetch(`http://localhost:3000/api/apparel/${id}`)
         .then(res => res.json())
         .then(data => {
            console.log("DEBUG: Ito ang data mula sa Admin DB:", data); // Para makita mo ang exact fields
            setProduct(data);
         }); 
   }, [id]);

   if (!product) return <h1 className='text-center mt-20 text-xl font-serif text-amber-900/60 tracking-widest animate-pulse'>Loading Bonita Piece...</h1>;

   // ==========================================
   // SMART CONFIG SELECTOR (Mula sa Admin Dashboard mo)
   // ==========================================
   // Tinitiyak natin na kahit may space o malaking titik ang nilagay mo sa Admin Panel, babasahin pa rin nang tama.
   // Kung sakaling iba ang pangalan ng field sa DB mo (e.g. product_category), palitan lang itong product.category.
const currentCategory = (product.category_name || '').trim().toLowerCase();

   // FALLBACK CONFIG: Para sa mga nilalagay mong 'Camping', 'Tables', 'Chairs', 'Props', atbp.
   let config = {
      standardDays: 2, 
      extraFeePerDay: Number(product.final_price) || 0, // Gagamitin ang mismong daily price mo bilang extension fee
      securityDeposit: 200, 
      hasSize: false,
      hasFitting: false,
      label: product.category || 'Gear', // Ika-capture kung ano mismo ang string na tinype mo sa admin panel
      policyText: '*Daily rental rate applies. Standard extension fee is calculated per additional day.'
   };

   // SPECIAL APPAREL CASES: Kung ang nilagay mo sa Admin Dashboard ay naglalaman ng mga salitang ito
   if (currentCategory.includes('gown') || currentCategory.includes('dress')) {
      config = {
         standardDays: 3,
         extraFeePerDay: 300,
         securityDeposit: 1000,
         hasSize: true,
         hasFitting: true,
         label: 'Gown',
         policyText: '*Standard initial duration is 3 days. A minimal extensions fee of ₱300/day applies thereafter.'
      };
   } else if (currentCategory.includes('apparel') || currentCategory.includes('suit') || currentCategory.includes('clothes')) {
      config = {
         standardDays: 3,
         extraFeePerDay: 200,
         securityDeposit: 500,
         hasSize: true,
         hasFitting: true,
         label: 'Apparel',
         policyText: '*Standard initial duration is 3 days. Standard extensions fee applies thereafter.'
      };
   }

   // Helper: Alamin kung ilang araw ang kabuuang napili ng customer
   const getDaysCount = () => {
      if (!startDate || !endDate) return 0;
      const diffTime = Math.abs(endDate - startDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
   };

   // Helper: Kalkulahin ang kabuuang presyo base sa dynamic config
   const calculateTotalPrice = () => {
      const diffDays = getDaysCount();
      const basePrice = Number(product.final_price) || 0;
      
      if (diffDays <= config.standardDays) {
         return basePrice;
      } else {
         const extraDays = diffDays - config.standardDays;
         return basePrice + (extraDays * config.extraFeePerDay);
      }
   };

   const handleAction = () => {
      // Hihingi lang ng size KUNG ang kategorya ay damit/gown na may size requirements
      if (config.hasSize && !selectedSize) {
         alert(`Mangyaring pumili ng Size para sa ${config.label}.`);
         return;
      }
      if (!startDate || !endDate) {
         alert('Mangyaring piliin ang iyong Rental Dates.');
         return;
      }
      if (!agreeTerms) {
         alert('Kailangang sumang-ayon sa Rental Terms and Conditions bago magpatuloy.');
         return;
      }

      const totalDays = getDaysCount();
      const finalPrice = calculateTotalPrice();

      const rentalData = {
         productId: product.id,
         productName: product.name,
         category: product.category,
         size: config.hasSize ? selectedSize : 'N/A',
         rentalStart: startDate.toLocaleDateString(),
         rentalEnd: endDate.toLocaleDateString(),
         totalDays: totalDays,
         totalPrice: finalPrice,
         securityDeposit: config.securityDeposit,
         method: checkoutMethod 
      };

      if (checkoutMethod === 'online') {
         alert(`⚡ Naidagdag na sa Rental Cart!\n\nDuration: ${totalDays} Day/s\nTotal Product Fee: ₱${finalPrice.toLocaleString()}\n*May hiwalay na ₱${config.securityDeposit.toLocaleString()} security deposit upon pickup/delivery.`);
      } else {
         alert(`📅 Fitting Appointment Request Sent!\nNareserba ang item para sa sukat sa: ${startDate.toLocaleDateString()}`);
      }
   };

   return (
      <div className='min-h-screen bg-stone-50/40 flex flex-col md:flex-row gap-10 p-2 max-w-6xl mx-auto items-start selection:bg-amber-900/10'>
         
         {/* Left Side: Product Image Card */}
         <div className='w-full border md:w-1/2 flex items-center justify-center border-stone-200/60 rounded-2xl p-8 sticky top-8 group transition-all duration-500'>
            <img
               className='h-150 rounded-xl object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]' 
               src={product.image} 
               alt={product.name} 
            />
         </div>

         {/* Right Side: Details & Rental Options */}
         <div className='w-full md:w-1/2 flex flex-col gap-6 z-10 bg-white border border-stone-200/60 rounded-2xl p-5'>
            
            {/* Header Section */}
            <div className='flex flex-col items-start gap-1.5'>
               <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800/70 font-sans'>
                  Bonita {product.category || 'Rental'} Collection
               </p>
               <p className='bg-green-600/15 rounded-full px-2 border-dashed border border-green-40 font-serif  text-green-600 text-sm'>Available {product.stock}</p>
               
               <div className='flex items-baseline justify-between gap-3 flex-wrap'>
                  <h1 className='font-serif text-stone-900 text-3xl font-medium tracking-wide'>{product.name}</h1>  
                  {product.discount > 0 && (
                     <span className='bg-amber-900/5 font-serif px-3 py-1 rounded-full text-[11px] border border-dashed border-amber-900/30 text-amber-900 font-medium tracking-wider'>
                        SAVE ₱{Number(product.discount)}
                     </span>
                  )}
               </div>
            </div>

            {/* Pricing Area */}
            <div className='bg-stone-50/60 p-4 rounded-xl border border-stone-100/80 backdrop-blur-sm'>
               <div className='flex gap-2 items-baseline'>
                  {product.discount > 0 && (
                     <span className='line-through text-stone-400 font-serif text-base'>₱{product.price}</span>
                  )}
                  <span className='text-stone-900 font-serif text-3xl font-semibold tracking-tight transition-all duration-300'>
                     ₱{calculateTotalPrice().toLocaleString()}
                  </span>
                  <span className='text-xs text-stone-400 font-sans tracking-wide ml-1 uppercase font-medium'>
                     {getDaysCount() > 0 ? `/ ${getDaysCount()} Day Rental` : `/ ${config.standardDays}-Day Rental`}
                  </span>
               </div>

               {/* Dynamic Breakdown Indicator */}
               {getDaysCount() > 0 && (
                  <div className='mt-2 text-xs font-sans border-t border-stone-200/50 pt-2 transition-all duration-300'>
                     {getDaysCount() <= config.standardDays ? (
                        <p className='text-emerald-700 font-medium flex items-center gap-1'>
                           <span>✨</span> Standard {config.standardDays}-day rate applied.
                        </p>
                     ) : (
                        <p className='text-amber-800 font-medium flex flex-col gap-0.5'>
                           <span className='flex items-center gap-1'>⚠️ Extended Duration Rate:</span>
                           <span className='text-stone-500 font-normal pl-3'>
                              Base {config.standardDays} Day/s + ({getDaysCount() - config.standardDays}) extra days multiplied by ₱{config.extraFeePerDay}/day.
                           </span>
                        </p>
                     )}
                  </div>
               )}

               <p className='text-[11px] text-stone-500 mt-2 flex items-center gap-1.5 font-sans border-t border-stone-200/40 pt-2'>
                  <span className='text-amber-800/80'>🛡️</span> +₱{config.securityDeposit.toLocaleString()} Refundable Security Deposit (Fully refundable upon return)
               </p>
            </div>

            <hr className='border-stone-100/80' />

            {/* Step 1: Size Selection (Lalabas lang kung "Gown" o "Apparel" ang niregister mo sa dashboard) */}
            {config.hasSize && (
               <div className='flex flex-col gap-3'>
                  <div className='flex justify-between items-center text-xs tracking-wide'>
                     <label className='font-semibold uppercase text-stone-700 font-sans'>1. Select {config.label} Size</label>
                     <button
                        onClick={() => setShowSizeChart(true)} 
                        className='text-amber-900/80 underline cursor-pointer font-medium hover:text-amber-950 transition-colors'
                     >
                        SizeChart
                     </button>
                  </div>
                  <div className='flex gap-3'>
                     {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                           key={size}
                           type="button"
                           onClick={() => setSelectedSize(size)}
                           className={`w-12 h-12 text-xs font-semibold rounded-xl transition-all duration-300 border ${
                              selectedSize === size 
                                 ? 'bg-stone-900 text-white border-stone-900 shadow-md shadow-stone-900/10 scale-[1.03]' 
                                 : 'border-stone-200 text-stone-600 bg-white hover:border-stone-400 hover:text-stone-900'
                           }`}
                        >
                           {size}
                        </button>
                     ))}
                  </div>
               </div>
            )}

            {/* Step 2: Date Picker */}
            <div className='flex flex-col gap-3'>
               <label className='text-xs font-semibold uppercase tracking-wide text-stone-700 font-sans'>
                  {config.hasSize ? '2. Select Rental Duration' : '1. Select Rental Duration'}
               </label>
               <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 bg-stone-50/40 p-3 rounded-xl border border-stone-200/50'>
                  <div className='flex flex-col gap-1.5'>
                     <span className='text-[9px] uppercase font-bold text-stone-400 tracking-widest font-sans pl-1'>Pick-up</span>
                     <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        placeholderText="Choose Date"
                        className="bg-white border border-stone-200/70 px-3 py-2.5 rounded-lg outline-none w-full text-xs font-medium text-stone-700 cursor-pointer hover:border-stone-400 focus:border-stone-900 transition-colors shadow-sm"
                     />
                  </div>
                  <div className='flex flex-col gap-1.5'>
                     <span className='text-[9px] uppercase font-bold text-stone-400 tracking-widest font-sans pl-1'>Return Date</span>
                     <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate || new Date()}
                        placeholderText="Choose Date"
                        className="bg-white border border-stone-200/70 px-3 py-2.5 rounded-lg outline-none w-full text-xs font-medium text-stone-700 cursor-pointer hover:border-stone-400 focus:border-stone-900 transition-colors shadow-sm"
                     />
                  </div>
               </div>
               <p className='text-[10px] text-stone-400 italic px-1 font-sans'>
                  {config.policyText}
               </p>
            </div>

            {/* Step 3: Service Preference */}
            <div className='flex flex-col gap-3'>
               <label className='text-xs font-semibold uppercase tracking-wide text-stone-700 font-sans'>
                  {config.hasSize ? '3. Service Preference' : '2. Service Preference'}
               </label>
               <div className={`grid gap-3 ${config.hasFitting ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  <button
                     type="button"
                     onClick={() => setCheckoutMethod('online')}
                     className={`p-3.5 border text-left rounded-xl transition-all duration-300 flex flex-col gap-1 ${
                        checkoutMethod === 'online'
                           ? 'border-stone-900 bg-stone-900/[0.02] text-stone-900 shadow-sm'
                           : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300 hover:text-stone-700'
                     }`}
                  >
                     <div className='text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5'>
                        <span>🚚</span> Direct Rental
                     </div>
                     <div className='text-[10px] opacity-75 font-sans leading-normal'>Dispatched straight or ready for pickup on your set date.</div>
                  </button>
                  
                  {config.hasFitting && (
                     <button
                        type="button"
                        onClick={() => setCheckoutMethod('fitting')}
                        className={`p-3.5 border text-left rounded-xl transition-all duration-300 flex flex-col gap-1 ${
                           checkoutMethod === 'fitting'
                              ? 'border-stone-900 bg-stone-900/[0.02] text-stone-900 shadow-sm'
                              : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300 hover:text-stone-700'
                        }`}
                     >
                        <div className='text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5'>
                           <span>🪡</span> Fitting Session
                        </div>
                        <div className='text-[10px] opacity-75 font-sans leading-normal'>Reserve the garment and schedule an in-store fitting first.</div>
                     </button>
                  )}
               </div>
            </div>

            {/* Terms and Agreement */}
            <div className='flex items-start gap-3 bg-stone-50/50 p-3.5 rounded-xl border border-stone-100/70 mt-1'>
               <input 
                  type="checkbox" 
                  id="terms" 
                  className='mt-0.5 cursor-pointer accent-stone-900 w-3.5 h-3.5 rounded border-stone-300'
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
               />
               <label htmlFor="terms" className='text-[11px] text-stone-500 cursor-pointer select-none leading-relaxed font-sans'>
                  I read and explicitly agree with the <span className='underline text-stone-800 font-medium hover:text-stone-950'>Bonita Rental Policy</span> (Covers details regarding late returns, dry cleaning, and damage coverages).
               </label>
            </div>

            {/* Size Chart Modal */}
            {showSizeChart && config.hasSize && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
                  <div 
                     className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity duration-300"
                     onClick={() => setShowSizeChart(false)}
                  />
                  
                  <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-stone-200 relative z-10 transform scale-[1.01] transition-all max-h-[90vh] overflow-y-auto">
                     <button 
                        onClick={() => setShowSizeChart(false)}
                        className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 text-lg font-sans w-8 h-8 rounded-full hover:bg-stone-50 transition-colors flex items-center justify-center"
                     >
                        ✕
                     </button>

                     <div className="mb-5 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-800/70 font-sans mb-1">Measurement Guide</p>
                        <h3 className="font-serif text-stone-900 text-xl font-medium">Bonita {config.label} Size Chart</h3>
                        <p className="text-[11px] text-stone-400 font-sans mt-0.5">Measurements are shown in inches</p>
                     </div>

                     <div className="border border-stone-100 rounded-xl overflow-hidden shadow-sm font-sans">
                        <table className="w-full text-left border-collapse">
                           <thead>
                              <tr className="bg-stone-900 text-white text-[10px] uppercase tracking-wider font-semibold">
                                 <th className="p-3">Size</th>
                                 <th className="p-3">Bust (Chest)</th>
                                 <th className="p-3">Waist</th>
                                 <th className="p-3">Hips</th>
                              </tr>
                           </thead>
                           <tbody className="text-xs text-stone-600 divide-y divide-stone-100">
                              <tr className="hover:bg-stone-50/60 transition-colors">
                                 <td className="p-3 font-semibold text-stone-900 bg-stone-50/40">S</td>
                                 <td className="p-3">32" - 34"</td>
                                 <td className="p-3">25" - 27"</td>
                                 <td className="p-3">35" - 37"</td>
                              </tr>
                              <tr className="hover:bg-stone-50/60 transition-colors">
                                 <td className="p-3 font-semibold text-stone-900 bg-stone-50/40">M</td>
                                 <td className="p-3">35" - 37"</td>
                                 <td className="p-3">28" - 30"</td>
                                 <td className="p-3">38" - 40"</td>
                              </tr>
                              <tr className="hover:bg-stone-50/60 transition-colors">
                                 <td className="p-3 font-semibold text-stone-900 bg-stone-50/40">L</td>
                                 <td className="p-3">38" - 40"</td>
                                 <td className="p-3">31" - 33"</td>
                                 <td className="p-3">41" - 43"</td>
                              </tr>
                              <tr className="hover:bg-stone-50/60 transition-colors">
                                 <td className="p-3 font-semibold text-stone-900 bg-stone-50/40">XL</td>
                                 <td className="p-3">41" - 43"</td>
                                 <td className="p-3">34" - 36"</td>
                                 <td className="p-3">44" - 46"</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>

                     <div className="mt-5 bg-amber-900/[0.02] border border-dashed border-amber-900/20 rounded-xl p-3.5 flex items-start gap-2.5">
                        <span className="text-sm">💡</span>
                        <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                           <strong className="text-stone-800">Fitting Note:</strong> Kung ikaw ay nag-aalangan sa pagitan ng dalawang sukat, iminumungkahi namin na piliin ang mas malaking sukat o mag-schedule ng <span className="font-semibold text-amber-900">Fitting Session</span> gamit ang aming interface para masiguro ang perpektong lapat ng damit.
                        </p>
                     </div>

                     <button
                        onClick={() => setShowSizeChart(false)}
                        className="w-full mt-4 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-medium py-2.5 rounded-xl uppercase tracking-wider transition-colors"
                     >
                        Got it, Close Chart
                     </button>
                  </div>
               </div>
            )}

            {/* Final Submission Buttons */}
            <div className='flex flex-col gap-2.5 mt-2'>
               <button 
                  type="button"
                  onClick={handleAction}
                  className='bg-stone-950 hover:bg-stone-900 text-white font-medium py-3.5 rounded-xl tracking-widest uppercase text-xs shadow-md shadow-stone-950/5 transition-all duration-300 transform active:scale-[0.99] hover:scale-[1.01]'
               >
                  {checkoutMethod === 'online' ? 'Secure Online Reservation' : 'Schedule My Fitting Appointment'}
               </button>
               <button type="button" className='border border-stone-200/80 hover:bg-stone-50/80 text-stone-500 py-3 text-xs tracking-widest uppercase rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1.5'>
                  <span>♡</span> Add to Wishlist
               </button>          
            </div>

         </div> 
      </div>
   );
};

export default ProductDetail;