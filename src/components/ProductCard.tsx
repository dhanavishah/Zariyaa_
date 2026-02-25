import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { useStore } from '../StoreContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative bg-white royal-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[3/4] overflow-hidden relative">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isAvailableForRent && (
              <span className="bg-gold-500 text-maroon-900 text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                Rent Available
              </span>
            )}
            <span className="bg-maroon-900 text-gold-300 text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              {product.ethnicity}
            </span>
          </div>
        </div>
      </Link>

      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
          isWishlisted ? 'bg-maroon-900 text-gold-500' : 'bg-white/80 hover:bg-white text-maroon-900'
        }`}
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>
      
      <div className="p-5 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-xl text-maroon-900 group-hover:text-maroon-800 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xs text-stone-500 font-medium uppercase tracking-widest">
          {product.vendorName}
        </p>
        
        <div className="flex items-center gap-1">
          <div className="flex text-gold-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-[10px] text-stone-400">({product.reviewsCount})</span>
        </div>

        <div className="pt-2 flex items-baseline gap-3">
          <span className="text-lg font-serif font-bold text-maroon-900">₹{product.price.toLocaleString()}</span>
          {product.isAvailableForRent && (
            <span className="text-xs text-stone-500 italic">
              Rent from ₹{product.rentPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      
      <div className="px-5 pb-5">
        <button 
          onClick={() => addToCart(product, 1, 'Buy')}
          className="w-full flex items-center justify-center gap-2 py-2 bg-maroon-900 text-gold-300 border border-gold-500/30 hover:bg-maroon-800 transition-all duration-300 font-serif uppercase tracking-widest text-sm"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
