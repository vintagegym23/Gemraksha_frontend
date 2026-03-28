import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { api } from '../../services/api';
import { Product, Category } from '../../types';
import { ProductCard } from '../../components/product/ProductCard';
import { Button } from '../../components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';

const Collection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeCategory = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);
        
        let filtered = productsData;
        if (activeCategory) {
          filtered = productsData.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
        }
        
        setProducts(filtered);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching collection data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeCategory]);

  const handleCategoryChange = (slug: string | null) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-widest">
          {activeCategory ? activeCategory : 'The Collection'}
        </h1>
        <p className="text-gray-500 font-light">
          Explore our hand-selected range of rare and precious gemstones, each with its own unique story and brilliance.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between border-y border-gray-100 py-4 sticky top-16 md:top-20 bg-white z-40">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest hover:text-gold transition-colors"
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <div className="hidden md:flex items-center space-x-2 text-gray-300">
            <span className="h-4 w-[1px] bg-gray-200" />
            <span className="text-xs uppercase tracking-widest text-gray-500">
              {products.length} Items
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleCategoryChange(null)}
              className={`text-xs uppercase tracking-widest font-bold ${!activeCategory ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`text-xs uppercase tracking-widest font-bold ${activeCategory === cat.slug ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <button className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest hover:text-gold transition-colors">
            <span>Sort</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4 animate-pulse">
              <div className="aspect-[4/5] bg-gray-100 rounded-sm" />
              <div className="h-4 bg-gray-100 w-2/3 rounded" />
              <div className="h-4 bg-gray-100 w-1/3 rounded" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <p className="text-gray-500 italic">No gemstones found in this selection.</p>
          <Button onClick={() => handleCategoryChange(null)}>Clear Filters</Button>
        </div>
      )}

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-full max-w-xs bg-white z-[70] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-serif font-bold uppercase tracking-widest">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow space-y-8 overflow-y-auto">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gold">Categories</h4>
                  <div className="flex flex-col space-y-3">
                    <button 
                      onClick={() => { handleCategoryChange(null); setIsFilterOpen(false); }}
                      className={`text-left text-sm uppercase tracking-widest ${!activeCategory ? 'font-bold text-primary' : 'text-gray-500'}`}
                    >
                      All Gemstones
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat.id}
                        onClick={() => { handleCategoryChange(cat.slug); setIsFilterOpen(false); }}
                        className={`text-left text-sm uppercase tracking-widest ${activeCategory === cat.slug ? 'font-bold text-primary' : 'text-gray-500'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gold">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="accent-primary h-4 w-4" />
                      <span className="text-sm text-gray-600">Under ₹50,000</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="accent-primary h-4 w-4" />
                      <span className="text-sm text-gray-600">₹50,000 - ₹2,00,000</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="accent-primary h-4 w-4" />
                      <span className="text-sm text-gray-600">Above ₹2,00,000</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                  Show Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collection;
