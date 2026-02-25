import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, ChevronRight, Tag, X } from 'lucide-react';
import { useStore } from '../StoreContext';

export default function Checkout() {
  const { cart, coupon, applyCoupon, removeCoupon, clearCart } = useStore();
  const [couponInput, setCouponInput] = React.useState('');
  const [couponMessage, setCouponMessage] = React.useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  const discountAmount = React.useMemo(() => {
    if (!coupon) return 0;
    if (coupon.type === 'all') {
      return (subtotal * coupon.discount) / 100;
    }
    if (coupon.type === 'rent') {
      const rentTotal = cart
        .filter(item => item.transactionType === 'Rent')
        .reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
      return (rentTotal * coupon.discount) / 100;
    }
    return 0;
  }, [coupon, subtotal, cart]);

  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    setCouponMessage({ 
      text: result.message, 
      type: result.success ? 'success' : 'error' 
    });
    if (result.success) setCouponInput('');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-4xl font-serif text-maroon-900 mb-6">Your Selection is Empty</h2>
        <p className="text-stone-600 mb-8">Please select some royal treasures before proceeding to checkout.</p>
        <Link to="/shop" className="btn-gold px-12 py-4">Explore Collections</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-5xl font-serif text-maroon-900 mb-12 text-center">Royal Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <div className="space-y-12">
          <section className="space-y-6">
            <h3 className="text-2xl font-serif text-maroon-900 border-b border-gold-500/20 pb-2 flex items-center gap-3">
              <Truck size={24} /> Shipping Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-white border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif" />
              <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-white border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif" />
              <input type="text" placeholder="Address Line 1" className="sm:col-span-2 w-full px-4 py-3 bg-white border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif" />
              <input type="text" placeholder="City" className="w-full px-4 py-3 bg-white border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif" />
              <input type="text" placeholder="Pincode" className="w-full px-4 py-3 bg-white border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif" />
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-serif text-maroon-900 border-b border-gold-500/20 pb-2 flex items-center gap-3">
              <CreditCard size={24} /> Payment Method
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 royal-border bg-gold-100/30 cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="accent-maroon-900" />
                <span className="font-serif text-lg text-maroon-900">Royal Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-4 p-4 border border-gold-500/10 cursor-pointer hover:bg-stone-50">
                <input type="radio" name="payment" className="accent-maroon-900" />
                <span className="font-serif text-lg text-maroon-900">UPI / Net Banking</span>
              </label>
              <label className="flex items-center gap-4 p-4 border border-gold-500/10 cursor-pointer hover:bg-stone-50">
                <input type="radio" name="payment" className="accent-maroon-900" />
                <span className="font-serif text-lg text-maroon-900">Cash on Delivery</span>
              </label>
            </div>
          </section>

          <button 
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full btn-gold py-5 text-xl disabled:opacity-50"
          >
            {isProcessing ? 'Processing Royal Order...' : 'Place Royal Order'}
          </button>
        </div>

        {/* Order Summary Sticky */}
        <div className="lg:sticky lg:top-32 h-fit space-y-8">
          <div className="bg-white royal-border p-8 shadow-xl space-y-6">
            <h3 className="text-2xl font-serif text-maroon-900 border-b border-gold-500/20 pb-4">Your Selection</h3>
            
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.transactionType}`} className="flex gap-4">
                  <div className="w-16 h-20 royal-border overflow-hidden flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-maroon-900 text-sm">{item.product.name}</h4>
                    <p className="text-[10px] uppercase text-stone-400">Qty: {item.quantity} • {item.transactionType}</p>
                    <p className="font-serif font-bold text-maroon-900 mt-1">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="border-t border-gold-500/10 pt-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-3 text-stone-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Coupon Code" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif"
                  />
                </div>
                <button 
                  onClick={handleApplyCoupon}
                  className="bg-maroon-900 text-gold-500 px-6 py-2 font-serif text-sm hover:bg-maroon-800 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className={`text-[10px] mt-2 font-bold uppercase tracking-widest ${couponMessage.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {couponMessage.text}
                </p>
              )}
              {coupon && (
                <div className="mt-3 flex items-center justify-between bg-emerald-50 p-2 border border-emerald-100">
                  <span className="text-xs text-emerald-700 font-serif">
                    Applied: <span className="font-bold">{coupon.code}</span> ({coupon.discount}% Off)
                  </span>
                  <button onClick={removeCoupon} className="text-emerald-700 hover:text-red-600">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-gold-500/10 pt-6 space-y-3 text-stone-600">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-serif">₹{subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Royal Discount</span>
                  <span className="font-serif">-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-emerald-600 uppercase text-[10px] font-bold tracking-widest">Complimentary</span>
              </div>
              <div className="flex justify-between text-lg font-serif font-bold text-maroon-900 pt-2 border-t border-gold-500/10">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-maroon-900 p-6 royal-border text-gold-200 flex items-center gap-4">
            <ShieldCheck size={32} className="text-gold-400 flex-shrink-0" />
            <p className="text-xs opacity-80 leading-relaxed">
              Your transaction is secured with 256-bit encryption. Zariyaa ensures the highest standards of financial security for our patrons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
