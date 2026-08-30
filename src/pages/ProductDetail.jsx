import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProductDetail = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [product, setProduct] = useState(null);
   
   // Rental States
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [selectedSize, setSelectedSize] = useState('');
   const [agreeTerms, setAgreeTerms] = useState(false);

   useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/api/apparel/${id}`)
         .then(res => res.json())
         .then(data => {
            setProduct(data);
            if (data?.size && !data.size.includes(',')) {
               setSelectedSize(data.size.trim());
            }
         })
         .catch(err => console.error("Error fetching product:", err));
   }, [id]);

   if (!product) {
      return (
         <h1 className='text-center mt-20 text-xl font-serif text-amber-900/60 tracking-widest animate-pulse'>
            Loading Bonita Piece...
         </h1>
      );
   }

   const categoryName = (product.category_name || product.category || 'Gear').trim();
   const categoryLower = categoryName.toLowerCase();
   const isAvailable = (product.availability_status || 'Available').toLowerCase() === 'available';

   // Parse size array mula sa DB field (hal. "S, M, L")
   const availableSizes = product.size 
      ? product.size.split(',').map(s => s.trim()) 
      : [];

   // Kukunin ang stock ng napiling size, o ang totalstock kung wala pang na-select
   const currentStock = selectedSize
  ? product.variants
      ?.filter(v => v.size === selectedSize)
      .reduce((sum, v) => sum + Number(v.stock || 0), 0)
  : product.totalstock;   

   // Base Config mula sa DB + Category Rules
   const isGownOrDress = categoryLower.includes('gown') || categoryLower.includes('dress');
   const isApparel = categoryLower.includes('apparel') || categoryLower.includes('suit') || categoryLower.includes('clothes');

   const config = {
      standardDays: (isGownOrDress || isApparel) ? 3 : 2,
      extraFeePerDay: isGownOrDress ? 300 : isApparel ? 200 : (Number(product.final_price || product.price) || 0),
      securityDeposit: Number(product.security_deposit) > 0 
         ? Number(product.security_deposit) 
         : (isGownOrDress ? 1000 : isApparel ? 500 : 200),
      hasSize: availableSizes.length > 0 || Boolean(product.size),
      label: categoryName,
      policyText: (isGownOrDress || isApparel)
         ? '*Standard initial duration is 3 days. Extension fee applies per extra day.'
         : '*Daily rental rate applies. Standard extension fee is calculated per additional day.'
   };

   // Helper: Bilangin ang araw ng rental
   const getDaysCount = () => {
      if (!startDate || !endDate) return 0;
      const diffTime = Math.abs(endDate - startDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
   };

   // Helper: Total rental calculation
   const calculateTotalPrice = () => {
      const diffDays = getDaysCount();
      const basePrice = Number(product.final_price || product.price) || 0;
      
      if (diffDays <= config.standardDays) {
         return basePrice;
      }
      const extraDays = diffDays - config.standardDays;
      return basePrice + (extraDays * config.extraFeePerDay);
   };

   const toggleSize = (size) => {
      setSelectedSize((currentSize) => currentSize === size ? '' : size);
   };

   const handleAction = () => {
      if (!isAvailable) {
         alert('Paumanhin, kasalukuyang hindi available ang item na ito.');
         return;
      }
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
         itemCode: product.item_code || 'N/A',
         productName: product.name,
         category: config.label,
         color: product.color || 'N/A',
         size: config.hasSize ? selectedSize : (product.size || 'N/A'),
         rentalStart: startDate.toLocaleDateString(),
         rentalEnd: endDate.toLocaleDateString(),
         totalDays,
         totalPrice: finalPrice,
         securityDeposit: config.securityDeposit,
         method: 'online'
      };

      console.log("Rental Payload:", rentalData);

      alert(`⚡ Naidagdag na sa Rental Cart!\n\nItem Code: ${product.item_code || 'N/A'}\nDuration: ${totalDays} Day/s\nTotal Rental Fee: ₱${finalPrice.toLocaleString()}\n*May hiwalay na ₱${config.securityDeposit.toLocaleString()} security deposit upon pickup/delivery.`);
   };

   return (
      <div className='min-h-screen bg-stone-50/40 flex flex-col md:flex-row gap-10 p-2 max-w-6xl mx-auto items-start selection:bg-amber-900/10'>
         
         {/* Left Side: Product Image Card */}
         <div className='w-full md:w-1/2 flex items-center justify-center sticky top-8 group transition-all duration-500'>
            <img
               className='md:h-150 h-96 object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]' 
               src={product.image} 
               alt={product.name} 
            />
         </div>

         {/* Right Side: Details & Rental Options */}
         <div className='w-full md:w-1/2 flex flex-col gap-6 z-10 bg-white border border-stone-200/60 rounded-2xl p-5'>
            
            {/* Header Section */}
            <div className='flex flex-col items-start gap-1.5'>

               {/* <div className='flex items-center gap-2 mt-1'>
                  <p className={`rounded-full px-2.5 py-0.5 border-dashed border font-serif text-xs ${
                     isAvailable 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                        : 'bg-rose-50 text-rose-700 border-rose-300'
                  }`}>
                     {product.availability_status || (product.totalstock > 0 ? 'Available' : 'Out of Stock')} 
                     ({product.totalstock || 0} in stock)
                  </p>

                  {product.color && (
                     <p className='bg-stone-100 text-stone-700 rounded-full px-2.5 py-0.5 border border-stone-200 text-xs font-sans'>
                        🎨 {product.color}
                     </p>
                  )}
               </div> */}
               
         
            <h1 className='text-stone-900 text-3xl font-semibold tracking-wide'>{product.name}</h1>  
             
            </div>

            {/* Pricing Area */}
            <div className='bg-stone-50/60 p-4 rounded-xl border border-stone-100/80 backdrop-blur-sm'>
             <div className='flex gap-2 items-baseline'>
               <span className='text-stone-900 font-semibold  text-3xl tracking-tight transition-all duration-300'>
                  ₱{calculateTotalPrice().toLocaleString()}
               </span>

               {/* 2. Original Price */}
               {Number(product.discount) > 0 && (
                  <span className='line-through text-stone-300'>
                     ₱{Number(product.price).toLocaleString()}
                  </span>
               )}

               {/* 3. Rental Duration Label */}
               <span className='text-xs text-stone-400 font-sans tracking-wide ml-1 uppercase font-medium'>
                  {getDaysCount() > 0 ? `/ ${getDaysCount()} Day Rental` : `/ ${config.standardDays}-Day Rental`}
               </span>

               {Number(product.discount) > 0 && (
                     <span className='px-3 py-1 text-sm bg-black text-white tracking-wider'>
                        SAVE ₱{Number(product.discount)}
                     </span>
               )}
            </div>
               {getDaysCount() > 0 && (
                  <div className='mt-2 text-xs font-sans border-t border-stone-200/50 pt-2 transition-all duration-300'>
                     {getDaysCount() <= config.standardDays ? (
                        <p className='text-sm'>
                           Standard {config.standardDays}-day rate applied.
                        </p>
                     ) : (
                        <p className='text-amber-800 font-medium flex flex-col gap-0.5'>
                           <span className='flex items-center gap-1'>Extended Duration Rate:</span>
                           <span className='text-stone-500 font-normal pl-3'>
                              Base {config.standardDays} Day/s + ({getDaysCount() - config.standardDays}) extra days multiplied by ₱{config.extraFeePerDay}/day.
                           </span>
                        </p>
                     )}
                  </div>
               )}

               <p  className='mt-2 text-sm flex items-center'>
                  <span className='text-amber-800/80'></span> +₱{config.securityDeposit.toLocaleString()} Refundable Security Deposit
               </p>

            {/* stock */}
            <span className='text-stone-500 text-sm'>
             Stock: {currentStock} 
            </span>
            </div>
             
           {/* Description */}
           <div className='flex flex-col gap-1'>
            <h1 className='font-bold'>Description</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod temporibus molestias alias, perspiciatis magnam ipsum. Fuga, ipsa voluptatem facilis placeat quam libero, ut labore maxime, error quisquam itaque tenetur quod.</p>
          </div>

          {/* Color */}
          <div>
          <h1 className='font-bold'>Color</h1>
          </div>
         
          {/* Size */}
         <div>
         <h1 className='font-bold text-stone-900 mb-2'>Size</h1> 
         {product.variants && product.variants.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
               {[...new Set(product.variants.map(v => v.size))].map((size, index) => {
               // Compute total stock para sa partikular na size na ito
               const sizeStock = product.variants
                  .filter(v => v.size === size)
                  .reduce((sum, v) => sum + Number(v.stock || 0), 0);

               const isOutOfStock = sizeStock <= 0;
               const isSelected = selectedSize === size;

               return (
                  <button
                     key={index}
                     type="button"
                     disabled={isOutOfStock}
                     onClick={() => toggleSize(size)}
                     aria-pressed={isSelected}
                     className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                     isOutOfStock
                        ? 'border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed  opacity-60'
                        : isSelected
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                     }`}
                  >
                     {size}
                  </button>
               );
               })}
            </div>
         ) : (
            <span className='text-stone-400 text-sm'>N/A</span>
         )}
         </div>
         <hr className='border-stone-100/80' />

            {/* Step 1: Size Selection */}
            {config.hasSize && (
               <div className='flex flex-col gap-3'>
                  <div className='flex justify-between items-center text-xs tracking-wide'>
                     <label className='font-semibold uppercase text-stone-700 font-sans'>1. Select {config.label} Size</label>
                  </div>
                  <div className='flex gap-2 flex-wrap'>
                     {availableSizes.map((size) => (
                        <button
                           key={size}
                           type="button"
                           onClick={() => toggleSize(size)}
                           aria-pressed={selectedSize === size}
                           className={`px-4 h-11 text-xs font-semibold rounded-xl transition-all duration-300 border ${
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
                  I read and explicitly agree with the <span className='underline text-stone-800 font-medium hover:text-stone-950'>Bonita Rental Policy</span>.
               </label>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col gap-2.5 mt-2'>
               <button 
                  type="button"
                  onClick={handleAction}
                  disabled={!isAvailable}
                  className={`font-medium py-3.5 rounded-xl tracking-widest uppercase text-xs shadow-md transition-all duration-300 ${
                     isAvailable 
                        ? 'bg-stone-950 hover:bg-stone-900 text-white active:scale-[0.99]' 
                        : 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
                  }`}
               >
                  {!isAvailable ? 'Currently Unavailable' : 'Secure Online Reservation'}
               </button>

               <button 
                  type="button"
                  onClick={() => navigate('/rentalcart')}
                  className='border border-stone-200/80 hover:bg-stone-50/80 text-stone-500 py-3 text-xs tracking-widest uppercase rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1.5'
               >
                  <span>🛍️</span> Add to Rental Cart
               </button>          
            </div>

         </div> 
      </div>
   );
};

export default ProductDetail;
