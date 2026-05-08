import React, {useEffect, useState} from 'react'
import image1 from '../../assets/image1.jpg' 
import image2 from '../../assets/image2.jpg'  
import image3 from '../../assets/image3.jpg'
import { ArrowDown } from 'lucide-react'
import UserHeader from '../layout/UserHeader'
const HeroSection = () => {
    const images = [image1, image2, image3];
    const [current, setCurrent] = useState(0);
    
    // fetchusers
    //   const [user, setUser] = useState(null);
    //   useEffect(() => {
    //   const token = localStorage.getItem("token");
    
    //   fetch("http://localhost:3000/api/me", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       // console.log(data.name); 
    //       setUser(data);
    //     });
    // }, []);


    useEffect(()=> {
     const interval = setInterval(() => {
     setCurrent((prev) => (prev + 1) % images.length);
     },5000);
     return () => clearInterval(interval);   
    })
    return (
    <section className='h-250 relative overflow-hidden'>
   
      <UserHeader 
      />

    {images.map((img, index) => (
    <img
      key={index}
      src={img}
      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
        index === current ? "opacity-100" : "opacity-0"
      }`}
    />
  ))}
     
    <div className="absolute inset-0 bg-amber-900/30"></div>
     <div className='flex text-white/60 relative h-full'>
     <div className='w-full flex flex-col gap-3 items-center justify-center p-20'>
       <h1 className='font-serif text-7xl'>RENT</h1>
       <div className='flex gap-12 items-center'>
       <p className='text-5xl'>anything</p>
       <p className='font-[Andasia] text-6xl text-nowrap'>you need</p>
       </div>
       <h1 className='font-serif text-7xl'>ANYTIME</h1>   
     </div>
       

      <button className=' absolute backdrop-blur-sm outline-none  left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-16 bg-white/5 w-20 h-20 rounded-full flex justify-center items-center'>
       <ArrowDown size={30}/>
       </button>
       {/* <div className='w-full'>
       <h1>BONITA</h1>
       </div> */}
    </div>  
   
    </section>
  )
}

export default HeroSection