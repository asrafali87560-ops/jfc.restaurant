import React, { useState } from 'react';
import { Flame, Star, Award, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../data/translations';

interface ChaapSpotlightProps {
  lang: Language;
}

export default function ChaapSpotlight({ lang }: ChaapSpotlightProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [marinadeResult, setMarinadeResult] = useState<any>(null);

  const INGREDIENTS = [
    { id: 'cashew', name: { en: 'Cashew & Melon Seed Paste', hi: 'काजू और खरबूजे के बीज का पेस्ट' }, color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'cream', name: { en: 'Fresh Amul Cream', hi: 'ताज़ी अमूल मलाई' }, color: 'bg-slate-50 text-slate-900 border-slate-300' },
    { id: 'kashmiri', name: { en: 'Kashmiri Red Chilli', hi: 'कश्मीरी लाल मिर्च' }, color: 'bg-red-500 text-white border-red-700' },
    { id: 'cardamom', name: { en: 'Green Cardamom (Elaichi)', hi: 'हरी इलायची' }, color: 'bg-emerald-600 text-white border-emerald-800' },
    { id: 'mint', name: { en: 'Pudina & Cilantro Paste', hi: 'पुदीना और धनिया पेस्ट' }, color: 'bg-green-500 text-white border-green-700' },
    { id: 'pickle', name: { en: 'Achari Pickle Spices', hi: 'अचारी अचार के मसाले' }, color: 'bg-yellow-500 text-yellow-950 border-yellow-700' },
    { id: 'mustard', name: { en: 'Mustard Oil (Kachi Ghani)', hi: 'सरसों का तेल (कच्ची घानी)' }, color: 'bg-yellow-600 text-white border-yellow-800' },
    { id: 'yogurt', name: { en: 'Hung Curd (Dahi)', hi: 'गाढ़ा दही' }, color: 'bg-sky-50 text-sky-900 border-sky-300' },
  ];

  const toggleIngredient = (id: string) => {
    let updated = [...selectedIngredients];
    if (updated.includes(id)) {
      updated = updated.filter(i => i !== id);
    } else {
      if (updated.length < 3) {
        updated.push(id);
      }
    }
    setSelectedIngredients(updated);
    generateRecommendation(updated);
  };

  const resetAlchemist = () => {
    setSelectedIngredients([]);
    setMarinadeResult(null);
  };

  const generateRecommendation = (ingredients: string[]) => {
    if (ingredients.length === 0) {
      setMarinadeResult(null);
      return;
    }

    const hasCream = ingredients.includes('cream') || ingredients.includes('cashew');
    const hasRedChili = ingredients.includes('kashmiri');
    const hasMint = ingredients.includes('mint');
    const hasPickle = ingredients.includes('pickle');
    const hasCardamom = ingredients.includes('cardamom');

    let dishName = { en: '', hi: '' };
    let description = { en: '', hi: '' };
    let matchPercentage = 100;
    let macros = { 
      protein: { en: '24g', hi: '24 ग्राम' }, 
      spice: { en: 'Mild 🌶️', hi: 'कम तीखा 🌶️' }, 
      vibe: { en: 'Royal & Elegant', hi: 'शाही और सुरुचिपूर्ण' } 
    };

    if (hasCream && hasCardamom && !hasRedChili && !hasPickle) {
      dishName = { en: 'Afghani Royal Malai Chaap', hi: 'शाही अफ़गानी मलाई चाप' };
      description = {
        en: 'Superb choice! Cardamom, cashew paste, and fresh cream produce our signature rich, royal white gravy base. Extremely smooth and aromatic.',
        hi: 'उत्कृष्ट चयन! इलायची, काजू का पेस्ट, और ताज़ी मलाई मिलकर हमारा सिग्नेचर रिच, शाही वाइट ग्रेवी बेस तैयार करते हैं। अत्यधिक मखमली और सुगंधित।'
      };
      macros = { 
        protein: { en: '24g', hi: '24 ग्राम' }, 
        spice: { en: 'Mild 🌶️', hi: 'कम तीखा 🌶️' }, 
        vibe: { en: 'Luxurious & Creamy', hi: 'मखमली व शाही' } 
      };
    } else if (hasRedChili && hasPickle) {
      dishName = { en: 'Achari Tikka Soya Chaap', hi: 'अचारी टिक्का सोया चाप' };
      description = {
        en: 'Boom! The combination of old-school pickling spices and Kashmiri chillies creates an explosion of tang and spice. Perfect with rumali flatbread!',
        hi: 'धमाका! अचारी मसालों और कश्मीरी लाल मिर्च का यह तालमेल तीखेपन और स्वाद का एक बेहतरीन विस्फोट पैदा करता है।'
      };
      macros = { 
        protein: { en: '21g', hi: '21 ग्राम' }, 
        spice: { en: 'Very Spicy 🌶️🌶️🌶️', hi: 'बहुत तीखा 🌶️🌶️🌶️' }, 
        vibe: { en: 'Zesty & Fiery', hi: 'मसालेदार व तीखा' } 
      };
    } else if (hasRedChili && (hasCream || ingredients.includes('yogurt'))) {
      dishName = { en: 'Tandoori Masala Chaap', hi: 'तंदूरी मसाला चाप' };
      description = {
        en: 'Classic North Indian masterpiece. Spicy Kashmiri chillies cooled slightly by hung curd and cream, charred deeply in our tandoor oven.',
        hi: 'क्लासिक उत्तर भारतीय व्यंजन। कश्मीरी लाल मिर्च और अमूल बटर में लिपटी सोया चाप, जिसे हमारे तंदूर की आंच पर पूरी तरह सेंका जाता है।'
      };
      macros = { 
        protein: { en: '22g', hi: '22 ग्राम' }, 
        spice: { en: 'Medium-Spicy 🌶️🌶️', hi: 'मध्यम तीखा 🌶️🌶️' }, 
        vibe: { en: 'Smokey & Bold', hi: 'तंदूरी और कड़क' } 
      };
    } else if (hasMint) {
      dishName = { en: 'Haryali Mint-Coriander Chaap', hi: 'हरियाली पुदीना चाप' };
      description = {
        en: 'Freshness guaranteed! Ground mint and coriander with lemon zest make this a light, herby, and highly refreshing pre-workout meal.',
        hi: 'ताज़गी से भरपूर! पिसे हुए पुदीने और धनिये का यह हल्का, जड़ी-बूटियों वाला मिश्रण कड़क जिम वर्कआउट से पहले के लिए सर्वोत्तम भोजन है।'
      };
      macros = { 
        protein: { en: '23g', hi: '23 ग्राम' }, 
        spice: { en: 'Medium 🌶️🌶️', hi: 'मध्यम 🌶️🌶️' }, 
        vibe: { en: 'Herbal & Zesty', hi: 'प्राकृतिक व ताज़ा' } 
      };
    } else {
      dishName = { en: 'JFC Special Masala Chaap Roll', hi: 'जेएफसी स्पेशल मसाला चाप रोल' };
      description = {
        en: 'A fantastic customized blend. You’ve paired deep tandoori spices with custom bases, perfectly wrapped in a warm rumali flatbread with mint splash.',
        hi: 'एक लाजवाब कस्टमाइज्ड मेल। आपने पारंपरिक तंदूरी मसालों को सही आधारों के साथ मिलाया है, जो कि रुमाली रोटी में पुदीना चटनी के साथ लपेटा जाता है।'
      };
      macros = { 
        protein: { en: '20g', hi: '20 ग्राम' }, 
        spice: { en: 'Customized 🌶️', hi: 'कस्टमाइज्ड 🌶️' }, 
        vibe: { en: 'Modern Comfort Food', hi: 'आधुनिक और कड़क' } 
      };
      matchPercentage = 85;
    }

    setMarinadeResult({ dishName, description, matchPercentage, macros });
  };

  return (
    <section id="specials" className="py-24 bg-[#0a0907] relative border-t border-white/5">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_70%,#cca43b10,transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#cca43b]">
            {lang === 'en' ? 'Secret Culinary Heritage' : 'गुप्त पाक कला की विरासत'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
            {lang === 'en' ? 'The Craft of the Perfect Soya Chaap' : 'उत्कृष्ट सोया चाप का निर्माण'}
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto mt-4" />
          <p className="text-gray-400 mt-4 text-xs sm:text-sm font-light leading-relaxed">
            {lang === 'en'
              ? 'Unlike commercial shortcuts, our soya delicacies are treated with royal respect. We craft our textures from pure plant protein and bake them using traditional wood-charcoal ovens.'
              : 'व्यावसायिक शॉर्टकटों के विपरीत, हमारे सोया व्यंजनों को अत्यंत सम्मान के साथ तैयार किया जाता है। हम पारंपरिक लकड़ी-कोयले के तंदूर का उपयोग करके उन्हें पकाते हैं।'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Steps */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold flex items-center gap-2">
              <Award className="h-6 w-6 text-[#cca43b]" />
              {lang === 'en' ? 'Our Four Golden Pillars' : 'हमारे चार सुनहरे स्तंभ'}
            </h3>

            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: lang === 'en' ? 'Pure Protein Core' : 'शुद्ध सोया प्रोटीन कोर',
                  desc: lang === 'en' 
                    ? 'We extract custom high-grade soy protein, layering it carefully to create an authentic succulent texture that absorbs marinades deeply.'
                    : 'हम प्रीमियम गुणवत्ता वाले सोया प्रोटीन का उपयोग करते हैं, जिसे परतों में बुना जाता है ताकि मसाले इसकी गहराई तक समा सकें।'
                },
                {
                  step: '02',
                  title: lang === 'en' ? 'Twelve-Hour Slow Marinade' : '12 घंटे का धीमा मैरिनेशन',
                  desc: lang === 'en'
                    ? 'Tossed in dry toasted whole spices, custom seed pastes, and cold-pressed mustard oil, left to mature at precise chilled temperatures.'
                    : 'भुने हुए साबुत मसालों, विशेष काजू पेस्ट और शुद्ध सरसों के तेल में मिलाकर इसे रात भर ठंडे तापमान पर परिपक्व होने के लिए रखा जाता है।'
                },
                {
                  step: '03',
                  title: lang === 'en' ? 'The Tandoor Clay Roast' : 'कोयले के तंदूर की सिकाई',
                  desc: lang === 'en'
                    ? 'Skewered and roasted at intense temperatures using natural premium charcoal coals for that signature blistered tandoori charcoal char.'
                    : 'प्राकृतिक लकड़ी के कोयले से जलने वाले पारंपरिक तंदूर में कड़े तापमान पर धीरे-धीरे सेंका जाता है जिससे लाजवाब धुएँ का स्वाद मिलता है।'
                },
                {
                  step: '04',
                  title: lang === 'en' ? 'The Royal Amul Baste' : 'शाही अमूल मक्खन का छिड़काव',
                  desc: lang === 'en'
                    ? 'Brushed freshly with melted premium butter, freshly squeezed lime, and counter bhaiya’s secret spice blend just before serving.'
                    : 'परोसने से ठीक पहले पिघले हुए अमूल मक्खन, ताज़ा नींबू के रस और काउंटर वाले भैया के विशेष कड़क मसालों से सजाया जाता है।'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/2 hover:border-[#cca43b]/10 transition-all">
                  <div className="font-mono text-lg font-bold text-[#cca43b]">{item.step}</div>
                  <div>
                    <h4 className="text-white font-medium text-sm sm:text-base font-serif">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Marinade Alchemist Widget */}
          <div className="lg:col-span-6">
            <div className="bg-[#13110e] border border-[#cca43b]/20 p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#cca43b]/5 rounded-full blur-2xl -z-10" />
              
              <div className="flex justify-between items-center mb-6 text-left">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500">
                    {lang === 'en' ? 'Interactive Laboratory' : 'इंटरैक्टिव पाकशाला'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                    {lang === 'en' ? 'Marinade Alchemist' : 'मैरिनेशन अल्केमिस्ट'}
                  </h3>
                </div>
                {selectedIngredients.length > 0 && (
                  <button 
                    type="button"
                    onClick={resetAlchemist}
                    className="text-xs text-gray-400 hover:text-[#cca43b] flex items-center gap-1 transition-colors font-mono cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" /> {lang === 'en' ? 'Clear' : 'साफ़ करें'}
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-400 mb-6 text-left leading-relaxed font-light">
                {lang === 'en'
                  ? 'Choose up to 3 premium ingredients to see how our kitchen transforms them into a legendary culinary masterpiece.'
                  : 'अधिकतम 3 प्रीमियम सामग्री चुनें और देखें कि हमारी रसोई उन्हें एक लाजवाब और कड़क व्यंजन में कैसे बदल देती है।'}
              </p>

              {/* Ingredients grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-8 text-left">
                {INGREDIENTS.map((ing) => {
                  const isSelected = selectedIngredients.includes(ing.id);
                  const isMaxReached = selectedIngredients.length >= 3 && !isSelected;

                  return (
                    <button
                      key={ing.id}
                      type="button"
                      onClick={() => toggleIngredient(ing.id)}
                      disabled={isMaxReached}
                      className={`p-3 rounded-lg border text-xs text-left font-medium transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-[#cca43b] text-[#0f0e0c] border-[#cca43b] shadow-md shadow-[#cca43b]/10' 
                          : isMaxReached 
                            ? 'opacity-40 bg-white/1 border-white/5 text-gray-500 cursor-not-allowed'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-[#cca43b]/30'
                      }`}
                    >
                      <span className="truncate pr-1">{lang === 'en' ? ing.name.en : ing.name.hi}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Recommendation output container */}
              <div className="min-h-[140px] flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/2 p-5 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {marinadeResult ? (
                    <motion.div
                      key={marinadeResult.dishName.en}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full text-left space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            {marinadeResult.matchPercentage}% {lang === 'en' ? 'Kitchen Match' : 'रसोईघर का मिलान'}
                          </span>
                          <h4 className="text-base sm:text-lg font-serif font-bold text-white mt-1.5 flex items-center gap-1.5">
                            <Flame className="h-4.5 w-4.5 text-[#cca43b] fill-current animate-pulse" />
                            {lang === 'en' ? marinadeResult.dishName.en : marinadeResult.dishName.hi}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed font-light">
                        {lang === 'en' ? marinadeResult.description.en : marinadeResult.description.hi}
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5 text-[10px] font-mono text-center">
                        <div className="bg-white/5 p-2 rounded">
                          <span className="text-gray-500 block mb-0.5">PROTEIN</span>
                          <span className="text-white font-bold">{lang === 'en' ? marinadeResult.macros.protein.en : marinadeResult.macros.protein.hi}</span>
                        </div>
                        <div className="bg-white/5 p-2 rounded">
                          <span className="text-gray-500 block mb-0.5">SPICE</span>
                          <span className="text-[#cca43b] font-bold">{lang === 'en' ? marinadeResult.macros.spice.en : marinadeResult.macros.spice.hi}</span>
                        </div>
                        <div className="bg-white/5 p-2 rounded">
                          <span className="text-gray-500 block mb-0.5">STYLE</span>
                          <span className="text-white font-bold truncate max-w-full block" title={lang === 'en' ? marinadeResult.macros.vibe.en : marinadeResult.macros.vibe.hi}>
                            {lang === 'en' ? marinadeResult.macros.vibe.en : marinadeResult.macros.vibe.hi}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center space-y-2 py-4"
                    >
                      <div className="h-10 w-10 rounded-full border border-[#cca43b]/40 flex items-center justify-center text-[#cca43b] mx-auto select-none">
                        🧪
                      </div>
                      <p className="text-xs text-gray-500 max-w-xs leading-normal font-light">
                        {lang === 'en' 
                          ? 'Select 1 to 3 ingredients above to mix your own marinade and uncover the secret recipe match!'
                          : 'अंगारे जैसी सिकाई का स्वाद देखने के लिए ऊपर १ से ३ सामग्रियों को चुनें और गुप्त रेसिपी का पता लगाएं!'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
