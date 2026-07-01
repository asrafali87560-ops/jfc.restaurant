import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, UtensilsCrossed, Cookie, GlassWater, FlameKindling, Info, Plus, Star, CheckCircle, SlidersHorizontal, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onAddItemToCart: (item: MenuItem, quantity: number) => void;
}

export default function MenuSection({ onAddItemToCart }: MenuSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyHighProtein, setShowOnlyHighProtein] = useState(false);
  const [showOnlyChefSpecial, setShowOnlyChefSpecial] = useState(false);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'popular'>('default');
  const [addedItemMessage, setAddedItemMessage] = useState<string | null>(null);

  // Map category icons to lucide icons
  const getCategoryIcon = (iconName: string, active: boolean) => {
    const cls = `h-5 w-5 ${active ? 'text-[#0f0e0c]' : 'text-[#cca43b]'}`;
    switch (iconName) {
      case 'Flame': return <Flame className={cls} />;
      case 'Sparkles': return <Sparkles className={cls} />;
      case 'UtensilsCrossed': return <UtensilsCrossed className={cls} />;
      case 'Cookie': return <Cookie className={cls} />;
      case 'FlameKindling': return <FlameKindling className={cls} />;
      case 'GlassWater': return <GlassWater className={cls} />;
      default: return <UtensilsCrossed className={cls} />;
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    onAddItemToCart(item, 1);
    setAddedItemMessage(item.name);
    setTimeout(() => {
      setAddedItemMessage(null);
    }, 2000);
  };

  // Filter and Sort logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Search
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (item.hindiName && item.hindiName.includes(searchTerm)) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // High Protein
      const matchesProtein = !showOnlyHighProtein || item.isHighProtein;

      // Chef Special
      const matchesChef = !showOnlyChefSpecial || item.isChefSpecial;

      // Spice Level
      const matchesSpice = selectedSpiceLevel === 'all' || item.spiceLevel === selectedSpiceLevel;

      return matchesSearch && matchesCategory && matchesProtein && matchesChef && matchesSpice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      return 0; // default order
    });
  }, [searchTerm, selectedCategory, showOnlyHighProtein, showOnlyChefSpecial, selectedSpiceLevel, sortBy]);

  const activeCategoryDetails = useMemo(() => {
    if (selectedCategory === 'all') {
      return {
        name: 'The Complete Grand Menu',
        hindiName: 'सम्पूर्ण व्यंजन सूची',
        description: 'Explore our complete spectrum of luxurious culinary crafts. Handcrafted starters, famous soya chaaps, slow-simmered rich curries, and refreshing house blends.'
      };
    }
    return MENU_CATEGORIES.find(c => c.id === selectedCategory) || MENU_CATEGORIES[0];
  }, [selectedCategory]);

  return (
    <section id="menu" className="py-24 bg-[#0a0907] relative border-t border-white/5">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_80%_20%,#cca43b0c,transparent_55%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#cca43b]">Explore & Order</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
            The Royal Recipe Repertory
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto mt-4" />
        </div>

        {/* Floating Add Toast */}
        <AnimatePresence>
          {addedItemMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-50 bg-[#161411] border border-emerald-500/30 text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold font-serif">Added to Meal Tray!</p>
                <p className="text-[10px] text-gray-400 truncate max-w-[200px]">{addedItemMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters and Search Bar Container */}
        <div className="bg-[#110f0d] border border-white/5 rounded-2xl p-6 mb-12 shadow-lg space-y-6 text-left">
          
          {/* Row 1: Search & Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search */}
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tender malai chaap, butter naan, paneer curry..."
                className="w-full bg-[#161412] border border-white/5 hover:border-white/10 focus:border-[#cca43b]/50 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                id="menu-search-input"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4 relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-[#161412] border border-white/5 hover:border-white/10 focus:border-[#cca43b]/50 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                id="menu-sort-select"
              >
                <option value="default">Sort by: Default Chef Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Popular Choice</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
                ▼
              </div>
            </div>

          </div>

          {/* Row 2: Specialized macro/filter toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
            
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                <SlidersHorizontal className="h-3 w-3" />
                FILTERS:
              </span>

              {/* High Protein Switch */}
              <button
                onClick={() => setShowOnlyHighProtein(!showOnlyHighProtein)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  showOnlyHighProtein 
                    ? 'bg-amber-500/20 text-[#cca43b] border border-amber-500/30' 
                    : 'bg-[#161412] text-gray-400 border border-transparent hover:border-white/5 hover:text-white'
                }`}
              >
                <Activity className="h-3.5 w-3.5" />
                High Protein 💪
              </button>

              {/* Chef Special Switch */}
              <button
                onClick={() => setShowOnlyChefSpecial(!showOnlyChefSpecial)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  showOnlyChefSpecial 
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                    : 'bg-[#161412] text-gray-400 border border-transparent hover:border-white/5 hover:text-white'
                }`}
              >
                <Star className="h-3.5 w-3.5 fill-current" />
                Chef’s Best 🌟
              </button>
            </div>

            {/* Spice levels */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-gray-500 mr-1">SPICE LEVEL:</span>
              {['all', 1, 2, 3].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedSpiceLevel(level as any)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                    selectedSpiceLevel === level
                      ? 'bg-[#cca43b] text-[#0f0e0c] font-bold'
                      : 'bg-[#161412] text-gray-400 border border-transparent hover:bg-white/3 hover:text-white'
                  }`}
                >
                  {level === 'all' ? 'ALL' : '🌶️'.repeat(level as number)}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Category Navigation Tabs */}
        <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none snap-x mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-4 rounded-xl border text-left flex items-center gap-3 shrink-0 snap-center transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#cca43b] text-[#0f0e0c] border-[#cca43b] shadow-lg shadow-[#cca43b]/10'
                : 'bg-[#110f0d] border-white/5 text-white hover:bg-white/3 hover:border-[#cca43b]/25'
            }`}
          >
            <div className={`p-2 rounded-lg ${selectedCategory === 'all' ? 'bg-[#0f0e0c]/10 text-[#0f0e0c]' : 'bg-white/5 text-[#cca43b]'}`}>
              🍽️
            </div>
            <div>
              <span className={`block text-xs font-semibold uppercase tracking-wider ${selectedCategory === 'all' ? 'text-[#0f0e0c]' : 'text-white'}`}>
                Full Repertory
              </span>
              <span className={`text-[10px] block leading-none mt-0.5 ${selectedCategory === 'all' ? 'text-[#0f0e0c]/70' : 'text-gray-500'}`}>
                सम्पूर्ण सूची
              </span>
            </div>
          </button>

          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-4 rounded-xl border text-left flex items-center gap-3 shrink-0 snap-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#cca43b] text-[#0f0e0c] border-[#cca43b] shadow-lg shadow-[#cca43b]/10'
                    : 'bg-[#110f0d] border-white/5 text-white hover:bg-white/3 hover:border-[#cca43b]/25'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-[#0f0e0c]/10' : 'bg-white/5'}`}>
                  {getCategoryIcon(cat.icon, isActive)}
                </div>
                <div>
                  <span className={`block text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-[#0f0e0c]' : 'text-white'}`}>
                    {cat.name.replace('Legendary ', '').replace(' Specialties', '')}
                  </span>
                  <span className={`text-[10px] block leading-none mt-0.5 ${isActive ? 'text-[#0f0e0c]/70' : 'text-gray-500'}`}>
                    {cat.hindiName}
                  </span>
                </div>
              </button>
            );
          })}

        </div>

        {/* Selected Category Banner Card */}
        <div className="bg-[#13110e] border border-[#cca43b]/15 rounded-2xl p-6 sm:p-8 mb-10 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#cca43b]/5 rounded-full blur-3xl" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500">CATEGORY FOCUS</span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
            {activeCategoryDetails.name}
            <span className="text-xs sm:text-sm font-sans font-normal text-gray-500">
              ({activeCategoryDetails.hindiName})
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-4xl font-light leading-relaxed">
            {activeCategoryDetails.description}
          </p>
        </div>

        {/* Dish Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-[#12100e] border border-white/5 hover:border-[#cca43b]/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between text-left group"
              >
                {/* Image & Badges */}
                <div className="relative aspect-video w-full overflow-hidden bg-white/2 border-b border-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Spice indicator overlay */}
                  <div className="absolute bottom-3 left-3 bg-[#0f0e0c]/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-white flex items-center gap-1 select-none">
                    <span>SPICE:</span>
                    <span className="text-red-500">{'🌶️'.repeat(item.spiceLevel)}</span>
                  </div>

                  {/* Veg indicator dot */}
                  <div className="absolute top-3 left-3 bg-[#0f0e0c]/80 backdrop-blur-sm p-1.5 rounded-full flex items-center justify-center border border-emerald-500/30">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>

                  {/* Tag badge (Top Right) */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                    {item.isChefSpecial && (
                      <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-[#0f0e0c] text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-md font-sans">
                        CHEF SPECIAL 🌟
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="bg-[#0f0e0c]/90 border border-[#cca43b]/40 text-[#cca43b] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-md font-mono">
                        MOST POPULAR 🔥
                      </span>
                    )}
                    {item.isHighProtein && (
                      <span className="bg-red-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-md font-mono flex items-center gap-1">
                        HIGH PROTEIN 💪
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#cca43b] transition-colors leading-snug">
                          {item.name}
                        </h4>
                        {item.hindiName && (
                          <span className="text-xs text-gray-500 block leading-none font-sans font-light mt-0.5">
                            {item.hindiName}
                          </span>
                        )}
                      </div>
                      <span className="text-base font-mono font-bold text-[#cca43b] shrink-0">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer details */}
                  <div className="pt-3.5 border-t border-white/5 flex items-center justify-between">
                    
                    {/* Macros detail */}
                    <div className="text-[10px] font-mono text-gray-500">
                      {item.proteinGrams ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <Activity className="h-3 w-3" />
                          {item.proteinGrams}g Soy Protein
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-600">
                          <Info className="h-3 w-3" /> Fresh Family Fare
                        </span>
                      )}
                    </div>

                    {/* Add to cart CTA */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-white/5 hover:bg-[#cca43b] border border-[#cca43b]/40 hover:border-[#cca43b] text-[#cca43b] hover:text-[#0f0e0c] font-bold text-[10px] uppercase tracking-wider py-2 px-3.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#cca43b]/5"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add to Tray
                    </button>

                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty search state */}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-4 border border-dashed border-white/10 rounded-2xl bg-white/1">
              <span className="text-4xl block">🔍</span>
              <div className="space-y-1 max-w-sm mx-auto">
                <h4 className="text-white font-serif font-bold text-base">No culinary match found</h4>
                <p className="text-xs text-gray-400 font-light leading-normal">
                  Try adjusting your search terms or filters (e.g. searching "malai" or toggling off specific switches).
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setShowOnlyHighProtein(false);
                  setShowOnlyChefSpecial(false);
                  setSelectedSpiceLevel('all');
                }}
                className="text-xs text-[#cca43b] font-mono border-b border-[#cca43b] hover:text-white hover:border-white transition-all cursor-pointer py-1"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
