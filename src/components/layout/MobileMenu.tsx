import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, Instagram, Facebook, Twitter, RefreshCw, User, Search, Truck, ShieldAlert, FileText, Lock, Headset, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useUIStore, useCartStore } from '../../store/useStore';

export const MobileMenu = () => {
  const { isMenuOpen, setMenuOpen, setMetalRatesOpen } = useUIStore();
  const location = useLocation();
  const isGemstonesRoute =
    location.pathname.startsWith('/collection') || location.pathname.startsWith('/product');

  const navLinks = [
    { 
      name: 'Home', 
      path: '/', 
      active: location.pathname === '/' 
    },
    { 
      name: 'Gemstones', 
      path: '/collection?category=gemstones', 
      active: location.pathname === '/collection' && location.search.includes('category=gemstones') 
    },
    { 
      name: 'Rudraksha', 
      path: '/collection?category=rudraksha', 
      active: location.pathname === '/collection' && location.search.includes('category=rudraksha') 
    },
    { 
      name: 'Bracelets', 
      path: '/collection?category=bracelets', 
      active: location.pathname === '/collection' && location.search.includes('category=bracelets') 
    },
    { 
      name: 'Rings', 
      path: '/collection?category=rings', 
      active: location.pathname === '/collection' && location.search.includes('category=rings') 
    },
  ];

  const accountLinks = [
    { icon: Search, label: 'Help & FAQs', path: '/account?tab=faq', desc: 'Find answers fast' },
    { icon: Truck, label: 'Shipping Policy', path: '/account?tab=shipping', desc: 'Delivery & timelines' },
    { icon: RefreshCw, label: 'Return Policy', path: '/account?tab=returns', desc: 'No returns on custom' },
    { icon: ShieldAlert, label: 'Disclaimer', path: '/account?tab=disclaimer', desc: 'Important notices' },
    { icon: FileText, label: 'Terms & Conditions', path: '/account?tab=terms', desc: 'Legal & usage terms' },
    { icon: Lock, label: 'Privacy Policy', path: '/account?tab=privacy', desc: 'Your data, protected' },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[100] bg-black/50"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 z-[110] flex h-full w-full max-w-xs flex-col bg-[#f8f4ee] shadow-2xl"
          >
            {/* Top Header */}
            <div className="flex items-center justify-between border-b border-white/15 bg-[#4a154b] p-6 text-white">
              <div className="flex flex-col leading-none">
                <span className="text-xl font-serif tracking-[0.18em]">GEMRAKSHA</span>
                <span className="mt-1 text-[0.52rem] tracking-[0.38em] text-white/75">
                  CERTIFIED GEMS
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-2 transition-colors hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow space-y-6 overflow-y-auto p-5 no-scrollbar">
              
              {/* Menu Title */}
              <div className="px-2 py-1 pb-2">
                <p className="font-serif text-[20px] font-bold text-[#251622] leading-tight flex items-center gap-2">
                  Collections
                </p>
                <p className="text-[11px] text-[#8d8078] mt-1">Explore our exclusive catalog</p>
              </div>

              {/* Primary Navigation */}
              <div className="rounded-[16px] bg-white shadow-[0_3px_16px_rgba(0,0,0,0.05)] overflow-hidden border border-[#f3edf5]">
                <nav className="flex flex-col">
                  {navLinks.map((link, idx) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center px-5 py-4 text-sm font-semibold uppercase tracking-widest transition-colors hover:bg-[#fdf8f2] active:bg-[#f3edf5] ${idx < navLinks.length - 1 ? 'border-b border-gray-100' : ''} ${link.active ? 'text-[#d0a061]' : 'text-[#251622]'}`}
                    >
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Support Card */}
              <div className="rounded-[20px] border border-[#ead9c5] bg-white px-5 py-5 text-center shadow-sm">
                <Headset size={22} strokeWidth={1.8} className="mx-auto mb-2 text-[#d0a061]" />
                <p className="text-[14px] font-bold text-[#251622]">Need assistance?</p>
                <p className="mt-1 text-[12px] text-[#aaa]">Our gemologists are available 24/7</p>
                <Link 
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#4a154b] py-3.5 text-[13px] font-bold text-white transition-all hover:bg-[#3a1038]"
                >
                  <ExternalLink size={14} strokeWidth={2.5} /> Contact Support
                </Link>
              </div>

            </div>

            <div className="border-t border-[#ead9c5] bg-white/70 p-6 flex justify-between items-center">
              <p className="text-[10px] uppercase tracking-widest text-[#8d8078]">
                © {new Date().getFullYear()} GEMRAKSHA
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#8d8078] transition-colors hover:text-[#4a154b]"><Instagram size={16} /></a>
                <a href="#" className="text-[#8d8078] transition-colors hover:text-[#4a154b]"><Facebook size={16} /></a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
