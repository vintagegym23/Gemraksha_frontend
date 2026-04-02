import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { motion } from 'motion/react';
import { useCartStore, useUIStore } from '../../store/useStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    navigate('/cart', { state: { confetti: true } });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    navigate('/cart', { state: { confetti: true } });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative flex flex-col bg-white rounded-lg shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden border border-[#f5f5f5]"
    >
      {/* Image Container — clicking navigates to product */}
      <Link to={`/product/${product.slug}`} className="relative aspect-square overflow-hidden m-2 rounded-md bg-[#1a1a1a] flex items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-[85%] w-[85%] object-contain transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.stock <= 2 && product.stock > 0 && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-sm text-[8px] font-bold text-white tracking-[0.15em] bg-[#d0a061]">
            LOW STOCK
          </div>
        )}
        {product.price > 10000 && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-sm text-[8px] font-bold text-white tracking-[0.15em] bg-[#4a154b]">
            PREMIUM
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="px-5 py-6 flex flex-col items-center flex-grow text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d6e39] mb-3">
          {product.category}
        </p>
        <h3 className="text-lg font-serif text-[#4a154b] mb-2 font-light line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex flex-col items-center min-h-[44px] mb-8">
          {product.originalPrice ? (
            <>
              <span className="text-[10px] text-[#999999] line-through mb-0.5 tracking-wider font-medium">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xl font-bold text-[#4a154b]">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <>
              <span className="text-[10px] text-[#999999] tracking-wider mb-0.5 uppercase font-medium">
                Starting from
              </span>
              <span className="text-xl font-bold text-[#4a154b]">
                {formatPrice(product.price)}
              </span>
            </>
          )}
        </div>

        <div className="flex gap-2 mt-auto w-full">
          <button
            onClick={() => navigate(`/product/${product.slug}`)}
            className="flex-1 py-2.5 rounded-sm text-[10px] font-bold tracking-[0.2em] border border-[#4a154b] text-[#4a154b] hover:bg-[#4a154b] hover:text-white transition-all duration-300 uppercase"
          >
            Explore
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 py-2.5 rounded-sm text-[10px] font-bold tracking-[0.2em] bg-[#d0a061] text-white hover:bg-[#b88c50] transition-all duration-300 uppercase"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};
