import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Truck, RotateCcw, Heart, Share2, Plus, Minus, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { useCartStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { motion } from 'motion/react';

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await api.getProductBySlug(slug);
        if (data) {
          setProduct(data);
        } else {
          navigate('/collection');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, navigate]);

  if (loading || !product) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
        <ChevronRight size={12} />
        <button onClick={() => navigate('/collection')} className="hover:text-primary transition-colors">Collection</button>
        <ChevronRight size={12} />
        <span className="text-primary font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[4/5] overflow-hidden rounded-sm luxury-shadow bg-gray-50"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-sm overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                <img
                  src={product.images[0]}
                  alt={`${product.name} view ${i + 1}`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{product.category}</p>
                <h1 className="text-4xl md:text-5xl font-serif font-bold">{product.name}</h1>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                  <Heart size={20} className="text-gray-400" />
                </button>
                <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                  <Share2 size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
            <p className="text-gray-500 font-light leading-relaxed">{product.description}</p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-y-6 py-8 border-y border-gray-100">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Origin</p>
              <p className="text-sm font-bold uppercase tracking-widest">{product.details.origin}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Weight</p>
              <p className="text-sm font-bold uppercase tracking-widest">{product.details.weight}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Treatment</p>
              <p className="text-sm font-bold uppercase tracking-widest">{product.details.treatment}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Shape</p>
              <p className="text-sm font-bold uppercase tracking-widest">{product.details.shape}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center border border-gray-200 rounded-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-400 italic">Only {product.stock} pieces available</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-grow"
                onClick={() => {
                  for(let i=0; i<quantity; i++) addItem(product);
                }}
              >
                Add to Collection
              </Button>
              <Button size="lg" variant="gold" className="flex-grow">
                Buy Now
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <Shield className="text-gold" size={24} />
              <span className="text-[10px] uppercase font-bold tracking-widest">Certified</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Truck className="text-gold" size={24} />
              <span className="text-[10px] uppercase font-bold tracking-widest">Insured</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <RotateCcw className="text-gold" size={24} />
              <span className="text-[10px] uppercase font-bold tracking-widest">30-Day Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
