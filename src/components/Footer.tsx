import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, Clipboard, Check, Award, Flame } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const t = translations[lang].footer;

  const address = "G-2, Raj Nagar Extension Rd, Sehani Khurd, Raj Nagar Extension, Ghaziabad, Uttar Pradesh 201003";
  const phone = "093121 22712";
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("JFC Family Restaurant, Raj Nagar Extension, Ghaziabad")}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#0b0908] border-t border-[#cca43b]/15 text-gray-300 font-sans relative overflow-hidden">
      
      {/* Visual background accents */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#cca43b]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-16">
          
          {/* Column 1: Brand & Legacy (5 cols) */}
          <div className="md:col-span-5 space-y-6 text-left">
            
            <div className="flex items-center gap-2">
              <div className="bg-[#cca43b] text-[#0f0e0c] p-2 rounded-lg">
                <Flame className="h-5 w-5 fill-current animate-pulse" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-white">
                  JFC RESTAURANT
                </span>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#cca43b] font-mono -mt-1">
                  जेएफसी फैमिली रेस्टोरेंट
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              {lang === 'en'
                ? 'We believe dining is an art of comfort and taste. Infusing Ghaziabad’s premium local food scene with the most delicious, mouth-watering soya chaaps, cozy seating layouts, and memorable family moments.'
                : 'हमारा मानना है कि भोजन करना स्वाद और आराम की एक कला है। गाजियाबाद के स्थानीय स्वाद को बेहतरीन, मुंह में पानी ला देने वाले सोया चाप, आरामदायक बैठक व्यवस्था और यादगार पारिवारिक क्षणों से सजाना।'}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#cca43b]/80">
              <Award className="h-4.5 w-4.5" />
              <span>{lang === 'en' ? 'Dine-In • Takeaway • Royal Catering' : 'डाइन-इन • टेकअवे • शाही कैटरिंग उपलब्ध'}</span>
            </div>

          </div>

          {/* Column 2: Hours & Contact (3 cols) */}
          <div className="md:col-span-3 space-y-5 text-left">
            <h4 className="font-serif text-sm uppercase tracking-wider text-white font-bold">
              {lang === 'en' ? 'Operational Hours' : 'कार्यकारी समय'}
            </h4>
            
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-[#cca43b] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">{lang === 'en' ? 'Daily Service' : 'दैनिक सेवा'}</span>
                  <span className="text-gray-400 font-light font-mono text-[11px]">{t.hours}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-[#cca43b] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">{lang === 'en' ? 'Reservations Desk' : 'आरक्षण हेल्पडेस्क'}</span>
                  <span className="text-[#cca43b] font-mono font-bold text-[11px] hover:underline block">
                    <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                  </span>
                </div>
              </li>
            </ul>

          </div>

          {/* Column 3: Address & Directions (4 cols) */}
          <div className="md:col-span-4 space-y-5 text-left">
            <h4 className="font-serif text-sm uppercase tracking-wider text-white font-bold">
              {lang === 'en' ? 'Our Location' : 'हमारा पता'}
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-2.5 text-xs">
                <MapPin className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-gray-400 leading-relaxed font-light">
                  {address}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wider">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 text-[#cca43b] border border-[#cca43b]/40 hover:border-[#cca43b] font-bold py-2.5 px-3 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Navigation className="h-3.5 w-3.5 text-[#cca43b]" /> {lang === 'en' ? 'Open Map Navigation' : 'नक्शा खोलें'}
                </a>
                
                <button
                  onClick={handleCopyAddress}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-2.5 px-3 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" /> {lang === 'en' ? 'Copied Address!' : 'कॉपी हो गया!'}
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-3.5 w-3.5" /> {lang === 'en' ? 'Copy Address' : 'पता कॉपी करें'}
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Vector map representation */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/5 pb-12">
          
          <div className="lg:col-span-4 text-left space-y-3">
            <span className="text-[#cca43b] text-xs font-mono uppercase tracking-widest font-bold">
              {lang === 'en' ? 'Directions Guild' : 'दिशा निर्देश मार्गदर्शन'}
            </span>
            <h4 className="font-serif text-xl font-bold text-white">
              {lang === 'en' ? 'How to Reach Us' : 'हम तक कैसे पहुँचें'}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              {lang === 'en'
                ? 'We are conveniently nestled inside Sehani Khurd, on the main Raj Nagar Extension Road in Ghaziabad. Look for our signature bright gold tandoor signage in the G-2 retail block, right next to the landmark main road crossing.'
                : 'हम गाजियाबाद में मुख्य राज नगर एक्सटेंशन रोड पर सेहनी खुर्द में स्थित हैं। मुख्य रोड चौराहे के ठीक बगल में, जी-2 रिटेल ब्लॉक में हमारे सोने की तरह चमकते बोर्ड को देखें।'}
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="h-32 bg-[#12110e] border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center select-none">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:12px_12px]" />
              
              {/* Fake road maps vector */}
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/5 transform -rotate-6" />
              <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-white/5 transform rotate-12" />
              <div className="absolute left-2/3 top-0 bottom-0 w-4 bg-white/5 transform -rotate-45" />

              {/* Landmark nodes */}
              <div className="absolute left-[15%] top-[25%] bg-[#1b1a16] border border-white/5 text-[8px] font-mono uppercase text-gray-500 px-1.5 py-0.5 rounded">
                ALT Flyover
              </div>
              <div className="absolute right-[12%] bottom-[20%] bg-[#1b1a16] border border-white/5 text-[8px] font-mono uppercase text-gray-500 px-1.5 py-0.5 rounded">
                Sehani Khurd Crossing
              </div>

              {/* Actual Pin */}
              <div className="absolute left-[58%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                <MapPin className="h-8 w-8 text-red-500 fill-red-500/20 drop-shadow-lg" />
                <div className="bg-red-600 text-white text-[9px] font-bold font-serif uppercase py-0.5 px-2 rounded-md shadow-md border border-red-500 mt-1 whitespace-nowrap">
                  JFC Family Restaurant 📍
                </div>
              </div>

              {/* Map background scale details */}
              <span className="absolute bottom-2 left-4 text-[8px] font-mono text-gray-600">MAP DETAILS: G-2 BLOCK, SEHANI KHURD ROAD</span>
            </div>
          </div>

        </div>

        {/* Legal and system details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-gray-500">
          <p>{t.copyright}</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <span className="hover:text-white cursor-pointer">{lang === 'en' ? 'Security Regulations' : 'सुरक्षा नियम'}</span>
            <span className="hover:text-white cursor-pointer">{lang === 'en' ? 'Hygiene Certificate ISO 9001' : 'स्वच्छता प्रमाणपत्र ISO 9001'}</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
