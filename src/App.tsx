import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import VendorRegistration from './pages/VendorRegistration';
import AdminDashboard from './pages/AdminDashboard';
import AIStylist from './components/AIStylist';
import Wishlist from './pages/Wishlist';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import { motion, AnimatePresence } from 'motion/react';
import { StoreProvider } from './StoreContext';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/vendor-register" element={<VendorRegistration />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/stylist" element={<div className="py-12"><AIStylist /></div>} />
              <Route path="/order-success" element={<SuccessPage title="Order Placed Successfully" message="Your royal treasures are being prepared for dispatch." />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

function SuccessPage({ title, message }: { title: string, message: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl font-serif text-maroon-900 mb-4">{title}</h1>
      <p className="text-stone-500 mb-8">{message}</p>
      <a href="/" className="btn-royal">Return to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </Router>
  );
}
