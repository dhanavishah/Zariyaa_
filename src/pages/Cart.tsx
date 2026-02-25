import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { useStore } from '../StoreContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, user } = useStore();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const subtotal = cart.reduce((acc, item) => {
    const price = item.transactionType === 'Buy' ? item.product.price : item.product.rentPrice;
    return acc + (price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
      return;
    }
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      navigate('/checkout-success');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-5xl font-serif text-maroon-900 mb-12 text-center">Your Royal Cart</h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item, i) => (
                <motion.div 
                  key={`${item.product.id}-${item.transactionType}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white royal-border p-6 flex gap-6 shadow-sm"
                >
                  <div className="w-24 h-32 flex-shrink-0 royal-border overflow-hidden">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-serif text-maroon-900">{item.product.name}</h3>
                        <p className="text-xs text-stone-500 uppercase tracking-widest">{item.product.vendorName}</p>
                        <div className="mt-2 inline-block px-2 py-0.5 bg-gold-100 text-maroon-900 text-[10px] font-bold uppercase tracking-wider border border-gold-500/20">
                          {item.transactionType}
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.transactionType)}
                        className="text-stone-400 hover:text-maroon-900 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gold-500/30">
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.transactionType, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gold-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 font-serif">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.transactionType, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gold-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xl font-serif font-bold text-maroon-900">
                        ₹{((item.transactionType === 'Buy' ? item.product.price : item.product.rentPrice) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="bg-white royal-border p-8 shadow-lg space-y-6 sticky top-32">
              <h3 className="text-2xl font-serif text-maroon-900 border-b border-gold-500/20 pb-4">Order Summary</h3>
              
              <div className="space-y-4 text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-600 uppercase text-xs font-bold tracking-widest">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST)</span>
                  <span className="font-serif">₹{(subtotal * 0.12).toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-gold-500/20 pt-4 flex justify-between items-baseline">
                <span className="text-xl font-serif text-maroon-900">Total</span>
                <span className="text-3xl font-serif font-bold text-maroon-900">₹{(subtotal * 1.12).toLocaleString()}</span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full btn-gold flex items-center justify-center gap-2 py-4 disabled:opacity-50"
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'} <ArrowRight size={20} />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400 uppercase tracking-widest">
                <ShieldCheck size={14} /> Secure Royal Transaction
              </div>
            </div>

            <div className="bg-maroon-900 p-6 royal-border text-gold-200">
              <h4 className="font-serif text-lg mb-2">Heritage Guarantee</h4>
              <p className="text-xs opacity-80 leading-relaxed">
                Every piece in your cart is a testament to India's rich cultural heritage. We ensure fair pay to our local vendors.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white royal-border">
          <ShoppingBag size={64} className="mx-auto text-gold-300 mb-6" />
          <h2 className="text-3xl font-serif text-maroon-900 mb-4">Your cart is empty</h2>
          <p className="text-stone-500 mb-8">Begin your royal journey by exploring our collections.</p>
          <Link to="/shop" className="btn-royal">Start Shopping</Link>
        </div>
      )}
    </div>
  );
}
