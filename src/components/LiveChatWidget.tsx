import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../data/translations';

interface Message {
  id: string;
  sender: 'bhaiya' | 'user';
  text: string;
  time: string;
}

interface LiveChatWidgetProps {
  lang: Language;
}

export default function LiveChatWidget({ lang }: LiveChatWidgetProps) {
  const t = translations[lang].chat;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bhaiya',
      text: t.welcome,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Reset welcome message on language switch to match current language
    setMessages((prev) =>
      prev.map((m) => (m.id === 'welcome' ? { ...m, text: t.welcome } : m))
    );
  }, [lang, t.welcome]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const quickQueries = [
    {
      en: '💪 Show me high-protein!',
      hi: '💪 हाई-प्रोटीन बताओ!',
      reply: {
        en: 'Bro, gains are essential! Grab the Afghani Royal Malai Chaap (24g soy protein) or the Tandoori Masala Chaap (22g). Absolute power meals for gym-goers! 💪🔥',
        hi: 'भाई, गेन्स सबसे जरूरी हैं! अफ़गानी रॉयल मलाई चाप (24g सोया प्रोटीन) या तंदूरी मसाला चाप (22g) आर्डर करो। जिम करने वालों के लिए एकदम कड़क मील! 💪🔥',
      },
    },
    {
      en: '🌶️ What’s the spiciest?',
      hi: '🌶️ सबसे तीखा क्या है?',
      reply: {
        en: "Looking for heavy fire? 🌶️ Our Tandoori Masala Chaap and Spicy Chilli Garlic Noodles are pure spice paradise! Shouting 'Bhaiya, paani pilao' is guaranteed!",
        hi: 'असली आग चाहिए भाई? 🌶️ हमारी तंदूरी मसाला चाप और चिली गार्लिक नूडल्स खाओ! काउंटर पर पानी ढूंढने लगोगे, मेरी गारंटी है!',
      },
    },
    {
      en: '🕒 Are you open today?',
      hi: '🕒 आज रेस्टोरेंट खुला है?',
      reply: {
        en: 'Yes bro! We are serving hot sizzlers daily from 12:00 PM to 11:30 PM. Come over to GC Grand Market, Raj Nagar Extension!',
        hi: 'हाँ भाई! हम दोपहर 12:00 बजे से रात 11:30 बजे तक रोज गरमा-गरम सेवा दे रहे हैं। राज नगर एक्सटेंशन के जीसी ग्रैंड मार्केट आ जाओ!',
      },
    },
    {
      en: '🔴 Ee Sala Cup Namde?',
      hi: '🔴 ई साला कप नमदे?',
      reply: {
        en: 'Always bro! 🔴 RCB in our blood! Gym session, extra butter, and pure faith. This season is definitely ours! No doubt!',
        hi: 'पक्का भाई! 🔴 आरसीबी हमारी नस-नस में है! जिम का वर्कआउट, एक्स्ट्रा बटर, और अटूट विश्वास। इस बार कप हमारा ही है, कोई शक ही नहीं!',
      },
    },
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Analyze text for witty bhaiya replies
    setTimeout(() => {
      let replyText = '';
      const textLower = textToSend.toLowerCase();

      if (textLower.includes('protein') || textLower.includes('gym') || textLower.includes('workout') || textLower.includes('gains') || textLower.includes('बॉडी')) {
        replyText = lang === 'en'
          ? "Gym rat detected! 💪 Heavy deadlifts deserve heavy protein. Soya Chaap is natural soy-power! Go for the Afghani Malai or Kadai Soya Chaap (25g protein)!"
          : "जिम लवर मिल गया! 💪 भारी डेडलिफ्ट के लिए भारी प्रोटीन चाहिए भाई। सोया चाप खाओ, भरपूर सोया-पावर पाओ! अफ़गानी मलाई या कढ़ाई सोया चाप बेस्ट है!";
      } else if (textLower.includes('spicy') || textLower.includes('mirch') || textLower.includes('तीखा') || textLower.includes('pepper') || textLower.includes('chilli')) {
        replyText = lang === 'en'
          ? "Oho, spicy lover! 🌶️ Ask the kitchen for 'Double Masala' on your Tandoori Chaap. Pair it with Spicy Chilli Garlic Noodles for ultimate levels!"
          : "ओहो, तीखा पसंद है! 🌶️ तंदूरी चाप में किचन को 'डबल मसाला' डालने को कह दूंगा। साथ में चिली गार्लिक नूडल्स मंगाओ, मज़ा आ जाएगा!";
      } else if (textLower.includes('discount') || textLower.includes('coupon') || textLower.includes('free') || textLower.includes('छूट') || textLower.includes('ऑफर')) {
        replyText = lang === 'en'
          ? "Bro! We already price our premium Amul butter meals very reasonably! But join our JFC Coins loyalty club in your Meal Tray to get ₹50 off instantly! 🪙✨"
          : "भाई, हम पहले ही शुद्ध अमूल मक्खन वाले व्यंजन बहुत सही रेट पर देते हैं! पर थाल (Meal Tray) में हमारे जेएफसी कॉइन्स क्लब को ज्वाइन करो और ₹50 की छूट तुरंत पाओ! 🪙✨";
      } else if (textLower.includes('seat') || textLower.includes('book') || textLower.includes('reserve') || textLower.includes('टेबल') || textLower.includes('सीट')) {
        replyText = lang === 'en'
          ? "Cozy seats are waiting, bro! Scroll to the table booking section, reserve your slot, and get your digital entrance ticket instantly!"
          : "बढ़िया आरामदायक सीटें तैयार हैं भाई! टेबल बुकिंग सेक्शन पर जाओ, अपना स्लॉट चुनें और अपनी डिजिटल प्रवेश टिकट तुरंत पाएं!";
      } else if (textLower.includes('rcb') || textLower.includes('kohli') || textLower.includes('cup') || textLower.includes('विराट') || textLower.includes('बेंगलुरु')) {
        replyText = lang === 'en'
          ? "Ee Sala Cup Namde! 🔴 Virat bhaiya will smash it this year! Let's celebrate with extra butter naan and dal makhani today!"
          : "ई साला कप नमदे! 🔴 विराट भैया इस साल धूम मचा देंगे! चलो आज इसी बात पर एक्स्ट्रा बटर नान और दाल मखनी मंगवा लो!";
      } else {
        replyText = lang === 'en'
          ? "Arey bro, that's beautiful! Come down to JFC, let me pack you some hot, cream-dripping, butter-basted Soya Chaap. What do you say? 🙌"
          : "अरे भाई, बहुत बढ़िया! जेएफसी पर आ जाओ, आपके लिए मक्खन-मलाई से भरपूर गरमा-गरम सोया चाप पैक करवाता हूँ। क्या बोलते हो भाई? 🙌";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bhaiya',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div id="jfc-chat-container">
      {/* Floating Action Button */}
      <button
        id="jfc-live-chat-btn"
        aria-label="Open Live Chat"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[25px] right-[25px] bg-[#cca43b] hover:bg-amber-500 text-[#0f0e0c] font-sans font-extrabold text-sm uppercase tracking-wider py-3.5 px-6 rounded-full shadow-2xl flex items-center gap-2 z-[9999] transition-all hover:scale-105 active:scale-95 group cursor-pointer border border-[#cca43b]/25"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0f0e0c]/40 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
        <MessageSquare className="h-4.5 w-4.5 group-hover:rotate-12 transition-transform" />
        <span>{t.buttonText}</span>
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-[95px] right-[25px] w-[350px] sm:w-[380px] h-[500px] bg-[#0f0e0c] border border-[#cca43b]/20 rounded-2xl shadow-2xl z-[9999] flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#14120f] border-b border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#cca43b] to-amber-500 flex items-center justify-center text-white text-lg font-bold shadow-inner font-serif">
                    💪
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-[#0f0e0c] rounded-full animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white font-serif leading-none flex items-center gap-1">
                    {t.avatarLabel}
                    <Sparkles className="h-3 w-3 text-[#cca43b] animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1 leading-none">
                    {t.online}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0c0a09]/50 scrollbar-thin">
              {messages.map((msg) => {
                const isBhaiya = msg.sender === 'bhaiya';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2 max-w-[85%] ${
                      isBhaiya ? 'mr-auto text-left' : 'ml-auto flex-row-reverse text-right'
                    }`}
                  >
                    {isBhaiya && (
                      <div className="h-7 w-7 rounded-full bg-[#cca43b]/10 border border-[#cca43b]/25 flex items-center justify-center text-xs shrink-0 font-serif">
                        💪
                      </div>
                    )}
                    <div className="space-y-1">
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-xs sm:text-xs font-sans leading-relaxed ${
                          isBhaiya
                            ? 'bg-[#161412] text-gray-200 border border-white/5 rounded-tl-none'
                            : 'bg-gradient-to-r from-[#cca43b] to-amber-600 text-[#0f0e0c] font-semibold rounded-tr-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <p className="text-[8px] text-gray-500 font-mono leading-none px-1">
                        {msg.time}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Typing State */}
              {isTyping && (
                <div className="flex gap-2 max-w-[80%] mr-auto text-left">
                  <div className="h-7 w-7 rounded-full bg-[#cca43b]/10 border border-[#cca43b]/25 flex items-center justify-center text-xs shrink-0 font-serif">
                    💪
                  </div>
                  <div className="space-y-1">
                    <div className="bg-[#161412] text-gray-400 border border-white/5 rounded-2xl rounded-tl-none px-4 py-2 text-xs flex items-center gap-1.5 font-mono">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                      <span>{t.typing}</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Queries Pills */}
            <div className="px-4 py-2 bg-[#0a0907] border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              {quickQueries.map((qq, index) => {
                const label = lang === 'en' ? qq.en : qq.hi;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      // Send custom query
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: Math.random().toString(),
                          sender: 'user',
                          text: label,
                          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        },
                      ]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const reply = lang === 'en' ? qq.reply.en : qq.reply.hi;
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: Math.random().toString(),
                            sender: 'bhaiya',
                            text: reply,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          },
                        ]);
                        setIsTyping(false);
                      }, 1200);
                    }}
                    className="shrink-0 bg-[#161412] hover:bg-[#cca43b]/10 border border-white/5 hover:border-[#cca43b]/30 text-gray-300 hover:text-[#cca43b] text-[10px] font-medium py-1 px-2.5 rounded-full cursor-pointer transition-colors"
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Footer Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-[#110f0d] border-t border-white/5 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 bg-[#161412] border border-white/5 focus:border-[#cca43b]/30 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-[#cca43b] hover:bg-amber-500 text-[#0f0e0c] p-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-center shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
