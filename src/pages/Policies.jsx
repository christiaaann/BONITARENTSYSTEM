import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CreditCard, 
  Scissors, 
  Sparkles, 
  AlertCircle, 
  ArrowRight 
} from 'lucide-react';

const Policies = () => {
  const policies = [
    {
      icon: <Calendar className="w-5 h-5 text-rose-500" />,
      title: "Rental Timeline",
      tag: "Duration",
      description: "Standard 3 to 5 days rental. Extensions must be requested 48 hours in advance and are subject to daily availability fees."
    },
    {
      icon: <CreditCard className="w-5 h-5 text-rose-500" />,
      title: "Security Deposit",
      tag: "Payment",
      description: "A fully refundable security deposit and valid ID are required prior to item release. Refunded upon safe return."
    },
    {
      icon: <Scissors className="w-5 h-5 text-rose-500" />,
      title: "Custom Fitting",
      tag: "Alterations",
      description: "Complimentary minor adjustments are included. Strictly no personal alterations, cutting, or pinning allowed."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-rose-500" />,
      title: "Stress-Free Care",
      tag: "Maintenance",
      description: "Professional dry cleaning is on us. Wear it, enjoy your night, and return it as-is. Do not attempt to wash the item."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
      title: "Damages & Delays",
      tag: "Liability",
      description: "Late returns incur daily penalties. Major stains, tears, or structural damage will be deducted from the security deposit."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
          <span className="text-xs font-medium tracking-[0.2em] text-black uppercase bg-black/10 border border-black/20 px-3 py-1 rounded-full">
            Terms & Conditions
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-light tracking-tight text-black font-serif italic">
            Rental <span className="font-serif italic text-black">Policies</span>
          </h1>
          <p className="mt-4 text-neutral-700 font-light leading-relaxed">
            Mahalagang paalala para sa isang hassle-free at premium gown rental experience.
          </p>
        </div>

        {/* Modern Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group p-6 rounded-2xl bg-white shadow backdrop-blur-md flex flex-col justify-between  transition-all duration-300"
            >
              <div>
                {/* Upper Card Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5  border border-zinc-700/30 rounded-xl group-hover:bg-rose-500/10 group-hover:border-rose-500/20 transition-colors duration-300">
                    {policy.icon}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                    {policy.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-medium text-black font-serif italic mb-2 tracking-wide">
                  {policy.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-zinc-600 transition-colors">
                  {policy.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Quick Support Card (Fills the last slot nicely) */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl bg-gradient-to-br from-rose-200/10 shadow to-white/40 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <span className=" font-semibold tracking-wider text-rose-400 uppercase">
                Assistance
              </span>
              <h3 className="text-lg font-medium text-black font-serif italic mt-4 mb-2 tracking-wide">
                May tanong o special request?
              </h3>
              <p className="text-sm font-light leading-relaxed text-zinc-500">
                Kung may hindi malinaw o may custom adjustment kang kailangan, message mo lang kami agad.
              </p>
            </div>
            <button className="mt-6 w-full py-3 px-4 bg-zinc-100 text-zinc-950 text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition-colors">
              Contact Support <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Policies;