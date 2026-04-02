import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useUIStore } from '../../store/useStore';

const SUGGESTIONS = ['Blue Sapphire', 'Emerald', 'Ruby', 'Yellow Sapphire', '5 Mukhi', 'Amethyst'];

export const SearchOverlay = () => {
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false); };
      window.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
      return () => { clearTimeout(t); window.removeEventListener('keydown', onEsc); document.body.style.overflow = ''; };
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
  }, [isSearchOpen, setSearchOpen]);

  const submit = (term: string) => {
    if (!term.trim()) return;
    setSearchOpen(false);
    navigate(`/collection?search=${encodeURIComponent(term.trim())}`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[198] bg-black/30"
            onClick={() => setSearchOpen(false)}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-[199] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          >
            {/* Input row */}
            <form
              onSubmit={(e) => { e.preventDefault(); submit(query); }}
              className="flex items-center gap-3 px-4 py-3 md:px-8 md:py-4"
            >
              <Search size={18} className="text-[#aaa] flex-shrink-0" strokeWidth={2} />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gemstones, rudraksha…"
                className="flex-1 bg-transparent text-[15px] text-[#251622] placeholder:text-[#bbb] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-[#bbb] hover:text-[#666] transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </form>

            {/* Suggestions */}
            {!query && (
              <div className="flex flex-wrap gap-2 border-t border-gray-100 px-4 py-3 md:px-8">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="rounded-full bg-[#f5f0f8] px-4 py-1.5 text-[12px] text-[#4a154b] hover:bg-[#4a154b] hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
