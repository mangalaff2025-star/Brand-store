import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { TrustStrip } from './components/home/TrustStrip';
import { FeaturedCollection } from './components/home/FeaturedCollection';
import { OccasionsSection } from './components/home/OccasionsSection';
import { BestSellers } from './components/home/BestSellers';
import { CustomBouquetPromo } from './components/home/CustomBouquetPromo';
import { HowItWorks } from './components/home/HowItWorks';
import { AboutBrand } from './components/home/AboutBrand';
import { CustomerReviews } from './components/home/CustomerReviews';
import { InstagramFeed } from './components/home/InstagramFeed';
import { Newsletter } from './components/home/Newsletter';

import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailView } from './components/product/ProductDetailView';
import { CustomBouquetBuilder } from './components/custom/CustomBouquetBuilder';
import { OccasionsPage } from './components/occasions/OccasionsPage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderConfirmation } from './components/order/OrderConfirmation';

import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { SearchModal } from './components/modals/SearchModal';
import { TrackOrderModal } from './components/modals/TrackOrderModal';
import { ToastContainer } from './components/common/ToastContainer';
import { PRODUCTS } from './data/products';

const MainContent: React.FC = () => {
  const { activePage, selectedProduct } = useShop();

  return (
    <main className="min-h-screen">
      {activePage === 'home' && (
        <>
          <Hero />
          <TrustStrip />
          <FeaturedCollection />
          <OccasionsSection />
          <BestSellers />
          <CustomBouquetPromo />
          <HowItWorks />
          <AboutBrand />
          <CustomerReviews />
          <InstagramFeed />
          <Newsletter />
        </>
      )}

      {activePage === 'shop' && <ShopPage />}

      {activePage === 'product-detail' && (
        <ProductDetailView product={selectedProduct || PRODUCTS[0]} />
      )}

      {activePage === 'custom-bouquet' && <CustomBouquetBuilder />}

      {activePage === 'occasions' && <OccasionsPage />}

      {activePage === 'about' && <AboutPage />}

      {activePage === 'contact' && <ContactPage />}

      {activePage === 'cart' && <CartPage />}

      {activePage === 'checkout' && <CheckoutPage />}

      {activePage === 'order-confirmation' && <OrderConfirmation />}
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="flex flex-col min-h-screen font-sans bg-[#F8F5ED] text-[#18231D]">
        <Navbar />
        <MainContent />
        <Footer />

        {/* Global Overlays & Modals */}
        <CartDrawer />
        <WishlistDrawer />
        <SearchModal />
        <TrackOrderModal />
        <ToastContainer />
      </div>
    </ShopProvider>
  );
}
