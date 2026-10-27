import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { CatalogPage } from './components/catalog/CatalogPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { AccountPage } from './components/account/AccountPage';
import { OrderTrackingPage } from './components/tracking/OrderTrackingPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PolicyPage } from './components/pages/PolicyPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { ToastContainer } from './components/common/Toast';
import { OrderSuccessModal } from './components/checkout/OrderSuccessModal';
import { Order } from './types';

const MainAppContent: React.FC = () => {
  const { currentView, selectedProductSlug } = useStore();
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5F0] text-[#191919] selection:bg-[#8D2337] selection:text-white">
      {/* 1. Promotional Sliding Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Brand Navigation Bar */}
      <Header />

      {/* 3. Dynamic View Engine */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'catalog' && <CatalogPage />}
        {currentView === 'product' && (
          <ProductDetailPage slug={selectedProductSlug || 'oversized-heavyweight-tee-ecru'} />
        )}
        {currentView === 'checkout' && (
          <CheckoutPage onOrderSuccess={(ord) => setConfirmedOrder(ord)} />
        )}
        {currentView === 'account' && <AccountPage />}
        {currentView === 'tracking' && <OrderTrackingPage />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'policies' && <PolicyPage />}
      </main>

      {/* 4. Global Brand Footer */}
      <Footer />

      {/* 5. Slide-Out Shopping Bag Drawer */}
      <CartDrawer />

      {/* 6. Real-time Toast Notifications */}
      <ToastContainer />

      {/* 7. Verified Order Receipt Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
