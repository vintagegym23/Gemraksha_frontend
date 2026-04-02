import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Circle, Headset } from 'lucide-react';
import { useUIStore } from '../../store/useStore';


/**
 * Mobile bottom nav — 4 tabs
 *
 * HOME       → /
 * SHOP       → /collection   Browse & shop gemstones
 * SIZE GUIDE → #             Ring/Gemstone sizing
 * CONTACT    → /contact
 */
const NAV_ITEMS = [
  { id: 'home',       icon: Home,        label: 'Home',        path: '/',           end: true  },
  { id: 'shop',       icon: ShoppingBag, label: 'Shop',        path: '/collection', end: false },
  { id: 'size-guide', icon: Circle,      label: 'Size Guide',  path: '/size-guide', end: false },
  { id: 'contact',    icon: Headset,     label: 'Contact Us',  path: '/contact',    end: false },
];

export const BottomNav = () => {
  const location = useLocation();
  const { isSearchOpen } = useUIStore();

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-[100] flex items-stretch justify-around border-t border-[#ead9c5] bg-white md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {NAV_ITEMS.map((item) => {
        const { icon: Icon, label, path, end, id } = item;
        
        // Active logic
        let isActive = false;
        if (id === 'home') isActive = location.pathname === '/';
        else if (id === 'shop') isActive = location.pathname === '/collection' && !location.search.includes('search');
        else if (id === 'size-guide') isActive = location.pathname === '/size-guide';
        else if (id === 'contact') isActive = location.pathname.startsWith('/contact');

        const handleClick = (e: React.MouseEvent) => {
          // No special handling needed now
        };

        const content = (
          <div className="flex flex-col items-center justify-center py-2.5">
            <span
              className={`flex items-center justify-center rounded-2xl transition-all duration-200 ${
                isActive ? 'h-8 w-14 bg-[#f3edf5]' : 'h-8 w-8'
              }`}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className={isActive ? 'text-[#4a154b]' : 'text-[#9e9189]'}
              />
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 mt-1 ${
                isActive ? 'text-[#4a154b]' : 'text-[#9e9189]'
              }`}
            >
              {label}
            </span>
          </div>
        );

        return (
          <NavLink
            key={id}
            to={path!}
            end={end}
            aria-label={label}
            onClick={handleClick}
            className="flex flex-1 flex-col items-center justify-center transition-colors duration-200"
          >
            {content}
          </NavLink>
        );
      })}
    </nav>
  );
};
