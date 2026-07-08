import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, ArrowRight } from 'lucide-react';

const Contact = () => {
  const contactDetails = [
    {
      icon: <Phone className="w-5 h-5 text-rose-500" />,
      title: "Phone",
      info: "+63 912 345 6789",
      subInfo: "Mon - Sat, 9am - 6pm"
    },
    {
      icon: <Mail className="w-5 h-5 text-rose-500" />,
      title: "Email",
      info: "hello@bonitarental.com",
      subInfo: "Online support 24/7"
    },
    {
      icon: <MapPin className="w-5 h-5 text-rose-500" />,
      title: "Boutique Location",
      info: "Metro Manila, Philippines",
      subInfo: "By appointment only"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white text-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-medium tracking-[0.2em] text-black uppercase bg-black/5 border border-black/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-light tracking-tight text-black font-serif italic">
            Contact <span className="font-serif italic text-black">Bonita</span>
          </h1>
          <p className="mt-4 text-neutral-700 font-light leading-relaxed">
            Nandito kami para tulungan kang mahanap ang perpektong kasuotan. Mag-message o bumisita sa aming shop.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Left Side: Contact Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:col-span-1 space-y-4"
          >
            {contactDetails.map((detail, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm flex items-start gap-4"
              >
                <div className="p-2.5 border border-zinc-200 rounded-xl bg-white shadow-sm shrink-0">
                  {detail.icon}
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-1">
                    {detail.title}
                  </h3>
                  <p className="text-sm font-medium text-black mb-0.5">
                    {detail.info}
                  </p>
                  <p className="text-xs font-light text-zinc-500">
                    {detail.subInfo}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Business Hours Card */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-gradient-to-br from-rose-100/30 to-white border border-rose-100/50 shadow-sm"
            >
              <div className="flex items-center gap-2 text-rose-500 mb-3">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wider uppercase">Fitting Hours</span>
              </div>
              <p className="text-sm font-medium text-black mb-1">By Appointment Only</p>
              <p className="text-xs font-light text-zinc-600 leading-relaxed">
                Siguraduhing mag-book ng slot bago bumisita para sa personal at assisted fitting session.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side: Message Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 p-8 rounded-2xl bg-white border border-zinc-100 shadow-sm"
          >
            <h2 className="text-lg font-medium text-black font-serif italic mb-6 tracking-wide">
              Send us a Message
            </h2>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Juan Dela Cruz" 
                    className="w-full px-4 py-3 text-sm font-light border border-zinc-200 rounded-xl bg-zinc-50/50 focus:outline-none focus:border-rose-500/50 focus:bg-white transition-all duration-300 text-black placeholder:text-zinc-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="juan@email.com" 
                    className="w-full px-4 py-3 text-sm font-light border border-zinc-200 rounded-xl bg-zinc-50/50 focus:outline-none focus:border-rose-500/50 focus:bg-white transition-all duration-300 text-black placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Subject / Event Date</label>
                <input 
                  type="text" 
                  placeholder="Gown Rental Reservation - Oct 2026" 
                  className="w-full px-4 py-3 text-sm font-light border border-zinc-200 rounded-xl bg-zinc-50/50 focus:outline-none focus:border-rose-500/50 focus:bg-white transition-all duration-300 text-black placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Your Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Tell us about your preferences, event details, or specific gown inquiries..." 
                  className="w-full px-4 py-3 text-sm font-light border border-zinc-200 rounded-xl bg-zinc-50/50 focus:outline-none focus:border-rose-500/50 focus:bg-white transition-all duration-300 text-black placeholder:text-zinc-400 resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-sm"
              >
                Send Inquiry <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;