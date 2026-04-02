import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Tag, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { useCartStore } from '../../store/useStore';

/* Generate a stable order ID for the session */
const ORDER_ID = `#GEM-${Math.floor(Math.random() * 9000000) + 1000000}`;
const USER_EMAIL = 'james@example.com';

const Success = () => {
  const navigate = useNavigate();
  /* Use a ref snapshot so items persist even after cart cleared */
  const snapshotRef = useRef(useCartStore.getState().items);
  const items = snapshotRef.current;

  // Use the currency formatter to match the design style
  const fmt = (n: number) =>
    '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // If no items in snapshot, show fallback items matching the design
  const displayItems = items.length > 0 ? items : [
    {
      id: '1',
      name: 'Royal Blue Sapphire Ring',
      price: 1250,
      quantity: 1,
      images: ['https://images.unsplash.com/photo-1605100804763-247f679f4aa8?auto=format&fit=crop&q=80&w=400'],
      details: { weight: '5' }
    },
    {
      id: '2',
      name: 'Colombian Emerald Pendant',
      price: 890,
      quantity: 1,
      images: ['https://images.unsplash.com/photo-1599643478514-4a520281b3eb?auto=format&fit=crop&q=80&w=400'],
      details: { chain: "18''" }
    }
  ];

  const displayTotal = items.length > 0 ? total : 2140;

  return (
    <div className="flex min-h-screen flex-col bg-white pb-24 relative">
      {/* ─── Top Navbar ─── */}
      <div className="flex items-center justify-end px-6 pt-8 pb-2">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex h-8 w-8 items-center justify-center text-[#251622] hover:bg-black/5 rounded-full transition-colors"
        >
          <X size={20} className="text-[#555]" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center px-6 pt-4 max-w-[480px] mx-auto w-full">
        {/* ─── Check icon ─── */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, delay: 0.1 }}
          className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#fdf8ed]"
        >
          <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#dca841] shadow-sm">
            <Check size={28} strokeWidth={3.5} className="text-white mt-1" />
          </div>
        </motion.div>

        {/* ─── Success Messaging ─── */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 text-[20px] font-bold text-[#1a1a1a] tracking-tight"
        >
          Thank You for Your Order!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-3 max-w-[280px] text-center text-[12px] leading-relaxed text-[#7a6b63]"
        >
          Your payment was successful. A confirmation email has been sent to{' '}
          <span className="font-semibold text-[#555]">{USER_EMAIL}</span>.
        </motion.p>

        {/* Order ID Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-5 flex items-center gap-2 rounded-[20px] bg-[#f9f9f9] px-4 py-2 border border-[#f0f0f0]"
        >
          <Tag size={12} strokeWidth={2.5} className="text-[#dca841]" />
          <span className="text-[11px] font-bold tracking-wide text-[#333]">Order ID: {ORDER_ID}</span>
        </motion.div>

        {/* ─── Order Summary Box ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 w-full rounded-[16px] bg-[#fbfaf9] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#f4f2ee]"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[13px] font-bold text-[#251622]">Order Summary</h2>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#a39791]">{displayItems.length} items</span>
          </div>

          <div className="space-y-4">
            {displayItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="h-[54px] w-[54px] flex-shrink-0 overflow-hidden rounded-[8px] bg-[#111] shadow-sm">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-full w-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-[12px] font-bold text-[#251622] leading-snug">{item.name}</p>
                  <p className="text-[10px] font-medium text-[#9a8d86] mt-0.5">
                    {item.details.weight && `Size: ${item.details.weight} • `}
                    {item.details.chain && `Chain: ${item.details.chain} • `}
                    18k Gold
                  </p>
                  <p className="text-[12px] font-bold text-[#251622] mt-1.5">
                    {fmt(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total Divider */}
          <div className="mt-5 border-t border-[#eee] pt-5 flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#8d8078]">Total Paid</span>
            <span className="text-[16px] font-bold text-[#4a154b]">{fmt(displayTotal)}</span>
          </div>
        </motion.div>

        {/* ─── CTAs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 w-full space-y-3.5"
        >
          <button
            type="button"
            onClick={() => navigate('/collection')}
            className="flex w-full items-center justify-center rounded-full bg-[#4a154b] py-4 text-[13px] font-bold text-white shadow-md transition-all active:scale-[0.98]"
          >
            Continue Shopping
          </button>
          <button
            type="button"
            onClick={() => navigate('/account')}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#dca841] bg-white py-4 text-[13px] font-bold text-[#dca841] transition-all active:scale-[0.98]"
          >
            <Truck size={16} strokeWidth={2.5} className="mt-[-2px]" />
            Track Order
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
