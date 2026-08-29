import { useState, useEffect } from 'react'

const useProducts = () => {
  const [products, setProducts] = useState([])
  
    const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/apparel')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.log('Error Fetching Data', err)
    }
  }

  useEffect(() => {
   fetchProducts()
}, [])
  return{
   products,
   fetchProducts
  }  
}
export default useProducts