import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/useStore';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-white luxury-shadow rounded-sm overflow-hidden"
    >
      <Link to={`/product/${product.slug}`} className="block aspect-[4/5] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </Link>
      
      <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
        <Heart size={18} />
      </button>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold">
              {product.category}
            </p>
            <h3 className="text-sm font-serif font-medium group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <button 
            onClick={() => addItem(product)}
            className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
