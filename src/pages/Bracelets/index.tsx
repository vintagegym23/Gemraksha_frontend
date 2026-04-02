import React from 'react';
import { motion } from 'motion/react';
import { ProductCard } from '../../components/product/ProductCard';

import amethystImg from '../../images/products/bracelets/amethyst.png';
import sapphireImg from '../../images/collection/blue_sapphire.png';
import emeraldImg from '../../images/collection/zambian_emerald.png';
import rubyImg from '../../images/collection/burma_ruby.png';

// Using mock data for demonstration
const bracelets = [
  {
    id: 'b1',
    name: 'Amethyst Healing Bracelet',
    slug: 'amethyst-healing-bracelet',
    description: 'Powerful spiritual stone for stress relief and peace. Handcrafted with genuine Amethyst beads.',
    originalPrice: 2500,
    price: 1299,
    images: [amethystImg],
    category: 'Healing Bracelets',
    details: { origin: 'India', weight: 'N/A', treatment: 'Natural', shape: 'Beads' },
    stock: 10
  },
  {
    id: 'b2',
    name: 'Blue Sapphire Bracelet',
    slug: 'blue-sapphire-bracelet',
    description: 'Elevate your energy with the royal brilliance of blue sapphire gemstones.',
    originalPrice: 15000,
    price: 12500,
    images: [sapphireImg],
    category: 'Luxury Bracelets',
    details: { origin: 'Ceylon', weight: 'N/A', treatment: 'Natural', shape: 'Beads' },
    stock: 3
  },
  {
    id: 'b3',
    name: 'Zambian Emerald Bracelet',
    slug: 'emerald-bracelet',
    description: 'Vibrant green emeralds crafted into an elegant healing accessory.',
    price: 9800,
    images: [emeraldImg],
    category: 'Luxury Bracelets',
    details: { origin: 'Zambia', weight: 'N/A', treatment: 'Natural', shape: 'Beads' },
    stock: 5
  },
  {
    id: 'b4',
    name: 'Burma Ruby Bracelet',
    slug: 'ruby-bracelet',
    description: 'Passionate red rubies for strength, vitality, and sophisticated style.',
    price: 18500,
    images: [rubyImg],
    category: 'Luxury Bracelets',
    details: { origin: 'Burma', weight: 'N/A', treatment: 'Natural', shape: 'Beads' },
    stock: 2
  }
];

const Bracelets = () => {
  return (
    <div className="min-h-screen bg-[#fdfaf5] pb-8">
      {/* Header */}
      <div className="mx-auto max-w-[1240px] px-6 pt-20 pb-16 text-center md:px-8">
        <div className="flex items-center justify-center mb-6">
          <div className="h-10 w-[2.5px] bg-[#d0a061]" />
          <h1 className="ml-4 text-3xl font-serif text-[#4a154b] tracking-wide md:text-5xl">
            Healing Bracelets
          </h1>
        </div>
        <p className="max-w-2xl mx-auto font-light text-[#666666] leading-relaxed italic">
          Discover our collection of sacred healing bracelets, handcrafted with natural gemstones to balance your energy and enhance your spiritual journey.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bracelets.map((item) => (
            <ProductCard key={item.id} product={item as any} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bracelets;
