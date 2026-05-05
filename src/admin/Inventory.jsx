import {useState, useEffect} from 'react'
import axios from 'axios'
import ApparelToolbar from '../components/ApparelToolbar'
import sampleimage from '../assets/test.png'
import CategoryRadio from '../components/ui/CategoryRadio'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
const  Inventory = () => { 
   // cloudinary
   const [previewImage, setPreviewImage] = useState("");
   const [selectImage, setSelectImages] = useState(null);
   const [imageFile, setImageFile] = useState(null);
   const [originalImage, setOriginalImage] = useState(null);
   const [removedBgImage, setRemovedBgImage] = useState(null);
   
  //  loading RemoverBackground
  const [loading, setLoading] = useState(false);
  // ModalEnhancer  
  const [modalEnhance, setModalEnchance] = useState(false);
  
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
  setForm({ ...form, image: file });
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.price || !form.stock || !form.image) {
    alert('Required all');
    return;
  }

  const formData = new FormData();
  formData.append("name",  form.name);
  formData.append("price", form.price);
  formData.append("stock", form.stock);
  formData.append("image", form.image);
  formData.append("category_id", form.category_id);

  try {
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
    fetchProducts();
  } catch (err) {
    console.log(err);
    alert("Error adding product");
  }
};

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
  } catch (err) {
    console.log(err);
    alert("Error adding category");
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
    const formData = new FormData();
    formData.append("image", imageFile);
    
    const res = await axios.post("http://localhost:3000/api/removebg", formData);
    
    const base64Url = res.data.image; 
    setPreviewImage(base64Url); 
    setRemovedBgImage(base64Url);
    
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
    <div className='min-h-screen p-5 bg-white dark:bg-[#121A2B]'>
     <ApparelToolbar/>
     
    <div className='flex justify-end mt-5'>
    <button className='bg-gray-50 px-6 shadow hover:bg-green-500 hover:text-white py-2 rounded-full'
     onClick={() => setInventory(true) 
     }>
     Add Product
     </button>
    </div>
     {inventory && ( 
      <div className='fixed overflow-x-auto h-screen bg-white w-400 shadow mx-auto p-5 inset-0 flex flex-col'>
      <h1 className='text-2xl'>Create Item</h1>   
          <button onClick={() => setInventory(false)} 
     className=' absolute right-2 top-1 bg-gray-100 h-10 w-10 rounded-full hover:bg-red-600 hover:text-white shadow'>
      X
      </button>
        {/*image viewing  */}
     <div className='flex w-full gap-10'>   
     
     <div class="w-300 h-120 overflow-hidden mt-5 border-2 border-dashed border-gray-200 rounded-xl">
    <div className='bg-gray-50 flex items-center justify-center text-gray-400 h-120'>

    {selectImage ? ( 
     <img src={selectImage} 
      class="w-full z-10 h-full object-contain"
      />
    ) :(
     <h1 className='absolute'>No images Selected</h1> 
     )}
     
     </div>
     </div>
     
     <div className='shadow w-200 overflow-hidden rounded-xl h-130'>
     <div className='h-100 relative flex justify-end bg-gray-50'>
      
      {/* Modal Enhance  */}
    <button
      onClick={() => {
        if (loading) return;
        setModalEnchance(true);
      }}
      className={`absolute top-2 bg-gray-50 px-6 py-2 shadow ${
        loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      disabled={loading}
    >
      Enhance?
    </button>

      {modalEnhance && (
       <div className='fixed z-10  inset-0 flex items-center justify-center'>
        <div className='bg-white relative flex flex-col gap-2 items-center w-[20rem] shadow p-3 rounded'>
         <button
          className='absolute cursor-pointer -top-3 -right-3 bg-red-500 w-8 h-8 rounded-full text-white'
          onClick={() =>
          setModalEnchance(false)
          }>
          X
          </button>

         <button className='bg-gray-100 w-full py-2 rounded-full'>Remove Background</button>
         <button className='bg-gray-100 w-full rounded-full py-2'>AI Generate Background</button>
        </div>
       </div> 
      )}
    
    {/* laoding with animation */}
    {loading ? (
      <div className="flex w-full justify-center items-center">
        <DotLottieReact
          src="https://lottie.host/4d3db2ba-0504-4ea0-b045-0903895872a6/zD69dN0v3b.lottie"
          loop
          autoplay
          style={{ width: 150, height: 150 }}
        />
      </div>
    ) : previewImage ? (
      <img 
        src={previewImage} 
        className="w-full h-full object-scale-down"
      />
    ) : (
      <h1>No image</h1>
    )}
      </div>
      <div className='p-2 relative'>
      <h1>AI Suggestions Background</h1>
      
      <div className='flex gap-2'>
      {originalImage && (
      <div> 
      <img className='cursor-pointer w-14 h-14 '
       onClick={() => handleSelectImage(originalImage)}
       src={originalImage} 
      />
  
      <p className='text-sm'>Original</p>
      </div>
      )}

      {/* result bg-removed */}
      {removedBgImage && (
        <div>
          <div
        onClick={() => handleSelectImage(removedBgImage)}
        className="cursor-pointer text-center"
      >
        <img
          src={removedBgImage}
          className={`w-14 h-14 object-cover border ${
            selectImage === removedBgImage ? "border-blue-500" : "border-gray-200"
          }`}
        />
        <p className="text-xs">No BG</p>
      </div>
        </div>
      )}
</div>

      {/*Upload Image */}
      <div className='flex absolute top-16 right-5  justify-end'>
      <label className="cursor-pointer bg-gray-100 text-gray-600 px-5 py-2 rounded-full inline-block">
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
     
     {/* Category */}
     <div className='flex gap-3 items-center'>
     <h1 className='text-2xl'>Category</h1>
     <button onClick={() => setmodalCategories(true)} className='bg-gray-50 shadow w-8 h-8 rounded-full'>+</button>
    </div>

    {modalCategories && (
    <div className="fixed z-10  inset-0 flex items-center justify-center">
    <div className="w-[20rem] h-40 bg-white shadow p-3 rounded-xl">
    <div className='flex justify-end'>
    
    <button onClick={() => setmodalCategories(false)} className='bg-gray-100 w-8 h-8 rounded-full shadow '>X</button>
    </div>
    <div className='flex gap-2 flex-col justify-center'>
      <h1 className='flex gap-2'><span className='text-red-600'>*</span>Add Categories</h1>
      <input
      className='border border-gray-300 outline-none py-1 px-4 rounded-sm'
      type="text"
      placeholder="eg: Ball Gowns"
      value={categoryName}
      onChange={(e) => setCategoryName(e.target.value)}
      />
      <button className='bg-gray-200 rounded-xl py-1' type="button" onClick={addCategory}>Add</button>
    </div>
  </div>
  </div>
    )}
        
      <CategoryRadio
      categories={categories}
      selected={selected}
      handleSelect={handleSelect}
      />

    <h1 className='text-2xl mt-4'>Main Details</h1>
      <form className='' onSubmit={handleSubmit}>
       <div className='flex gap-5'>
        <input
          className='border w-full outline-none border-gray-200 px-5 py-2 rounded-lg'
          type="text"
          name="name"
          placeholder="e.g Long Gown"
          onChange={handleChange}
        />

        <input
          className='border w-full outline-none border-gray-200 px-5 py-2 rounded-lg'
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />
        </div>

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
        />

        {/* <input
          type="file"
          name="image"
          onChange={handleFileChange}
        /> */}
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
      />

{previewImage && (
  <div className="mt-3">
    <img src={previewImage} className="w-40 border" />

   <button
  type="button"
  onClick={handleRemoveBg}
>
  Remove Background
</button>
  </div>
)}

{usage && (
  <p className="text-sm text-gray-500">
    {usage.used} / {usage.limit} Free Previews Used
  </p>
)}
    <button
     type="submit"
     disabled={!selectImage}
     className={`${!selectImage ? 'opacity-50 cursor-not-allowed' : '' }`}
     >
     Upload
    </button>
      </form>
      
      </div>  
    )}

     {/* table */}
     <div className=' bg-gray-50 p-5 mt-5'>
     <table className='w-full'>
     <thead>
      <tr className='text-gray-500  border-b border-gray-300'>
        <th></th>
        <th>ID</th>
        <th className='w-5'>Image</th>
        <th className='w-28'>Products</th> 
        <th>Price</th>
        <th>Available</th>
        <th>CreatedAt</th>
        <th>Action</th>
      </tr>
      </thead> 

      <tbody>
      {products.map((item) => (
        
      <tr key={item.id} className=' text-center border-b border-gray-300'>
        
        {/*delelete checkbox  */}
         <td>
        <input
         type="checkbox"
         name="" 
         id=""
          />
</td>    
       <td>{item.id}</td>
       <td>{item.image && (
      <img className='w-20 mx-auto' src={item.image} alt="" />
       )}</td>
       <td className=' text-nowrap'>{item.name}</td>
       <td>₱{item.price}</td>
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