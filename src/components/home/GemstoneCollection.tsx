import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCartStore, useUIStore } from '../../store/useStore';
import blueSapphire from '../../images/blue_sapphire.png';
import zambianEmerald from '../../images/zambian_emerald.png';
import burmaRuby from '../../images/burma_ruby.png';
import yellowSapphire from '../../images/yellow_sapphire.png';

interface GemstoneItem {
  id: string;
  name: string;
  slug: string;
  price?: number;
  originalPrice?: number;
  startingPrice?: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  primary?: boolean;
}

const gemstones: GemstoneItem[] = [
  { id: 'gem-1', name: 'Blue Sapphire',   slug: 'royal-blue-sapphire',    originalPrice: 25000, price: 18500, image: blueSapphire,    badge: 'PREMIUM', badgeColor: 'bg-[#4a154b]' },
  { id: 'gem-2', name: 'Zambian Emerald', slug: 'zambian-emerald',  startingPrice: 12000, image: zambianEmerald },
  { id: 'gem-3', name: 'Burma Ruby',      slug: 'burma-pigeon-blood-ruby',       startingPrice: 35000, image: burmaRuby },
  { id: 'gem-4', name: 'Yellow Sapphire', slug: 'yellow-sapphire-pukhraj',  startingPrice: 21000, image: yellowSapphire, badge: 'HOT', badgeColor: 'bg-[#d0a061]', primary: true },
];

export const GemstoneCollection: React.FC = () => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const setCartConfetti = useUIStore((s) => s.setCartConfetti);

  const handleBuyNow = (gem: GemstoneItem) => {
    const price = gem.price ?? gem.startingPrice ?? 0;
    addItem({
      id: gem.id,
      name: gem.name,
      slug: gem.slug,
      price,
      images: [gem.image],
      category: 'Gemstones',
      details: {},
      stock: 10,
    } as any);
    setCartConfetti(true);
    navigate('/cart', { state: { confetti: true } });
  };

  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-16 pb-8 md:px-6 md:pb-4">
      <div className="flex items-center justify-between mb-10 pl-1 pr-1">
        <div className="flex items-center">
          <div className="h-10 w-1.5 bg-[#d0a061] rounded-full mr-4" />
          <h2 className="text-3xl font-serif text-[#4a154b]">Gemstone Collection</h2>
        </div>
        <Link to="/collection" className="md:hidden text-[10px] font-bold uppercase tracking-[0.25em] text-[#d0a061] border-b border-[#d0a061]/30 pb-0.5">
          VIEW ALL
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
        {gemstones.map((gem) => (
          <motion.div
            key={gem.id}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col bg-white rounded-lg shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden border border-[#f5f5f5]"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden m-2 rounded-md bg-[#1a1a1a] flex items-center justify-center">
              <Link to={`/product/${gem.slug}`} className="absolute inset-0">
                <img src={gem.image} alt={gem.name}
                  className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer" />
              </Link>

              {gem.badge && (
                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[8px] font-bold text-white tracking-[0.15em] ${gem.badgeColor}`}>
                  {gem.badge}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="px-4 py-4 flex flex-col items-center flex-grow">
              <h3 className="text-lg font-serif text-[#4a154b] mb-2 font-light text-center">{gem.name}</h3>

              <div className="flex flex-col items-center min-h-[40px] mb-5">
                {gem.startingPrice ? (
                  <>
                    <span className="text-[10px] text-[#999] tracking-wider mb-0.5">Starting from</span>
                    <span className="text-lg font-bold text-[#4a154b]">₹{gem.startingPrice.toLocaleString('en-IN')}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-[#999] line-through mb-0.5 tracking-wider">₹{gem.originalPrice?.toLocaleString('en-IN')}</span>
                    <span className="text-lg font-bold text-[#4a154b]">₹{gem.price?.toLocaleString('en-IN')}</span>
                  </>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 w-full mt-auto">
                <button
                  onClick={() => navigate(`/product/${gem.slug}`)}
                  className="flex-1 py-2 rounded-sm text-[9px] font-bold tracking-[0.18em] border border-[#4a154b] text-[#4a154b] hover:bg-[#4a154b] hover:text-white transition-all duration-300 uppercase"
                >
                  Explore
                </button>
                <button
                  onClick={() => handleBuyNow(gem)}
                  className="flex-1 py-2 rounded-sm text-[9px] font-bold tracking-[0.18em] bg-[#d0a061] text-white hover:bg-[#b88c50] transition-all duration-300 uppercase"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Bottom "View All" Link */}
      <div className="hidden md:flex justify-center mt-16 w-full">
        <Link
          to="/collection"
          className="px-12 py-4 text-[12px] font-bold uppercase tracking-[0.25em] text-[#d0a061] border-2 border-[#d0a061] rounded-md hover:bg-[#d0a061] hover:text-white transition-all duration-300"
        >
          VIEW ALL GEMSTONES
        </Link>
      </div>
    </section>
  );
};
