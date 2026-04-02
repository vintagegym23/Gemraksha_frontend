import React from 'react';
import { motion } from 'motion/react';
import { ProductCard } from '../../components/product/ProductCard';

import sapphireRing from '../../images/finished_ring.png';
import rubyImg from '../../images/collection/burma_ruby.png';
import emeraldImg from '../../images/collection/zambian_emerald.png';
import yellowSapphireImg from '../../images/collection/yellow_sapphire.png';

const rings = [
  {
    id: 'ring-3',
    name: 'Blue Sapphire Cocktail Ring',
    slug: 'blue-sapphire-cocktail-ring',
    description: 'Bold and glamorous 22k gold cocktail ring featuring a large oval Ceylon blue sapphire with diamond halos.',
    originalPrice: 68000,
    price: 58000,
    images: [sapphireRing],
    category: 'Premium Rings',
    details: { metal: '22k Gold', size: 'Ring Size 7', origin: 'Rajasthan', quality: 'Hallmarked' },
    stock: 2
  },
  {
    id: 'ring-1',
    name: 'Ruby Solitaire Gold Ring',
    slug: 'ruby-solitaire-gold-ring',
    description: 'A timeless 18k gold solitaire ring set with a vivid natural ruby.',
    price: 52000,
    images: [rubyImg],
    category: 'Premium Rings',
    details: { metal: '18k Gold', size: 'Ring Size 7', origin: 'Jaipur', quality: 'BIS Hallmarked' },
    stock: 3
  },
  {
    id: 'ring-2',
    name: 'Emerald Pave Diamond Ring',
    slug: 'emerald-pave-diamond-ring',
    description: 'Elegant platinum ring featuring a center Zambian emerald surrounded by pave-set natural diamonds.',
    originalPrice: 95000,
    price: 78500,
    images: [emeraldImg],
    category: 'Premium Rings',
    details: { metal: 'Platinum 950', size: 'Ring Size 6', origin: 'Mumbai', quality: 'IGI Certified' },
    stock: 1
  },
  {
    id: 'ring-4',
    name: 'Yellow Sapphire Band Ring',
    slug: 'yellow-sapphire-band-ring',
    description: 'Astrological yellow sapphire ring in panchadhatu. Ideal for Jupiter strengthening.',
    price: 12500,
    images: [yellowSapphireImg],
    category: 'Premium Rings',
    details: { metal: 'Panchadhatu', size: 'Adjustable', origin: 'Banaras', quality: 'Jyotish Grade' },
    stock: 4
  }
];

const Rings = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-24">
      {/* Header */}
      <div className="mx-auto max-w-[1240px] px-6 pt-20 pb-16 text-center md:px-8">
        <div className="flex items-center justify-center mb-6">
          <div className="h-10 w-[2.5px] bg-[#d0a061]" />
          <h1 className="ml-4 text-3xl font-serif text-[#4a154b] tracking-wide md:text-5xl">
            Signature Rings
          </h1>
        </div>
        <p className="max-w-2xl mx-auto font-light text-[#666666] leading-relaxed italic">
          Explore our masterfully crafted selection of signature rings, where timeless design meets the extraordinary brilliance of nature's finest gemstones.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {rings.map((item) => (
            <ProductCard key={item.id} product={item as any} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rings;
