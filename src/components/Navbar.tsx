import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Flame, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../data/translations';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
  lang: Language;
  onToggleLang: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onScrollToSection,
  activeSection,
  lang,
  onToggleLang
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang].navbar;

  const navItems = [
    { id: 'home', name: t.home },
    { id: 'specials', name: t.specials },
    { id: 'menu', name: t.menu },
    { id: 'counter-bhaiya', name: t.counterBhaiya },
    { id: 'booking', name: t.booking },
    { id: 'reviews', name: t.reviews }
  ];

  const handleItemClick = (id: string) => {
    onScrollToSection(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0f0e0c]/90 backdrop-blur-md border-b border-[#cca43b]/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-[#cca43b] text-[#0f0e0c] p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Flame className="h-6 w-6 fill-current animate-pulse" />
            </div>
            <div className="text-left">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-[#cca43b]">
                JFC RESTAURANT
              </span>
              <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-mono -mt-1">
                जेएफसी फैमिली रेस्टोरेंट
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 font-sans">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#cca43b] ${
                  activeSection === item.id ? 'text-[#cca43b]' : 'text-gray-300'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-[#cca43b]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions & Buttons */}
          <div className="flex items-center gap-3.5">
            
            {/* Language Switcher Toggle */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 hover:bg-[#cca43b]/10 border border-white/10 hover:border-[#cca43b]/30 text-xs font-bold tracking-wide text-[#cca43b] transition-all cursor-pointer font-sans"
              title={lang === 'en' ? 'Switch to Hindi / हिन्दी' : 'अंग्रेजी (English) में बदलें'}
              id="language-toggle-btn"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Meal Tray / Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-white/5 border border-white/10 hover:border-[#cca43b]/40 text-gray-300 hover:text-[#cca43b] transition-all group cursor-pointer"
              title={t.mealTray}
              id="meal-tray-btn"
            >
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-amber-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border border-[#0f0e0c]"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Book table quick link */}
            <button
              onClick={() => handleItemClick('booking')}
              className="hidden lg:block bg-gradient-to-r from-[#cca43b] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#0f0e0c] font-semibold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-[#cca43b]/10 cursor-pointer"
            >
              {t.bookButton}
            </button>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#161411] border-b border-[#cca43b]/10 overflow-hidden text-left"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                    activeSection === item.id 
                      ? 'bg-[#cca43b]/10 text-[#cca43b] font-semibold' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-[#cca43b]'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile Language Toggle row */}
              <div className="pt-4 pb-2 px-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">Language / भाषा:</span>
                <button
                  onClick={() => {
                    onToggleLang();
                    setIsOpen(false);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-[#cca43b] flex items-center gap-1.5"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {lang === 'en' ? 'हिन्दी (Hindi)' : 'English (EN)'}
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleItemClick('booking')}
                  className="w-full text-center bg-gradient-to-r from-[#cca43b] to-amber-600 text-[#0f0e0c] font-semibold text-xs uppercase tracking-wider py-3 rounded-lg shadow-lg"
                >
                  {t.bookButton}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
