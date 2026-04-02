import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Collection = lazy(() => import('./pages/Collection'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Success = lazy(() => import('./pages/Success'));
const FAQ = lazy(() => import('./pages/FAQ'));
const About = lazy(() => import('./pages/About'));
const SizeGuide = lazy(() => import('./pages/SizeGuide'));
const Policies = lazy(() => import('./pages/Policies'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PaymentFailed = lazy(() => import('./pages/PaymentFailed'));
const Account = lazy(() => import('./pages/Account'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/Admin/Products/ProductManagement'));
const AdminAddProduct = lazy(() => import('./pages/Admin/Products/AddProduct'));
const AdminVariants = lazy(() => import('./pages/Admin/Variants/CaratManagement'));
const AdminCoupons = lazy(() => import('./pages/Admin/Coupons/CouponManagement'));
const AdminBanners = lazy(() => import('./pages/Admin/Banners/BannerManagement'));
const AdminOrders = lazy(() => import('./pages/Admin/Orders/OrderManagement'));
const AdminRates = lazy(() => import('./pages/Admin/Rates/GoldRateManagement'));
const AdminBookings = lazy(() => import('./pages/Admin/Bookings/BookingManagement'));
const AdminCategories = lazy(() => import('./pages/Admin/Categories/CategoryManagement'));

const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <div className="flex flex-col items-center space-y-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold animate-pulse">GEMRAKSHA</p>
    </div>
  </div>
);

import ScrollToTop from './components/common/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/about" element={<About />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/policies/*" element={<Policies />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/account" element={<Account />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/add" element={<AdminAddProduct />} />
            <Route path="/admin/variants" element={<AdminVariants />} />
            <Route path="/admin/coupons" element={<AdminCoupons />} />
            <Route path="/admin/banners" element={<AdminBanners />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/rates" element={<AdminRates />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            
            {/* Fallback for other routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}
