import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ChaapSpotlight from './components/ChaapSpotlight';
import MenuSection from './components/MenuSection';
import BhaiyaCounter from './components/BhaiyaCounter';
import BookingSection from './components/BookingSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { CartItem, MenuItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Load existing cart from local storage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('jfc_meal_tray');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const sections = ['home', 'specials', 'menu', 'counter-bhaiya', 'booking', 'reviews'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset navbar height

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddItemToCart = (item: MenuItem, quantity: number) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((it) => it.menuItem.id === item.id);
      let updated: CartItem[];

      if (existing) {
        updated = prevItems.map((it) =>
          it.menuItem.id === item.id
            ? { ...it, quantity: it.quantity + quantity }
            : it
        );
      } else {
        updated = [...prevItems, { menuItem: item, quantity }];
      }

      localStorage.setItem('jfc_meal_tray', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateQuantity = (itemId: string, qty: number) => {
    setCartItems((prevItems) => {
      const updated = prevItems.map((it) =>
        it.menuItem.id === itemId ? { ...it, quantity: qty } : it
      );
      localStorage.setItem('jfc_meal_tray', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => {
      const updated = prevItems.filter((it) => it.menuItem.id !== itemId);
      localStorage.setItem('jfc_meal_tray', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('jfc_meal_tray');
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // offset navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0a0907] text-white selection:bg-[#cca43b] selection:text-[#0f0e0c] overflow-x-hidden">
      
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <div id="home">
        <HeroSection onScrollToSection={handleScrollToSection} />
      </div>

      {/* Chaap Spotlight & Marinade Alchemist */}
      <div id="specials">
        <ChaapSpotlight />
      </div>

      {/* Interactive Food Menu */}
      <div id="menu">
        <MenuSection onAddItemToCart={handleAddItemToCart} />
      </div>

      {/* Bhaiya Gym Rat & RCB Fan Spotlight */}
      <div id="counter-bhaiya">
        <BhaiyaCounter />
      </div>

      {/* Interactive Table Booking & Seating Plan */}
      <div id="booking">
        <BookingSection />
      </div>

      {/* Testimonials Slider & Review submission */}
      <div id="reviews">
        <ReviewsSection />
      </div>

      {/* Footer & Map */}
      <Footer />

      {/* Slide-out Meal Tray Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
