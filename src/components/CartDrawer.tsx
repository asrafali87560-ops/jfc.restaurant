import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Sparkles, FileText, CheckCircle, Award, Coins, Gift, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { Language, translations } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  lang: Language;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang
}: CartDrawerProps) {
  const t = translations[lang].cart;
  const tl = translations[lang].loyalty;

  const [orderComplete, setOrderComplete] = useState<any>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Loyalty Club States
  const [isJoinedClub, setIsJoinedClub] = useState(false);
  const [points, setPoints] = useState(0);
  const [memberName, setMemberName] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [isRedeemingPoints, setIsRedeemingPoints] = useState(false);
  const [joinError, setJoinError] = useState('');

  // Load Loyalty Club state from localStorage
  useEffect(() => {
    const joined = localStorage.getItem('jfc_loyalty_joined') === 'true';
    const savedPoints = localStorage.getItem('jfc_loyalty_points');
    const name = localStorage.getItem('jfc_loyalty_name') || '';
    const phone = localStorage.getItem('jfc_loyalty_phone') || '';

    setIsJoinedClub(joined);
    if (savedPoints) {
      setPoints(parseInt(savedPoints, 10));
    }
    setMemberName(name);
    setMemberPhone(phone);
  }, []);

  const handleJoinClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberPhone.trim()) {
      setJoinError(lang === 'en' ? 'Please fill in all fields!' : 'कृपया सभी फ़ील्ड भरें!');
      return;
    }
    setJoinError('');
    setIsJoinedClub(true);
    setPoints(150); // Welcome bonus points!
    localStorage.setItem('jfc_loyalty_joined', 'true');
    localStorage.setItem('jfc_loyalty_points', '150');
    localStorage.setItem('jfc_loyalty_name', memberName);
    localStorage.setItem('jfc_loyalty_phone', memberPhone);
  };

  const handleNoteChange = (id: string, text: string) => {
    setNotes(prev => ({ ...prev, [id]: text }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const packagingCharge = subtotal > 0 ? 15 : 0; // packaging

  // Redemption: 100 points = ₹50 off
  const canRedeem = isJoinedClub && points >= 100;
  const appliedDiscount = (isRedeemingPoints && canRedeem) ? 50 : 0;
  const grandTotal = Math.max(0, subtotal + gst + packagingCharge - appliedDiscount);

  // Calculate points to earn from this transaction (1 point per 1 Rupee of final bill)
  const pointsToEarn = Math.round(grandTotal);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Process Loyalty points adjustment on successful checkout simulation
    let previousPoints = points;
    let pointsSpent = 0;
    let newPointsBalance = points;

    if (isJoinedClub) {
      if (isRedeemingPoints && canRedeem) {
        newPointsBalance -= 100;
        pointsSpent = 100;
      }
      newPointsBalance += pointsToEarn;
      setPoints(newPointsBalance);
      localStorage.setItem('jfc_loyalty_points', String(newPointsBalance));
    }

    const summary = {
      orderId: 'JFC-KITCHEN-' + Math.floor(100 + Math.random() * 900),
      items: cartItems.map(item => ({
        name: lang === 'hi' && item.menuItem.hindiName ? item.menuItem.hindiName : item.menuItem.name,
        qty: item.quantity,
        note: notes[item.menuItem.id] || ''
      })),
      subtotal,
      gst,
      packagingCharge,
      appliedDiscount,
      grandTotal,
      pointsEarned: isJoinedClub ? pointsToEarn : 0,
      pointsSpent,
      newPointsBalance,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setOrderComplete(summary);
  };

  const handleResetOrder = () => {
    onClearCart();
    setNotes({});
    setOrderComplete(null);
    setIsRedeemingPoints(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#070605]"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0f0e0c] border-l border-[#cca43b]/15 shadow-2xl flex flex-col justify-between text-left text-white"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#cca43b]" />
                <span className="font-serif text-lg font-bold tracking-wide">{t.title}</span>
                <span className="bg-[#cca43b]/10 text-[#cca43b] text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  {cartItems.length} {t.itemsCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 scrollbar-thin space-y-6">
              <AnimatePresence mode="wait">
                {!orderComplete ? (
                  <>
                    {/* Cart Items List */}
                    {cartItems.length > 0 ? (
                      <motion.div
                        key="cart-list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        {cartItems.map((item) => (
                          <div
                            key={item.menuItem.id}
                            className="bg-white/2 border border-white/5 rounded-xl p-3.5 space-y-3"
                          >
                            <div className="flex justify-between gap-3">
                              <div>
                                <h4 className="font-serif font-bold text-xs sm:text-sm text-white leading-tight">
                                  {lang === 'hi' && item.menuItem.hindiName ? item.menuItem.hindiName : item.menuItem.name}
                                </h4>
                                <p className="text-[10px] text-gray-500 font-mono mt-0.5">₹{item.menuItem.price} each</p>
                              </div>
                              <span className="font-mono font-bold text-xs sm:text-sm text-[#cca43b] shrink-0">
                                ₹{item.menuItem.price * item.quantity}
                              </span>
                            </div>

                            {/* Customization notes */}
                            <input
                              type="text"
                              value={notes[item.menuItem.id] || ''}
                              onChange={(e) => handleNoteChange(item.menuItem.id, e.target.value)}
                              placeholder={t.customizationPlaceholder}
                              className="w-full bg-[#161412] border border-white/5 focus:border-[#cca43b]/30 rounded-lg py-1.5 px-3 text-[10px] text-gray-300 placeholder-gray-600 focus:outline-none"
                            />

                            {/* Adjust Quantity */}
                            <div className="flex justify-between items-center pt-2 border-t border-white/5">
                              <button
                                onClick={() => onRemoveItem(item.menuItem.id)}
                                className="text-[10px] text-gray-500 hover:text-red-400 font-mono flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-3 w-3" /> {t.removeBtn}
                              </button>

                              <div className="flex items-center gap-2.5 bg-white/5 rounded-lg p-1.5 border border-white/5">
                                <button
                                  onClick={() => onUpdateQuantity(item.menuItem.id, Math.max(1, item.quantity - 1))}
                                  className="p-1 rounded bg-[#161412] hover:bg-[#cca43b]/10 text-gray-400 hover:text-[#cca43b] cursor-pointer"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="font-mono font-bold text-xs w-5 text-center text-white">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                                  className="p-1 rounded bg-[#161412] hover:bg-[#cca43b]/10 text-gray-400 hover:text-[#cca43b] cursor-pointer"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      /* Empty state */
                      <motion.div
                        key="empty-cart"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col justify-center items-center text-center space-y-3 py-16"
                      >
                        <span className="text-3xl">🍲</span>
                        <div>
                          <h4 className="font-serif font-bold text-sm text-white">{t.emptyTitle}</h4>
                          <p className="text-[11px] text-gray-500 max-w-xs mt-1 leading-normal font-light">
                            {t.emptyDesc}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* loyalty club panel inside sliding drawer */}
                    {cartItems.length > 0 && (
                      <div className="bg-gradient-to-br from-[#161411] to-[#0f0e0d] border border-[#cca43b]/20 rounded-2xl p-4.5 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                          <div className="flex items-center gap-2">
                            <Coins className="h-5 w-5 text-[#cca43b]" />
                            <div>
                              <h4 className="text-xs font-bold font-serif text-white tracking-wide uppercase">{tl.title}</h4>
                              <p className="text-[9px] text-gray-400 uppercase tracking-widest">{tl.sub}</p>
                            </div>
                          </div>
                          {isJoinedClub ? (
                            <span className="bg-gradient-to-r from-amber-500/10 to-amber-600/20 text-[#cca43b] border border-[#cca43b]/35 text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                              <Award className="h-3 w-3 shrink-0" />
                              {tl.unlockedBadge}
                            </span>
                          ) : (
                            <span className="bg-white/5 text-gray-500 text-[8px] font-mono px-2 py-0.5 rounded">
                              {tl.lockedBadge}
                            </span>
                          )}
                        </div>

                        {!isJoinedClub ? (
                          /* Join form */
                          <form onSubmit={handleJoinClub} className="space-y-3">
                            <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                              {tl.desc}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={memberName}
                                onChange={(e) => setMemberName(e.target.value)}
                                placeholder={lang === 'en' ? 'Your Name' : 'आपका नाम'}
                                className="bg-[#1c1a17] border border-white/5 focus:border-[#cca43b]/30 rounded-lg py-1.5 px-3 text-[10px] text-white focus:outline-none"
                              />
                              <input
                                type="tel"
                                value={memberPhone}
                                onChange={(e) => setMemberPhone(e.target.value)}
                                placeholder={lang === 'en' ? 'Phone Number' : 'फ़ोन नंबर'}
                                className="bg-[#1c1a17] border border-white/5 focus:border-[#cca43b]/30 rounded-lg py-1.5 px-3 text-[10px] text-white focus:outline-none"
                              />
                            </div>
                            {joinError && (
                              <p className="text-[9px] text-red-400 font-mono text-left">{joinError}</p>
                            )}
                            <button
                              type="submit"
                              className="w-full bg-gradient-to-r from-amber-600/10 to-amber-600/20 hover:from-amber-600/20 hover:to-amber-600/30 border border-[#cca43b]/30 hover:border-[#cca43b]/60 text-[#cca43b] font-bold text-[10px] py-2 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
                            >
                              <Gift className="h-3.5 w-3.5" />
                              {tl.joinBtn}
                            </button>
                          </form>
                        ) : (
                          /* Points dashboard and redemption */
                          <div className="space-y-3">
                            <div className="flex justify-between items-center bg-[#1c1a17] rounded-xl p-3 border border-white/5">
                              <div>
                                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wide">{tl.pointsBalance}</span>
                                <p className="text-base font-bold font-mono text-white flex items-center gap-1 mt-0.5">
                                  <span className="text-[#cca43b]">🪙</span> {points} <span className="text-[10px] text-gray-400 font-sans font-normal">Coins</span>
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wide">{tl.pointsEarn}</span>
                                <p className="text-xs font-bold font-mono text-[#cca43b] mt-0.5">
                                  +{pointsToEarn} Coins
                                </p>
                              </div>
                            </div>

                            {/* Redemption Checkbox */}
                            <div className="flex items-center justify-between border-t border-white/5 pt-3">
                              <label className="flex items-start gap-2.5 cursor-pointer text-left select-none">
                                <input
                                  type="checkbox"
                                  checked={isRedeemingPoints}
                                  disabled={!canRedeem}
                                  onChange={(e) => setIsRedeemingPoints(e.target.checked)}
                                  className="mt-0.5 h-3.5 w-3.5 accent-[#cca43b] cursor-pointer"
                                />
                                <div className="text-left leading-tight">
                                  <span className={`text-[10px] block font-medium ${canRedeem ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {tl.discountClaimText}
                                  </span>
                                  {!canRedeem && (
                                    <span className="text-[8px] text-red-500/80 font-mono block mt-0.5">
                                      * {tl.notEnoughPoints}
                                    </span>
                                  )}
                                </div>
                              </label>
                              {isRedeemingPoints && canRedeem && (
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[8px] font-extrabold uppercase tracking-wide px-1.5 py-0.5 rounded font-mono shrink-0">
                                  {tl.discountClaimed}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  /* Order Slip / Kitchen Pre-order confirmed */
                  <motion.div
                    key="confirmed-slip"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-5 text-center space-y-2">
                      <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <h4 className="font-serif text-white font-bold text-sm">{t.preOrderHeader}</h4>
                      <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-normal font-light">
                        {t.preOrderDesc}
                      </p>
                    </div>

                    {/* Receipt Card */}
                    <div className="bg-[#14120f] border border-dashed border-white/15 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5 text-[#cca43b]" />
                          {t.orderSlipTitle}
                        </span>
                        <span className="text-amber-500 font-bold">{orderComplete.orderId}</span>
                      </div>

                      {/* Items list */}
                      <div className="space-y-2 text-xs text-left">
                        {orderComplete.items.map((it: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-start">
                            <div>
                              <p className="font-serif font-bold text-white leading-tight">
                                {it.name} <strong className="text-[#cca43b] font-sans text-[11px]">x{it.qty}</strong>
                              </p>
                              {it.note && <span className="text-[9px] text-gray-500 italic block">"{it.note}"</span>}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total bill display */}
                      <div className="border-t border-dashed border-white/10 pt-3 text-xs space-y-1.5 font-mono text-left">
                        <div className="flex justify-between text-gray-500 text-[10px]">
                          <span>{t.subtotal}</span>
                          <span>₹{orderComplete.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-[10px]">
                          <span>{t.gst}</span>
                          <span>₹{orderComplete.gst}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-[10px]">
                          <span>{t.packaging}</span>
                          <span>₹{orderComplete.packagingCharge}</span>
                        </div>

                        {orderComplete.appliedDiscount > 0 && (
                          <div className="flex justify-between text-emerald-400 text-[10px]">
                            <span className="flex items-center gap-1">
                              <Coins className="h-3 w-3" />
                              {tl.appliedDiscount}
                            </span>
                            <span>-₹{orderComplete.appliedDiscount}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-[#cca43b] font-bold border-t border-white/5 pt-2">
                          <span>{lang === 'en' ? 'DINE-IN EST. BILL' : 'अनुमानित बिल'}</span>
                          <span>₹{orderComplete.grandTotal}</span>
                        </div>
                      </div>

                      {/* Loyalty Coins Earned / Ticket Details */}
                      {isJoinedClub && (
                        <div className="border-t border-white/5 pt-3 bg-white/2 rounded-lg p-2.5 text-center border border-white/5">
                          <p className="text-[9px] text-gray-400 font-mono tracking-wide">
                            COINS TRANSFERRED TO YOUR ACCOUNT
                          </p>
                          <div className="flex items-center justify-center gap-4 mt-2 font-mono">
                            {orderComplete.pointsSpent > 0 && (
                              <div className="text-xs text-red-400">
                                <span className="text-[8px] text-gray-500 block">REDEEMED</span>
                                -100 Coins
                              </div>
                            )}
                            <div className="text-xs text-emerald-400">
                              <span className="text-[8px] text-gray-500 block">EARNED</span>
                              +{orderComplete.pointsEarned} Coins
                            </div>
                            <div className="text-xs text-white font-bold border-l border-white/5 pl-4">
                              <span className="text-[8px] text-gray-500 block">NEW BALANCE</span>
                              🪙 {orderComplete.newPointsBalance}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* QR Barcode */}
                      <div className="border-t border-white/5 pt-4 flex flex-col items-center space-y-1.5 text-center">
                        <div className="h-20 w-20 bg-white p-1.5 rounded-lg flex items-center justify-center border border-amber-600/20 select-none">
                          <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_6px)]" />
                        </div>
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.2em]">{t.presentCounter}</span>
                      </div>

                    </div>

                    <button
                      onClick={handleResetOrder}
                      className="w-full bg-[#cca43b] hover:bg-amber-600 text-[#0f0e0c] font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all cursor-pointer text-center"
                    >
                      {t.clearCloseBtn}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Billing breakdown under CartDrawer (Only when cart has items & order is not complete) */}
            {!orderComplete && cartItems.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-white/5 bg-[#14120e] space-y-4">
                <div className="text-xs font-mono space-y-2 border-b border-white/5 pb-4 text-left">
                  <div className="flex justify-between text-gray-400">
                    <span>{t.subtotal}</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>{t.gst}</span>
                    <span>₹{gst}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>{t.packaging}</span>
                    <span>₹{packagingCharge}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span className="flex items-center gap-1">
                        <Coins className="h-3.5 w-3.5 text-emerald-400" />
                        {tl.appliedDiscount}
                      </span>
                      <span>-₹{appliedDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#cca43b] font-bold text-sm pt-1 border-t border-white/5">
                    <span>{t.estTotal}</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-[#cca43b] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#0f0e0c] font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="h-4 w-4" /> {t.preOrderBtn}
                  </button>
                  <p className="text-[9px] text-gray-500 text-center uppercase tracking-wide">
                    {t.preOrderBtnDesc}
                  </p>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
