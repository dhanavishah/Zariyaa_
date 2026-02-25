import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-maroon-900 text-gold-200 pt-16 pb-8 border-t border-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex flex-col">
              <span className="text-3xl font-serif font-bold text-gold-400 tracking-widest uppercase">Zariyaa</span>
              <span className="text-[10px] font-sans text-gold-200/70 tracking-[0.2em] -mt-1 uppercase">Royal Heritage</span>
            </Link>
            <p className="text-sm font-light leading-relaxed opacity-80">
              A Royal Path to India’s Cultural Heritage. We bring you the finest ethnic wear and jewellery from local artisans across Bharat.
            </p>
          </div>
          
          <div>
            <h4 className="text-gold-400 font-serif text-xl mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop" className="hover:text-gold-400 transition-colors">All Collections</Link></li>
              <li><Link to="/shop?category=Jewellery" className="hover:text-gold-400 transition-colors">Jewellery</Link></li>
              <li><Link to="/stylist" className="hover:text-gold-400 transition-colors">AI Stylist</Link></li>
              <li><Link to="/vendor-register" className="hover:text-gold-400 transition-colors">Become a Vendor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-serif text-xl mb-6 uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-gold-400 transition-colors">Refund & Rental Policy</Link></li>
              <li><Link to="#" className="hover:text-gold-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-serif text-xl mb-6 uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm mb-4 opacity-80">Subscribe to receive updates on new royal collections.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-maroon-800 border border-gold-500/30 px-4 py-2 text-sm focus:outline-none focus:border-gold-400 w-full"
              />
              <button className="bg-gold-500 text-maroon-900 px-4 py-2 text-sm font-bold hover:bg-gold-400 transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gold-500/10 pt-8 text-center text-[10px] uppercase tracking-[0.3em] opacity-60">
          © {new Date().getFullYear()} Zariyaa Royal Indian Boutique. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
