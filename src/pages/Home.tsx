import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, MapPin } from 'lucide-react';
import { MOCK_PRODUCTS, ETHNICITIES, ETHNICITY_IMAGES } from '../constants';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.pinimg.com/1200x/32/94/40/329440986b872646ee0bf01dfa120c21.jpg" 
            alt="Royal Indian Heritage" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/60 via-maroon-900/40 to-maroon-900/60 md:bg-gradient-to-r md:from-maroon-900/80 md:to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gold-100 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <span className="inline-block px-4 py-1 border border-gold-500/50 text-gold-400 text-sm uppercase tracking-[0.3em] font-medium">
              India's Cultural Treasure
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-[1.1] md:leading-tight">
              Timeless Traditions,<br />
              <span className="text-gold-400">Modern Grace.</span>
            </h1>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 max-w-2xl mx-auto">
              Discover and rent authentic ethnic wear and jewellery from local artisans across India. Preserving traditions, one stitch at a time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
              <Link to="/shop" className="w-full sm:w-auto btn-gold flex items-center justify-center gap-2">
                Explore Collection <ArrowRight size={20} />
              </Link>
              <Link to="/stylist" className="w-full sm:w-auto btn-royal flex items-center justify-center">
                Try AI Stylist
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8 text-gold-400/50 animate-pulse">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gold-500/30"></div>
          </div>
        </div>
      </section>

      {/* Ethnicity Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-maroon-900 mb-2">Shop by Heritage</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {ETHNICITIES.map((ethnicity, i) => (
            <Link 
              key={ethnicity}
              to={`/shop?ethnicity=${ethnicity}`}
              className="group relative aspect-square overflow-hidden royal-border"
            >
              <img 
                src={ETHNICITY_IMAGES[ethnicity]} 
                alt={ethnicity}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-gold-100 font-serif text-xl tracking-wider group-hover:scale-110 transition-transform">
                  {ethnicity}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif text-maroon-900 mb-2">New Arrivals</h2>
            <p className="text-stone-500 uppercase tracking-widest text-xs">Handpicked royal selections</p>
          </div>
          <Link to="/shop" className="text-maroon-900 font-serif border-b border-maroon-900 hover:text-gold-600 hover:border-gold-600 transition-colors">
            View All Collections
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Coupon Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gold-500/10 border border-gold-500/30 p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-gold-500/20 -translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-gold-500/20 translate-x-4 translate-y-4"></div>
          
          <h2 className="text-3xl md:text-4xl font-serif text-maroon-900">Exclusive Royal Offer</h2>
          <p className="text-xl text-stone-700 font-light">
            Get <span className="font-bold text-maroon-900">10% OFF</span> on your first purchase.
          </p>
          <div className="inline-block px-8 py-3 bg-maroon-900 text-gold-400 font-serif text-2xl tracking-widest border border-gold-500/50">
            ZARIYAA10
          </div>
          <div className="pt-4">
            <Link to="/shop" className="btn-royal">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* AI Stylist Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white royal-border p-8 md:p-16 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-gold-600 uppercase tracking-widest text-xs font-bold">Premium Experience</span>
              <h2 className="text-5xl font-serif text-maroon-900">Meet Your AI Stylist</h2>
              <p className="text-stone-600 text-lg font-light leading-relaxed">
                Get personalized ethnic outfit recommendations based on your occasion, region, and style preferences. Our AI understands the nuances of Indian heritage to curate your perfect look.
              </p>
              <Link to="/stylist" className="btn-gold inline-flex items-center gap-3">
                Try AI Stylist <ArrowRight size={20} />
              </Link>
            </div>
            <div className="relative aspect-[4/3] royal-border overflow-hidden">
              <img 
                src="https://picsum.photos/seed/stylist/800/600" 
                alt="AI Stylist Preview" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-maroon-900/10 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-gold-500/40 border border-gold-500/60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="bg-maroon-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 paisley-bg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gold-100">
              <h2 className="text-5xl font-serif leading-tight">Supporting Local <br /> Artisans & Vendors</h2>
              <p className="text-lg font-light opacity-80 leading-relaxed">
                Zariyaa is more than just a store. We are a bridge between the hidden gems of India's roadside vendors and the global stage. Every purchase supports a family and preserves a craft.
              </p>
              <div className="flex gap-8 pt-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <MapPin size={24} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest">100+ Cities</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest">Authentic</span>
                </div>
              </div>
            </div>
            <div className="royal-border p-2">
              <img 
                src="https://i.pinimg.com/1200x/9b/f4/0c/9bf40c7d324f1c483ad2d9286240d4f1.jpg" 
                alt="Artisan at work" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gold-100 text-maroon-900 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Truck size={32} />
          </div>
          <h3 className="text-2xl font-serif text-maroon-900">Royal Delivery</h3>
          <p className="text-stone-500 text-sm">Insured and handled with care across the globe.</p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gold-100 text-maroon-900 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-serif text-maroon-900">Quality Assured</h3>
          <p className="text-stone-500 text-sm">Every piece is verified for authenticity and quality.</p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gold-100 text-maroon-900 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <RotateCcw size={32} />
          </div>
          <h3 className="text-2xl font-serif text-maroon-900">Easy Returns</h3>
          <p className="text-stone-500 text-sm">Hassle-free returns and exchanges for your peace of mind.</p>
        </div>
      </section>
    </div>
  );
}
