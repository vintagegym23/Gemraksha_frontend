import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, RefreshCw } from 'lucide-react';
import { useUIStore, useCartStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export const Header = () => {
  const { setMenuOpen, isMenuOpen, setCartOpen, setMetalRatesOpen } = useUIStore();
  const totalItems = useCartStore((state) => state.totalItems());
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-primary">
              GEMRAKSHA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest transition-colors hover:text-gold",
                  location.pathname === link.path ? "text-primary" : "text-gray-500"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
              onClick={() => setMetalRatesOpen(true)}
            >
              <RefreshCw size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Metal Rates</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <Link to="/profile" className="hidden md:block p-2 text-gray-600 hover:text-primary transition-colors">
              <User size={20} />
            </Link>
            <button 
              className="p-2 text-gray-600 hover:text-primary transition-colors relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
