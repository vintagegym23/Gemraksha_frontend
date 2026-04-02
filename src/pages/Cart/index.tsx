import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ArrowRight, Tag, Gem, Shield, Truck } from 'lucide-react';
import { useCartStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';

/* ─── Confetti ─── */
interface Petal {
  id: number; x: number; delay: number; duration: number; size: number;
  color: string; startRotate: number; endRotate: number; swayAmps: number[]; shapeIdx: number;
}
const PETAL_COLORS = ['#f9c8d9','#f7b2cb','#fce4ec','#e8c8f0','#d4a9e8','#f0ddf7','#fde68a','#fcd34d','#fbcfe8','#c59d5f','#ecd0a1'];
const PETAL_SHAPES = [
  'M0,-10 C5,-10 10,-5 10,0 C10,5 5,10 0,10 C-5,10 -10,5 -10,0 C-10,-5 -5,-10 0,-10',
  'M0,-8 C4,-12 12,-4 8,0 C12,4 4,12 0,8 C-4,12 -12,4 -8,0 C-12,-4 -4,-12 0,-8',
  'M0,-12 C6,-8 8,0 4,8 C0,12 -6,8 -8,0 C-6,-8 0,-12 0,-12',
];
function rnd(a: number, b: number) { return a + Math.random() * (b - a); }
function makePetals(n: number): Petal[] {
  return Array.from({ length: n }, (_, i) => {
    const amp = rnd(25, 55);
    return { id: i, x: rnd(0,100), delay: rnd(0,2.2), duration: rnd(3,5.5), size: rnd(10,20),
      color: PETAL_COLORS[Math.floor(Math.random()*PETAL_COLORS.length)],
      startRotate: rnd(0,360), endRotate: rnd(0,360)*(Math.random()>0.5?1:-1)+720,
      swayAmps: [0, amp, -amp*0.6, amp*0.3, 0], shapeIdx: i % PETAL_SHAPES.length };
  });
}
const PetalEl: React.FC<{ p: Petal }> = ({ p }) => (
  <motion.div className="pointer-events-none fixed top-0 z-[9999]" style={{ left: `${p.x}vw` }}
    initial={{ y: -p.size-10, rotate: p.startRotate, opacity: 1, x: 0 }}
    animate={{ y:'108vh', rotate: p.endRotate, x: p.swayAmps, opacity:[1,1,0.9,0.5,0] }}
    transition={{ duration:p.duration, delay:p.delay, ease:'easeIn',
      x:{duration:p.duration,delay:p.delay,ease:'easeInOut',times:[0,0.3,0.6,0.8,1]},
      opacity:{duration:p.duration,delay:p.delay,times:[0,0.4,0.65,0.85,1]} }}>
    <svg width={p.size} height={p.size} viewBox="-14 -14 28 28" fill="none">
      <path d={PETAL_SHAPES[p.shapeIdx]} fill={p.color} opacity={0.9}/>
    </svg>
  </motion.div>
);
const FlowerConfetti: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const petals = useMemo(() => makePetals(45), []);
  const maxMs = Math.max(...petals.map(p => (p.delay+p.duration)*1000));
  useEffect(() => { const t = setTimeout(onDone, maxMs+400); return () => clearTimeout(t); }, [maxMs, onDone]);
  return <>{petals.map(p => <PetalEl key={p.id} p={p}/>)}</>;
};

