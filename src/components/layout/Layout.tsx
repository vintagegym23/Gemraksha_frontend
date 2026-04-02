import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { CartDrawer } from '../ui/CartDrawer';
import { MetalRatesModal } from '../ui/MetalRatesModal';
import { SearchOverlay } from './SearchOverlay';
import { FlowerConfetti } from '../ui/FlowerConfetti';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/useStore';

import { Check, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const ToastContainer = () => {
  const { toasts, removeToast } = useUIStore();
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-[90px] left-1/2 z-[200] flex w-full max-w-[340px] -translate-x-1/2 flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="flex items-center gap-3 rounded-xl bg-[#340e34] px-4 py-3.5 text-[12px] font-bold text-white shadow-xl shadow-black/20 border border-white/5 pointer-events-auto w-full"
          >
            <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#ecd0a1] text-[#340e34]">
              <Check size={12} strokeWidth={4} />
            </div>
            <span className="flex-1 tracking-wide leading-tight truncate">{toast.message}</span>
            {toast.message.toLowerCase().includes('cart') && (
              <button
                type="button"
                onClick={() => {
                  removeToast(toast.id);
                  navigate('/cart');
                }}
                className="shrink-0 rounded-[6px] px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d0a061] transition-colors active:bg-white/10"
              >
                View Cart
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isMetalRatesOpen, setMetalRatesOpen, cartConfetti, setCartConfetti } = useUIStore();

  const isSizeGuide = location.pathname === '/size-guide';

  return (
    <div className="flex flex-col min-h-screen overflow-x-clip">
      {!isSizeGuide && <Header />}
      <MobileMenu />
      <CartDrawer />
      <SearchOverlay />
      <MetalRatesModal isOpen={isMetalRatesOpen} onClose={() => setMetalRatesOpen(false)} />
      {cartConfetti && <FlowerConfetti onDone={() => setCartConfetti(false)} />}
      <ToastContainer />
      <main className="flex-grow pt-[60px] md:pt-[72px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      {!isSizeGuide && <Footer />}
      <BottomNav />

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-20 right-4 z-[300] md:bottom-6 md:right-6">
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
        <a
          href="https://wa.me/916281055415"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 active:scale-95 md:h-14 md:w-14"
        >
          <svg viewBox="0 0 32 32" className="h-6 w-6 md:h-7 md:w-7" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16.003c0 2.354.627 4.637 1.816 6.638L2.667 29.333l6.875-1.792a13.29 13.29 0 0 0 6.461 1.659h.003c7.363 0 13.327-5.97 13.327-13.333 0-7.362-5.964-13.2-13.33-13.2zm0 24.267a11.04 11.04 0 0 1-5.627-1.544l-.403-.24-4.08 1.063 1.088-3.963-.264-.418a11.02 11.02 0 0 1-1.717-5.827c0-6.1 4.963-11.067 11.07-11.067 6.1 0 11.06 4.967 11.06 11.067-.003 6.1-4.963 11.07-11.127 11.07v-.141zm6.07-8.286c-.334-.167-1.97-.972-2.275-1.083-.304-.11-.525-.167-.747.167-.22.334-.858 1.083-1.051 1.304-.194.22-.388.25-.722.083-.334-.167-1.41-.52-2.686-1.657-.993-.886-1.663-1.98-1.858-2.314-.194-.334-.02-.515.147-.681.15-.15.334-.39.5-.585.167-.194.222-.334.334-.555.11-.22.055-.415-.028-.582-.083-.167-.747-1.802-1.024-2.468-.27-.648-.543-.56-.747-.57-.194-.01-.415-.012-.637-.012s-.582.083-.887.415c-.304.334-1.162 1.136-1.162 2.77 0 1.635 1.19 3.214 1.357 3.435.167.22 2.343 3.578 5.677 5.016.794.343 1.413.547 1.895.7.796.253 1.52.217 2.093.132.638-.095 1.97-.806 2.248-1.584.278-.778.278-1.445.194-1.584-.083-.14-.304-.222-.638-.389z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};
