import React, { useState } from 'react';
import { Flame, Star, Award, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INGREDIENTS = [
  { id: 'cashew', name: 'Cashew & Melon Seed Paste', type: 'cream', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  { id: 'cream', name: 'Fresh Amul Cream', type: 'cream', color: 'bg-slate-50 text-slate-900 border-slate-300' },
  { id: 'kashmiri', name: 'Kashmiri Red Chilli', type: 'spice', color: 'bg-red-500 text-white border-red-700' },
  { id: 'cardamom', name: 'Elaichi (Green Cardamom)', type: 'spice', color: 'bg-emerald-600 text-white border-emerald-800' },
  { id: 'mint', name: 'Pudina & Cilantro Paste', type: 'herbs', color: 'bg-green-500 text-white border-green-700' },
  { id: 'pickle', name: 'Achari Pickle Spices', type: 'spice', color: 'bg-yellow-500 text-yellow-950 border-yellow-700' },
  { id: 'mustard', name: 'Kachi Ghani Mustard Oil', type: 'oil', color: 'bg-yellow-600 text-white border-yellow-800' },
  { id: 'yogurt', name: 'Hung Curd (Dahi)', type: 'base', color: 'bg-sky-50 text-sky-900 border-sky-300' },
];

export default function ChaapSpotlight() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [marinadeResult, setMarinadeResult] = useState<any>(null);

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

    // Determine type of chaap based on selected ingredients
    const hasCream = ingredients.includes('cream') || ingredients.includes('cashew');
    const hasRedChili = ingredients.includes('kashmiri');
    const hasMint = ingredients.includes('mint');
    const hasPickle = ingredients.includes('pickle');
    const hasCardamom = ingredients.includes('cardamom');

    let dishName = '';
    let description = '';
    let matchPercentage = 100;
    let macros = { protein: '24g', spice: 'Mild 🌶️', vibe: 'Royal & Elegant' };

    if (hasCream && hasCardamom && !hasRedChili && !hasPickle) {
      dishName = 'Afghani Royal Malai Chaap';
      description = 'Superb choice! Cardamom, cashew paste, and fresh cream produce our signature rich, royal white gravy base. Extremely smooth and aromatic.';
      macros = { protein: '24g', spice: 'Mild 🌶️', vibe: 'Luxurious & Creamy' };
    } else if (hasRedChili && hasPickle) {
      dishName = 'Achari Tikka Chaap';
      description = 'Boom! The combination of old-school pickling spices and Kashmiri chillies creates an explosion of tang and spice. Perfect with cold mint lassi!';
      macros = { protein: '21g', spice: 'Very Spicy 🌶️🌶️🌶️', vibe: 'Zesty & Fiery' };
    } else if (hasRedChili && (hasCream || ingredients.includes('yogurt'))) {
      dishName = 'Tandoori Masala Chaap';
      description = 'Classic North Indian masterpiece. Spicy Kashmiri chillies cooled slightly by hung curd and cream, charred deeply in our tandoor oven.';
      macros = { protein: '22g', spice: 'Medium-Spicy 🌶️🌶️', vibe: 'Smokey & Bold' };
    } else if (hasMint) {
      dishName = 'Haryali Mint-Coriander Chaap';
      description = 'Freshness guaranteed! Ground mint and coriander with lemon zest make this a light, herby, and highly refreshing pre-workout meal.';
      macros = { protein: '23g', spice: 'Medium 🌶️🌶️', vibe: 'Herbal & Zesty' };
    } else {
      // Default / general mix
      dishName = 'JFC Fusion Masala Chaap Roll';
      description = 'A fantastic customized blend. You’ve paired deep tandoori spices with custom bases, perfectly wrapped in a warm rumali flatbread with mint splash.';
      macros = { protein: '20g', spice: 'Customized 🌶️', vibe: 'Modern Comfort Food' };
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
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#cca43b]">Secret Culinary Heritage</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
            The Craft of the Perfect Soya Chaap
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto mt-4" />
          <p className="text-gray-400 mt-4 text-sm sm:text-base font-light leading-relaxed">
            Unlike commercial shortcuts, our soya delicacies are treated with royal respect. We craft our textures from pure plant protein and bake them using traditional wood-charcoal ovens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Steps */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <h3 className="text-2xl font-serif text-white font-semibold flex items-center gap-2">
              <Award className="h-6 w-6 text-[#cca43b]" />
              Our Four Golden Pillars
            </h3>

            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Pure Protein Core',
                  desc: 'We extract custom high-grade soy protein, layering it carefully to create an authentic succulent texture that absorbs marinades deeply.'
                },
                {
                  step: '02',
                  title: 'Twelve-Hour Slow Marinade',
                  desc: 'Tossed in dry toasted whole spices, custom seed pastes, and cold-pressed mustard oil, left to mature at precise chilled temperatures.'
                },
                {
                  step: '03',
                  title: 'The Tandoor Clay Roast',
                  desc: 'Skewered and roasted at intense temperatures using natural premium charcoal coals for that signature blistered tandoori charcoal char.'
                },
                {
                  step: '04',
                  title: 'The Royal Amul Baste',
                  desc: 'Brushed freshly with melted premium butter, freshly squeezed lime, and counter bhaiya’s secret spice blend just before serving.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/2 hover:border-[#cca43b]/10 transition-all">
                  <div className="font-mono text-lg font-bold text-[#cca43b]">{item.step}</div>
                  <div>
                    <h4 className="text-white font-medium text-sm sm:text-base font-serif">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
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
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500">Interactive Lab</span>
                  <h3 className="text-xl font-serif font-bold text-white mt-1">Marinade Alchemist</h3>
                </div>
                {selectedIngredients.length > 0 && (
                  <button 
                    onClick={resetAlchemist}
                    className="text-xs text-gray-400 hover:text-[#cca43b] flex items-center gap-1 transition-colors font-mono cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3 animate-spin-hover" /> Clear
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-400 mb-6 text-left leading-relaxed">
                Choose **up to 3 premium ingredients** to see how our kitchen transforms them into a legendary culinary masterpiece.
              </p>

              {/* Ingredients grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {INGREDIENTS.map((ing) => {
                  const isSelected = selectedIngredients.includes(ing.id);
                  const isMaxReached = selectedIngredients.length >= 3 && !isSelected;

                  return (
                    <button
                      key={ing.id}
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
                      <span>{ing.name}</span>
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
                      key={marinadeResult.dishName}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full text-left space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            {marinadeResult.matchPercentage}% Kitchen Match
                          </span>
                          <h4 className="text-base sm:text-lg font-serif font-bold text-white mt-1.5 flex items-center gap-1.5">
                            <Flame className="h-4.5 w-4.5 text-[#cca43b] fill-current" />
                            {marinadeResult.dishName}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed font-light">
                        {marinadeResult.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5 text-[10px] font-mono text-center">
                        <div className="bg-white/5 p-2 rounded">
                          <span className="text-gray-500 block mb-0.5">PROTEIN</span>
                          <span className="text-white font-bold">{marinadeResult.macros.protein}</span>
                        </div>
                        <div className="bg-white/5 p-2 rounded">
                          <span className="text-gray-500 block mb-0.5">SPICE</span>
                          <span className="text-[#cca43b] font-bold">{marinadeResult.macros.spice}</span>
                        </div>
                        <div className="bg-white/5 p-2 rounded">
                          <span className="text-gray-500 block mb-0.5">STYLE</span>
                          <span className="text-white font-bold truncate max-w-full block" title={marinadeResult.macros.vibe}>
                            {marinadeResult.macros.vibe}
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
                      <div className="h-10 w-10 rounded-full border border-[#cca43b]/40 flex items-center justify-center text-[#cca43b] mx-auto animate-bounce">
                        🧪
                      </div>
                      <p className="text-xs text-gray-500 max-w-xs leading-normal font-light">
                        Select 1 to 3 ingredients above to mix your own marinade and uncover the secret recipe match!
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
