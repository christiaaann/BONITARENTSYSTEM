import {useState, useEffect} from 'react'
import axios from 'axios'
import ApparelToolbar from '../components/ApparelToolbar'
import sampleimage from '../assets/test.png'
import CategoryRadio from '../components/ui/CategoryRadio'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Pencil, Trash2 } from 'lucide-react'
const  Inventory = () => { 
   // cloudinary
   const [previewImage, setPreviewImage] = useState(null);
   const [selectImage, setSelectImages] = useState(null);
   const [imageFile, setImageFile] = useState(null);
   const [originalImage, setOriginalImage] = useState(null);
   const [removedBgImage, setRemovedBgImage] = useState(null);

   const [editId, setEditId] = useState(null);
    //  loading RemoverBackground
   const [loading, setLoading] = useState(false);
    // ModalEnhancer  
   const [modalEnhance, setModalEnchance] = useState(false);
  
  // test muna
  const [standardDays, setStandardDays] = useState("");
  const [extraFee, setExtraFee] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [hasSize, setHasSize] = useState(false);
  const [hasFitting, setHasFitting] = useState(false);

  // select image
  const handleSelectImage = async (img) => {
  setSelectImages(img); // display

  // convert image URL → File 
  const response = await fetch(img);
  const blob = await response.blob();
  const file = new File([blob], "selected.png", { type: blob.type });

  setForm({ ...form, image: file }); 
}; 

   const [inventory, setInventory] = useState(false);
   
   const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    final_price: "",
    stock: "",
    image: "",
    category_id: ""
});

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};


const handleFileChange = (e) => {
  const file = e.target.files[0];
  const preview = URL.createObjectURL(file);
  
  setOriginalImage(preview);
  setPreviewImage(preview); //display
  // setSelectImages(preview) // AUTO SELECT
  setImageFile(file);
  setSelectImages(null);
  // setForm({ ...form, image: file });
};

