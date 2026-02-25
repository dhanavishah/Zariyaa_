import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, MapPin, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { motion } from 'motion/react';

export default function ProductDetails() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [transactionType, setTransactionType] = React.useState<'Buy' | 'Rent'>('Buy');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-serif text-maroon-900">Product Not Found</h2>
        <Link to="/shop" className="text-gold-600 underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 mb-8">
        <Link to="/" className="hover:text-maroon-900">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-maroon-900">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-maroon-900 font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] royal-border overflow-hidden bg-white">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square royal-border overflow-hidden transition-opacity ${selectedImage === i ? 'opacity-100 border-gold-500' : 'opacity-50 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gold-600 uppercase tracking-[0.2em]">
              <MapPin size={14} /> {product.ethnicity} Heritage
            </div>
            <h1 className="text-5xl font-serif text-maroon-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm text-stone-500">({product.reviewsCount} Royal Reviews)</span>
            </div>
          </div>

          <div className="p-6 bg-gold-100/50 border border-gold-500/20 space-y-6">
            <div className="flex gap-4">
              <button 
                onClick={() => setTransactionType('Buy')}
                className={`flex-1 py-3 font-serif text-lg tracking-wide transition-all ${transactionType === 'Buy' ? 'bg-maroon-900 text-gold-300 shadow-lg' : 'bg-white text-stone-500 border border-gold-500/20'}`}
              >
                Buy Now
              </button>
              {product.isAvailableForRent && (
                <button 
                  onClick={() => setTransactionType('Rent')}
                  className={`flex-1 py-3 font-serif text-lg tracking-wide transition-all ${transactionType === 'Rent' ? 'bg-maroon-900 text-gold-300 shadow-lg' : 'bg-white text-stone-500 border border-gold-500/20'}`}
                >
                  Rent
                </button>
              )}
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-serif font-bold text-maroon-900">
                ₹{(transactionType === 'Buy' ? product.price : product.rentPrice).toLocaleString()}
              </span>
              {transactionType === 'Rent' && (
                <span className="text-sm text-stone-500 italic">per 3 days</span>
              )}
            </div>
          </div>

          <p className="text-stone-600 leading-relaxed font-light italic">
            "{product.description}"
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex gap-4">
              <button className="flex-1 btn-royal flex items-center justify-center gap-3 py-4">
                <ShoppingBag size={20} /> Add to Royal Cart
              </button>
              <button className="p-4 border border-gold-500/30 text-maroon-900 hover:bg-gold-100 transition-colors">
                <Heart size={24} />
              </button>
            </div>
            <p className="text-[10px] text-center text-stone-400 uppercase tracking-widest">
              Sold by: <span className="text-maroon-900 font-bold">{product.vendorName}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gold-500/20">
            <div className="flex items-start gap-3">
              <Truck className="text-gold-600 mt-1" size={20} />
              <div>
                <h4 className="font-serif text-maroon-900">Royal Delivery</h4>
                <p className="text-xs text-stone-500">Free shipping on orders above ₹5,000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-gold-600 mt-1" size={20} />
              <div>
                <h4 className="font-serif text-maroon-900">Authentic Piece</h4>
                <p className="text-xs text-stone-500">Verified by Zariyaa Quality Council</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="text-gold-600 mt-1" size={20} />
              <div>
                <h4 className="font-serif text-maroon-900">Easy Returns</h4>
                <p className="text-xs text-stone-500">7-day return policy for purchases</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-gold-600 mt-1" size={20} />
              <div>
                <h4 className="font-serif text-maroon-900">Local Artisan</h4>
                <p className="text-xs text-stone-500">Directly supporting local vendors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
