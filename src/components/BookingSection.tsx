import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Coffee, Ticket, Check, X, Printer, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking } from '../types';

export default function BookingSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(4);
  const [tableType, setTableType] = useState<'standard' | 'lounge' | 'outdoor'>('standard');
  const [specialRequests, setSpecialRequests] = useState('');
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [selectedTableNum, setSelectedTableNum] = useState<number | null>(null);

  // Load existing booking from local storage
  useEffect(() => {
    const saved = localStorage.getItem('jfc_active_booking');
    if (saved) {
      try {
        setActiveBooking(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) {
      return;
    }

    const newBooking: Booking = {
      id: 'JFC-' + Math.floor(100000 + Math.random() * 900000),
      name,
      email,
      phone,
      date,
      time,
      guests,
      tableType,
      specialRequests,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('jfc_active_booking', JSON.stringify(newBooking));
    setActiveBooking(newBooking);
  };

  const handleCancelBooking = () => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      localStorage.removeItem('jfc_active_booking');
      setActiveBooking(null);
      setSelectedTableNum(null);
    }
  };

  // Pre-configured list of mock dining tables for the spatial selector
  const TABLES = [
    { id: 1, type: 'standard', name: 'Family Table 1', seats: 4, x: 'left-[15%]', y: 'top-[35%]' },
    { id: 2, type: 'standard', name: 'Family Table 2', seats: 6, x: 'left-[38%]', y: 'top-[35%]' },
    { id: 3, type: 'standard', name: 'Family Table 3', seats: 4, x: 'left-[60%]', y: 'top-[35%]' },
    { id: 4, type: 'lounge', name: 'VIP Cozy Booth 4', seats: 4, x: 'left-[15%]', y: 'top-[65%]' },
    { id: 5, type: 'lounge', name: 'Celebration Lounge 5', seats: 8, x: 'left-[38%]', y: 'top-[65%]' },
    { id: 6, type: 'outdoor', name: 'Patio Table 6', seats: 2, x: 'left-[82%]', y: 'top-[50%]' },
  ];

  const handleTableSelect = (table: any) => {
    setSelectedTableNum(table.id);
    setTableType(table.type as any);
    setGuests(table.seats);
  };

  return (
    <section id="booking" className="py-24 bg-[#0d0b09] relative border-t border-white/5">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_80%,#cca43b0c,transparent_55%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#cca43b]">Table Reservation</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
            Secure Your Culinary Seat
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#cca43b] to-transparent mx-auto mt-4" />
          <p className="text-gray-400 mt-4 text-sm sm:text-base font-light leading-relaxed">
            Our cozy family restaurant has comfortable, medium-sized dining spaces. Ensure a perfect, stress-free family dinner by pre-booking your favorite spot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          <AnimatePresence mode="wait">
            {!activeBooking ? (
              <>
                {/* Left Column: Spatial Floor Plan Selector (7 cols) */}
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left"
                >
                  <div className="space-y-1">
                    <span className="text-[#cca43b] text-xs font-mono uppercase tracking-widest font-bold">Interactive Seating</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Choose Your Spot</h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Click any highlighted table on our cozy dining layout below to auto-select its seating capacity and reservation type.
                    </p>
                  </div>

                  {/* Floor Plan Stage Container */}
                  <div className="relative w-full aspect-[16/10] bg-[#14120f] border border-white/5 rounded-2xl overflow-hidden p-6 shadow-inner select-none">
                    
                    {/* Background decorations */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    {/* Room areas markers */}
                    <div className="absolute top-4 left-4 bg-white/5 border border-white/5 text-[9px] font-mono uppercase px-2 py-0.5 text-gray-500 rounded">
                      ENTRANCE 🚪
                    </div>
                    <div className="absolute bottom-4 left-4 bg-[#cca43b]/10 border border-[#cca43b]/20 text-[9px] font-mono text-[#cca43b] px-2 py-0.5 rounded font-bold">
                      BILLING COUNTER & BHAIYA 🏋️
                    </div>
                    <div className="absolute top-4 right-4 bg-white/5 border border-white/5 text-[9px] font-mono uppercase px-2 py-0.5 text-gray-500 rounded">
                      KITCHEN 🍳
                    </div>
                    <div className="absolute right-4 bottom-4 bg-white/5 border border-white/5 text-[9px] font-mono uppercase px-2 py-0.5 text-gray-500 rounded">
                      PATIO ZONE 🌿
                    </div>

                    {/* Room Size Indicator Line */}
                    <div className="absolute inset-x-8 bottom-1/4 h-px border-t border-dashed border-white/5 flex justify-between px-2">
                      <span className="text-[8px] font-mono text-gray-600 -mt-2">COZY MEDIUM FAMILY ROOM</span>
                      <span className="text-[8px] font-mono text-gray-600 -mt-2">NOT TOO BIG, NOT TOO SMALL</span>
                    </div>

                    {/* Interactive Table Pins */}
                    {TABLES.map((tbl) => {
                      const isSelected = selectedTableNum === tbl.id;
                      return (
                        <button
                          key={tbl.id}
                          onClick={() => handleTableSelect(tbl)}
                          className={`absolute ${tbl.x} ${tbl.y} -translate-x-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'bg-[#cca43b] text-[#0f0e0c] border-[#cca43b] scale-110 shadow-lg shadow-[#cca43b]/30'
                              : 'bg-[#1b1916] text-gray-300 border-white/10 hover:border-[#cca43b]/50 hover:bg-[#25221e]'
                          }`}
                          title={`Click to book ${tbl.name}`}
                        >
                          <span className="text-sm sm:text-lg">🪑</span>
                          <span className="text-[9px] font-mono font-bold mt-1 uppercase block leading-none">
                            T-{tbl.id}
                          </span>
                          <span className="text-[8px] font-mono tracking-tighter opacity-60 block mt-0.5">
                            {tbl.seats} Seats
                          </span>
                        </button>
                      );
                    })}

                  </div>

                  {/* Dining types legend */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-[#14120f] border border-white/5 p-3 rounded-xl flex flex-col items-center">
                      <span className="text-lg">🪵</span>
                      <span className="text-[10px] font-serif font-bold text-white mt-1">Standard Table</span>
                      <span className="text-[8px] font-mono text-gray-500 uppercase mt-0.5">Classic Family</span>
                    </div>
                    <div className="bg-[#14120f] border border-white/5 p-3 rounded-xl flex flex-col items-center">
                      <span className="text-lg">✨</span>
                      <span className="text-[10px] font-serif font-bold text-[#cca43b] mt-1">VIP Lounge Box</span>
                      <span className="text-[8px] font-mono text-[#cca43b] uppercase mt-0.5">Plush & Intimate</span>
                    </div>
                    <div className="bg-[#14120f] border border-white/5 p-3 rounded-xl flex flex-col items-center">
                      <span className="text-lg">🌿</span>
                      <span className="text-[10px] font-serif font-bold text-emerald-400 mt-1">Outdoor Patio</span>
                      <span className="text-[8px] font-mono text-emerald-400 uppercase mt-0.5">Open & Windy</span>
                    </div>
                  </div>

                </motion.div>

                {/* Right Column: Reservation Form (5 cols) */}
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="lg:col-span-5 text-left"
                >
                  <form onSubmit={handleSubmit} className="bg-[#13110e] border border-[#cca43b]/20 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
                    
                    <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
                      <Calendar className="h-5 w-5 text-[#cca43b]" />
                      Reserve Your Spot
                    </h3>

                    {/* Selected Table details indicator */}
                    {selectedTableNum ? (
                      <div className="bg-[#cca43b]/10 border border-[#cca43b]/20 px-3 py-2.5 rounded-lg flex justify-between items-center text-xs">
                        <span className="text-[#cca43b] font-serif">Selected Table: <strong className="font-bold">Table {selectedTableNum}</strong> ({tableType.toUpperCase()})</span>
                        <button 
                          type="button" 
                          onClick={() => setSelectedTableNum(null)}
                          className="text-gray-400 hover:text-white font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ) : null}

                    {/* Name Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Asraf Ali"
                        className="w-full bg-[#1b1916] border border-white/5 focus:border-[#cca43b]/40 rounded-xl py-3 px-4 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        id="booking-name"
                      />
                    </div>

                    {/* Phone & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Mobile No.</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full bg-[#1b1916] border border-white/5 focus:border-[#cca43b]/40 rounded-xl py-3 px-4 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                          id="booking-phone"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Email Address (Optional)</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full bg-[#1b1916] border border-white/5 focus:border-[#cca43b]/40 rounded-xl py-3 px-4 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                          id="booking-email"
                        />
                      </div>

                    </div>

                    {/* Guests & Date/Time Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">No. of Guests</label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="w-full bg-[#1b1916] border border-white/5 focus:border-[#cca43b]/40 rounded-xl py-3 px-4 text-xs sm:text-sm text-white focus:outline-none transition-colors font-mono"
                          id="booking-guests"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Dining Date</label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-[#1b1916] border border-white/5 focus:border-[#cca43b]/40 rounded-xl py-3 px-4 text-xs sm:text-sm text-white focus:outline-none transition-colors font-mono"
                          id="booking-date"
                        />
                      </div>

                    </div>

                    {/* Time Slot Selector */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Preferred Dinner/Lunch Slot</label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {['12:30', '13:30', '18:00', '19:30', '20:30', '21:30', '22:00'].map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`py-2 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                              time === slot
                                ? 'bg-[#cca43b] text-[#0f0e0c] border-[#cca43b] font-bold'
                                : 'bg-[#1b1916] border-white/5 text-gray-400 hover:text-white hover:bg-white/3'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Special Requests / Occasions</label>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="e.g. Celebrating a birthday! Need extra butter on my chaaps..."
                        className="w-full bg-[#1b1916] border border-white/5 focus:border-[#cca43b]/40 rounded-xl py-3 px-4 text-xs text-white focus:outline-none transition-colors h-16 resize-none"
                        id="booking-notes"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#cca43b] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#0f0e0c] font-bold text-xs uppercase tracking-wider py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      Complete My Booking
                    </button>

                  </form>
                </motion.div>
              </>
            ) : (
              /* Booking Pass / Ticket Showcase (Takes Full Width) */
              <motion.div
                key="ticket"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="col-span-full max-w-xl mx-auto w-full text-left bg-[#13110e] border border-[#cca43b]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Decorative cutouts of a retro luxury ticket */}
                <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0d0b09] border-r border-[#cca43b]/30 z-10" />
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0d0b09] border-l border-[#cca43b]/30 z-10" />
                
                <div className="space-y-6">
                  
                  {/* Ticket Header */}
                  <div className="flex justify-between items-center border-b border-dashed border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-6 w-6 text-[#cca43b]" />
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500">JFC GUEST PASS</span>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-white -mt-0.5">Dine-In Reservation</h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-[#cca43b]/10 text-[#cca43b] border border-[#cca43b]/20 px-3 py-1 rounded">
                      CODE: {activeBooking.id}
                    </span>
                  </div>

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5 text-xs">
                    
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500">GUEST HOST</span>
                      <p className="font-serif font-bold text-sm text-white">{activeBooking.name}</p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500">CONTACT</span>
                      <p className="font-mono text-white font-medium">{activeBooking.phone}</p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500">DATE & TIME</span>
                      <p className="font-mono text-white font-medium">
                        {activeBooking.date} • <strong className="text-[#cca43b]">{activeBooking.time} PM</strong>
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500">TABLE ARRANGEMENT</span>
                      <p className="text-white font-medium flex items-center gap-1 font-serif">
                        <span>🪑 {activeBooking.guests} Guests</span>
                        <span className="capitalize text-amber-500">({activeBooking.tableType})</span>
                      </p>
                    </div>

                    {activeBooking.specialRequests ? (
                      <div className="col-span-2 space-y-0.5 bg-white/2 p-3 rounded-xl border border-white/5">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block mb-0.5">SPECIAL REQUESTS</span>
                        <p className="text-gray-300 italic font-light leading-relaxed font-sans text-[11px]">
                          "{activeBooking.specialRequests}"
                        </p>
                      </div>
                    ) : null}

                  </div>

                  {/* Mock Ticket Barcode / QR Section */}
                  <div className="border-t border-dashed border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    
                    <div className="space-y-1 sm:text-left text-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#cca43b] flex items-center justify-center sm:justify-start gap-1">
                        <Sparkles className="h-3 w-3 animate-pulse" /> RESERVATION CONFIRMED
                      </span>
                      <p className="text-[11px] text-gray-400 font-light leading-snug">
                        Your table is held for exactly <strong className="text-white">15 minutes</strong> past your selected slot. We are located at Raj Nagar Extension, Ghaziabad. Show this passcode at the counter.
                      </p>
                    </div>

                    {/* QR Code Container */}
                    <div className="h-24 w-24 bg-white p-2 rounded-xl shrink-0 flex items-center justify-center border-2 border-amber-600/30">
                      <div className="h-full w-full bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:6px_6px] relative flex items-center justify-center font-mono text-[9px] font-bold text-black border border-black/10 select-none">
                        <span className="bg-white px-1 py-0.5 text-center leading-none">JFC<br />PASS</span>
                      </div>
                    </div>

                  </div>

                  {/* Actions under confirmation */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider py-3.5 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Printer className="h-4 w-4 text-[#cca43b]" /> Print Guest Pass
                    </button>
                    <button
                      onClick={handleCancelBooking}
                      className="bg-red-950/40 hover:bg-red-900/60 text-red-400 font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl border border-red-900/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <X className="h-4 w-4" /> Cancel Table
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
