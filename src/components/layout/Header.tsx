import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useUIStore, useCartStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const Header = () => {
  const { setMenuOpen, isMenuOpen, setCartOpen } = useUIStore();
  const totalItems = useCartStore((state) => state.totalItems());
  const location = useLocation();
  const navigate = useNavigate();

  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  /* Focus input when it expands */
  useEffect(() => {
    if (searchActive) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      setQuery('');
    }
  }, [searchActive]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchActive(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchActive(false);
      navigate(`/collection?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Home',      path: '/',                             active: location.pathname === '/' },
    { name: 'Gemstones', path: '/collection?category=gemstones', active: location.pathname === '/collection' && location.search.includes('category=gemstones') },
    { name: 'Rudraksha', path: '/collection?category=rudraksha', active: location.pathname === '/collection' && location.search.includes('category=rudraksha') },
    { name: 'Bracelets', path: '/collection?category=bracelets', active: location.pathname === '/collection' && location.search.includes('category=bracelets') },
    { name: 'Rings',     path: '/collection?category=rings',     active: location.pathname === '/collection' && location.search.includes('category=rings') },
    { name: 'About',     path: '/about',                         active: location.pathname === '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#c99652]/40 bg-primary text-white shadow-[0_12px_36px_rgba(48,11,71,0.18)]">
      <div className="mx-auto flex h-[60px] max-w-[1240px] items-center justify-between px-3 md:h-[72px] md:px-6">

        {/* Mobile: Hamburger | Desktop: Logo */}
        <div className="flex flex-1 items-center md:flex-none">
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="rounded-full p-2 text-white transition hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>

          <Link to="/" className="hidden flex-col leading-none md:flex">
            <span className="font-serif text-[1.45rem] tracking-[0.12em] text-white lg:text-[2.15rem]">
              GEMRAKSHA
            </span>
            <span className="ml-[0.12em] text-[0.45rem] font-medium tracking-[0.2em] text-white/80 lg:text-[0.58rem]">
              CERTIFIED GEMS
            </span>
          </Link>
        </div>

        {/* Mobile: Centered Logo */}
        <div className="flex flex-[2] justify-center md:hidden">
          <Link to="/" className="flex flex-col items-center leading-none">
            <span className="font-serif text-[1.2rem] font-bold tracking-[0.2em] text-white">
              GEMRAKSHA
            </span>
            <span className="mt-[2px] text-[0.4rem] font-bold tracking-[0.35em] text-white/80 uppercase">
              Certified Gems
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links - Centered */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-6 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-[13px] font-medium text-white/80 transition-all hover:text-white',
                link.active && 'text-white font-semibold'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Icons: Search (inline), User, Bag */}
        <div className="flex flex-1 items-center justify-end gap-1 md:flex-none md:gap-3 lg:gap-5">

          {/* ── Inline search ── */}
          <div className="flex items-center">
            {/* Expanding input — slides in from the right of the icon */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <AnimatePresence>
                {searchActive && (
                  <motion.input
                    key="search-input"
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search…"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 160, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    onBlur={() => { if (!query) setSearchActive(false); }}
                    className="bg-transparent text-[13px] text-white placeholder:text-white/50 border-b border-white/60 focus:border-white focus:outline-none pb-0.5 mr-2 overflow-hidden"
                    style={{ minWidth: 0 }}
                  />
                )}
              </AnimatePresence>

              <button
                type={searchActive && query ? 'submit' : 'button'}
                aria-label="Search"
                onClick={() => { if (!searchActive) setSearchActive(true); }}
                className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white md:p-2.5"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
            </form>
          </div>

          <button
            type="button"
            aria-label="Account"
            onClick={() => navigate('/account')}
            className="hidden rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white md:inline-flex"
          >
            <User size={18} />
          </button>

          <button
            type="button"
            aria-label="Open cart"
            className="relative rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white md:p-2.5"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute right-0.5 top-0.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#d0a061] px-1 text-[9px] font-bold leading-none text-[#251622] md:right-1.5 md:top-1.5 md:h-4 md:min-w-4">
              {totalItems}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
