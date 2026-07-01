import React, { useState } from 'react';
import { Activity, Flame, Trophy, ShieldCheck, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BHAIYA_QUOTES } from '../data/menuData';

export default function BhaiyaCounter() {
  const [activeTab, setActiveTab] = useState('motivation');
  const [flexCount, setFlexCount] = useState(24);
  const [isFlexing, setIsFlexing] = useState(false);

  const activeQuote = BHAIYA_QUOTES.find(q => q.trigger === activeTab) || BHAIYA_QUOTES[0];

  const handleFlexClick = () => {
    setIsFlexing(true);
    setFlexCount(prev => prev + 1);
    setTimeout(() => {
      setIsFlexing(false);
    }, 1000);
  };

  return (
    <section id="counter-bhaiya" className="py-24 bg-[#0d0b09] relative border-t border-white/5">
      {/* Visual glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#cca43b]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#cca43b]">Local Legend Spotlight</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
            The Counter Vibe: Meet Bhaiya 💪
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto mt-4" />
          <p className="text-gray-400 mt-4 text-sm sm:text-base font-light leading-relaxed">
            As highlighted by our regular patrons, the vibrant spirit of JFC is anchored by our legendary billing manager at the counter—an elite Gym Rat 🐀, hardcore RCB fan ❤️, and a bundle of pure positive energy!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bhaiya's Visual Avatar & Interactive Game */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[360px] aspect-[4/5] bg-gradient-to-b from-[#1c1a16] to-[#12110e] border-2 border-[#cca43b]/30 rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
              
              {/* Floating decorative elements */}
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-red-600/10 rounded-full blur-2xl group-hover:bg-red-600/20 transition-all duration-500" />
              <div className="absolute top-4 left-4 bg-red-600/20 text-red-500 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-red-500/30 flex items-center gap-1.5 font-bold">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                RCB FAN CLUB
              </div>

              {/* Gym badges */}
              <div className="absolute top-4 right-4 bg-[#cca43b]/20 text-[#cca43b] text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#cca43b]/30 flex items-center gap-1.5 font-bold">
                GYM RAT 🐀
              </div>

              {/* Character Illustration / Card Center */}
              <div className="my-auto flex flex-col items-center justify-center space-y-6 pt-6">
                <div className="relative">
                  {/* Bicep flex animation */}
                  <motion.div
                    animate={isFlexing ? { scale: [1, 1.15, 1], rotate: [0, -10, 0] } : {}}
                    transition={{ duration: 0.6 }}
                    className="h-32 w-32 rounded-full bg-[#cca43b]/10 border-2 border-dashed border-[#cca43b]/40 flex items-center justify-center text-6xl shadow-inner relative z-10"
                  >
                    {isFlexing ? '💪🏋️' : '😎🏆'}
                  </motion.div>
                  {/* Glowing halo */}
                  <div className={`absolute inset-0 bg-[#cca43b]/20 rounded-full blur-xl -z-10 transition-opacity duration-300 ${isFlexing ? 'opacity-100' : 'opacity-0'}`} />
                </div>

                <div className="text-center space-y-1">
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide">The Counter Bhaiya</h4>
                  <p className="text-xs text-[#cca43b] font-mono uppercase tracking-widest">RCB Supporter • Certified Fitness Coach</p>
                  <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-mono pt-1">
                    <Trophy className="h-3.5 w-3.5" /> Est. 2023 • 100% Raw Power
                  </div>
                </div>
              </div>

              {/* Interactive flex clicker */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[11px] font-mono text-gray-400 px-1">
                  <span>COUNTER FLEX COUNT</span>
                  <span className="text-[#cca43b] font-bold">{flexCount} Reps</span>
                </div>
                <button
                  onClick={handleFlexClick}
                  className="w-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  Ask Bhaiya for a Flex! 💪
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Interaction speech bubble and quotes selector */}
          <div className="lg:col-span-7 text-left space-y-8">
            
            <div className="space-y-2">
              <span className="text-[#cca43b] font-mono text-xs uppercase tracking-widest font-bold">Ask Anything</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Chit-Chat at the Counter</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Click a topic below to hear Bhaiya’s energetic perspective on nutrition, cricket leagues, our dining space, and lifestyle motivation.
              </p>
            </div>

            {/* Quick buttons */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'motivation', label: 'Gym Motivation', emoji: '💪' },
                { id: 'cricket', label: 'RCB Banter', emoji: '🏏' },
                { id: 'diet', label: 'High Protein Tips', emoji: '🍗' },
                { id: 'space', label: 'Cozy Medium Vibe', emoji: '🏡' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4.5 py-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#cca43b]/15 text-[#cca43b] border-[#cca43b]'
                      : 'bg-white/3 border-white/5 text-gray-400 hover:bg-white/5 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <span>{tab.emoji}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Speech Bubble Box */}
            <div className="relative">
              {/* Bubble tail decoration */}
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-12 border-r-[#13110e] border-b-8 border-b-transparent hidden lg:block" />
              
              <div className="bg-[#13110e] border border-white/5 p-6 sm:p-8 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-gray-500 pb-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="h-4 w-4 text-[#cca43b]" />
                    BHAIYA SAYS:
                  </span>
                  <span className="text-[#cca43b] font-bold uppercase tracking-wider">
                    {activeQuote.category}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-white text-sm sm:text-base leading-relaxed italic font-light">
                      "{activeQuote.quote}"
                    </p>

                    <div className="bg-white/2 rounded-lg py-2.5 px-4 inline-flex items-center gap-2 text-xs font-mono text-amber-500/95">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin-hover" />
                      <span>[{activeQuote.action}]</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Extra highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400 pt-2 font-light">
              <div className="flex items-start gap-2.5 bg-white/2 border border-white/5 p-4 rounded-xl">
                <Activity className="h-5 w-5 text-red-500 shrink-0" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">High-Protein Menu Options</span>
                  Specially catalogued dishes containing high soya-core macros for clean muscle-building diets.
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-white/2 border border-white/5 p-4 rounded-xl">
                <Heart className="h-5 w-5 text-[#cca43b] shrink-0" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">Vibrant Warm Community</span>
                  We keep the conversation active, cricket scores loaded, and ensure your wait time is full of fun.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