// submit product


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.price || !form.stock) {
    alert('Required all');
    return;
  }

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("price", form.price);
  formData.append("discount", form.discount || 0);
  formData.append("final_price", discountedPrice);
  formData.append("stock", form.stock);

  // image optional sa edit
  if (form.image instanceof File) {
    formData.append("image", form.image);
  }

  formData.append("category_id", form.category_id);

  try {

    // EDIT
    if (editId) {

      const res = await axios.put(
        `http://localhost:3000/api/apparel/${editId}/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(res.data);

      alert("Product updated!");

      setEditId(null);

    } else {

      // ADD
      const res = await axios.post(
        "http://localhost:3000/api/apparel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(res.data);

      alert("Product added!");
    }

    fetchProducts();
    setForm({
    name: "",
    price: "",
    discount: "",
    final_price: "",
    stock: "",
    image: "",
    category_id: ""
  });

  setPreviewImage(null);
  setSelectImages(null);
  setImageFile(null);
  setOriginalImage(null);
  setRemovedBgImage(null);
  setSelected("");
  setEditId(null);
  setInventory(false);
  
  } catch (err) {
    console.log(err);
    alert("Error saving product");
  }
};

// edit product
const handleEdit = (item) => {
  setForm({
    name: item.name,
    price: item.price,
    discount: item.discount,
    final_price: item.final_price,
    stock: item.stock,
    image: item.image,
    category_id: item.category_id
  });
  setForm(item);
  setEditId(item.id);
  setSelected(item.category_id);
  setPreviewImage(item.image);
  setSelectImages(item.image);
  setOriginalImage(item.image);
  setInventory(true);
};


// discount prices
const price = Number(form.price) || 0;
const discount = Number(form.discount) || 0;

const discountedPrice = Math.round(price - discount);

// fetc Products
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
  try {
   const res = await fetch('http://localhost:3000/api/apparel');
   const data = await res.json();
   setProducts(data);
  }catch(err){
  console.log('Error Fetching Data', err);
  }};
  useEffect (() => {
  fetchProducts();
  }, []);

  // categories
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
 
  const addCategory = async () => {
  if (!categoryName) return alert("Enter category");

  try {
    const res = await axios.post("http://localhost:3000/api/categories", {
      name: categoryName
    });

    console.log(res.data);
    alert("Category added!");

    setCategoryName("");
    fetchCategories();
    setmodalCategories(false);
  } catch (err) {
    console.log(err);
    alert("Category Already Exits");
  }
};
 

const fetchCategories = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories");
    const data = await res.json();
    setCategories(data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchCategories();
}, []);


// select categories
const [selected, setSelected] = useState('');
const handleSelect = (id) => {
  setSelected(id);

  handleChange({
    target: {
      name: "category_id",
      value: id,
    },
  });
};
// modal adding categories
const [modalCategories, setmodalCategories] = useState(false);


const handleRemoveBg = async () => {
  try {
    setLoading(true);

    let fileToSend = imageFile;

    // 🔥 if edit mode or walang bagong upload → convert existing image
    if (!fileToSend && originalImage) {
      const resFile = await fetch(originalImage);
      const blob = await resFile.blob();
      fileToSend = new File([blob], "edit-image.png", { type: blob.type });
    }

    const formData = new FormData();
    formData.append("image", fileToSend);
    
    const res = await axios.post("http://localhost:3000/api/removebg", formData);
    
    const base64Url = res.data.image; 
    setPreviewImage(base64Url); 
    setRemovedBgImage(base64Url);
    
    handleSelectImage(base64Url);
    const response = await fetch(base64Url);
    const blob = await response.blob();
    const file = new File([blob], "removed_bg.png", { type: "image/png" });

    // I-update ang state. FILE pa rin ito, hindi pa ito naka-upload sa Cloudinary.
    setForm({ ...form, image: file }); 
    
    alert("Background removed (preview only). Click Upload to save!");
  } catch (err) {
    console.error(err);
  }finally{
   setLoading(false); 
  }
};  


// delete item
const deleteProduct = async (id) => {
  const confirmDelete = confirm("Are you sure you want to Delete?");
  if(!confirmDelete) return;

  try {
    await fetch(`http://localhost:3000/api/apparel/${id}/delete`, {
      method: 'DELETE'
    });

    alert('Deleted');
    fetchProducts();

  } catch (error) {
    console.error(error);
  }
};


