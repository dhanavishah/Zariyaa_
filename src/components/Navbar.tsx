import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../StoreContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, wishlist, user, logout } = useStore();

  const navLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Ethnic Wear', path: '/shop?category=Ethnic Wear' },
    { name: 'Jewellery', path: '/shop?category=Jewellery' },
    { name: 'Rent', path: '/shop?rent=true' },
    { name: 'Kids', path: '/shop?ageGroup=Kids' },
  ];

  const isActive = (path: string) => {
    if (path === '/shop') return location.pathname === '/shop' && !location.search;
    return location.pathname + location.search === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-maroon-900 border-b border-gold-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          
          <AnimatePresence>
            {!isSearchOpen ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <Link to="/" className="flex-shrink-0 flex flex-col items-center">
                  <span className="text-3xl font-serif font-bold text-gold-500 tracking-widest uppercase">Zariyaa</span>
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Desktop Links */}
          <AnimatePresence>
            {!isSearchOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden lg:flex items-center space-x-6"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-gold-200 hover:text-gold-500 font-serif text-lg tracking-wide transition-colors duration-300 relative ${
                      isActive(link.path) ? 'text-gold-500' : ''
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-gold-500"
                      />
                    )}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Bar Integrated */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                exit={{ opacity: 0, width: 0 }}
                className="absolute inset-0 flex items-center px-4 sm:px-0"
              >
                <form onSubmit={handleSearch} className="w-full flex items-center bg-white/10 royal-border px-4 py-2">
                  <Search className="text-gold-500 mr-3" size={20} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, ethnicity, or category..." 
                    className="flex-1 bg-transparent text-gold-100 placeholder-gold-500/50 focus:outline-none font-serif text-lg"
                    autoFocus
                  />
                  <button 
                    type="button" 
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gold-500 ml-4 hover:text-gold-400"
                  >
                    <X size={24} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center space-x-6">
            {!isSearchOpen && (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gold-200 hover:text-gold-500 transition-colors"
              >
                <Search size={22} />
              </button>
            )}

            <div className="relative group hidden md:block">
              <Link to={user ? "/profile" : "/login"} className="text-gold-200 hover:text-gold-500 transition-colors">
                <User size={22} />
              </Link>
              {user && (
                <div className="absolute right-0 mt-2 w-48 bg-white royal-border shadow-xl hidden group-hover:block">
                  <div className="p-4 border-b border-stone-100">
                    <p className="text-xs font-bold text-maroon-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-stone-400 truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-maroon-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Link to="/wishlist" className="text-gold-200 hover:text-gold-500 transition-colors relative">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-maroon-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="text-gold-200 hover:text-gold-500 transition-colors relative">
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-maroon-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gold-200 hover:text-gold-500 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-maroon-900 border-t border-gold-500/20"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-gold-200 hover:text-gold-500 font-serif text-xl tracking-wide ${
                    isActive(link.path) ? 'text-gold-500' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-6 pt-4 border-t border-gold-500/10">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-gold-200"><User size={24} /></Link>
                <Link to="/wishlist" onClick={() => setIsOpen(false)} className="text-gold-200 relative">
                  <Heart size={24} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold-500 text-maroon-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link to="/cart" onClick={() => setIsOpen(false)} className="text-gold-200 relative">
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold-500 text-maroon-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
