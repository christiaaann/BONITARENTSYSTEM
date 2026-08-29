import { MessageCircle } from 'lucide-react'
import React from 'react'

const CtaBanner = () => {
  return (
   <>
   <div className="rounded-3xl bg-white shadow p-8 md:p-12 text-black relative overflow-hidden flex flex-col items-start gap-6">
  {/* Badge */}
  <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-full">
    Join the community
  </span>

  {/* Content */}
  <div className="max-w-xl z-10">
  <h2 className="text-3xl font-bold mb-3">Hassle-free rentals with BONITA.</h2>
  <p className="text-black text-base">
    Find and book everything you need for your events, and daily needs.
  </p>
</div>

  {/* Button */}
  <a 
    href="#" 
    className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors z-10"
  >
    <MessageCircle className="w-5 h-5 fill-current" />
    Open Facebook 
  </a>
</div>
   </>
  )
}

export default CtaBanner