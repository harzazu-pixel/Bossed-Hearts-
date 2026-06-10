import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '../store';
import { useState } from 'react';
import { CartDrawer } from './CartDrawer';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemsCount = useStore(state => state.cart.reduce((sum, item) => sum + item.quantity, 0));
  const setCartOpen = useStore(state => state.setCartOpen);
  const location = useLocation();

  const isCheckout = location.pathname === '/checkout';

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <header className="sticky top-0 z-40 bg-brand-50/90 backdrop-blur-md border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-brand-900 focus:outline-none p-2 -ml-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
              <Link to="/" className="font-serif text-2xl font-black tracking-tighter uppercase italic text-brand-900">
                Bossed Hearts.
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center space-x-12 text-xs font-semibold uppercase tracking-widest">
              <Link to="/" className="text-brand-400 hover:text-brand-900 transition-colors">
                Shop
              </Link>
              <a href="#benefits" className="text-brand-400 hover:text-brand-900 transition-colors">
                Benefits
              </a>
              <a href="#contact" className="text-brand-400 hover:text-brand-900 transition-colors">
                Contact
              </a>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {!isCheckout && (
                <button 
                  onClick={() => setCartOpen(true)}
                  className="text-brand-900 hover:text-brand-500 transition-colors relative p-2 -mr-2"
                >
                  <ShoppingBag size={24} />
                  {cartItemsCount > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center h-4 w-4 rounded-full bg-brand-500 text-white text-[10px] font-bold transform translate-x-1 -translate-y-1">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute w-full bg-brand-50 border-b border-brand-200">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-brand-900 hover:bg-brand-100">
                Shop
              </Link>
              <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-brand-900 hover:bg-brand-100">
                Benefits
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-brand-900 hover:bg-brand-100">
                Contact
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer dir="rtl" id="contact" className="bg-brand-900 text-brand-200 text-xs py-6 px-4 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-right">
        <span>توصيل سريع ومجاني لكل الطلبيات الفوق من 100 دت!</span>
        <span>تصميم مخدوم ومثالي يتماشى مع أسلوب حياتك اليومي.</span>
        <span className="opacity-70">&copy; {new Date().getFullYear()} Bossed Hearts</span>
      </footer>

      <CartDrawer />
    </div>
  );
}
