import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User, Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useCartStore } from '../../store/useStore';

export const BottomNav = () => {
  const location = useLocation();
  const totalItems = useCartStore((state) => state.totalItems());

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/collection', icon: Grid },
    { name: 'Cart', path: '/cart', icon: ShoppingBag, badge: totalItems },
    { name: 'Wishlist', path: '/wishlist', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-4 pb-safe pt-2">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2 min-w-[64px] transition-colors",
                isActive ? "text-primary" : "text-gray-400"
              )}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium uppercase tracking-tighter">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
