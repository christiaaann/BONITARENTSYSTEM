import React, {useState, useEffect} from 'react';
import { io } from 'socket.io-client';
import UserHeader from '../components/layout/UserHeader';
import HeroSection from '../components/sections/HeroSection';
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Maximize2 } from 'lucide-react';
import googleicon from '../assets/google.png'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
const Landing = () => {
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleCompleteProfile = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:3000/api/complete-profile", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          contact,
        }),
      });

   if (res.ok) {
      const data = await res.json();
      console.log("Success:", data);

      setTimeout(() => {
        setmodalGoogleAccount(false);
        window.location.assign("/"); 
      }, 2000); 

    } else {
      setIsSubmitting(false); 
      alert("May error sa pag-save.");
    }

    } catch (err) {
      console.error(err);
    }
  };
  // fethusers
  // const [user, setUser] = useState(null);

//   useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (!token) return;

//   fetch("http://localhost:3000/api/me", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(res => res.json())
//     .then(data => {
//       setUser(data);
//     })
//     .catch(err => console.log(err));
// }, [])

  // google account
  const  [modalGooogleAccount, setmodalGoogleAccount] = useState(false);
  const [step, setStep] = useState("google"); 
  useEffect(() => {
  if (user) {
    if (user.role === "admin") return;
    //  check kung kulang profile
    if (!user.address || !user.contact) {
      setStep("complete");
      setmodalGoogleAccount(true);
    } else {
      setmodalGoogleAccount(false);
    }
  }
}, [user]);

 useEffect(() => {
  if (user === null) {
    const timer = setTimeout(() => {
      setmodalGoogleAccount(true);
    }, 1000);

    return () => clearTimeout(timer);
  }
}, [user]);


  // if user.role admin redirect "/admin"
 useEffect(() => {
  if (!user) return;

  if (user.role === "admin") {
    navigate("/admin");
  }
}, [user]);
   
  //  loginButton
   const loginWithGoogle = () => {
   window.location.href = "http://localhost:3000/auth/google";
   };



  const fetchProducts = async () => {
  try {
   const res = await fetch('http://localhost:3000/api/apparel');
   const data = await res.json();
   setProducts(data);
  }catch(err){
  console.log('Error Fetching Data', err);
  }};
  
  
useEffect(() => {
  const socket = io("http://localhost:3000", {
    withCredentials: true,
    transports: ["polling", "websocket"]
  });
  
  // productAdded
  socket.on("productAdded", (newProduct) => {
  setProducts(prev => {
  const exists = prev.some(p => p.id === newProduct.id);
  if (exists) return prev;
  return [newProduct, ...prev];
    });
  });

  // categories
  socket.on("categoryAdded", (newCategory) => {
  setCategories(prev => {
  const exists = prev.some(p => p.id === newCategory.id);
  if (exists) return prev;
  return [newCategory, ...prev];
    });  
  });
   
  // category deketed
  socket.on("categoryAdded", (categoryID) => {
  setCategories(prev => {
  const exists = prev.some(p => p.id === categoryID.id);
  if (exists) return prev;
  return [categoryID, ...prev];
    });  
  });

  return () => socket.disconnect();
}, []);



const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("");

const fetchCategories = async () => {
  const res = await fetch("http://localhost:3000/api/categories");
  const data = await res.json();
  setCategories(data);
};

