import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useStore';
import { ArrowLeft, Lock, CreditCard, Banknote, ShieldCheck } from 'lucide-react';

const METAL_RATE_PER_GRAM = 5600; // approx gold rate
const MAKING_CHARGES_RATE = 0.036;
const GST_RATE = 0.03;

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [form, setForm] = useState({
    name: '',
    street: '',
    city: '',
    postal: '',
  });

  const fmt = (n: number) =>
    '₹' + Math.round(n).toLocaleString('en-IN');

  const stone = totalPrice();
  const metalWeight = items.reduce((acc) => acc + 4.2, 0);
  const metalCost = metalWeight * METAL_RATE_PER_GRAM;
  const making = stone * MAKING_CHARGES_RATE;
  const tax = (stone + metalCost + making) * GST_RATE;
  const discount = couponApplied ? 0 : 0;
  const grandTotal = stone + metalCost + making + tax - discount;

  const ORDER_ID = `#GEM-${Math.floor(Math.random() * 900000) + 100000}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Simulate payment failure to display the requested page
      const success = false;
      if (success) {
        clearCart();
        navigate('/success', { replace: true });
      } else {
        navigate(
          `/payment-failed?amount=${Math.round(grandTotal).toLocaleString('en-IN')}&order=${encodeURIComponent(ORDER_ID)}`,
          { replace: true }
        );
      }
    }, 1800);
  };

  if (items.length === 0 && !loading) {
    navigate('/cart', { replace: true });
    return null;
  }

  const firstItem = items[0];

  return (
    <div className="min-h-screen bg-[#f8f4ee] pb-32">
      {/* ─── HEADER ─── */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3edf5] text-[#4a154b]"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>
        <h1 className="font-sans text-[17px] font-semibold text-[#251622]">Checkout</h1>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3edf5] text-[#4a154b]">
          <Lock size={16} strokeWidth={2} />
        </div>
      </div>

      {/* ─── PROGRESS STEPS ─── */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between max-w-xs mx-auto">
          {[
            { n: 1, label: 'Cart' },
            { n: 2, label: 'Checkout' },
            { n: 3, label: 'Confirm' },
          ].map(({ n, label }, i, arr) => {
            const done = n <= 2;
            return (
              <React.Fragment key={n}>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold ${
                      done ? 'bg-[#4a154b] text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {n}
                  </div>
                  <span className={`text-[10px] font-semibold ${done ? 'text-[#4a154b]' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`h-[2px] flex-1 mx-2 rounded-full mb-4 ${n < 2 ? 'bg-[#4a154b]' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <form id="checkout-form" onSubmit={handleSubmit}>
        {/* ─── SHIPPING ADDRESS ─── */}
        <div className="mx-4 mt-5 rounded-[20px] bg-white px-5 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-bold text-[#251622]">Shipping Address</h2>
            <button
              type="button"
              className="text-[12px] font-bold text-[#4a154b] underline-offset-2 hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#aaa]">
                Full Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Aditya Verma"
                className="w-full rounded-[10px] border border-[#e0d5cc] bg-[#fafafa] px-4 py-3 text-[13px] text-[#251622] placeholder:text-[#ccc] focus:border-[#4a154b] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#aaa]">
                Street Address
              </label>
              <input
                required
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                placeholder="12/B, Palm Meadows, Whitefield"
                className="w-full rounded-[10px] border border-[#e0d5cc] bg-[#fafafa] px-4 py-3 text-[13px] text-[#251622] placeholder:text-[#ccc] focus:border-[#4a154b] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#aaa]">City</label>
                <input
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Bengaluru"
                  className="w-full rounded-[10px] border border-[#e0d5cc] bg-[#fafafa] px-4 py-3 text-[13px] text-[#251622] placeholder:text-[#ccc] focus:border-[#4a154b] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#aaa]">Postal Code</label>
                <input
                  required
                  value={form.postal}
                  onChange={(e) => setForm({ ...form, postal: e.target.value })}
                  placeholder="560068"
                  className="w-full rounded-[10px] border border-[#e0d5cc] bg-[#fafafa] px-4 py-3 text-[13px] text-[#251622] placeholder:text-[#ccc] focus:border-[#4a154b] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── COUPON CODE ─── */}
        <div className="mx-4 mt-3 flex items-center justify-between rounded-[14px] border border-[#e6ddd6] bg-white px-4 py-3.5">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter Coupon Code"
            className="flex-1 bg-transparent text-[13px] text-[#251622] placeholder:text-[#bbb] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => coupon && setCouponApplied(true)}
            className="ml-3 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4a154b]"
          >
            APPLY
          </button>
        </div>
        {couponApplied && (
          <p className="mt-1.5 px-6 text-[11px] font-medium text-green-600">✓ Coupon applied</p>
        )}

        {/* ─── PAYMENT METHOD ─── */}
        <div className="mx-4 mt-4 rounded-[20px] bg-white px-5 py-5">
          <h2 className="mb-4 text-[15px] font-bold text-[#251622]">Payment Method</h2>

          {/* Card payment */}
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex w-full items-center gap-3 rounded-[14px] border-2 px-4 py-3.5 transition-all ${
              paymentMethod === 'card' ? 'border-[#4a154b]' : 'border-gray-100'
            }`}
          >
            <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 flex-shrink-0 ${
              paymentMethod === 'card' ? 'border-[#4a154b]' : 'border-gray-300'
            }`}>
              {paymentMethod === 'card' && <div className="h-2.5 w-2.5 rounded-full bg-[#4a154b]" />}
            </div>
            <CreditCard size={18} strokeWidth={1.8} className="text-[#4a154b]" />
            <div className="flex-1 text-left">
              <p className="text-[13px] font-semibold text-[#251622]">Secure Card Payment</p>
              <p className="text-[11px] text-[#aaa]">Visa, Mastercard, RuPay</p>
            </div>
            <Lock size={14} strokeWidth={2} className="text-[#bbb]" />
          </button>

          {/* COD */}
          <button
            type="button"
            onClick={() => {}}
            disabled
            className="mt-2.5 flex w-full items-center gap-3 rounded-[14px] border-2 border-gray-100 px-4 py-3.5 opacity-50"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 flex-shrink-0" />
            <Banknote size={18} strokeWidth={1.8} className="text-[#aaa]" />
            <div className="flex-1 text-left">
              <p className="text-[13px] font-semibold text-[#888]">Cash on Delivery</p>
              <p className="text-[11px] text-[#bbb]">Not available for high value items</p>
            </div>
          </button>
        </div>

        {/* ─── ORDER SUMMARY ─── */}
        <div className="mx-4 mt-4 rounded-[20px] bg-white px-5 py-5">
          <h2 className="mb-4 text-[15px] font-bold text-[#251622]">Order Summary</h2>

          {/* Item row */}
          <div className="flex gap-3 mb-5 pb-5 border-b border-gray-100">
            <div className="h-[52px] w-[52px] flex-shrink-0 overflow-hidden rounded-[10px] bg-[#1a1a2e]">
              <img
                src={firstItem.images[0]}
                alt={firstItem.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#251622]">{firstItem.name}</p>
              <p className="mt-0.5 text-[11px] text-[#aaa]">
                Size: {firstItem.details.weight ?? '14'} | 18K Yellow Gold
              </p>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="space-y-3">
            {[
              { label: `Stone Price (${firstItem.details.weight ?? '2.5ct'})`, value: stone },
              { label: `Metal Weight (${metalWeight.toFixed(1)}g)`, value: metalCost },
              { label: 'Making Charges', value: making },
              { label: 'Tax (GST 3%)', value: tax },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[13px] text-[#666]">{label}</span>
                <span className="text-[13px] font-medium text-[#251622]">{fmt(value)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#666]">Coupon Discount</span>
              <span className="text-[13px] font-medium text-green-600">-{fmt(discount)}</span>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#251622]">Total Amount</span>
                <div className="text-right">
                  <p className="text-[16px] font-bold text-[#4a154b]">{fmt(grandTotal)}</p>
                  <p className="text-[10px] text-[#aaa]">Inclusive of all taxes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* ─── STICKY PAY BUTTON ─── */}
      <div className="fixed bottom-[72px] left-0 right-0 z-50 px-4 py-3 md:hidden">
        <button
          type="submit"
          form="checkout-form"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2.5 rounded-[18px] bg-[#4a154b] py-4 text-[14px] font-semibold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-70"
        >
          <ShieldCheck size={18} strokeWidth={2} />
          {loading ? 'Processing…' : `Pay ${fmt(grandTotal)} Securely`}
        </button>
      </div>

      {/* ─── DESKTOP BUTTON ─── */}
      <div className="hidden md:block mx-auto max-w-xl px-4 mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2.5 rounded-[18px] bg-[#4a154b] py-4 text-[14px] font-semibold text-white shadow-lg disabled:opacity-70"
        >
          <ShieldCheck size={18} strokeWidth={2} />
          {loading ? 'Processing…' : `Pay ${fmt(grandTotal)} Securely`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
