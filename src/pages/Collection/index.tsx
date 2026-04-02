import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Heart, Plus, X, ShieldCheck, Truck, RefreshCcw, Search, ChevronDown } from 'lucide-react';
import { api } from '../../services/api';
import { Product, Category } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore, useUIStore } from '../../store/useStore';
import rudrakshaB  from '../../images/products/rudraksha/banner.png';
import ringsBg     from '../../images/yellow_sapphire.png';
import gemsBg      from '../../images/burma_ruby.png';
import braceletsBg from '../../images/products/bracelets/amethyst.png';

const CATEGORY_BG: Record<string, string> = {
  gemstones: gemsBg,
  rudraksha:  rudrakshaB,
  rings:      ringsBg,
  bracelets:  braceletsBg,
};

const QUICK_FILTERS = {
  gemstones: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '9+'].map((l) => ({ label: l, sub: 'CARAT' })),
  rudraksha: ['1', '5', '6', '7', '8', '11', '14', 'Gauri', 'Ganesh'].map((l) => ({ label: l, sub: 'MUKHI' })),
  rings: ['5', '6', '7', '8', '9', '10', '11', '12', 'Adj.'].map((l) => ({ label: l, sub: 'SIZE' })),
};

const PRICE_RANGES = ['Under ₹25,000', '₹25,000 – ₹50,000', '₹50,000 – ₹1,00,000', 'Above ₹1,00,000'];
const SORT_OPTIONS = ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Newest Arrivals'];

