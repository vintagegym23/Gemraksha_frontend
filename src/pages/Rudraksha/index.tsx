import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { SlidersHorizontal, Plus } from 'lucide-react';
import { useCartStore, useUIStore } from '../../store/useStore';

// Images
import bannerImg from '../../images/products/rudraksha/banner.png';
import mukhi1 from '../../images/products/rudraksha/mukhi_1.png';
import mukhi5 from '../../images/products/rudraksha/mukhi_5.png';
import gauriShankar from '../../images/products/rudraksha/gauri_shankar.png';
import ganesh from '../../images/products/rudraksha/ganesh.png';
import mukhi7 from '../../images/products/rudraksha/mukhi_7.png';
import mukhi14 from '../../images/products/rudraksha/mukhi_14.png';

const rudrakshas = [
  {
    id: 'rud-3',
    name: '1 Mukhi',
    slug: '11-mukhi-rudraksha',
    description: 'The Shiva Swaroop',
    price: 8500,
    image: mukhi1,
  },
  {
    id: 'rud-1',
    name: '5 Mukhi',
    slug: '5-mukhi-rudraksha-mala',
    description: 'Health & Peace',
    price: 2800,
    image: mukhi5,
  },
  {
    id: 'rud-4',
    name: 'Gauri Shankar',
    slug: 'gauri-shankar-rudraksha',
    description: 'Union of Shiva & Shakti',
    price: 11200,
    image: gauriShankar,
  },
  {
    id: 'rud-5',
    name: 'Ganesh',
    slug: 'ganesh-rudraksha',
    description: 'Remover of Obstacles',
    price: 3200,
    image: ganesh,
  },
  {
    id: 'rud-2',
    name: '7 Mukhi',
    slug: '7-mukhi-rudraksha',
    description: 'Goddess Lakshmi',
    price: 3600,
    image: mukhi7,
  },
  {
    id: 'rud-6',
    name: '14 Mukhi',
    slug: '14-mukhi-rudraksha',
    description: 'Devomani',
    price: 21000,
    image: mukhi14,
  },
];

const categories = ['All Types', '1-7 Mukhi', '8-14 Mukhi', 'Special Beads'];

const Rudraksha = () => {
  const [activeTab, setActiveTab] = useState('All Types');
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  const handleBuyNow = (item: typeof rudrakshas[0]) => {
    navigate(`/product/${item.slug}`);
  };

  const handleAddToCart = (item: typeof rudrakshas[0]) => {
    addItem({ id: item.id, name: item.name, slug: item.name.toLowerCase().replace(/\s+/g,'-'), price: item.price, images: [item.image], category: 'Rudraksha', details: {}, stock: 10 } as any);
    addToast(`${item.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]/80 pb-8 font-sans ring-1 ring-gray-100/50">
      {/* Header Title */}
      <div className="px-6 py-8 md:px-10 md:py-12">
        <h1 className="font-serif text-[2.2rem] text-[#251622] leading-tight md:text-5xl">
          Rudraksha Collection
        </h1>
      </div>

      {/* Featured Banner */}
      <div className="px-4 mb-10 md:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[220px] w-full overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(40,20,5,0.12)] md:h-[450px]"
        >
          <img 
            src={bannerImg} 
            alt="Rudraksha Collection Banner" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          
          <div className="absolute bottom-6 left-6 text-white max-w-[90%] md:bottom-10 md:left-10">
            <span className="inline-block px-3 py-1 bg-[#ffcc00] text-black text-[10px] font-bold uppercase tracking-widest rounded-sm mb-4 md:text-xs">
              FEATURED
            </span>
            <h2 className="text-[1.8rem] font-serif mb-2 leading-[0.9] md:text-6xl drop-shadow-lg">
               Spiritual Purity & Power
            </h2>
            <p className="text-[10px] text-white/70 font-bold tracking-[0.2em] md:text-xs">
              AUTHENTIC NEPALI & INDONESIAN BEADS
            </p>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="px-4 mb-12 md:px-10">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all shadow-sm ${
                activeTab === cat 
                  ? 'bg-[#ffcc00] text-black shadow-lg shadow-[#ffcc00]/20' 
                  : 'bg-white text-[#8d8078] hover:bg-gray-50'
              }`}
            >
              {cat === 'All Types' && <SlidersHorizontal size={14} />}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 md:gap-8 md:px-10 lg:grid-cols-4 lg:gap-10">
        {rudrakshas.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          onClick={() => navigate(`/product/${item.slug}`)}
            className="flex flex-col bg-white rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgba(40,20,5,0.06)] border border-white hover:shadow-2xl transition-all duration-500 group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden p-3 md:p-4">
              <div className="w-full h-full overflow-hidden rounded-[12px] bg-[#f8f8f8] flex items-center justify-center p-2 relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-4 flex flex-col items-center text-center flex-grow">
              <h3 className="text-sm font-bold text-[#251622] mb-1">{item.name}</h3>
              <p className="text-[11px] font-serif italic text-[#8d8078] mb-3">"{item.description}"</p>
              <p className="text-sm font-bold text-[#ffae00] tracking-wide mb-3">
                ₹{item.price.toLocaleString('en-IN')}
              </p>
              <div className="flex gap-2 w-full mt-auto">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-[#ffcc00] py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#c8a000] transition-all hover:bg-[#ffcc00] hover:text-black"
                >
                  <Plus size={11} strokeWidth={3} /> Cart
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); navigate(`/product/${item.slug}`); }}
                  className="flex-1 rounded-[10px] bg-[#4a154b] py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#3a1038] active:scale-[0.98]"
                >
                  Explore
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="px-4 mt-20 mb-12 md:px-10 flex justify-center">
        <button className="w-full max-w-sm py-5 rounded-2xl border-2 border-[#ffcc00] text-[#ffae00] text-[11px] font-bold uppercase tracking-[0.3em] bg-white hover:bg-[#ffcc00] hover:text-black transition-all duration-300 shadow-xl shadow-[#ffcc00]/10">
          VIEW ALL COLLECTION
        </button>
      </div>
    </div>
  );
};

export default Rudraksha;
