import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Star, ShieldCheck, Video, Ruler, Truck, RefreshCw, ChevronRight, ChevronDown } from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { useCartStore, useUIStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../../components/product/ProductCard';

interface RingProduct extends Product {
  metalOptions?: string[];
}

// Generate ring sizes from 1 to 36
const RING_SIZES = Array.from({ length: 36 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}));

const RingDetail = ({ productSlug }: { productSlug: string }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<RingProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedRingSize, setSelectedRingSize] = useState('');
  const [activeTab, setActiveTab] = useState('Description');
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
          setProduct(data as RingProduct);
          setSelectedMetal(data.details.metal || '');
          setSelectedRingSize(data.details.size || '');

          // Fetch related rings
          const allProducts = await api.getProducts();
          setRelatedProducts(allProducts.filter(p => p.id !== data.id && p.category === 'Premium Rings').slice(0, 4));
        } else {
          navigate('/rings');
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
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4a154b] border-t-transparent" />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const images = product.images.length >= 3
    ? product.images
    : [product.images[0], product.images[0], product.images[0]];

  return (
    <div className="min-h-screen bg-[#fbf9f6] pb-28 md:bg-white md:pb-16 pt-4 md:pt-8 w-full">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">

        {/* Breadcrumbs */}
        <div className="hidden md:flex items-center text-[10px] uppercase tracking-wider text-[#888] mb-8 gap-2">
          <Link to="/" className="hover:text-[#4a154b]">Home</Link>
          <ChevronRight size={10} />
          <Link to="/rings" className="hover:text-[#4a154b]">Rings</Link>
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
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#d0a061]' : 'border-transparent opacity-60 hover:opacity-100'}`}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeImage]}
                  alt={product.name}
                  className="max-h-[80%] max-w-[80%] object-contain mix-blend-multiply"
                />
              </AnimatePresence>

              {/* Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-sm bg-[#d0a061] px-3 py-1 scale-90 origin-top-left md:scale-100">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white">Premium Ring</span>
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
                  <Star key={i} size={12} strokeWidth={0} className="fill-[#eab308]" />
                ))}
              </div>
              <span className="text-[11px] text-[#888]">(45 Reviews) • <span className="text-[#22c55e]">In Stock</span></span>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-100 mb-8" />

            {/* Ring Details */}
            <div className="mb-8 bg-[#fcfaf8] rounded-lg p-4 border border-[#f0ebd9]">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#555] mb-4">Ring Details</h3>
              <div className="grid grid-cols-2 gap-4 text-[12px]">
                {product.details.metal && (
                  <div>
                    <span className="text-[#888] block mb-1">Metal</span>
                    <span className="font-medium text-[#251622]">{product.details.metal}</span>
                  </div>
                )}
                {(selectedRingSize || product.details.size) && (
                  <div>
                    <span className="text-[#888] block mb-1">Ring Size</span>
                    <span className="font-medium text-[#251622]">Size {selectedRingSize || product.details.size || '—'}</span>
                  </div>
                )}
                {product.details.origin && (
                  <div>
                    <span className="text-[#888] block mb-1">Origin</span>
                    <span className="font-medium text-[#251622]">{product.details.origin}</span>
                  </div>
                )}
                {product.details.quality && (
                  <div>
                    <span className="text-[#888] block mb-1">Quality</span>
                    <span className="font-medium text-[#251622]">{product.details.quality}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Ring Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#555]">Select Ring Size</span>
                <button
                  onClick={() => navigate('/size-guide')}
                  className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#d0a061] hover:underline"
                >
                  <Ruler size={10} /> Size Guide
                </button>
              </div>
              <div className="relative">
                <select
                  value={selectedRingSize}
                  onChange={(e) => setSelectedRingSize(e.target.value)}
                  className="w-full appearance-none border border-gray-200 rounded py-3 px-4 text-[13px] text-[#444] focus:outline-none focus:border-[#d0a061] focus:ring-1 focus:ring-[#d0a061] bg-white"
                >
                  <option value="">Select Your Ring Size Here</option>
                  {RING_SIZES.map((size) => (
                    <option key={size.value} value={size.value}>
                      Size {size.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown size={14} />
                </div>
              </div>
              <p className="text-[10px] text-[#888] mt-3">Need help? <button onClick={() => navigate('/size-guide')} className="text-[#d0a061] font-medium hover:underline">View size guide</button></p>
            </div>

            {/* Price Section */}
            <div className="w-full h-[1px] bg-gray-100 mb-6" />

            <div className="flex items-end gap-3 mb-2">
              <span className="text-[28px] md:text-[32px] font-bold text-[#d0a061] leading-none">
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
            <p className="text-[10px] text-[#888] mb-6">Price inclusive of all taxes. Free shipping worldwide.</p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#d0a061] hover:bg-[#b88c50] text-white text-[13px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button className="w-full py-3.5 bg-white border border-[#ead9c5] text-[#4a154b] text-[12px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 hover:bg-[#fdf8f2]">
                <Video size={16} /> Book a Live Video Call
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-100 py-6 mb-4">
              <div className="flex flex-col items-center justify-center text-center gap-2">
                <ShieldCheck size={20} className="text-[#22c55e]" strokeWidth={1.5} />
                <span className="text-[9px] uppercase tracking-wider text-[#666] font-bold">100% Certified</span>
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
            {['Description', 'Ring Care', 'Certification'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[13px] whitespace-nowrap transition-colors border-b-2 font-medium ${
                  activeTab === tab ? 'border-[#4a154b] text-[#4a154b]' : 'border-transparent text-[#888] hover:text-[#4a154b]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            {activeTab === 'Description' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-10">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-serif text-[#251622] mb-4">About this Ring</h3>
                  <p className="text-[13px] leading-relaxed text-[#555] mb-4 whitespace-pre-line">
                    {product.description || "This exquisite ring is meticulously crafted by master artisans, combining traditional techniques with contemporary aesthetics. Each piece is unique and represents the finest in jewelry craftsmanship."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                  {/* Details Box */}
                  <div className="bg-[#fcfaf8] rounded-xl p-6 border border-[#f0ebd9]">
                    <div className="flex items-center gap-2 mb-6">
                      <ShieldCheck size={18} className="text-[#4a154b]" />
                      <h4 className="font-bold text-[13px] text-[#251622]">Ring Specifications</h4>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(product.details).map(([k, v]) => (
                        <div key={k} className="flex justify-between items-center text-[12px]">
                          <span className="text-[#888] capitalize">{k}</span>
                          <span className="font-medium text-[#251622]">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Design Info Box */}
                  <div className="bg-[#fcfaf8] rounded-xl p-6 border border-[#f0ebd9]">
                    <div className="flex items-center gap-2 mb-6">
                      <Star size={18} className="text-[#d0a061]" />
                      <h4 className="font-bold text-[13px] text-[#251622]">Why Choose This Ring</h4>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Master artisan craftsmanship',
                        'Premium quality materials',
                        '100% authentic gemstones',
                        'Lifetime warranty & care'
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12px] text-[#555]">
                          <div className="min-w-[14px] w-[14px] h-[14px] mt-0.5 rounded-full bg-[#f4e8d3] flex items-center justify-center">
                            <div className="w-[6px] h-[6px] rounded-full bg-[#d0a061]" />
                          </div>
                          <span className="leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Ring Care' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] text-[#555]">
                <div className="max-w-3xl">
                  <h3 className="text-lg font-serif text-[#251622] mb-4">How to Care for Your Ring</h3>
                  <ul className="space-y-3">
                    <li>• Clean regularly with mild soap and warm water using a soft brush</li>
                    <li>• Remove before swimming, bathing, or exercising</li>
                    <li>• Store in a cool, dry place when not wearing</li>
                    <li>• Have professionally cleaned and polished annually</li>
                    <li>• Check settings regularly for any loose stones</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'Certification' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] text-[#555]">
                <div className="max-w-3xl">
                  <h3 className="text-lg font-serif text-[#251622] mb-4">Certification & Authenticity</h3>
                  <p className="mb-4">All our rings are certified for quality and authenticity. Certificates are provided with every purchase and include:</p>
                  <ul className="space-y-2">
                    <li>• Detailed gemstone analysis and specifications</li>
                    <li>• Metal purity certification</li>
                    <li>• Lifetime authenticity guarantee</li>
                    <li>• Professional valuation for insurance purposes</li>
                  </ul>
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
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#d0a061] uppercase mb-1">YOU MAY ALSO LIKE</p>
                <h3 className="text-2xl md:text-3xl font-serif text-[#251622]">Other Rings</h3>
              </div>
              <Link to="/rings" className="text-[11px] font-bold uppercase tracking-wider text-[#4a154b] hover:text-[#d0a061] transition-colors flex items-center gap-1">
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
          className="flex items-center gap-2.5 rounded-full bg-[#d0a061] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-white shadow-md active:scale-95"
        >
          <ShoppingBag size={16} strokeWidth={2.5} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RingDetail;
