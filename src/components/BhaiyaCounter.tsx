import React, { useState } from 'react';
import { Activity, Flame, Trophy, ShieldCheck, Heart, Sparkles, MessageCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../data/translations';

interface BhaiyaCounterProps {
  lang: Language;
}

export default function BhaiyaCounter({ lang }: BhaiyaCounterProps) {
  const t = translations[lang].bhaiya;
  const tm = translations[lang].menu;

  const [activeTab, setActiveTab] = useState('motivation');
  const [flexCount, setFlexCount] = useState(24);
  const [isFlexing, setIsFlexing] = useState(false);

  const handleFlexClick = () => {
    setIsFlexing(true);
    setFlexCount(prev => prev + 1);
    setTimeout(() => {
      setIsFlexing(false);
    }, 1000);
  };

  // Localized interactive quotes of Counter Bhaiya
  const quotes: Record<string, { category: { en: string; hi: string }; quote: { en: string; hi: string }; action: { en: string; hi: string } }> = {
    motivation: {
      category: { en: 'GYM & WORKOUT', hi: 'जिम और वर्कआउट' },
      quote: {
        en: "Bro, consistency is everything! Whether you are deadlifting 200kg or building JFC's legacy, do not skip reps. Once workout is done, feed your body with high-protein soya. Gains never stop!",
        hi: "भाई, निरंतरता ही सब कुछ है! चाहे आप 200 किलोग्राम की डेडलिफ्ट उठा रहे हों या जेएफसी की विरासत बना रहे हों, कभी भी ढीले मत पड़ो। वर्कआउट पूरा होते ही कड़क प्रोटीन खाओ!"
      },
      action: { en: 'Bhaiya holds a bicep pose', hi: 'भैया अपना बाइसेप्स दिखाते हैं' }
    },
    cricket: {
      category: { en: 'IPL BANTER', hi: 'आईपीएल चर्चा' },
      quote: {
        en: "Look bro, seasons come and seasons go, but our loyalty to Bengaluru is eternal. Virat Bhaiya is the King. Ee Sala Cup Namde! Celebrate today with double butter garlic naan!",
        hi: "देखो भाई, साल बदलेंगे, सीजन बदलेंगे, लेकिन बेंगलुरु के लिए हमारा प्यार हमेशा बना रहेगा। विराट भैया हमारे राजा हैं। ई साला कप नमदे! आज इसी बात पर डबल बटर नान हो जाये!"
      },
      action: { en: 'Bhaiya sports an RCB jersey look', hi: 'भैया आरसीबी जर्सी दिखाते हैं' }
    },
    diet: {
      category: { en: 'PROTEIN SECRETS', hi: 'प्रोटीन के रहस्य' },
      quote: {
        en: "You don't need artificial powders if you eat smart, bro! Soya chaap has 22-25g of solid soy protein. Pure, delicious, vegetarian power to blast your bench press!",
        hi: "अगर आप सही भोजन करते हैं तो आपको डिब्बे वाले पाउडर की जरूरत नहीं है भाई! हमारी सोया चाप में 22-25 ग्राम ठोस प्रोटीन है। शुद्ध, स्वादिष्ट शाकाहारी ताकत!"
      },
      action: { en: 'Bhaiya shows a nutrition chart', hi: 'भैया प्रोटीन चार्ट की ओर इशारा करते हैं' }
    },
    space: {
      category: { en: 'MEDIUM COZY SPACE', hi: 'आरामदायक बैठक' },
      quote: {
        en: '"Not too big, not too small." I personally keep the counter clean, the music lively, and the lights golden. Bring your family here, eat comfortably, and let me handle the billing fast!',
        hi: '"न बहुत बड़ा, न बहुत छोटा।" मैं खुद यहाँ की स्वच्छता और म्यूजिक का ध्यान रखता हूँ। अपने परिवार को लाओ, आराम से बैठो और बिलिंग की चिंता मुझ पर छोड़ दो!'
      },
      action: { en: 'Bhaiya wipes the billing counter with pride', hi: 'भैया गर्व से काउंटर साफ़ करते हैं' }
    }
  };

  const activeQuote = quotes[activeTab] || quotes.motivation;

  return (
    <section id="counter-bhaiya" className="py-24 bg-[#0d0b09] relative border-t border-white/5">
      {/* Visual glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#cca43b]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#cca43b]">{t.tag}</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
            {t.title}
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto mt-4" />
          <p className="text-gray-400 mt-4 text-xs sm:text-sm font-light leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bhaiya's Visual Avatar & Interactive Game */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] aspect-[4/5] bg-gradient-to-b from-[#1c1a16] to-[#12110e] border-2 border-[#cca43b]/30 rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
              
              {/* Floating decorative elements */}
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-red-600/10 rounded-full blur-2xl group-hover:bg-red-600/20 transition-all duration-500" />
              <div className="absolute top-4 left-4 bg-red-600/20 text-red-500 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-red-500/30 flex items-center gap-1.5 font-bold">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                {t.rcbBadge}
              </div>

              {/* Gym badges */}
              <div className="absolute top-4 right-4 bg-[#cca43b]/20 text-[#cca43b] text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#cca43b]/30 flex items-center gap-1.5 font-bold">
                {t.gymBadge}
              </div>

              {/* Character Illustration / Card Center */}
              <div className="my-auto flex flex-col items-center justify-center space-y-6 pt-6">
                <div className="relative">
                  {/* Bicep flex animation */}
                  <motion.div
                    animate={isFlexing ? { scale: [1, 1.15, 1], rotate: [0, -10, 0] } : {}}
                    transition={{ duration: 0.6 }}
                    className="h-32 w-32 rounded-full bg-[#cca43b]/10 border-2 border-dashed border-[#cca43b]/40 flex items-center justify-center text-6xl shadow-inner relative z-10 select-none"
                  >
                    {isFlexing ? '💪🏋️' : '😎🏆'}
                  </motion.div>
                  {/* Glowing halo */}
                  <div className={`absolute inset-0 bg-[#cca43b]/20 rounded-full blur-xl -z-10 transition-opacity duration-300 ${isFlexing ? 'opacity-100' : 'opacity-0'}`} />
                </div>

                <div className="text-center space-y-1">
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                    {lang === 'en' ? 'Counter Bhaiya' : 'मस्त बॉडी वाले भैया'}
                  </h4>
                  <p className="text-xs text-[#cca43b] font-mono uppercase tracking-widest">
                    {lang === 'en' ? 'RCB Supporter • Fitness Coach' : 'कट्टर आरसीबी फैन • फिटनेस गुरु'}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-mono pt-1">
                    <Trophy className="h-3.5 w-3.5" /> {lang === 'en' ? 'Est. 2023 • 100% Raw Power' : 'स्थापना 2023 • 100% असली ताकत'}
                  </div>
                </div>
              </div>

              {/* Interactive flex clicker */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 px-1">
                  <span>{lang === 'en' ? 'COUNTER FLEX REPS' : 'काउंटर डोले प्रदर्शन'}</span>
                  <span className="text-[#cca43b] font-bold">{flexCount} Reps</span>
                </div>
                <button
                  onClick={handleFlexClick}
                  className="w-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-bold text-[10px] uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  {lang === 'en' ? 'Ask Bhaiya for a Flex! 💪' : 'भैया को डोला दिखाने को कहें! 💪'}
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Interaction speech bubble and quotes selector */}
          <div className="lg:col-span-7 text-left space-y-8">
            
            <div className="space-y-2">
              <span className="text-[#cca43b] font-mono text-xs uppercase tracking-widest font-bold">
                {lang === 'en' ? 'Ask Anything' : 'कुछ भी पूछें'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {lang === 'en' ? 'Chit-Chat at the Billing Counter' : 'बिलिंग काउंटर पर बातचीत'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                {lang === 'en' 
                  ? 'Click a topic below to hear Bhaiya’s energetic perspective on nutrition, cricket leagues, our dining space, and lifestyle motivation.'
                  : 'पोषण, क्रिकेट लीग, हमारी आरामदायक बैठने की जगह, और फिटनेस मोटिवेशन पर भैया के मजेदार विचार सुनने के लिए नीचे किसी विषय पर क्लिक करें।'}
              </p>
            </div>

            {/* Quick buttons */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'motivation', label: lang === 'en' ? 'Gym Motivation' : 'जिम मोटिवेशन', emoji: '💪' },
                { id: 'cricket', label: lang === 'en' ? 'RCB Banter' : 'आरसीबी गपशप', emoji: '🏏' },
                { id: 'diet', label: lang === 'en' ? 'High Protein Tips' : 'प्रोटीन के रहस्य', emoji: '🍗' },
                { id: 'space', label: lang === 'en' ? 'Cozy Medium Vibe' : 'आरामदायक बैठक', emoji: '🏡' }
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
                    {lang === 'en' ? 'BHAIYA SAYS:' : 'भैया कहते हैं:'}
                  </span>
                  <span className="text-[#cca43b] font-bold uppercase tracking-wider">
                    {lang === 'en' ? activeQuote.category.en : activeQuote.category.hi}
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
                      "{lang === 'en' ? activeQuote.quote.en : activeQuote.quote.hi}"
                    </p>

                    <div className="bg-white/2 rounded-lg py-2.5 px-4 inline-flex items-center gap-2 text-xs font-mono text-amber-500/95">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                      <span>[{lang === 'en' ? activeQuote.action.en : activeQuote.action.hi}]</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Extra highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400 pt-2 font-light text-left">
              <div className="flex items-start gap-2.5 bg-white/2 border border-white/5 p-4 rounded-xl">
                <Activity className="h-5 w-5 text-red-500 shrink-0" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">
                    {lang === 'en' ? 'High-Protein Muscle Meals' : 'हाई-प्रोटीन कड़क भोजन'}
                  </span>
                  {lang === 'en' 
                    ? 'Specially catalogued dishes containing high soya-core macros for clean muscle-building diets.'
                    : 'साफ मांसपेशियों के निर्माण और बेहतरीन डाइट के लिए विशेष रूप से भरपूर प्रोटीन मूल्य वाले व्यंजन।'}
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-white/2 border border-white/5 p-4 rounded-xl">
                <Heart className="h-5 w-5 text-[#cca43b] shrink-0" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">
                    {lang === 'en' ? 'Vibrant Warm Community' : 'सजीव और मिलनसार माहौल'}
                  </span>
                  {lang === 'en' 
                    ? 'We keep the conversation active, cricket scores loaded, and ensure your wait time is full of fun.'
                    : 'हम बातचीत को हमेशा जीवंत रखते हैं, आईपीएल स्कोर देखते हैं और यह सुनिश्चित करते हैं कि आपका यहाँ समय बहुत अच्छा बीते।'}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