useEffect(() => {
  fetchCategories();
  fetchProducts();
}, []);



  
  return (
    <>
    <section id='home'>
    <HeroSection/>  
    </section>
    
    {/* modalGooogleAccount */}
  <AnimatePresence>
  {modalGooogleAccount && (
    <motion.div
      className="fixed inset-0 z-20 flex backdrop-blur-sm items-center justify-center bg-black/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white relative rounded-xl w-150 h-150 flex flex-col gap-8 justify-center items-center shadow p-2"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 14,
          mass: 0.8,
        }}
      >
        {step === "google" && (
        <>
        <h1 className="font-serif text-5xl text-amber-900">
          BONITA
        </h1>

        <p className="w-96 font-serif text-gray-500 text-center">
          A simple and elegant rental platform for gowns, items, and more.
          Reserve what you need with ease and style.
        </p>

        <button onClick={loginWithGoogle} className="bg-gray-50 w-80 py-2 flex justify-center rounded-full gap-2 shadow cursor-pointer hover:scale-105 transition">
          <img src={googleicon} className="w-7 h-7" alt="" />
          Continue with Google
        </button>
        <footer className='text-gray-400 absolute bottom-5'>
          Develop by Christian Pretista Heje
        </footer>
        </>
       )}
       
       {step === "complete" && (
       <>
          <div className='bg-amber-900/80 flex justify-center items-center relative p-2 w-full h-96 rounded-4xl'>
          <h1 className="text-3xl font-serif text-white">
            BONITA
          </h1>
           <img 
             className='rounded-full absolute -bottom-5 left-10 border-4 border-white' 
              referrerPolicy='no-referrer'
              src={user?.picture} 
              alt="" 
          />  
          </div>
          <div className='h-full w-full pl-2'>
          <div className='flex justify-between'>
           <h1 className="text-2xl pl-5 font-serif text-amber-900">
            {user?.name}
          </h1> 
          <p className=' text-black border-dashed border bg-amber-900/10 px-4 py-2 text-sm rounded-full'>complete profile</p>

          </div>
          
          <div className=' flex flex-col gap-2 items-center mt-10'>
         {/* <input
            value={user?.name}
            className=' border border-gray-400 w-80 p-2 rounded-lg'
            onChange={(e) => setName(e.target.value)}
            type="text" 
            name="" 
            id="" /> */}
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-400 bg-amber-900/5 border-dashed w-full p-2 rounded-lg"
          />

          <input
            type="text"
            value={contact}
            placeholder="Contact Number"
            onChange={(e) => setContact(e.target.value)}
            className="border border-gray-400 bg-amber-900/5 border-dashed w-full p-2 rounded-lg"
          />
                 
        <button
           disabled={isSubmitting}
           onClick={handleCompleteProfile} 
           className="cursor-pointer bg-amber-900 w-full text-white px-6 py-3 rounded-full"
          >
         {isSubmitting ? (
    <>
    <div className='flex justify-center items-center gap-2'>
    <div className="w-5 h-5 border-2  border-white/30 border-t-white rounded-full animate-spin"></div>
      <span>Saving..</span>
    </div>

    </>
  ) : (
    "Continue"
  )}
        </button>      
          </div>
   
          </div>
         
       </>
      )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    <div className='min-h-screen p-10 flex flex-col'>

    <div className="flex gap-3 flex-wrap items-center">
      <h1 className='text-lg font-serif text-gray-500'>Categories</h1>

      {/* All */}
      <button
        onClick={() => setSelectedCategory("")}
        className="relative px-10 py-2 rounded-full"
      >
        {selectedCategory === "" && (
          <motion.div
            layoutId="activeCategory"
            className="absolute inset-0 bg-amber-900/10 rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
        <span className={`relative z-10 text-lg ${
          selectedCategory === "" ? "text-amber-900" : "text-gray-500"
        }`}>
          All
        </span>
      </button>

      {/* Categories */}
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className="relative px-6 py-2 rounded-full font-serif"
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-amber-900/10 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}

            <span className={`relative z-10 text-lg ${
              isActive ? "text-amber-900" : "text-gray-500"
            }`}>
              {cat.name}
            </span>
          </button>
        );
      })}
    </div>

<div className='flex p-2'>
{/* <div className='w-48 border'></div> */}
<motion.div className='grid gap-3 w-full grid-cols-5'>
<AnimatePresence>
  {products
    .filter(item =>
      selectedCategory === "" || item.category_id == selectedCategory
    )
    .map((item) => (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* <h3>{item.name}</h3>
        <p>₱{item.price}</p>

        {item.image && (
          <img src={item.image} style={{ width: "150px" }} />
        )} */}

    <div className="overflow-hidden relative">

    {/* IMAGE */}
    <div className="h-110 w-full overflow-hidden flex items-center justify-center">
      <img
        src={item.image}
        className="rounded-lg h-full w-full object-fill"
      />
      <button
       className=' cursor-pointer absolute left-5 flex items-center justify-center top-5 bg-black/20 w-8 h-8 rounded-full'
       onClick={() => setPreview(item.image)}
       >
      <Maximize2 color='white'/>
      </button>

    {preview && (
    <div className="fixed bg-black inset-0 flex items-center justify-center z-50">
    
    <img
      src={preview}
      className=" object-contain w-150 h-200"
    />

    <button
      onClick={() => setPreview(null)}
      className="absolute top-5 right-5 text-white text-2xl"
    >
      ✕
    </button>

  </div> 
      )}
    </div>

    {/* TEXT */}
    <div className="p-3 bg-gray-50 relative rounded-b-xl flex flex-col gap-1">
      <div className='flex gap-2'>
      <h3 className="font-semibold text-sm text-nowrap">
        {item.name}
      </h3>
       {item.discount > 0 && (
    <p className=' bg-amber-900/10 px-2 rounded-full text-sm border border-dashed text-nowrap'>
       SAVE ₱{Number(item.discount)}
    </p>
      )}
      </div>
 
      <div>
      {item.discount > 0 ? (
        <div className='flex gap-2'>
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
      </div>


      
     
     {/* wishlist */}
     <button
      className=' absolute right-4 top-3'
     >
     <Heart/>
    </button>
     <div className='flex items-center justify-between'>
     <p>Size:</p> 
    <button className='bg-amber-900/50 shadow  text-white px-5 rounded-full py-1 font-serif'>Rent Now?</button>
    </div>
    </div>

  </div>


      </motion.div>
    ))}
</AnimatePresence>

</motion.div>
</div>


    </div>
    </>
  )
}

export default Landing