import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Gowns Available", value: "500+" },
    { label: "Happy Clients", value: "2,000+" },
    { label: "Years in Service", value: "5+" },
  ];

  const values = [
    {
      icon: <Sparkles className="w-5 h-5 text-rose-500" />,
      title: "Curated Luxury",
      description: "Bawat gown at item ay maingat na pinipili mula sa mga premium at modernong disenyo para masiguro ang iyong nagliliyab na ganda."
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: "Client Centric",
      description: "Dito sa BONITA, hindi ka lang nangungupahan. Sinisiguro naming perpekto ang fitting at kumportable ka sa iyong espesyal na araw."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-rose-500" />,
      title: "Pristine Quality",
      description: "Dumadaan sa mahigpit na professional dry cleaning at inspeksyon ang bawat kasuotan bago at pagkatapos ipagamit."
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
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-medium tracking-[0.2em] text-black uppercase bg-black/5 border border-black/10 px-3 py-1 rounded-full">
            Our Story
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-light tracking-tight text-black font-serif italic">
            About <span className="font-serif italic text-black">Bonita</span>
          </h1>
          <p className="mt-4 text-neutral-700 font-light text-sm leading-relaxed">
            Nagbibigay ng premium at hassle-free gown rental experience para sa iyong mga hindi malilimutang sandali.
          </p>
        </div>

        {/* Story & Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-medium font-serif italic text-black">
              Redefining Luxury Rentals
            </h2>
            <p className="text-sm font-light text-zinc-600 leading-relaxed">
              Nagsimula ang BONITA sa simpleng pangarap: ang gawing abot-kaya ang karangyaan. Naniniwala kami na bawat indibidwal ay nararapat na magningning sa kanilang mga mahahalagang okasyon nang hindi kinakailangang gumastos ng napakalaki.
            </p>
            <p className="text-sm font-light text-zinc-600 leading-relaxed">
              Mula sa mga naglalakihang ball gown, minimalist prom dresses, hanggang sa mga eleganteng tuxedo at accessories, narito kami para ibigay sa iyo ang stress-free na serbisyo.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-white border border-zinc-100 shadow-sm rounded-2xl text-center md:text-left">
                <div className="text-3xl font-light font-serif italic text-black mb-1">{stat.value}</div>
                <div className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="border-t border-zinc-100 pt-20">
          <div className="text-center mb-12">
            <h2 className="text-xl font-medium font-serif italic text-black">Why Choose Us</h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-6 bg-white border border-zinc-100 shadow-sm rounded-2xl flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="p-2.5 border border-zinc-200 w-fit rounded-xl mb-6 group-hover:bg-rose-500/10 group-hover:border-rose-500/20 transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-medium text-black font-serif italic mb-2 tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-zinc-600">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;