/* ─── Cart Page ─── */
const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(() => !!(location.state as any)?.confetti);

  useEffect(() => {
    if ((location.state as any)?.confetti) window.history.replaceState({}, '');
  }, []);

  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const subtotal = totalPrice();
  const discount = promoApplied ? Math.round(subtotal * 0.05) : 0;
  const finalTotal = subtotal - discount;

  /* ─── Empty state ─── */
  if (items.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 text-center bg-[#f8f4ee]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#f3edf5] to-[#e8d8f0] shadow-[0_12px_40px_rgba(74,21,75,0.12)]"
        >
          <ShoppingBag size={44} className="text-[#4a154b]" strokeWidth={1.3} />
        </motion.div>
        <div>
          <h2 className="font-serif text-3xl text-[#251622]">Your Cart is Empty</h2>
          <p className="mt-2 text-[14px] text-[#999] leading-relaxed">Discover rare gemstones crafted for your destiny.</p>
        </div>
        <button type="button" onClick={() => navigate('/collection')}
          className="rounded-full bg-gradient-to-r from-[#4a154b] to-[#6b2070] px-12 py-3.5 text-[12px] font-bold uppercase tracking-[0.25em] text-white shadow-[0_8px_24px_rgba(74,21,75,0.35)] transition-all hover:shadow-[0_12px_32px_rgba(74,21,75,0.45)] hover:scale-[1.03]">
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f4ee]">
      {showConfetti && <FlowerConfetti onDone={() => setShowConfetti(false)} />}

      {/* ─── HEADER ─── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#ede8f0] px-5 py-4 flex items-center justify-between shadow-[0_2px_16px_rgba(74,21,75,0.06)]">
        <button type="button" onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3edf5] text-[#4a154b] transition-all hover:bg-[#e8d8f0] active:scale-90">
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>
        <div className="text-center">
          <h1 className="font-serif text-[20px] tracking-wide text-[#4a154b]">Your Cart</h1>
          <p className="text-[11px] text-[#c59d5f] font-medium tracking-[0.12em]">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="h-9 w-9" />
      </div>

      {/* ─── BODY ─── */}
      <div className="max-w-[1100px] mx-auto px-4 py-8 md:px-8 md:grid md:grid-cols-[1fr_380px] md:gap-8 md:items-start">

        {/* LEFT: Cart Items */}
        <div>
          {/* Trust badges */}
          <div className="hidden md:flex gap-6 mb-6 p-4 rounded-2xl bg-white border border-[#f0eaf5] shadow-[0_2px_12px_rgba(74,21,75,0.04)]">
            {[
              { icon: Shield, label: 'GIA & IGI Certified' },
              { icon: Truck, label: 'Free Insured Shipping' },
              { icon: Gem, label: '100% Natural Stones' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8d7a8f]">
                <Icon size={14} className="text-[#c59d5f]" strokeWidth={1.8} />
                {label}
              </div>
            ))}
          </div>

          {/* Items list */}
          <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(74,21,75,0.06)] border border-[#f0eaf5] overflow-hidden">
            <AnimatePresence>
              {items.map((item, idx) => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60, height: 0, paddingTop: 0, paddingBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-4 px-5 py-5 ${idx < items.length-1 ? 'border-b border-[#f5f0f8]' : ''}`}
                >
                  {/* Image */}
                  <Link to={`/product/${item.slug}`}
                    className="h-[88px] w-[88px] flex-shrink-0 overflow-hidden rounded-[16px] bg-gradient-to-br from-[#1a1a2e] to-[#2a1a3e] shadow-[0_4px_16px_rgba(0,0,0,0.18)]">
                    <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-[16px] font-semibold leading-snug text-[#251622] truncate">{item.name}</p>
                        <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-[#c59d5f] font-medium">{item.category}</p>
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[#d0c8c0] hover:text-red-400 hover:bg-red-50 transition-all active:scale-90 flex-shrink-0">
                        <Trash2 size={15} strokeWidth={1.8} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <p className="text-[17px] font-bold text-[#4a154b]">{fmt(item.price * item.quantity)}</p>
                      <div className="flex items-center gap-1 rounded-full bg-[#f5f0f8] p-0.5">
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity-1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[#4a154b] hover:bg-white transition-all active:scale-90">
                          <Minus size={11} strokeWidth={3} />
                        </button>
                        <span className="w-7 text-center text-[13px] font-bold text-[#251622]">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity+1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4a154b] text-white hover:bg-[#6b2070] transition-all active:scale-90">
                          <Plus size={11} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Continue shopping */}
          <button type="button" onClick={() => navigate('/collection')}
            className="mt-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#8d7a8f] hover:text-[#4a154b] transition-colors">
            <ArrowLeft size={14} strokeWidth={2.5} />
            Continue Shopping
          </button>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="mt-6 md:mt-0 space-y-4">

          {/* Promo code */}
          <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(74,21,75,0.06)] border border-[#f0eaf5] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={14} className="text-[#c59d5f]" strokeWidth={2} />
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#8d7a8f]">Promo Code</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[#ede8f0] bg-[#faf8fc] px-4 py-3">
              <input type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)}
                placeholder="Enter code (e.g. GEM5)"
                className="flex-1 bg-transparent text-[13px] text-[#251622] placeholder:text-[#c0b8c0] focus:outline-none"/>
              <button type="button" onClick={() => promoCode && setPromoApplied(true)}
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#4a154b] hover:text-[#c59d5f] transition-colors">
                APPLY
              </button>
            </div>
            {promoApplied && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-emerald-600">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px]">✓</span>
                5% discount applied!
              </motion.p>
            )}
          </div>

          {/* Summary card */}
          <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(74,21,75,0.06)] border border-[#f0eaf5] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f5f0f8]">
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#8d7a8f]">Order Summary</p>
            </div>
            <div className="px-5 py-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#9d8fa0]">Subtotal ({items.length} item{items.length!==1?'s':''})</span>
                <span className="text-[13px] font-semibold text-[#251622]">{fmt(subtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-emerald-600">Discount (5%)</span>
                  <span className="text-[13px] font-semibold text-emerald-600">−{fmt(discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#9d8fa0]">Shipping</span>
                <span className="text-[12px] font-medium text-[#c59d5f]">Free · Insured</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#e8d8f0] to-transparent" />
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-[#251622]">Total</span>
                <span className="text-[22px] font-bold text-[#4a154b] tracking-tight">{fmt(finalTotal)}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="px-5 pb-5">
              <button type="button" onClick={() => navigate('/checkout')}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#4a154b] to-[#6b2070] py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(74,21,75,0.35)] transition-all hover:shadow-[0_12px_32px_rgba(74,21,75,0.45)] hover:scale-[1.02] active:scale-[0.98]">
                Proceed to Checkout
                <ArrowRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
              </button>
              <div className="mt-3 flex items-center justify-center gap-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#c0b0c5]">🔒 Secure · Encrypted · Trusted</span>
              </div>
            </div>
          </div>

          {/* Assurance strip */}
          <div className="rounded-2xl border border-[#f0eaf5] bg-gradient-to-br from-[#faf8fc] to-[#f5f0f8] px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c59d5f] mb-3">Why Choose Gemraksha</p>
            <div className="space-y-2.5">
              {[
                { icon: '💎', text: 'GIA & IGI certified natural gemstones' },
                { icon: '🚚', text: 'Free insured shipping across India' },
                { icon: '↩️', text: '7-day easy return policy' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <span className="text-[14px]">{icon}</span>
                  <span className="text-[12px] text-[#7d6a80] leading-snug">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE STICKY BAR ─── */}
      <div className="md:hidden fixed bottom-[64px] left-0 right-0 z-50 px-4 py-3 bg-[#f8f4ee]/90 backdrop-blur-md border-t border-[#ede8f0]">
        <button type="button" onClick={() => navigate('/checkout')}
          className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-[#4a154b] to-[#6b2070] px-6 py-4 text-white shadow-[0_8px_24px_rgba(74,21,75,0.35)] transition-all active:scale-[0.98]">
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/70">Total</p>
            <p className="text-[16px] font-bold">{fmt(finalTotal)}</p>
          </div>
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em]">
            Checkout <ArrowRight size={16} strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Cart;
