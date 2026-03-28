import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../../services/api';
import { Product, Category } from '../../types';
import { ProductCard } from '../../components/product/ProductCard';
import { Button } from '../../components/ui/Button';
import hero from '../../images/hero.png';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="Luxury Gemstones"
            className="h-full w-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl space-y-6"
          >
            <p className="text-gold font-bold uppercase tracking-[0.3em] text-sm">
              The Art of Rare Brilliance
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight">
              Timeless <br />
              <span className="italic text-gold">Treasures</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light max-w-lg leading-relaxed">
              Discover a curated collection of the world's most exquisite gemstones, ethically sourced and masterfully cut.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-gold hover:bg-gold/90 border-none">
                <Link to="/collection">Explore Collection</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gray-100">
          <div className="flex flex-col items-center text-center space-y-3">
            <ShieldCheck className="text-gold" size={32} />
            <h4 className="text-xs font-bold uppercase tracking-widest">Certified Quality</h4>
            <p className="text-xs text-gray-500">GIA & IGI Certified</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <Truck className="text-gold" size={32} />
            <h4 className="text-xs font-bold uppercase tracking-widest">Secure Shipping</h4>
            <p className="text-xs text-gray-500">Insured Worldwide Delivery</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <RotateCcw className="text-gold" size={32} />
            <h4 className="text-xs font-bold uppercase tracking-widest">Easy Returns</h4>
            <p className="text-xs text-gray-500">30-Day Money Back</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <Star className="text-gold" size={32} />
            <h4 className="text-xs font-bold uppercase tracking-widest">Expert Support</h4>
            <p className="text-xs text-gray-500">24/7 Gemologist Access</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <p className="text-gold font-bold uppercase tracking-widest text-xs">Curated Selection</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Shop by Category</h2>
          </div>
          <Link to="/collection" className="text-sm font-bold uppercase tracking-widest text-primary flex items-center hover:text-gold transition-colors">
            View All Categories <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/collection?category=${category.slug}`}
              className="group relative aspect-square overflow-hidden rounded-sm luxury-shadow"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl md:text-2xl font-serif font-bold tracking-widest uppercase">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <p className="text-gold font-bold uppercase tracking-widest text-xs">New Arrivals</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Featured Gemstones</h2>
            </div>
            <Link to="/collection" className="text-sm font-bold uppercase tracking-widest text-primary flex items-center hover:text-gold transition-colors">
              Explore All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-primary p-8 md:p-16 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Join the Elite Circle</h2>
              <p className="text-gray-300 font-light">
                Subscribe to receive exclusive access to new arrivals, private sales, and gemological insights.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-grow h-14 px-6 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-gold transition-colors rounded-sm"
              />
              <Button size="lg" className="bg-gold hover:bg-gold/90 border-none sm:w-auto">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
