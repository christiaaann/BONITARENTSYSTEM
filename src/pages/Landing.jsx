import React, {useState, useEffect} from 'react';
import { io } from 'socket.io-client';
const Landing = () => {
  
  const [products, setProducts] = useState([]);
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
    transports: ["websocket", "polling"]
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
    <div className=' grid-cols-7 grid'>
      <select  onChange={(e) => setSelectedCategory(e.target.value)}>
  <option value="">All</option>

  {categories.map(cat => (
    <option key={cat.id} 
     value={cat.id}>
    {cat.name}
    </option>
  ))}
</select>
{products
  .filter(item =>
    selectedCategory === "" || item.category_id == selectedCategory
  )
  .map((item) => (
    <div key={item.id}>
      <h3>{item.name}</h3>
      <p>₱{item.price}</p>

      {item.image && (
        <img src={item.image} style={{ width: "150px" }} />
      )}
    </div>
))}
    </div>
    </>
  )
}

export default Landing