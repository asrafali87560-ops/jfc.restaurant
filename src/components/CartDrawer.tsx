import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Sparkles, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [orderComplete, setOrderComplete] = useState<any>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleNoteChange = (id: string, text: string) => {
    setNotes(prev => ({ ...prev, [id]: text }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const gst = Math.round(subtotal * 0.05); // 5% GST for restaurant service
  const packagingCharge = subtotal > 0 ? 15 : 0; // standard box charges
  const grandTotal = subtotal + gst + packagingCharge;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const summary = {
      orderId: 'JFC-KITCHEN-' + Math.floor(100 + Math.random() * 900),
      items: cartItems.map(item => ({
        name: item.menuItem.name,
        qty: item.quantity,
        note: notes[item.menuItem.id] || ''
      })),
      grandTotal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setOrderComplete(summary);
  };

  const handleResetOrder = () => {
    onClearCart();
    setNotes({});
    setOrderComplete(null);
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
                <span className="font-serif text-lg font-bold tracking-wide">Your Meal Tray</span>
                <span className="bg-[#cca43b]/10 text-[#cca43b] text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  {cartItems.length} Items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 scrollbar-thin">
              <AnimatePresence mode="wait">
                {!orderComplete ? (
                  cartItems.length > 0 ? (
                    <motion.div
                      key="cart-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Items list */}
                      {cartItems.map((item) => (
                        <div
                          key={item.menuItem.id}
                          className="bg-white/2 border border-white/5 rounded-xl p-3.5 space-y-3"
                        >
                          <div className="flex justify-between gap-3">
                            <div>
                              <h4 className="font-serif font-bold text-xs sm:text-sm text-white leading-tight">
                                {item.menuItem.name}
                              </h4>
                              <p className="text-[10px] text-gray-500 font-mono mt-0.5">₹{item.menuItem.price} each</p>
                            </div>
                            <span className="font-mono font-bold text-xs sm:text-sm text-[#cca43b] shrink-0">
                              ₹{item.menuItem.price * item.quantity}
                            </span>
                          </div>

                          {/* Interactive notes */}
                          <input
                            type="text"
                            value={notes[item.menuItem.id] || ''}
                            onChange={(e) => handleNoteChange(item.menuItem.id, e.target.value)}
                            placeholder="Add customization (e.g. less spicy, extra butter)"
                            className="w-full bg-[#161412] border border-white/5 focus:border-[#cca43b]/30 rounded-lg py-1.5 px-3 text-[10px] text-gray-300 placeholder-gray-600 focus:outline-none"
                          />

                          {/* Adjust qty & Delete */}
                          <div className="flex justify-between items-center pt-2 border-t border-white/5">
                            <button
                              onClick={() => onRemoveItem(item.menuItem.id)}
                              className="text-[10px] text-gray-500 hover:text-red-400 font-mono flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3 w-3" /> Remove
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
                        <h4 className="font-serif font-bold text-sm text-white">Your tray is empty</h4>
                        <p className="text-[11px] text-gray-500 max-w-xs mt-1 leading-normal font-light">
                          Browse our culinary repertory, select delicious soya chaaps, tandoori starters, and build your feast.
                        </p>
                      </div>
                    </motion.div>
                  )
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
                      <h4 className="font-serif text-white font-bold text-sm">Pre-Order Ticket Generated!</h4>
                      <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-normal font-light">
                        This digital slip has been sent directly to the JFC family kitchen queue. Pay at the counter when you arrive or collect your takeaway.
                      </p>
                    </div>

                    {/* Receipt Card */}
                    <div className="bg-[#14120f] border border-dashed border-white/15 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5 text-[#cca43b]" />
                          JFC PRE-ORDER SLIP
                        </span>
                        <span className="text-amber-500 font-bold">{orderComplete.orderId}</span>
                      </div>

                      {/* Items list */}
                      <div className="space-y-2 text-xs">
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
                      <div className="border-t border-dashed border-white/10 pt-3 text-xs space-y-1.5 font-mono">
                        <div className="flex justify-between text-gray-500 text-[10px]">
                          <span>Subtotal</span>
                          <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-[10px]">
                          <span>GST (5%)</span>
                          <span>₹{gst}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-[10px]">
                          <span>Packaging fee</span>
                          <span>₹{packagingCharge}</span>
                        </div>
                        <div className="flex justify-between text-[#cca43b] font-bold border-t border-white/5 pt-2">
                          <span>DINE-IN EST. BILL</span>
                          <span>₹{orderComplete.grandTotal}</span>
                        </div>
                      </div>

                      {/* QR Barcode */}
                      <div className="border-t border-white/5 pt-4 flex flex-col items-center space-y-1.5 text-center">
                        <div className="h-20 w-20 bg-white p-1.5 rounded-lg flex items-center justify-center border border-amber-600/20 select-none">
                          <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_6px)]" />
                        </div>
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.2em]">FASTPASS QUEUE • PRESENT AT COUNTER</span>
                      </div>

                    </div>

                    <button
                      onClick={handleResetOrder}
                      className="w-full bg-[#cca43b] hover:bg-amber-600 text-[#0f0e0c] font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all cursor-pointer text-center"
                    >
                      Clear & Close Tray
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Billing breakdown under CartDrawer (Only when cart has items & order is not complete) */}
            {!orderComplete && cartItems.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-white/5 bg-[#14120e] space-y-4">
                <div className="text-xs font-mono space-y-2 border-b border-white/5 pb-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Tray Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>GST / SGST (5%)</span>
                    <span>₹{gst}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Elite Packing Charge</span>
                    <span>₹{packagingCharge}</span>
                  </div>
                  <div className="flex justify-between text-[#cca43b] font-bold text-sm pt-1 border-t border-white/5">
                    <span>ESTIMATED TOTAL</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-[#cca43b] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#0f0e0c] font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="h-4 w-4" /> Generate Pre-Order Kitchen Slip
                  </button>
                  <p className="text-[9px] text-gray-500 text-center uppercase tracking-wide">
                    Instant queue token. Pay at the billing desk upon pickup or dine-in.
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
