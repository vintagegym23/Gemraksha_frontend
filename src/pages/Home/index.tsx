import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Plus, Search, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { Button } from '../../components/ui/Button';
import { useCartStore, useUIStore } from '../../store/useStore';
import { GemstoneCollection } from '../../components/home/GemstoneCollection';
import heroMobile from '../../images/hero_mobile.png';
import heroSlider1 from '../../images/hero_slider_1.png';
import heroSlider2 from '../../images/hero_slider_2.png';
import heroSlider3 from '../../images/hero_slider_3.png';
import mukhi5 from '../../images/products/rudraksha/mukhi_5.png';
import gauriShankar from '../../images/products/rudraksha/gauri_shankar.png';
import mukhi1 from '../../images/products/rudraksha/mukhi_1.png';
import amethystBracelet from '../../images/products/bracelets/amethyst.png';

const serviceHighlights = [
  {
    icon: ShieldCheck,
    title: 'Certified Quality',
    description: 'GIA and IGI verified stones with transparent sourcing.',
  },
  {
    icon: Truck,
    title: 'Insured Shipping',
    description: 'Fast, secure delivery for every order across India.',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: 'Protected payments and personal guidance before you buy.',
  },
];

const rudrakshaItems = [
  { id: 'rud-1', name: '5 Mukhi', slug: '5-mukhi-rudraksha-mala', description: 'General wellbeing & peace', price: 2800, image: mukhi5 },
  { id: 'rud-2', name: 'Gauri Shankar', slug: 'gauri-shankar-rudraksha', description: 'For harmony & unity', price: 11200, image: gauriShankar },
  { id: 'rud-3', name: '1 Mukhi', slug: '11-mukhi-rudraksha', description: 'Supreme consciousness', price: 8500, image: mukhi1 },
];

const healingBracelets = [
  {
    id: 'brc-1',
    name: 'Amethyst Healing',
    slug: 'amethyst-healing-bracelet',
    description:
      'Powerful spiritual stone for stress relief and peace. Handcrafted with genuine Amethyst beads to promote clarity and emotional balance. Perfect for meditation and daily wear.',
    price: 1800,
    originalPrice: 2500,
    image: amethystBracelet,
  },
  {
    id: 'brc-2',
    name: 'Rose Quartz Love',
    slug: 'rose-quartz-love-bracelet',
    description:
      'The stone of universal love. It restores trust and harmony in relationships, encouraging unconditional love. Rose Quartz purifies and opens the heart at all levels to promote love.',
    price: 1650,
    originalPrice: 2200,
    image: amethystBracelet,
  },
  {
    id: 'brc-3',
    name: 'Tiger Eye Power',
    slug: 'tiger-eye-power-bracelet',
    description:
      'Golden Tiger Eye bracelet known for boosting courage, confidence and willpower. Strung on high-tensile elastic.',
    price: 1500,
    originalPrice: 2500,
    image: amethystBracelet,
  },
];