const Collection = () => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<number | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef     = useRef<HTMLButtonElement>(null);
  const heroRef          = useRef<HTMLDivElement>(null);
  const bgImgRef         = useRef<HTMLImageElement>(null);
  const bgOverlayRef     = useRef<HTMLDivElement>(null);

  const activeCategory = searchParams.get('category');
  const activeSearch = searchParams.get('search')?.trim() ?? '';

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
          const matchedCategory = categoriesData.find(
            (category) => category.slug.toLowerCase() === activeCategory.toLowerCase()
          );
          const normalizedCategory = matchedCategory?.name.toLowerCase() ?? activeCategory.toLowerCase();
          filtered = filtered.filter(
            (product) => product.category.toLowerCase() === normalizedCategory
          );
        }

        if (activeSearch) {
          const normalizedSearch = activeSearch.toLowerCase();
          filtered = filtered.filter((product) =>
            [
              product.name,
              product.category,
              product.description,
              product.details.origin ?? '',
              product.details.weight ?? '',
              product.details.mukhi ?? '',
            ].some((value) => value.toLowerCase().includes(normalizedSearch))
          );
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
  }, [activeCategory, activeSearch]);

  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeCategory, categories]);

  /* Parallax + fade-to-white on mobile hero */
  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      const img  = bgImgRef.current;
      const wht  = bgOverlayRef.current;
      if (!hero || !img || !wht) return;

      const scrollY    = window.scrollY;
      const heroH      = hero.offsetHeight;
      // Parallax: image drifts up at 25% of scroll speed
      img.style.transform = `scale(1.15) translateY(${scrollY * 0.22}px)`;
      // White overlay fades IN — starts at 25% of hero height, fully opaque at 85%
      const fadeStart  = heroH * 0.25;
      const fadeEnd    = heroH * 0.82;
      const opacity    = Math.max(0, Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart)));
      wht.style.opacity = String(opacity);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCategoryChange = (slug: string | null) => {
    const nextParams = new URLSearchParams();
    if (slug) nextParams.set('category', slug);
    if (activeSearch) nextParams.set('search', activeSearch);
    setSearchParams(nextParams);
    setSelectedQuickFilter(null);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSelectedQuickFilter(null);
  };

  const selectedCategoryObj = categories.find(
    (category) => category.slug.toLowerCase() === activeCategory?.toLowerCase()
  );

  const title = activeSearch
    ? `"${activeSearch}"`
    : selectedCategoryObj?.name ? `${selectedCategoryObj.name}` : 'Shop All Collections';

  const description = activeSearch
    ? `Showing items that match "${activeSearch}"${selectedCategoryObj ? ` in ${selectedCategoryObj.name}.` : '.'}`
    : selectedCategoryObj
      ? `Discover our exclusive variety of premium ${selectedCategoryObj.name.toLowerCase()}, ethically sourced and authenticated.`
      : 'Explore our complete catalog of certified gemstones, authentic spiritual Rudrakshas, and luxury spiritual jewelry.';

  const activeQuickFiltersKey = activeCategory?.toLowerCase() as keyof typeof QUICK_FILTERS;
  const activeQuickFilters = QUICK_FILTERS[activeQuickFiltersKey];

  return (
    <div className="min-h-screen bg-[#f8f4ee]">

      {/* ─── MOBILE: HERO HEADER ─── */}
      {(() => {
        const hasBg = !!activeCategory && !!CATEGORY_BG[activeCategory.toLowerCase()];
        return (
          <div ref={heroRef} className={`relative md:hidden overflow-hidden ${hasBg ? '' : 'bg-white border-b border-gray-100'}`}>

            {/* Dynamic background image with parallax — only when a known category is active */}
            {hasBg && (
              <>
                <img
                  ref={bgImgRef}
                  key={activeCategory}
                  src={CATEGORY_BG[activeCategory!.toLowerCase()]}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover scale-[1.15] pointer-events-none"
                  style={{ willChange: 'transform', transformOrigin: 'top center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />
                <div ref={bgOverlayRef} className="absolute inset-0 bg-[#f8f4ee] pointer-events-none" style={{ opacity: 0 }} />
              </>
            )}

            {/* Content */}
            <div className="relative z-10 px-5 pt-8 pb-6 text-center">
              <motion.h1
                key={title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`font-serif text-[2.2rem] leading-tight ${hasBg ? 'text-white' : 'text-[#251622]'}`}
                style={hasBg ? { textShadow: '0 2px 16px rgba(0,0,0,0.45)' } : {}}
              >
                {title}
              </motion.h1>
              <p className={`mt-3 text-[12.5px] leading-relaxed max-w-[300px] mx-auto ${hasBg ? 'text-white/75' : 'text-[#7a6b63]'}`}
                style={hasBg ? { textShadow: '0 1px 8px rgba(0,0,0,0.4)' } : {}}>
                {description}
              </p>
              <div className="mt-6 flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                  className="flex flex-1 max-w-[160px] items-center justify-center gap-2 rounded-[12px] bg-[#4a154b] py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-sm transition-all active:scale-95"
                >
                  <SlidersHorizontal size={14} strokeWidth={2.5} />
                  Filter
                </button>
                <button
                  type="button"
                  className="flex flex-1 max-w-[160px] items-center justify-center gap-2 rounded-[12px] border border-[#c5b8b0] bg-white py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#251622] transition-all active:scale-95"
                >
                  <ArrowUpDown size={14} strokeWidth={2.5} />
                  Sort
                </button>
              </div>
              {(activeCategory || activeSearch || selectedQuickFilter !== null) && (
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  {selectedCategoryObj && (
                    <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] border ${hasBg ? 'bg-white/20 backdrop-blur-sm text-white border-white/30' : 'bg-[#4a154b]/5 text-[#4a154b] border-[#4a154b]/15'}`}>
                      {selectedCategoryObj.name}
                    </span>
                  )}
                  {activeSearch && (
                    <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] border ${hasBg ? 'bg-[#d0a061]/70 text-white border-[#d0a061]/50' : 'bg-[#d0a061]/10 text-[#b88c50] border-[#d0a061]/20'}`}>
                      {activeSearch}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={clearFilters}
                    className={`text-[10px] font-bold uppercase tracking-[0.15em] ml-1 ${hasBg ? 'text-white/70' : 'text-[#999] hover:text-[#4a154b]'}`}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ─── MOBILE: SCROLLABLE TABS ─── */}
      <div className="sticky top-[60px] z-40 bg-white border-b border-gray-100 px-3 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.03)] md:hidden">
        <div ref={tabsContainerRef} className="flex items-center gap-5 overflow-x-auto no-scrollbar flex-nowrap">
          <button
            ref={!activeCategory ? activeTabRef : null}
            type="button"
            onClick={() => handleCategoryChange(null)}
            className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.15em] transition-colors pb-1 border-b-[2.5px] shrink-0 ${
              !activeCategory ? 'text-[#4a154b] border-[#4a154b]' : 'text-[#aaa] border-transparent hover:text-[#4a154b]'
            }`}
          >
            All Types
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              ref={activeCategory === cat.slug ? activeTabRef : null}
              type="button"
              onClick={() => handleCategoryChange(cat.slug)}
              className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.15em] transition-colors pb-1 border-b-[2.5px] shrink-0 ${
                activeCategory === cat.slug ? 'text-[#4a154b] border-[#4a154b]' : 'text-[#aaa] border-transparent hover:text-[#4a154b]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ─── MOBILE: QUICK FILTERS ─── */}
      {activeQuickFilters && (
        <div className="bg-white px-5 py-5 border-b border-gray-100 md:hidden">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-3">
            Shop by {activeQuickFilters[0].sub}
          </p>
          <div className="grid grid-cols-5 gap-2">
            {activeQuickFilters.map((opt, i) => {
              const isSelected = selectedQuickFilter === i;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedQuickFilter(isSelected ? null : i)}
                  className={`flex flex-col items-center justify-center rounded-[10px] border py-[10px] transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#d0a061] border-[#d0a061] text-white shadow-md'
                      : 'bg-[#fcfbf9] border-[#eaddd1] text-[#251622]'
                  }`}
                >
                  <span className="text-[14px] font-bold leading-none">{opt.label}</span>
                  <span className={`text-[7.5px] font-bold mt-1.5 uppercase tracking-wider ${isSelected ? 'text-white/90' : 'text-[#8d8078]'}`}>
                    {opt.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── MOBILE: PRODUCT GRID ─── */}
      <div className="px-4 pt-6 pb-16 md:hidden">
        {products.length > 0 && (
          <div className="flex justify-between items-end mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a154b]">
              Available Items ({products.length})
            </p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-[16px] bg-white overflow-hidden shadow-sm">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 space-y-3">
                  <div className="h-3.5 w-3/4 rounded bg-gray-200" />
                  <div className="h-2.5 w-1/2 rounded bg-gray-100" />
                  <div className="h-4 w-1/3 rounded bg-gray-200 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-gray-50 h-full group"
              >
                <Link to={`/product/${product.slug}`} className="flex flex-col h-full relative">
                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
                    {product.details.quality && (
                      <span className="rounded-sm bg-[#4a154b]/95 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white shadow-sm backdrop-blur-sm">
                        {product.details.quality}
                      </span>
                    )}
                    {!product.details.quality && (
                      <span className="rounded-sm bg-white/95 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#4a154b] shadow-sm backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                        Certified
                      </span>
                    )}
                  </div>
                  <div className="relative aspect-square overflow-hidden bg-[#faf8f5]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.15] mix-blend-multiply"
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-3.5">
                    <h3 className="font-serif text-[15px] font-bold leading-snug text-[#251622] line-clamp-2 min-h-[2.4em]">
                      {product.name}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap gap-x-1.5 gap-y-1 text-[10.5px] font-medium text-[#7a6b63]">
                      {(product.details.weight || product.details.mukhi || product.details.size) && (
                        <span className="text-[#d0a061] font-bold">
                          {product.details.weight || product.details.mukhi || product.details.size}
                        </span>
                      )}
                      {(product.details.weight || product.details.mukhi || product.details.size) && product.details.origin && (
                        <span className="text-gray-300">•</span>
                      )}
                      {product.details.origin && (
                        <span>{product.details.origin}</span>
                      )}
                    </div>
                    <div className="mt-auto pt-3">
                      <div className="flex items-baseline gap-2 mb-3">
                        {product.originalPrice && (
                          <span className="text-[10px] text-[#aaa] line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-[15px] font-bold text-[#4a154b] leading-none">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); addItem(product); navigate('/checkout'); }}
                          className="flex-1 py-2 rounded-[10px] bg-[#d0a061] text-white text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#b88c50] active:scale-95 transition-all shadow-sm"
                        >
                          Buy Now
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); addItem(product); addToast(`${product.name} added to cart`); }}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-[#4a154b]/20 bg-[#f3edf5] text-[#4a154b] hover:bg-[#4a154b] hover:text-white transition-all active:scale-95"
                          title="Add to Cart"
                        >
                          <Plus size={15} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center text-center">
            <div className="h-16 w-16 mb-4 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Search size={24} className="text-[#d0a061]" />
            </div>
            <p className="text-[14px] font-bold text-[#251622] mb-1">No products found</p>
            <p className="text-[11px] text-[#888] max-w-[240px]">We couldn't find items matching your current filters.</p>
            <button
              onClick={clearFilters}
              className="mt-5 rounded-[10px] border border-[#d0a061]/50 bg-[#d0a061]/5 px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#d0a061] hover:bg-[#d0a061] hover:text-white transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* ════════════════════════════════
          DESKTOP LAYOUT (md: and above)
          ════════════════════════════════ */}

      {/* ─── DESKTOP: PAGE BANNER ─── */}
      <div className="hidden md:block relative overflow-hidden bg-[#4a154b] py-14">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(208,160,97,0.18)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-[1240px] px-6 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d0a061]/70 mb-3">
              {activeCategory ? 'Category' : 'Explore'}
            </p>
            <motion.h1
              key={title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-serif text-5xl lg:text-6xl text-white leading-tight"
            >
              {title}
            </motion.h1>
            <p className="mt-4 text-[14px] leading-relaxed text-white/60 max-w-[520px]">
              {description}
            </p>
          </div>
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-end max-w-[340px]">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
                !activeCategory
                  ? 'bg-[#d0a061] text-white shadow-[0_4px_14px_rgba(208,160,97,0.4)]'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
                  activeCategory === cat.slug
                    ? 'bg-[#d0a061] text-white shadow-[0_4px_14px_rgba(208,160,97,0.4)]'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── DESKTOP: MAIN CONTENT AREA (Sidebar + Grid) ─── */}
      <div className="hidden md:flex mx-auto max-w-[1240px] px-6 py-10 gap-8">

        {/* Sidebar */}
        <aside className="w-[240px] flex-shrink-0 space-y-6">
          
          {/* Quick Filter Widget */}
          {activeQuickFilters && (
            <div className="rounded-[16px] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d0a061] mb-4">
                Shop by {activeQuickFilters[0].sub}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {activeQuickFilters.map((opt, i) => {
                  const isSelected = selectedQuickFilter === i;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedQuickFilter(isSelected ? null : i)}
                      className={`flex flex-col items-center justify-center rounded-[8px] border py-2 transition-all hover:scale-[1.04] ${
                        isSelected
                          ? 'bg-[#d0a061] border-[#d0a061] text-white shadow-md'
                          : 'bg-[#fcfbf9] border-[#eaddd1] text-[#251622]'
                      }`}
                    >
                      <span className="text-[13px] font-bold leading-none">{opt.label}</span>
                      <span className={`text-[7px] font-bold mt-1 uppercase tracking-wider ${isSelected ? 'text-white/90' : 'text-[#8d8078]'}`}>
                        {opt.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Filter */}
          <div className="rounded-[16px] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d0a061] mb-4">Price Range</p>
            <div className="flex flex-col gap-3">
              {PRICE_RANGES.map((label) => (
                <label key={label} className="flex cursor-pointer items-center gap-3 group">
                  <div className="flex h-4 w-4 items-center justify-center rounded border border-[#d0a061]/40 bg-white group-hover:border-[#4a154b] transition-colors flex-shrink-0" />
                  <span className="text-[12px] font-medium text-[#6b5d56] group-hover:text-[#4a154b] transition-colors">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="rounded-[16px] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d0a061] mb-4">Sort By</p>
            <div className="flex flex-col gap-3">
              {SORT_OPTIONS.map((label) => (
                <label key={label} className="flex cursor-pointer items-center gap-3 group">
                  <div className="flex h-4 w-4 rounded-full border border-[#d0a061]/40 bg-white items-center justify-center group-hover:border-[#4a154b] flex-shrink-0" />
                  <span className="text-[12px] font-medium text-[#6b5d56] group-hover:text-[#4a154b] transition-colors">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="rounded-[16px] bg-[#4a154b]/5 border border-[#4a154b]/10 p-5 space-y-3">
            {[
              { icon: ShieldCheck, label: 'GIA & IGI Certified' },
              { icon: Truck, label: 'Insured Delivery' },
              { icon: RefreshCcw, label: 'Easy Returns' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={16} className="text-[#4a154b] flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[11px] font-semibold text-[#4a154b]">{label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Product Area */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#4a154b]">
              {products.length} {products.length === 1 ? 'Item' : 'Items'} Found
            </p>
            {(activeCategory || activeSearch) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#999] hover:text-[#4a154b] transition-colors"
              >
                <X size={12} />
                Clear Filters
              </button>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-3 gap-6 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-[16px] bg-white overflow-hidden shadow-sm">
                  <div className="aspect-square bg-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-3.5 w-3/4 rounded bg-gray-200" />
                    <div className="h-2.5 w-1/2 rounded bg-gray-100" />
                    <div className="h-4 w-1/3 rounded bg-gray-200 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 lg:grid-cols-4">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="flex flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 h-full group hover:shadow-[0_12px_40px_rgba(74,21,75,0.12)] transition-shadow duration-300"
                >
                  <Link to={`/product/${product.slug}`} className="flex flex-col h-full relative">
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                      {product.details.quality ? (
                        <span className="rounded-[4px] bg-[#4a154b]/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white shadow-sm backdrop-blur-sm">
                          {product.details.quality}
                        </span>
                      ) : (
                        <span className="rounded-[4px] bg-white/95 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#4a154b] shadow-sm backdrop-blur-sm">
                          Certified
                        </span>
                      )}
                    </div>

                    <div className="relative aspect-square overflow-hidden bg-[#faf8f5]">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.12] mix-blend-multiply"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-[#4a154b]/0 group-hover:bg-[#4a154b]/5 transition-colors duration-300" />
                    </div>

                    <div className="flex flex-col flex-grow p-4">
                      <h3 className="font-serif text-[15px] leading-snug text-[#251622] line-clamp-2 min-h-[2.4em]">
                        {product.name}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap gap-x-1.5 gap-y-1 text-[10.5px] font-medium text-[#7a6b63]">
                        {(product.details.weight || product.details.mukhi || product.details.size) && (
                          <span className="text-[#d0a061] font-bold">
                            {product.details.weight || product.details.mukhi || product.details.size}
                          </span>
                        )}
                        {(product.details.weight || product.details.mukhi || product.details.size) && product.details.origin && (
                          <span className="text-gray-300">•</span>
                        )}
                        {product.details.origin && <span>{product.details.origin}</span>}
                      </div>

                      <div className="mt-auto pt-4">
                        <div className="flex items-baseline gap-2 mb-3">
                          {product.originalPrice && (
                            <span className="text-[10px] text-[#aaa] line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="text-[16px] font-bold text-[#4a154b] leading-none">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); addItem(product); navigate('/checkout'); }}
                            className="flex-1 py-2.5 rounded-[10px] bg-gradient-to-r from-[#c59d5f] to-[#a87940] text-white text-[10px] font-bold uppercase tracking-[0.15em] hover:from-[#d4ae72] hover:to-[#b98a50] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_12px_rgba(197,157,95,0.35)]"
                          >
                            Buy Now
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); addItem(product); addToast(`${product.name} added to cart`); }}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#4a154b]/20 bg-[#f3edf5] text-[#4a154b] hover:bg-[#4a154b] hover:text-white transition-all active:scale-95"
                            title="Add to Cart"
                          >
                            <Plus size={15} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-32 flex flex-col items-center text-center">
              <div className="h-20 w-20 mb-5 rounded-full bg-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <Search size={30} className="text-[#d0a061]" />
              </div>
              <p className="text-[18px] font-bold text-[#251622] mb-2">No products found</p>
              <p className="text-[13px] text-[#888] max-w-[280px]">We couldn't find items matching your current filters.</p>
              <button
                onClick={clearFilters}
                className="mt-6 rounded-full border border-[#d0a061]/50 bg-[#d0a061]/5 px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-[#d0a061] hover:bg-[#d0a061] hover:text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>


      {/* ─── MOBILE FILTER DRAWER ─── */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className="fixed right-0 top-0 z-[130] flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
            >
              <div className="border-b border-gray-100 p-6 flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-[22px] font-bold text-[#251622]">Filter & Sort</h3>
                  <button type="button" onClick={() => setIsFilterOpen(false)} className="rounded-full p-2 hover:bg-gray-100 transition-colors">
                    <X size={22} className="text-[#666]" />
                  </button>
                </div>
                <p className="text-[11px] text-[#888] mt-1">Refine your collection view</p>
              </div>

              <div className="flex-grow space-y-8 overflow-y-auto p-6 bg-[#fcfbf9]">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d0a061]">Product Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(null)}
                      className={`rounded-[10px] border py-2.5 text-xs text-center transition-all ${!activeCategory ? 'border-[#4a154b] bg-white text-[#4a154b] font-bold shadow-sm' : 'border-[#eaddd1] bg-transparent text-[#666]'}`}
                    >
                      All Types
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryChange(category.slug)}
                        className={`rounded-[10px] border py-2.5 text-xs text-center transition-all ${activeCategory === category.slug ? 'border-[#4a154b] bg-white text-[#4a154b] font-bold shadow-sm' : 'border-[#eaddd1] bg-transparent text-[#666]'}`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d0a061]">Price Range</h4>
                  <div className="flex flex-col gap-3">
                    {PRICE_RANGES.map((label) => (
                      <label key={label} className="flex cursor-pointer items-center space-x-3 group">
                        <div className="flex h-5 w-5 items-center justify-center rounded border border-[#d0a061]/50 bg-white group-hover:border-[#4a154b] transition-colors" />
                        <span className="text-[13px] font-medium text-[#6b5d56] group-hover:text-[#4a154b] transition-colors">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d0a061]">Sort By</h4>
                  <div className="flex flex-col gap-3">
                    {SORT_OPTIONS.map((label) => (
                      <label key={label} className="flex cursor-pointer items-center space-x-3 group">
                        <div className="flex h-5 w-5 rounded-full border border-[#d0a061]/50 bg-white items-center justify-center group-hover:border-[#4a154b]" />
                        <span className="text-[13px] font-medium text-[#6b5d56] group-hover:text-[#4a154b] transition-colors">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 bg-white p-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-[12px] border border-[#eaddd1] bg-white py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#666]"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-[12px] bg-[#4a154b] py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-md active:scale-95 transition-transform"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collection;
