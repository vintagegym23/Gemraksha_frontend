import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Star, ShieldCheck, Video, Truck, RefreshCw, ChevronRight, Zap } from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { useCartStore, useUIStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../../components/product/ProductCard';

const RudrakshaDetail = ({ productSlug }: { productSlug: string }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Spiritual Benefits');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const addItem = useCartStore((state) => state.addItem);
  const addToast = useUIStore((state) => state.addToast);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    addToast(`${product.name} added to cart`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productSlug) return;
      setLoading(true);
      try {
        const data = await api.getProductBySlug(productSlug);
        if (data) {
          setProduct(data);

          // Fetch related rudraksha
          const allProducts = await api.getProducts();
          setRelatedProducts(allProducts.filter(p => p.id !== data.id && p.category === 'Rudraksha').slice(0, 4));
        } else {
          navigate('/rudraksha');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productSlug, navigate]);

  if (loading || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ffcc00] border-t-transparent" />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const images = product.images.length >= 3
    ? product.images
    : [product.images[0], product.images[0], product.images[0]];

  // Extract mukhi number from product name or details
  const mukhiMatch = product.name.match(/(\d+)\s*(?:mukhi|Mukhi)/i) || product.name.match(/gauri|ganesh/i);
  const mukhiInfo = mukhiMatch ? mukhiMatch[0] : '';

  return (
    <div className="min-h-screen bg-[#f7f7f7]/80 pb-28 md:bg-white md:pb-16 pt-4 md:pt-8 w-full ring-1 ring-gray-100/50">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">

        {/* Breadcrumbs */}
        <div className="hidden md:flex items-center text-[10px] uppercase tracking-wider text-[#888] mb-8 gap-2">
          <Link to="/" className="hover:text-[#4a154b]">Home</Link>
          <ChevronRight size={10} />
          <Link to="/rudraksha" className="hover:text-[#4a154b]">Rudraksha</Link>
          <ChevronRight size={10} />
          <span>{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-0 md:gap-16">
          {/* ─── LEFT: IMAGE GALLERY ─── */}
          <div className="w-full md:w-[50%] flex flex-col-reverse md:flex-row gap-4 mb-6 md:mb-0">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-20">
               {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#ffcc00]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
               ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-square md:aspect-auto md:h-[600px] bg-[#f9f9f9] md:bg-transparent rounded-none md:rounded-xl overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeImage]}
                  alt={product.name}
                  className="max-h-[80%] max-w-[80%] object-contain mix-blend-multiply"
                />
              </AnimatePresence>

              {/* Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-sm bg-[#ffcc00] px-3 py-1 scale-90 origin-top-left md:scale-100">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black">Sacred Bead</span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: PRODUCT INFO ─── */}
          <div className="w-full md:w-[45%] flex flex-col px-4 md:px-0 mt-4 md:mt-0">
            <h1 className="font-serif text-[24px] md:text-4xl text-[#251622] leading-tight mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} strokeWidth={0} className="fill-[#ffcc00]" />
                ))}
              </div>
              <span className="text-[11px] text-[#888]">(156 Reviews) • <span className="text-[#22c55e]">In Stock</span></span>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-100 mb-6" />

            {/* Mukhi Information & Properties */}
            <div className="mb-8 bg-gradient-to-br from-[#fff9f0] to-[#fcfaf8] rounded-lg p-5 border border-[#f0ebd9]">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={16} className="text-[#ffcc00]" />
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#4a154b]">Spiritual Significance</h3>
              </div>
              <p className="text-[13px] text-[#555] leading-relaxed mb-4">
                {product.description || "A sacred bead revered in Hindu and Buddhist traditions for its powerful spiritual properties and connection to Lord Shiva. Each Rudraksha carries unique vibrational energy."}
              </p>
              {product.details.mukhi && (
                <div className="flex items-center gap-3 pt-3 border-t border-[#e8dcc8]">
                  <span className="text-[11px] font-bold text-[#4a154b]">MUKHI TYPE:</span>
                  <span className="text-[13px] font-medium text-[#d0a061]">{product.details.mukhi}</span>
                </div>
              )}
            </div>

            {/* Key Benefits */}
            <div className="mb-8">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#555] mb-4">Key Benefits</span>
              <div className="space-y-2">
                {[
                  'Enhances spiritual awakening',
                  'Promotes mental clarity & focus',
                  'Protects from negative energy',
                  'Strengthens meditation practice'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 text-[12px] text-[#666]">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#ffcc00] mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Section */}
            <div className="w-full h-[1px] bg-gray-100 mb-6" />

            <div className="flex items-end gap-3 mb-2">
              <span className="text-[28px] md:text-[32px] font-bold text-[#ffaa00] leading-none">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-[14px] text-gray-400 line-through mb-1">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discount && (
                <span className="rounded-sm bg-[#e8f5e9] text-[#22c55e] px-2 py-0.5 text-[10px] font-bold mb-1.5">
                  Save {discount}%
                </span>
              )}
            </div>
            <p className="text-[10px] text-[#888] mb-6">Price inclusive of all taxes. Free insured shipping worldwide.</p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#ffcc00] hover:bg-[#e6b800] text-black text-[13px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button className="w-full py-3.5 bg-white border border-[#ffcc00] text-[#c8a000] text-[12px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 hover:bg-[#fffaf0]">
                <Video size={16} /> Get Consultation
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-100 py-6 mb-4">
              <div className="flex flex-col items-center justify-center text-center gap-2">
                <ShieldCheck size={20} className="text-[#22c55e]" strokeWidth={1.5} />
                <span className="text-[9px] uppercase tracking-wider text-[#666] font-bold">Authentic Beads</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2">
                <Truck size={20} className="text-[#3b82f6]" strokeWidth={1.5} />
                <span className="text-[9px] uppercase tracking-wider text-[#666] font-bold">Insured Ship</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2">
                <RefreshCw size={20} className="text-[#a855f7]" strokeWidth={1.5} />
                <span className="text-[9px] uppercase tracking-wider text-[#666] font-bold">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM SECTION: TABS & DETAILS ─── */}
        <div className="mt-12 md:mt-20 border-t border-gray-200 pt-8 pb-12 px-4 md:px-0">
          <div className="flex overflow-x-auto no-scrollbar gap-8 border-b border-gray-200 mb-8">
            {['Spiritual Benefits', 'Wearing Guidelines', 'Authenticity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[13px] whitespace-nowrap transition-colors border-b-2 font-medium ${
                  activeTab === tab ? 'border-[#ffcc00] text-[#4a154b]' : 'border-transparent text-[#888] hover:text-[#4a154b]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            {activeTab === 'Spiritual Benefits' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-10">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-serif text-[#251622] mb-4">Spiritual Power & Benefits</h3>
                  <p className="text-[13px] leading-relaxed text-[#555] mb-6">
                    The Rudraksha bead is one of the most powerful tools for spiritual growth. Mentioned in ancient Hindu scriptures, it is believed to be the tears of Lord Shiva, making it inherently sacred and powerful.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                  {/* Benefits Box */}
                  <div className="bg-[#fcfaf8] rounded-xl p-6 border border-[#f0ebd9]">
                    <div className="flex items-center gap-2 mb-6">
                      <Zap size={18} className="text-[#ffcc00]" />
                      <h4 className="font-bold text-[13px] text-[#251622]">Primary Benefits</h4>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Spiritual awakening & enlightenment',
                        'Enhanced meditation & concentration',
                        'Protection from negative forces',
                        'Physical & mental wellness',
                        'Divine connection & inner peace'
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12px] text-[#555]">
                          <div className="min-w-[14px] w-[14px] h-[14px] mt-0.5 rounded-full bg-[#ffeaa7] flex items-center justify-center">
                            <div className="w-[5px] h-[5px] rounded-full bg-[#ffcc00]" />
                          </div>
                          <span className="leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Details Box */}
                  <div className="bg-[#fcfaf8] rounded-xl p-6 border border-[#f0ebd9]">
                    <div className="flex items-center gap-2 mb-6">
                      <Star size={18} className="text-[#ffcc00]" />
                      <h4 className="font-bold text-[13px] text-[#251622]">Bead Details</h4>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(product.details).map(([k, v]) => (
                        v && <div key={k} className="flex justify-between items-center text-[12px]">
                          <span className="text-[#888] capitalize">{k}</span>
                          <span className="font-medium text-[#251622]">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Wearing Guidelines' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] text-[#555]">
                <div className="max-w-3xl">
                  <h3 className="text-lg font-serif text-[#251622] mb-6">How to Wear Your Rudraksha</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-[#251622] mb-3">Best Practices:</h4>
                      <ul className="space-y-2">
                        <li>• Wear as a mala (rosary) around the neck or wrist</li>
                        <li>• Ideally wear touching the skin for maximum benefits</li>
                        <li>• Can be worn daily for continuous spiritual support</li>
                        <li>• Often worn during meditation for enhanced experience</li>
                        <li>• Remove before bathing and sleeping</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#251622] mb-3">Energy Activation:</h4>
                      <ul className="space-y-2">
                        <li>• Hold the beads and set a clear spiritual intention</li>
                        <li>• Chant mantras (like "Om Namah Shivaya") while wearing</li>
                        <li>• Use during meditation for deeper spiritual practice</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Authenticity' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] text-[#555]">
                <div className="max-w-3xl">
                  <h3 className="text-lg font-serif text-[#251622] mb-6">Authenticity & Quality Assurance</h3>

                  <div className="space-y-4 mb-6">
                    <p><strong>Our Sourcing Standards:</strong></p>
                    <ul className="space-y-2">
                      <li>• Directly sourced from Nepal and Indonesia (most authentic origins)</li>
                      <li>• Verified with expert authenticity checks</li>
                      <li>• Each bead examined for natural characteristics</li>
                      <li>• No artificially dyed or treated beads</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <p><strong>Quality Levels:</strong></p>
                    <ul className="space-y-2">
                      <li>• <strong>Premium Grade:</strong> Perfect shape, clear mukhis, excellent patina</li>
                      <li>• <strong>Standard Grade:</strong> Good condition, minor natural variations</li>
                      <li>• <strong>Regular Grade:</strong> Functional, more natural variations</li>
                    </ul>
                  </div>

                  <div className="mt-6 p-4 bg-[#fef9e7] border border-[#ffcc00] rounded-lg">
                    <p className="text-[12px] text-[#4a154b]">
                      <strong>Certificate of Authenticity:</strong> Each purchase comes with a detailed authenticity certificate confirming the origin, mukhi count, and quality grade of your Rudraksha.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ─── RELATED PRODUCTS ─── */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 md:mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-end justify-between mb-8 px-4 md:px-0">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#ffcc00] uppercase mb-1">YOU MAY ALSO LIKE</p>
                <h3 className="text-2xl md:text-3xl font-serif text-[#251622]">Other Sacred Beads</h3>
              </div>
              <Link to="/rudraksha" className="text-[11px] font-bold uppercase tracking-wider text-[#4a154b] hover:text-[#ffcc00] transition-colors flex items-center gap-1">
                View All <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-0">
              {relatedProducts.map(relProduct => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-[64px] left-0 right-0 z-50 flex items-center justify-between border-t border-gray-100 bg-white px-5 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
        <div>
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#aaa]">Total</p>
          <p className="text-[17px] font-bold text-[#251622]">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2.5 rounded-full bg-[#ffcc00] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-black shadow-md active:scale-95"
        >
          <ShoppingBag size={16} strokeWidth={2.5} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RudrakshaDetail;