const heroSlides = [heroSlider1, heroSlider2, heroSlider3];

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const rudrakshaScrollRef = useRef<HTMLDivElement>(null);
  const braceletsScrollRef = useRef<HTMLDivElement>(null);

  /* Infinite auto-scroll on mobile — pauses if user touches */
  useEffect(() => {
    const el = rudrakshaScrollRef.current;
    if (!el || window.innerWidth >= 768) return;

    let userTouched = false;
    const onTouch = () => { userTouched = true; };
    el.addEventListener('touchstart', onTouch, { passive: true });

    const scroll = () => {
      if (userTouched) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + 170, behavior: 'smooth' });
    };

    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      scroll();
      intervalId = setInterval(scroll, 3500);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      el.removeEventListener('touchstart', onTouch);
    };
  }, []);

  useEffect(() => {
    const el = braceletsScrollRef.current;
    if (!el || window.innerWidth >= 768) return;

    let userTouched = false;
    const onTouch = () => { userTouched = true; };
    el.addEventListener('touchstart', onTouch, { passive: true });

    const scroll = () => {
      if (userTouched) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + 290, behavior: 'smooth' });
    };

    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      scroll();
      intervalId = setInterval(scroll, 3500);
    }, 3500);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      el.removeEventListener('touchstart', onTouch);
    };
  }, []);
  const addItem = useCartStore((s) => s.addItem);
  const { addToast, setCartConfetti, setCartOpen } = useUIStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await api.getProducts();

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedSearch = searchTerm.trim();
    navigate(
      normalizedSearch
        ? `/collection?search=${encodeURIComponent(normalizedSearch)}`
        : '/collection'
    );
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-[#f8f4ee] pb-10 text-[#251622]">
      <section className="relative overflow-visible bg-transparent">
        {/* Desktop Background Layer */}
        <div className="absolute inset-0 overflow-hidden hidden md:block">
          {heroSlides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
              referrerPolicy="no-referrer"
            />
          ))}
        </div>

        <div className="relative mx-auto flex max-w-[1240px] flex-col items-center text-center px-0 pt-0 md:px-6">
          {/* Hero Content Carrier */}
          <div className="w-full relative md:h-[600px]">
            {/* MOBILE ONLY HERO CONTENT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="md:hidden relative w-full h-[380px] overflow-hidden"
            >
              <img
                src={heroMobile}
                alt="Luxury Gemstones"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h1 className="font-serif text-[2.8rem] italic leading-[1.1] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                  Timeless Elegance
                </h1>
                <p className="mt-3 max-w-[260px] text-[11px] leading-relaxed tracking-wide text-white/90 drop-shadow-md">
                  Discover the mystical power of certified gems tailored for your destiny.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/collection')}
                  className="mt-7 rounded-[10px] bg-[#ecd0a1] px-12 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#4a154b] shadow-[0_15px_45px_rgba(0,0,0,0.25)] transition-all hover:bg-[#f2dbb3] active:scale-95"
                >
                  Shop Collection
                </button>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              onSubmit={handleSearchSubmit}
              className="relative z-20 mx-auto w-full max-w-[660px] px-4 -mt-[30px] md:absolute md:bottom-[-32px] md:left-1/2 md:-translate-x-1/2 md:mt-0 md:px-0"
            >
              <div className="flex h-[60px] items-center gap-4 rounded-[14px] bg-white px-6 shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-gray-100 md:h-[64px] md:rounded-[8px] md:border-gray-50 md:shadow-[0_15px_45px_rgba(0,0,0,0.1)]">
                <Search className="h-5 w-5 shrink-0 text-[#d0a061]" strokeWidth={2} />
                <input
                  id="home-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search for Sapphire, Ruby, Emerald..."
                  className="w-full bg-transparent text-sm font-medium md:text-[15px] text-[#4b2d1d] placeholder:text-[#a7b0c2] focus:outline-none"
                />
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white px-4 pb-12 pt-20 md:pb-8 md:px-6 md:pt-21">
        <div className="mx-auto max-w-[1240px] md:max-w-[800px]">
          <div className="flex justify-around md:grid md:grid-cols-3 md:gap-12">
            {serviceHighlights.map((item, index) => {
              const Icon = item.icon;
              const labels = ['CERTIFIED', 'FREE SHIP', 'SECURE'];

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#f3edf5] text-primary md:h-14 md:w-14">
                    <Icon size={24} className="md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8d8078] md:text-xs">
                    {labels[index]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ─── TICKER BANNER ─── */}
      <div className="w-full overflow-hidden bg-gradient-to-r from-[#c59d5f] via-[#d0a061] to-[#c59d5f] py-3.5 -mt-px relative z-10">
        <div className="flex animate-ticker whitespace-nowrap">
          {/* Duplicate the list twice for seamless infinite loop */}
          {[...Array(2)].map((_, copyIdx) => (
            <div key={copyIdx} className="flex shrink-0 items-center">
              {[
                '✦ Certified Natural Gemstones',
                '✦ GIA & IGI Authenticated',
                '✦ 10,000+ Happy Customers',
                '✦ Ethically Sourced Stones',
                '✦ Free Insured Shipping',
                '✦ Planetary Gemstones Expert',
                '✦ Genuine Rudraksha Beads',
                '✦ 30-Day Easy Returns',
                '✦ Custom Astrological Advice',
                '✦ Premium Packaging',
              ].map((item) => (
                <span
                  key={item}
                  className="mx-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white/95"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <GemstoneCollection />

      <section className="w-full bg-[#4a154b] mt-4 md:mt-8">
        <div className="mx-auto max-w-[1240px] px-5 py-9 md:px-8 md:py-20 lg:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-[2.5px] bg-[#ecd0a1]" />
              <h2 className="font-serif text-[28px] text-white md:text-5xl">Holy Rudraksha</h2>
            </div>
          </div>

          <div ref={rudrakshaScrollRef} className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:mx-0 md:px-0">
            {rudrakshaItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.slug}`)}
                className="min-w-[160px] flex-shrink-0 overflow-hidden rounded-[16px] bg-white p-2 shadow-[0_6px_24px_rgba(0,0,0,0.14)] transition-transform hover:scale-[1.02] md:min-w-0 cursor-pointer"
              >
                <div className="aspect-[3/2] overflow-hidden rounded-[10px] h-[110px] md:h-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="flex flex-col px-2 py-2">
                  <h3 className="font-serif text-[13px] font-bold text-[#4a154b]">
                    {item.name}
                  </h3>
                  <p className="mt-0.5 text-[10px] font-medium text-[#7d716a]">
                    {item.description}
                  </p>
                  <div className="mt-2 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold tracking-tight text-[#d0a061]">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        aria-label={`Add ${item.name} to cart`}
                        onClick={(e) => { 
                          e.stopPropagation();
                          addItem({ id: item.id, name: item.name, slug: item.slug, price: item.price, images: [item.image], category: 'Rudraksha', details: {}, stock: 10 } as any);
                          addToast(`${item.name} added to cart`);
                          setCartConfetti(true);
                          setCartOpen(true);
                        }}
                        className="flex h-7 w-8 items-center justify-center rounded-[7px] bg-[#c59d5f] text-white/90 shadow-sm transition-all hover:bg-[#b88c50] active:scale-95"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${item.slug}`); }}
                      className="w-full rounded-[7px] bg-[#4a154b] py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#3a1038] active:scale-[0.98] md:rounded-full md:bg-gradient-to-r md:from-[#c59d5f] md:to-[#a87940] md:py-3 md:text-[10px] md:tracking-[0.2em] md:shadow-[0_6px_20px_rgba(197,157,95,0.4)] md:hover:from-[#d4ae72] md:hover:to-[#b98a50] md:hover:shadow-[0_8px_28px_rgba(197,157,95,0.55)] md:hover:scale-[1.03]"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Bottom "View All" Link */}
          <div className="flex justify-center mt-5 md:hidden">
            <Link
              to="/collection?category=rudraksha"
              className="px-8 py-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#ecd0a1] border-2 border-[#ecd0a1] rounded-md active:scale-95 transition-all"
            >
              VIEW ALL RUDRAKSHA
            </Link>
          </div>

          {/* Desktop Bottom "View All" Link */}
          <div className="hidden md:flex justify-center mt-16 w-full">
            <Link
              to="/collection?category=rudraksha"
              className="px-12 py-4 text-[12px] font-bold uppercase tracking-[0.25em] text-[#ecd0a1] border-2 border-[#ecd0a1] rounded-md hover:bg-[#ecd0a1] hover:text-[#4a154b] transition-all duration-300"
            >
              VIEW ALL RUDRAKSHA
            </Link>
          </div>
        </div>
      </section>

      {/* Healing Bracelets Section */}
      <section className="mx-auto max-w-[1240px] px-4 pb-4 pt-16 md:px-6 md:pb-8">
        <div className="flex items-center justify-between mb-6 pl-1 pr-1">
          <div className="flex items-center gap-4">
            <div className="h-8 w-[2.5px] bg-[#d0a061]" />
            <h2 className="font-serif text-[28px] text-primary md:text-4xl">Healing Bracelets</h2>
          </div>
        </div>

        <div ref={braceletsScrollRef} className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar gap-4 pb-6 md:hidden -mx-4 px-4">
          {healingBracelets.map((bracelet) => (
            <motion.div
              key={bracelet.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => navigate(`/product/${bracelet.slug}`)}
              className="flex items-center gap-4 min-w-[280px] snap-center rounded-[20px] bg-white p-3.5 shadow-[0_10px_35px_rgba(40,20,5,0.06)] border border-gray-100 cursor-pointer"
            >
              {/* Left Image */}
              <div className="h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-[12px]">
                <img
                  src={bracelet.image}
                  alt={bracelet.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Right Content */}
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-serif text-[1rem] leading-tight text-primary font-bold">{bracelet.name}</h3>
                <p className="mt-1 text-[10px] leading-relaxed text-[#8d8078] line-clamp-2">
                  {bracelet.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[1rem] font-bold text-[#d0a061]">
                    ₹{bracelet.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-[#b8b0a5] line-through">
                    ₹{bracelet.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); navigate(`/product/${bracelet.slug}`); }}
                  className="mt-2.5 w-fit rounded-full border border-[#4a154b]/50 px-4 py-1.5 text-[9px] font-bold text-[#4a154b] transition-all active:scale-95"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Container (Hidden on mobile) */}
        <div className="hidden md:flex snap-x snap-mandatory overflow-x-auto gap-6 pb-4 no-scrollbar">
          {healingBracelets.map((bracelet) => (
            <div
              key={bracelet.id}
              onClick={() => navigate(`/product/${bracelet.slug}`)}
              className="min-w-[560px] max-w-[620px] flex-none snap-start flex flex-row items-stretch rounded-[20px] bg-white border border-gray-100 shadow-[0_10px_40px_rgba(40,20,5,0.07)] overflow-hidden cursor-pointer"
            >
              {/* Left Image */}
              <div className="w-[220px] flex-shrink-0 overflow-hidden">
                <img
                  src={bracelet.image}
                  alt={bracelet.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Right Content */}
              <div className="flex flex-1 flex-col justify-center px-8 py-8 text-left">
                <h3 className="font-serif text-[1.6rem] leading-tight text-primary">{bracelet.name}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#6d5c52] opacity-90 line-clamp-3">
                  {bracelet.description}
                </p>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-[1.5rem] font-bold text-[#d0a061]">
                    ₹{bracelet.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[13px] text-[#b8b0a5] line-through">
                    ₹{bracelet.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${bracelet.slug}`); }}
                    className="rounded-full border border-[#4a154b]/40 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#4a154b] transition-all hover:bg-[#4a154b] hover:text-white"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); addItem({ id: bracelet.id, name: bracelet.name, slug: bracelet.slug, price: bracelet.price, images: [bracelet.image], category: 'Bracelets', details: {}, stock: 10 } as any); addToast(`${bracelet.name} added to cart`); setCartConfetti(true); setCartOpen(true); }}
                    className="rounded-full bg-gradient-to-r from-[#c59d5f] to-[#a87940] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_4px_14px_rgba(197,157,95,0.4)] transition-all hover:from-[#d4ae72] hover:to-[#b98a50] hover:scale-[1.03]"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Bottom "View All" Link */}
        <div className="flex justify-center mt-5 md:hidden">
          <Link
            to="/collection?category=bracelets"
            className="px-8 py-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#d0a061] border-2 border-[#d0a061] rounded-md active:scale-95 transition-all"
          >
            VIEW ALL BRACELETS
          </Link>
        </div>

        {/* Desktop Bottom "View All" Link */}
        <div className="hidden md:flex justify-center mt-16 w-full">
          <Link
            to="/collection?category=bracelets"
            className="px-12 py-4 text-[12px] font-bold uppercase tracking-[0.25em] text-[#d0a061] border-2 border-[#d0a061] rounded-md hover:bg-[#d0a061] hover:text-white transition-all duration-300"
          >
            VIEW ALL BRACELETS
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
