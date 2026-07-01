import React from 'react';
import { Flame, Star, Award, ShieldAlert, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ onScrollToSection }: HeroSectionProps) {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center bg-[#0a0907] overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,#cca43b18,transparent_55%)]" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#cca43b]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl" />

      {/* Decorative vertical lines */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#cca43b]/10 via-[#cca43b]/5 to-transparent hidden md:block" />
      <div className="absolute right-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#cca43b]/10 via-[#cca43b]/5 to-transparent hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-900/40 to-yellow-900/20 border border-amber-600/30 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#cca43b] font-mono"
            >
              <Sparkles className="h-4.5 w-4.5 text-[#cca43b]" />
              Authentic Indian Culinary Legacy • Ghaziabad
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] font-extrabold text-white tracking-tight"
              >
                Where <span className="text-[#cca43b] italic font-normal">Taste</span> <br className="hidden sm:inline" />
                Meets Custom <br className="hidden sm:inline" />
                <span className="relative z-10 inline-block">
                  Craftsmanship.
                  <span className="absolute left-0 bottom-1 w-full h-2.5 bg-[#cca43b]/20 -z-10" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-gray-300 font-sans text-base sm:text-lg md:text-xl max-w-xl leading-relaxed font-light"
              >
                For over three years, serving Ghaziabad’s absolute finest, "too yum" soya-based delicacies. Melt-in-your-mouth <span className="text-[#cca43b] font-medium">Legends of Chaap</span> and classic slow-simmered family feasts, prepared with royal devotion.
              </motion.p>
            </div>

            {/* Testimonial highlight in hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-start gap-4 max-w-lg shadow-inner backdrop-blur-sm"
            >
              <div className="flex flex-col gap-1 text-amber-400">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Featured Review</span>
              </div>
              <p className="text-xs text-gray-400 italic font-light leading-relaxed">
                "I order from here regularly specially their chaap... Eating from here from last 2-3 years. The overall food was delicious too yum and counter wale bhaiya RCB k fan hai..."
              </p>
            </motion.div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => onScrollToSection('menu')}
                className="bg-gradient-to-r from-[#cca43b] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#0f0e0c] font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-lg shadow-[#cca43b]/10 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Explore Menu
              </button>
              <button
                onClick={() => onScrollToSection('counter-bhaiya')}
                className="bg-white/5 hover:bg-white/10 text-[#cca43b] border border-[#cca43b]/40 hover:border-[#cca43b] font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Meet Counter Bhaiya 💪
              </button>
            </motion.div>
          </div>

          {/* Interactive Visual/Image collage */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-square max-w-[450px] mx-auto lg:max-w-none"
            >
              {/* Outer glowing gold ring */}
              <div className="absolute inset-0 rounded-full border border-[#cca43b]/20 animate-[spin_40s_linear_infinite] z-0" />
              <div className="absolute inset-4 rounded-full border border-dashed border-[#cca43b]/10 animate-[spin_20s_linear_infinite] z-0" />

              {/* Main Image Container */}
              <div className="absolute inset-10 rounded-full overflow-hidden border-2 border-[#cca43b]/30 shadow-2xl shadow-amber-950/50 z-10">
                <img
                  src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600"
                  alt="Delicious Signature Afghani Chaap"
                  className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float tag 1: Famous Chaap */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-4 right-4 bg-[#14120e]/95 border border-[#cca43b]/40 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-xl z-20 flex items-center gap-2"
              >
                <div className="bg-[#cca43b]/20 p-1.5 rounded-md">
                  <Flame className="h-4.5 w-4.5 text-[#cca43b] fill-current" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Signature dish</span>
                  <p className="text-xs font-bold text-white leading-none">Famous Soya Chaap</p>
                </div>
              </motion.div>

              {/* Float tag 2: Rating */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-6 left-2 bg-[#14120e]/95 border border-[#cca43b]/40 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-xl z-20 flex items-center gap-2"
              >
                <div className="bg-[#cca43b]/20 p-1.5 rounded-md">
                  <Star className="h-4.5 w-4.5 text-amber-400 fill-current" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Google Rating</span>
                  <p className="text-xs font-bold text-white leading-none">4.9/5 • Yum Choice</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Feature Grid beneath Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-24 border-t border-white/5 mt-8 text-left">
          
          <div className="space-y-2 p-4 rounded-xl border border-white/5 hover:border-[#cca43b]/20 transition-all bg-white/2 hover:bg-white/5">
            <div className="text-[#cca43b] text-xl font-bold font-serif mb-1">01</div>
            <h3 className="text-white font-medium text-base font-serif">Legendary Chaap</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Made from premium soy protein, marinated in house-ground secret masalas, slow-grilled on real clay ovens.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl border border-white/5 hover:border-[#cca43b]/20 transition-all bg-white/2 hover:bg-white/5">
            <div className="text-[#cca43b] text-xl font-bold font-serif mb-1">02</div>
            <h3 className="text-white font-medium text-base font-serif">Cozy Medium Space</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              "Not too big, not too small." A perfect intimate setting that prioritizes flawless family comfort and elite hygiene.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl border border-white/5 hover:border-[#cca43b]/20 transition-all bg-white/2 hover:bg-white/5">
            <div className="text-[#cca43b] text-xl font-bold font-serif mb-1">03</div>
            <h3 className="text-white font-medium text-base font-serif">Clean Muscle Macros</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Highly sought-after protein-packed dishes for our local gym-rat crowd. Premium nourishment with spectacular taste.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl border border-white/5 hover:border-[#cca43b]/20 transition-all bg-white/2 hover:bg-white/5">
            <div className="text-[#cca43b] text-xl font-bold font-serif mb-1">04</div>
            <h3 className="text-white font-medium text-base font-serif">Stellar Service</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Prompt delivery, impeccable dine-in service, and great conversation with our energetic, sports-loving team.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
