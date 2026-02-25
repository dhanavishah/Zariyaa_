import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif text-maroon-900 mb-4">Your Royal Wishlist</h1>
        <p className="text-stone-500 uppercase tracking-widest text-xs">Treasures you've set aside for later</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-20 bg-white royal-border">
          <Heart size={64} className="mx-auto text-gold-300 mb-6" />
          <h2 className="text-3xl font-serif text-maroon-900 mb-4">Your wishlist is empty</h2>
          <p className="text-stone-500 mb-8">Save your favorite heritage pieces here.</p>
          <Link to="/shop" className="btn-royal">Explore Collections</Link>
        </div>
      )}
    </div>
  );
}
