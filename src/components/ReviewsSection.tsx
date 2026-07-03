import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Quote, Plus, Check, Award, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_REVIEWS } from '../data/menuData';
import { Review } from '../types';
import { Language } from '../data/translations';

interface ReviewsSectionProps {
  lang: Language;
}

export default function ReviewsSection({ lang }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Load reviews from local storage, merging with defaults
    const saved = localStorage.getItem('jfc_custom_reviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviews([...INITIAL_REVIEWS, ...parsed]);
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const customReview: Review = {
      id: 'custom-' + Date.now(),
      author: newAuthor,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment,
    };

    const currentSaved = localStorage.getItem('jfc_custom_reviews');
    let updatedSaved: Review[] = [];
    if (currentSaved) {
      try {
        updatedSaved = JSON.parse(currentSaved);
      } catch (e) {
        updatedSaved = [];
      }
    }
    updatedSaved.push(customReview);
    localStorage.setItem('jfc_custom_reviews', JSON.stringify(updatedSaved));

    setReviews([...reviews, customReview]);
    setNewAuthor('');
    setNewComment('');
    setNewRating(5);
    setIsFormOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const activeReview = reviews[activeIdx] || INITIAL_REVIEWS[0];

  return (
    <section id="reviews" className="py-24 bg-[#0a0907] relative border-t border-white/5">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_80%,#cca43b08,transparent_55%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#cca43b]">
            {lang === 'en' ? 'Guest Testimonials' : 'अतिथियों की राय'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
            {lang === 'en' ? 'The Voice of Our Patrons' : 'हमारे संरक्षकों की आवाज'}
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto mt-4" />
          <p className="text-gray-400 mt-4 text-xs sm:text-sm font-light leading-relaxed">
            {lang === 'en'
              ? 'Honest feedback from food enthusiasts who have been savoring our legendary chaap, rich main courses, and counter hospitality over the years.'
              : 'हमारे प्रिय भोजन प्रेमियों से वास्तविक समीक्षाएं जो वर्षों से हमारे प्रसिद्ध चाप, समृद्ध मुख्य व्यंजनों और काउंटर भैया के सजीव आतिथ्य का आनंद ले रहे हैं।'}
          </p>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto mb-8 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3"
            >
              <Check className="h-5 w-5 shrink-0" />
              <div className="text-left">
                <span className="text-xs font-bold font-serif">
                  {lang === 'en' ? 'Review Published!' : 'समीक्षा प्रकाशित हुई!'}
                </span>
                <p className="text-[10px] text-emerald-400/80 mt-0.5">
                  {lang === 'en' ? 'Thank you! Your feedback helps us polish our service.' : 'धन्यवाद! आपकी बहुमूल्य प्रतिक्रिया हमें निरंतर सुधार करने में मदद करती है।'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Testimonial Carousel Frame (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left relative min-h-[340px] flex flex-col justify-between bg-[#110f0d] border border-white/5 p-6 sm:p-10 rounded-3xl shadow-xl">
            
            {/* Top row */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                {(activeReview.isLocalGuide || activeReview.id.toString().includes('custom')) && (
                  <span className="inline-flex items-center gap-1 bg-[#cca43b]/10 text-[#cca43b] border border-[#cca43b]/20 text-[9px] font-mono uppercase px-2.5 py-1 rounded-full font-bold">
                    <Award className="h-3.5 w-3.5 fill-current animate-pulse" />
                    {lang === 'en' ? 'Patrons Choice Award' : 'ग्राहकों की पसंद पुरस्कार'}
                  </span>
                )}
                <div className="flex text-amber-400 gap-0.5 pt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4.5 w-4.5 ${i < activeReview.rating ? 'fill-current text-amber-400' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
              </div>
              <Quote className="h-10 w-10 text-[#cca43b]/15 fill-current shrink-0" />
            </div>

            {/* Comment display with motion animation */}
            <div className="my-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeReview.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-white text-xs sm:text-sm md:text-base leading-relaxed italic font-light font-sans"
                >
                  "{activeReview.comment}"
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="border-t border-white/5 pt-6 flex items-center justify-between">
              <div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  {activeReview.author}
                </h4>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                  <Calendar className="h-3 w-3" />
                  {lang === 'en' ? 'Dined:' : 'दिनांक:'} {activeReview.date}
                </span>
              </div>

              {/* Slider Controls */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-white/10 rounded-full hover:border-[#cca43b] text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Previous Review"
                >
                  ◀
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 border border-white/10 rounded-full hover:border-[#cca43b] text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Next Review"
                >
                  ▶
                </button>
              </div>
            </div>

          </div>

          {/* Right: Submit/Write Review Option (5 cols) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <div className="bg-[#13110e] border border-[#cca43b]/15 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
              
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#cca43b] uppercase tracking-widest block">
                  {lang === 'en' ? 'Patron Hub' : 'समीक्षा केंद्र'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {lang === 'en' ? 'Share Your JFC Story' : 'अपनी जेएफसी कहानी बताएं'}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {lang === 'en'
                    ? 'Have you dined with us or ordered our special tandoori chaap? Your feedback means the world to our kitchen team and counter bhaiya!'
                    : 'क्या आपने हमारे यहाँ भोजन का स्वाद लिया है? आपकी प्रतिक्रिया हमारी पूरी टीम और कड़क बॉडी वाले काउंटर भैया के लिए बेहद महत्वपूर्ण है!'}
                </p>
              </div>

              {!isFormOpen ? (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full bg-white/5 border border-white/10 hover:border-[#cca43b] text-[#cca43b] hover:bg-white/10 font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  {lang === 'en' ? 'Write A Review' : 'समीक्षा लिखें'}
                </button>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block">
                      {lang === 'en' ? 'Your Name' : 'आपका नाम'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full bg-[#1b1916] border border-white/5 focus:border-[#cca43b]/40 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block">
                      {lang === 'en' ? 'Your Rating' : 'आपकी रेटिंग'}
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= newRating ? 'fill-current text-amber-400' : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block">
                      {lang === 'en' ? 'Your Review Comments' : 'अपनी टिप्पणी लिखें'}
                    </label>
                    <textarea
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={lang === 'en' ? "How was the food? Write about our famous chaap or the counter manager bhaiya's fitness vibes!" : "भोजन कैसा था? हमारे सुप्रसिद्ध चाप या कड़क बॉडी वाले काउंटर भैया के बारे में अपने विचार साझा करें!"}
                      className="w-full bg-[#1b1916] border border-white/5 focus:border-[#cca43b]/40 rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-colors h-24 resize-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="flex-1 bg-white/2 hover:bg-white/5 text-gray-400 font-semibold text-[10px] uppercase tracking-wider py-3 rounded-lg border border-white/5 cursor-pointer"
                    >
                      {lang === 'en' ? 'Cancel' : 'रद्द करें'}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#cca43b] to-amber-600 text-[#0f0e0c] font-bold text-[10px] uppercase tracking-wider py-3 rounded-lg shadow-md cursor-pointer"
                    >
                      {lang === 'en' ? 'Publish Review' : 'समीक्षा प्रकाशित करें'}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