const [usage, setUsage] = useState(null);
useEffect(() => {


  const fetchUsage = async () => {
    const res = await fetch("http://localhost:3000/api/removebg/usage");
    const data = await res.json();
    setUsage(data);
  };

  fetchUsage();
}, []);
  
  
  return (
    <>
    <div className='min-h-screen bg-white dark:bg-[#121A2B]'>
     <ApparelToolbar/>
     
    <div className='flex justify-end mt-5'>
    <button className='bg-gray-50 px-6 shadow hover:bg-green-500 hover:text-white py-2 rounded-full'
     onClick={() => setInventory(true) 
     }>
     Add Product
     </button>
    </div>
{inventory && ( 
  <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
    <div className='bg-white w-full max-w-7xl h-[90vh] overflow-y-auto shadow-2xl rounded-2xl relative flex flex-col animate-in zoom-in duration-200'>
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-20">
        <div>
          <h1 className='text-xl font-black text-gray-800 tracking-tight uppercase'>Create New Item</h1>
          <p className="text-xs text-gray-400 font-bold uppercase">Inventory Management</p>
        </div>
        <button 
          onClick={() => {
            setInventory(false);
            setSelected(null);
            setPreviewImage(null);
            setSelectImages(null);
            setEditId(null);
            setOriginalImage(null);
            setForm({
              name: "",
              price: "",
              discount: "",
              final_price: "",
              stock: "",
              image: "",
              category_id: ""
            });
          }} 
          className='bg-gray-50 h-10 w-10 rounded-full hover:bg-red-600 hover:text-white flex items-center justify-center font-black transition-all border border-gray-200/60 shadow-sm text-gray-500'
        >
          &times;
        </button>
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* IMAGE AREA SECTION */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'> 
          
          {/* Main Selected Image Viewer */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400">Selected Product Preview</label>
            <div className="w-full h-64 overflow-hidden border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 flex items-center justify-center relative group">
              {selectImage ? ( 
                <img src={selectImage} className="w-full h-full object-contain p-4 z-10" alt="Selected Item" />
              ) : (
                <div className="text-center p-4">
                  <p className="text-sm font-bold text-gray-400">No image selected for upload</p>
                  <p className="text-[10px] text-gray-300 uppercase mt-1">Please upload or choose below</p>
                </div>
              )}
            </div>
          </div>
          
          {/* AI Image Tools and Dynamic Previews */}
          <div className='border rounded-2xl bg-white border-gray-200 overflow-hidden h-64 flex flex-col shadow-sm relative group'>
            <div className='h-44 relative flex items-center justify-center bg-gray-50 border-b border-gray-100 p-4'>
              
              {/* Modal Enhance Button */}
              <button
                onClick={() => {
                  if (loading) return;
                  setModalEnchance(true);
                }}
                className={`absolute top-3 right-3 bg-white border border-gray-200 px-4 py-1.5 rounded-xl shadow-sm text-xs font-black text-[#2D5B60] uppercase transition-all hover:bg-[#2D5B60] hover:text-white ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                disabled={loading}
              >
                ✨ Enhance?
              </button>

              {/* Enhanced Action Popup */}
              {modalEnhance && (
                <div className='absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4'>
                  <div className='bg-white relative flex flex-col gap-2 items-center w-full max-w-[16rem] shadow-xl p-4 rounded-2xl animate-in zoom-in-95 duration-150'>
                    <button
                      className='absolute cursor-pointer -top-2 -right-2 bg-red-500 hover:bg-red-600 w-7 h-7 rounded-full text-white font-bold text-sm shadow flex items-center justify-center'
                      onClick={() => setModalEnchance(false)}
                    >
                      &times;
                    </button>
                    <button className='bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs w-full py-2.5 rounded-xl transition-all border border-gray-200/60'>Remove Background</button>
                    <button className='bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs w-full py-2.5 rounded-xl transition-all border border-gray-200/60'>AI Generate Background</button>
                  </div>
                </div> 
              )}
            
              {/* Loading Logic Animation / Preview Handler */}
              {loading ? (
                <div className="flex w-full justify-center items-center">
                  <DotLottieReact
                    src="https://lottie.host/4d3db2ba-0504-4ea0-b045-0903895872a6/zD69dN0v3b.lottie"
                    loop
                    autoplay
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              ) : previewImage ? (
                <img src={previewImage} className="w-full h-full object-contain" alt="Process Preview" />
              ) : (
                <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Process monitor idle</p>
              )}
            </div>

            {/* AI Background Suggestions Thumbnails panel */}
            <div className='p-3 bg-white flex justify-between items-center gap-4 flex-1'>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-gray-400 leading-none">AI Suggestions</span>
                <span className="text-[11px] font-bold text-gray-700 mt-0.5">Background options</span>
              </div>
              
              <div className='flex gap-2 items-center overflow-x-auto max-w-[65%] py-1'>
                {originalImage && (
                  <div className="text-center shrink-0"> 
                    <img 
                      className='cursor-pointer w-10 h-10 object-cover rounded-lg border border-gray-200 hover:border-[#2D5B60] transition-all'
                      onClick={() => handleSelectImage(originalImage)}
                      src={originalImage} 
                      alt="Original"
                    />
                    <p className='text-[8px] font-bold text-gray-400 uppercase mt-0.5'>Original</p>
                  </div>
                )}

                {/* Result Background Removed Thumbnail */}
                {removedBgImage && (
                  <div className="text-center shrink-0">
                    <img
                      src={removedBgImage}
                      onClick={() => handleSelectImage(removedBgImage)}
                      className={`w-10 h-10 object-cover rounded-lg border transition-all ${
                        selectImage === removedBgImage ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
                      }`}
                      alt="No Background"
                    />
                    <p className="text-[8px] font-bold text-gray-400 uppercase mt-0.5">No BG</p>
                  </div>
                )}
              </div>

              {/* Upload Native Input File Trigger Button */}
              <div className='shrink-0'>
                <label className="cursor-pointer bg-[#2D5B60] hover:bg-black text-white text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-xl inline-block shadow-sm transition-all">
                  Upload Image
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>        
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />
         
        {/* CATEGORY SELECTOR WRAPPER */}
        <div className="space-y-3">
          <div className='flex gap-3 items-center'>
            <div className="flex flex-col">
              <h1 className='text-lg font-black text-gray-800 uppercase tracking-tight'>Product Category</h1>
              <p className="text-xs text-gray-400 font-bold uppercase leading-none">Classify your new stock</p>
            </div>
            <button 
              onClick={() => setmodalCategories(true)} 
              className='bg-[#2D5B60]/10 text-[#2D5B60] hover:bg-[#2D5B60] hover:text-white w-7 h-7 rounded-full flex items-center justify-center font-black text-lg shadow-sm transition-all'
            >
              +
            </button>
          </div>

          {/* Add Category Dialog Popup Panel */}
         {modalCategories && (
            <div className="fixed z-50 inset-0  flex items-center justify-center p-4">
              <div className="w-full max-w-4xl bg-white shadow-2xl p-6 rounded-2xl border border-gray-100 animate-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
                
                {/* Header Title */}
                <div className='flex justify-between items-center border-b pb-3 mb-4'>
                  <div>
                    <h3 className="font-black text-gray-800 uppercase text-sm tracking-tight">Add Custom Category</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Setup Category Specifications & Rules</p>
                  </div>
                  <button 
                    onClick={() => setmodalCategories(false)} 
                    className='bg-gray-100 hover:bg-gray-200 w-7 h-7 rounded-full shadow-sm font-bold text-gray-500 flex items-center justify-center transition-all'
                  >
                    &times;
                  </button>
                </div>
                
                {/* Inputs Container */}
                <div className='flex gap-4 flex-col text-left'>
                  
                  {/* Name Input */}
                  <div className="flex flex-col gap-1">
                    <label className='text-[10px] font-black uppercase text-gray-400 flex gap-1'>
                      <span className='text-red-600'>*</span>Category Name
                    </label>
                    <input
                      className='border border-gray-200 focus:border-[#2D5B60] outline-none py-2 px-4 rounded-xl bg-gray-50 text-sm'
                      type="text"
                      placeholder="e.g., Gown, Barong, Gear"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>

                  {/* Standard Days & Extra Fee Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Standard Days Input */}
                    <div className="flex flex-col gap-1">
                      <label className='text-[10px] font-black uppercase text-gray-400'>Standard Rental Days</label>
                      <input
                        className='border border-gray-200 focus:border-[#2D5B60] outline-none py-2 px-4 rounded-xl bg-gray-50 text-sm'
                        type="number"
                        placeholder="e.g., 3"
                        value={standardDays} // Siguraduhing may state ka nito sa taas ng parent component
                        onChange={(e) => setStandardDays(e.target.value)}
                      />
                    </div>

                    {/* Extra Fee Input */}
                    <div className="flex flex-col gap-1">
                      <label className='text-[10px] font-black uppercase text-gray-400'>Extra Fee(₱)</label>
                      <input
                        className='border border-gray-200 focus:border-[#2D5B60] outline-none py-2 px-4 rounded-xl bg-gray-50 text-sm'
                        type="number"
                        placeholder="e.g., 300"
                        value={extraFee} // Siguraduhing may state ka nito sa taas ng parent component
                        onChange={(e) => setExtraFee(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Security Deposit Input */}
                  <div className="flex flex-col gap-1">
                    <label className='text-[10px] font-black uppercase text-gray-400'>Security Deposit (₱)</label>
                    <input
                      className='border border-gray-200 focus:border-[#2D5B60] outline-none py-2 px-4 rounded-xl bg-gray-50 text-sm'
                      type="number"
                      placeholder="e.g., 1000"
                    value={securityDeposit} // Siguraduhing may state ka nito sa taas ng parent component
                      onChange={(e) => setSecurityDeposit(e.target.value)}
                    />
                  </div>
  
                  {/* Boolean Toggles/Checkboxes for Size & Fitting */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200/60 mt-1">
                    {/* Has Size Toggle */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hasSize"
                        className="w-4 h-4 text-[#2D5B60] focus:ring-[#2D5B60] border-gray-300 rounded cursor-pointer"
                        checked={hasSize} // Siguraduhing may state ka nito sa taas ng parent component
                        onChange={(e) => setHasSize(e.target.checked)}
                      />
                      <label htmlFor="hasSize" className="text-xs font-black uppercase text-gray-600 cursor-pointer select-none">
                        Has Size?
                      </label>
                    </div>

                    {/* Has Fitting Toggle */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hasFitting"
                        className="w-4 h-4 text-[#2D5B60] focus:ring-[#2D5B60] border-gray-300 rounded cursor-pointer"
                        checked={hasFitting} // Siguraduhing may state ka nito sa taas ng parent component
                        onChange={(e) => setHasFitting(e.target.checked)}
                      />
                      <label htmlFor="hasFitting" className="text-xs font-black uppercase text-gray-600 cursor-pointer select-none">
                        Has Fitting?
                      </label>
                    </div>
                  </div>

                  {/* Submit Action Button */}
                  <button 
                    className='bg-[#2D5B60] hover:bg-black text-white font-black uppercase text-xs py-3.5 rounded-xl shadow-sm transition-all mt-4' 
                    type="button" 
                    onClick={addCategory}
                  >
                    Save Category
                  </button>
                </div>

              </div>
            </div>
          )}
              
          <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
            <CategoryRadio
              categories={categories}
              selected={selected}
              fetchCategories={fetchCategories}
              handleSelect={handleSelect}
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* CORE FORM FIELDS VALUES INVENTORY */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <h1 className='text-lg font-black text-gray-800 uppercase tracking-tight'>Main Details</h1>
            <p className="text-xs text-gray-400 font-bold uppercase leading-none">Fill in pricing and product metrics</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className='grid grid-cols-2 gap-4'>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Product Name</label>
                <input
                  className='border outline-none focus:border-[#2D5B60] border-gray-200 px-4 py-2.5 bg-gray-50/50 rounded-xl text-sm'
                  type="text"
                  name="name"
                  placeholder="e.g., Long Wedding Gown"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Price</label>
                <input
                  className='border outline-none focus:border-[#2D5B60] border-gray-200 px-4 py-2.5 bg-gray-50/50 rounded-xl text-sm'
                  type="number"
                  name="price"
                  placeholder="0"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm  text-gray-400">Discount ?</label>
                <input
                  className='border outline-none focus:border-[#2D5B60] border-gray-200 px-4 py-2.5 bg-gray-50/50 rounded-xl text-sm'
                  type="number"
                  name="discount"
                  placeholder="Optional Discount"
                  value={form.discount}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Dynamic Calculated Financial Preview Panel Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-gray-400">Calculated Metrics</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs font-bold text-gray-500">Final Price:</span>
                  <span className="text-xl font-black text-[#2D5B60]">
                    ₱{(discountedPrice || form.price || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase text-gray-500">Available Physical Stock</label>
                <input
                  type="number"
                  name="stock"
                  placeholder="Available Stocks"
                  value={form.stock}
                  onChange={handleChange}
                  className="border outline-none focus:border-[#2D5B60] border-gray-200 px-4 py-2 bg-white rounded-xl text-sm w-full md:max-w-48 self-start md:self-end"
                />
              </div>
            </div>

            {/* Legacy Hidden File Input Nodes Elements to safe keep handler parameters bindings */}
            <div className="hidden">
              <input type="file" name="image" onChange={handleFileChange} />
            </div>

            {/* AI Background Removers Standalone Monitoring View Section blocks */}
            {previewImage && (
              <div className="p-4 border border-dashed rounded-2xl bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={previewImage} className="w-16 h-16 object-cover rounded-xl border bg-white p-1" alt="Preview context" />
                  <div>
                    <p className="text-xs font-black uppercase text-gray-700">Background Action Ready</p>
                    <p className="text-[11px] text-gray-400 font-medium">Isolate product subject node instantly</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveBg}
                  className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all w-full sm:w-auto text-center"
                >
                  ✂️ Extract Subject Background
                </button>
              </div>
            )}

            {/* AI Api Usage Indicators Blocks layout */}
            {usage && (
              <div className="flex justify-end">
                <p className="text-[11px] font-bold text-gray-400 uppercase bg-gray-100 px-3 py-1 rounded-full">
                  ⚡ AI Tokens: {usage.used} / {usage.limit} Free Previews Used
                </p>
              </div>
            )}

            {/* PRIMARY FORM ACTION SUBMISSION BUTTON TRIGGER FOOTER */}
            <div className="border-t pt-4 flex justify-end">
              <button
                type="submit"
                disabled={!selectImage && !editId}
                className={`w-full md:w-auto px-10 py-3.5 rounded-xl font-black uppercase text-xs tracking-wider shadow-md transition-all text-white ${
                  !selectImage && !editId
                    ? 'bg-gray-300 opacity-60 cursor-not-allowed shadow-none'
                    : 'bg-[#2D5B60] hover:bg-black cursor-pointer'
                }`}
              >
                {editId ? '💾 Update Product Profile' : '🚀 Publish Item To Store'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>  
  </div>
)}


     {/* table */}
     <div className=' bg-gray-50 p-5 mt-5'>
     <table className='w-full'>
     <thead>
      <tr className='text-gray-500  border-b border-gray-300'>
        {/* <th></th> */}
        <th>ID</th>
        <th className='w-5'>Image</th>
        <th className='w-28'>Products</th> 
        <th>Price</th>
        <th>Available</th>
        <th>CreatedAt</th>
        <th>Categories</th>
        <th>Action</th>
      </tr>
      </thead> 

      <tbody>
      {products.map((item) => (
        
      <tr key={item.id} className=' text-center border-b border-gray-300'>
        
        {/*delelete checkbox  */}
         {/* <td>
        <input
         type="checkbox"
         name="" 
         id=""
          />
       </td> */}
           
       <td>{item.id}</td>
       <td>{item.image && (
      <img className='w-20 mx-auto' src={item.image} alt="" />
       )}</td>
       <td className=' text-nowrap'>{item.name}</td>
       
       {/* prices */}
      <td>
      {item.discount > 0 ? (
        <div className='flex gap-2 justify-center'>
        <span className='line-through text-gray-500'>
         ₱{item.price}
         </span>
         <span className='text-green-600 font-semibold'>
          ₱{item.final_price}
         </span>
        </div>
      ):(
      <span className='text-green-600 font-semibold'>₱{item.final_price}</span>
      )}
      </td>
       
       <td>{item.stock}</td>
     <td>
     {new Date(item.created_at).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
      })}
      </td>
      <td>
       {item.category_name} 
      </td>
     
    <td className='flex gap-2 justify-center items-center h-21 '>
      <button
      onClick={() => handleEdit(item)}
      className=' cursor-pointer'
      >
      <Pencil strokeWidth={1} />
    </button>
      
      <button
       className=' cursor-pointer'
       onClick={() =>deleteProduct(item.id)}
       >
       <Trash2 color='red' strokeWidth={1}/> 
     </button>
     
      </td>
      </tr> 
      ))}
     </tbody>
     </table>
     </div>
    </div>
    </>
  )
}

export default Inventory