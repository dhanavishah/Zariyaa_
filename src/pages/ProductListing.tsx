import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { MOCK_PRODUCTS, ETHNICITIES, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filter States
  const categoryParam = searchParams.get('category') || 'All';
  const ethnicityParam = searchParams.get('ethnicity') || 'All';
  const ageGroupParam = searchParams.get('ageGroup') || 'All';
  const rentParam = searchParams.get('rent') === 'true';
  const searchParam = searchParams.get('search') || '';
  
  const [sortBy, setSortBy] = React.useState('newest');
  const [priceRange, setPriceRange] = React.useState(50000);
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  // Combined Filtering Logic
  const filteredProducts = React.useMemo(() => {
    let result = MOCK_PRODUCTS.filter(product => {
      const matchesCategory = categoryParam === 'All' || product.category === categoryParam;
      const matchesEthnicity = ethnicityParam === 'All' || product.ethnicity === ethnicityParam;
      const matchesAgeGroup = ageGroupParam === 'All' || product.ageGroup === ageGroupParam;
      const matchesRent = !rentParam || product.isAvailableForRent;
      const matchesPrice = product.price <= priceRange;
      
      const searchLower = searchParam.toLowerCase();
      const matchesSearch = !searchParam || 
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.ethnicity.toLowerCase().includes(searchLower);

      return matchesCategory && matchesEthnicity && matchesAgeGroup && matchesRent && matchesPrice && matchesSearch;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

    return result;
  }, [categoryParam, ethnicityParam, ageGroupParam, rentParam, searchParam, priceRange, sortBy]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 space-y-10">
          <div>
            <h3 className="text-2xl font-serif text-maroon-900 mb-6 flex items-center gap-2">
              <Filter size={20} /> Filters
            </h3>
            
            <div className="space-y-8">
              {/* Category */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-maroon-800 border-b border-gold-500/20 pb-2">Category</h4>
                <div className="space-y-2">
                  {['All', ...CATEGORIES].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={categoryParam === cat}
                        onChange={() => updateFilter('category', cat)}
                        className="accent-maroon-900" 
                      />
                      <span className="text-stone-600 group-hover:text-maroon-900 transition-colors">{cat === 'All' ? 'All Collections' : cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Group */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-maroon-800 border-b border-gold-500/20 pb-2">Age Group</h4>
                <div className="space-y-2">
                  {['All', 'Adults', 'Kids'].map(age => (
                    <label key={age} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="ageGroup" 
                        checked={ageGroupParam === age}
                        onChange={() => updateFilter('ageGroup', age)}
                        className="accent-maroon-900" 
                      />
                      <span className="text-stone-600 group-hover:text-maroon-900 transition-colors">{age}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Heritage */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-maroon-800 border-b border-gold-500/20 pb-2">Heritage</h4>
                <div className="space-y-2">
                  {['All', ...ETHNICITIES].map(eth => (
                    <label key={eth} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="ethnicity" 
                        checked={ethnicityParam === eth}
                        onChange={() => updateFilter('ethnicity', eth)}
                        className="accent-maroon-900" 
                      />
                      <span className="text-stone-600 group-hover:text-maroon-900 transition-colors">{eth === 'All' ? 'All Regions' : eth}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rent Option */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-maroon-800 border-b border-gold-500/20 pb-2">Availability</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={rentParam}
                    onChange={(e) => {
                      const newParams = new URLSearchParams(searchParams);
                      if (e.target.checked) newParams.set('rent', 'true');
                      else newParams.delete('rent');
                      setSearchParams(newParams);
                    }}
                    className="accent-maroon-900" 
                  />
                  <span className="text-stone-600 group-hover:text-maroon-900 transition-colors">Available for Rent</span>
                </label>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-maroon-800 border-b border-gold-500/20 pb-2">Max Price</h4>
                <div className="space-y-4">
                  <input 
                    type="range" 
                    min="1000" 
                    max="50000" 
                    step="1000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full accent-maroon-900" 
                  />
                  <div className="flex justify-between text-xs text-stone-500 font-medium">
                    <span>₹1,000</span>
                    <span className="text-maroon-900 font-bold">₹{priceRange.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 royal-border">
            <div className="relative w-full sm:w-96">
              <input 
                type="text" 
                placeholder="Search royal collections..." 
                value={searchParam}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gold-500/20 focus:outline-none focus:border-gold-500 font-serif"
              />
              <Search className="absolute left-3 top-2.5 text-stone-400" size={18} />
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-serif text-maroon-900 px-4 py-2 border border-gold-500/20"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[10px] text-stone-500 uppercase tracking-widest hidden sm:inline">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-serif text-maroon-900 px-3 py-1 border border-gold-500/20 focus:outline-none bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(categoryParam !== 'All' || ethnicityParam !== 'All' || ageGroupParam !== 'All' || rentParam || searchParam) && (
            <div className="flex flex-wrap gap-2">
              {categoryParam !== 'All' && <FilterBadge label={categoryParam} onClear={() => updateFilter('category', 'All')} />}
              {ethnicityParam !== 'All' && <FilterBadge label={ethnicityParam} onClear={() => updateFilter('ethnicity', 'All')} />}
              {ageGroupParam !== 'All' && <FilterBadge label={ageGroupParam} onClear={() => updateFilter('ageGroup', 'All')} />}
              {rentParam && <FilterBadge label="Rent Available" onClear={() => {
                const p = new URLSearchParams(searchParams);
                p.delete('rent');
                setSearchParams(p);
              }} />}
              {searchParam && <FilterBadge label={`Search: ${searchParam}`} onClear={() => updateFilter('search', '')} />}
              <button 
                onClick={() => setSearchParams(new URLSearchParams())}
                className="text-xs text-maroon-900 font-bold uppercase tracking-widest hover:underline"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
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
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white royal-border">
              <p className="text-xl font-serif text-stone-500">No treasures found matching your criteria.</p>
              <button 
                onClick={() => setSearchParams(new URLSearchParams())}
                className="mt-4 text-maroon-900 underline font-serif"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif text-maroon-900">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="text-stone-400 hover:text-maroon-900">
                  <ChevronDown size={24} className="rotate-90" />
                </button>
              </div>
              
              {/* Reuse Sidebar Content (simplified for mobile) */}
              <div className="space-y-8">
                {/* Category Mobile */}
                <div className="space-y-4">
                  <h4 className="font-serif text-lg text-maroon-800 border-b border-gold-500/20 pb-2">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...CATEGORIES].map(cat => (
                      <button
                        key={cat}
                        onClick={() => updateFilter('category', cat)}
                        className={`px-3 py-1 text-xs font-serif border ${categoryParam === cat ? 'bg-maroon-900 text-gold-500 border-maroon-900' : 'border-gold-500/20 text-stone-600'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Add other filters similarly for mobile... */}
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full btn-royal py-4 mt-8"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterBadge({ label, onClear }: { label: string, onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold-100 text-maroon-900 text-xs font-serif border border-gold-500/20">
      {label}
      <button onClick={onClear} className="hover:text-red-600 transition-colors">×</button>
    </span>
  );
}
