import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  Instagram,
  Facebook,
  Phone,
  MessageCircle,
  MapPin,
  Settings,
} from 'lucide-react';
import { AbbasiLogo } from './components/AbbasiLogo';
import {
  CartDrawer,
  CartItem,
  CmsModal,
  LocationPopup,
  QuickViewModal,
} from './components/SharedModals';
import {
  BakeryProduct,
  CategoryFeature,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_STORE_SETTINGS,
  MenuCategory,
  StoreSettings,
} from './data/bakeryData';
import { AboutPage, HomePage, PageRoute } from './pages/HomeAndAboutPages';
import { MenuPage, OurCakesPage } from './pages/MenuAndCakesPages';
import {
  ContactPage,
  GalleryPage,
  OrderOnlinePage,
} from './pages/GalleryOrderContactPages';

const NAV_LINKS: { label: string; route: PageRoute }[] = [
  { label: 'Home', route: '/' },
  { label: 'About Us', route: '/about-us' },
  { label: 'Menu', route: '/menu' },
  { label: 'Our Cakes', route: '/cakes' },
  { label: 'Gallery', route: '/gallery' },
  { label: 'Order Online', route: '/order-online' },
  { label: 'Contact', route: '/contact' },
];

function resolveInitialRoute(): PageRoute {
  const path = window.location.pathname as PageRoute;
  const validRoutes: PageRoute[] = [
    '/',
    '/about-us',
    '/menu',
    '/cakes',
    '/gallery',
    '/order-online',
    '/contact',
  ];
  return validRoutes.includes(path) ? path : '/';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(resolveInitialRoute);
  const [menuCategoryFilter, setMenuCategoryFilter] = useState<MenuCategory>('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // CMS & Catalog State
  const [products, setProducts] = useState<BakeryProduct[]>(() => {
    try {
      const saved = localStorage.getItem('abbasi_cms_products_v1');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<CategoryFeature[]>(() => {
    try {
      const saved = localStorage.getItem('abbasi_cms_categories_v1');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('abbasi_cms_settings_v1');
      return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
    } catch {
      return INITIAL_STORE_SETTINGS;
    }
  });

  const [isCmsMode, setIsCmsMode] = useState(false);
  const [cmsModalOpen, setCmsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<BakeryProduct | null>(null);

  // Order Location & Mode State
  const [orderType, setOrderType] = useState<'DELIVERY' | 'TAKEAWAY'>(() => {
    const saved = localStorage.getItem('abbasi_order_type_v1');
    return saved === 'TAKEAWAY' ? 'TAKEAWAY' : 'DELIVERY';
  });

  const [selectedLocation, setSelectedLocation] = useState<string>(() => {
    return localStorage.getItem('abbasi_location_v1') || 'Barakahu, Islamabad';
  });

  const [locationPopupOpen, setLocationPopupOpen] = useState(false);

  // Cart & QuickView State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('abbasi_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<BakeryProduct | null>(null);

  // Sync CMS & Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('abbasi_cms_products_v1', JSON.stringify(products));
    } catch {
      // ignore storage quota errors
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('abbasi_cms_categories_v1', JSON.stringify(categories));
    } catch {
      // ignore
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('abbasi_cms_settings_v1', JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('abbasi_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Browser back/forward navigation support
  useEffect(() => {
    const onPopState = () => {
      setCurrentRoute(resolveInitialRoute());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Deferred first-visit location popup (after 11s dwell + user scroll/intent)
  useEffect(() => {
    const alreadyConfirmed = sessionStorage.getItem('abbasi_location_confirmed');
    if (alreadyConfirmed) return;

    let dwellElapsed = false;
    let userInteracted = false;

    const timer = window.setTimeout(() => {
      dwellElapsed = true;
      if (userInteracted && !sessionStorage.getItem('abbasi_location_confirmed')) {
        setLocationPopupOpen(true);
        sessionStorage.setItem('abbasi_location_confirmed', 'true');
      }
    }, 11000);

    const handleScrollOrMove = () => {
      userInteracted = true;
      if (dwellElapsed && !sessionStorage.getItem('abbasi_location_confirmed')) {
        setLocationPopupOpen(true);
        sessionStorage.setItem('abbasi_location_confirmed', 'true');
      }
    };

    window.addEventListener('scroll', handleScrollOrMove, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleScrollOrMove);
    };
  }, []);

  const navigateTo = (route: PageRoute, categoryFilter?: MenuCategory) => {
    if (categoryFilter) {
      setMenuCategoryFilter(categoryFilter);
    } else if (route === '/menu') {
      setMenuCategoryFilter('All');
    }
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    try {
      window.history.pushState({}, '', route);
    } catch {
      // ignore in sandboxed iframe if restricted
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: BakeryProduct,
    sizeLabel?: string,
    unitPrice?: number,
    quantity = 1
  ) => {
    const chosenSize = sizeLabel || product.sizes[0]?.label || 'Standard';
    const chosenPrice = unitPrice ?? product.sizes[0]?.price ?? product.price;

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          product,
          selectedSize: chosenSize,
          unitPrice: chosenPrice,
          quantity,
        },
      ];
    });
  };

  const handleUpdateCartQty = (productId: string, sizeLabel: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.selectedSize === sizeLabel
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, sizeLabel: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === sizeLabel)
      )
    );
  };

  const handleSaveOrderContext = (
    newType: 'DELIVERY' | 'TAKEAWAY',
    newLocation: string
  ) => {
    setOrderType(newType);
    setSelectedLocation(newLocation);
    localStorage.setItem('abbasi_order_type_v1', newType);
    localStorage.setItem('abbasi_location_v1', newLocation);
    sessionStorage.setItem('abbasi_location_confirmed', 'true');
    setLocationPopupOpen(false);
  };

  const handleSaveProduct = (updatedProduct: BakeryProduct) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === updatedProduct.id);
      if (exists) {
        return prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
      }
      return [updatedProduct, ...prev];
    });
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleResetDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setSettings(INITIAL_STORE_SETTINGS);
    localStorage.removeItem('abbasi_cms_products_v1');
    localStorage.removeItem('abbasi_cms_categories_v1');
    localStorage.removeItem('abbasi_cms_settings_v1');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFAF5] text-[#52321B]">
      {/* STICKY HEADER (3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 h-[72px] bg-[#FDFAF5]/95 backdrop-blur-xs border-b border-[#CFA878]/40 px-4 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
          {/* Zone 1: Circular Brand Logo Only */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            aria-label="Abbasi Bakers & Sweets Home"
            className="inline-flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.02]"
          >
            <AbbasiLogo variant="badge" size="sm" />
          </a>

          {/* Zone 2: Refined, Smaller Navigation Links */}
          <nav
            className="hidden lg:flex items-center justify-center gap-5 xl:gap-6 text-[11px] font-medium tracking-[0.06em] uppercase text-[#52321B]"
            aria-label="Primary Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <a
                  key={link.route}
                  href={link.route}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(link.route);
                  }}
                  className={`py-1 transition-colors whitespace-nowrap border-b ${
                    isActive
                      ? 'border-[#CFA878] text-[#52321B] font-semibold'
                      : 'border-transparent text-[#52321B]/75 hover:text-[#52321B] hover:border-[#CFA878]/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Social Icons, Cart & Primary Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abbasi Bakers & Sweets Instagram"
              className="hidden sm:flex w-9 h-9 items-center justify-center text-[#52321B] hover:text-[#CFA878] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abbasi Bakers & Sweets Facebook"
              className="hidden sm:flex w-9 h-9 items-center justify-center text-[#52321B] hover:text-[#CFA878] transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              aria-label={`Shopping Cart (${totalCartCount} items)`}
              className="relative w-10 h-10 flex items-center justify-center text-[#52321B] hover:bg-[#F5EDE1] border border-[#CFA878]/50 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#CFA878] text-[#52321B] text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigateTo('/order-online')}
              className="hidden sm:inline-flex py-2.5 px-5 bg-[#52321B] text-white text-xs font-semibold tracking-[0.18em] uppercase border border-[#52321B] hover:bg-[#CFA878] hover:border-[#CFA878] hover:text-[#52321B] transition-colors cursor-pointer whitespace-nowrap"
            >
              ORDER NOW
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#52321B] border border-[#CFA878]/50 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFAF5] border-b-2 border-[#CFA878] px-6 py-6 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#CFA878]/30">
            <AbbasiLogo variant="horizontal" size="sm" />
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setLocationPopupOpen(true);
              }}
              className="text-xs font-semibold text-[#CFA878] underline cursor-pointer"
            >
              {orderType} · {selectedLocation}
            </button>
          </div>

          <nav className="flex flex-col space-y-2.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.route}
                href={link.route}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(link.route);
                }}
                className={`py-2 text-sm font-semibold tracking-[0.16em] uppercase ${
                  currentRoute === link.route
                    ? 'text-[#CFA878]'
                    : 'text-[#52321B] hover:text-[#CFA878]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#CFA878]/30 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigateTo('/order-online')}
              className="flex-1 py-3 px-5 bg-[#52321B] text-white text-xs font-semibold tracking-[0.2em] uppercase text-center cursor-pointer"
            >
              ORDER NOW
            </button>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 border border-[#CFA878] flex items-center justify-center text-[#52321B]"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 border border-[#CFA878] flex items-center justify-center text-[#52321B]"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* MAIN PAGE CONTENT */}
      <main className="flex-1">
        {currentRoute === '/' && (
          <HomePage
            products={products}
            categories={categories}
            settings={settings}
            isCmsMode={isCmsMode}
            orderType={orderType}
            selectedLocation={selectedLocation}
            onNavigate={navigateTo}
            onOpenLocationPopup={() => setLocationPopupOpen(true)}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onEditProduct={(p) => {
              setEditingProduct(p);
              setCmsModalOpen(true);
            }}
          />
        )}

        {currentRoute === '/about-us' && <AboutPage onNavigate={navigateTo} />}

        {currentRoute === '/menu' && (
          <MenuPage
            products={products}
            initialCategory={menuCategoryFilter}
            settings={settings}
            isCmsMode={isCmsMode}
            onToggleCmsMode={() => setIsCmsMode((prev) => !prev)}
            onOpenCmsModal={(product) => {
              setEditingProduct(product || null);
              setCmsModalOpen(true);
            }}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentRoute === '/cakes' && (
          <OurCakesPage settings={settings} onNavigate={navigateTo} />
        )}

        {currentRoute === '/gallery' && (
          <GalleryPage settings={settings} onNavigate={navigateTo} />
        )}

        {currentRoute === '/order-online' && (
          <OrderOnlinePage
            products={products}
            cart={cart}
            orderType={orderType}
            selectedLocation={selectedLocation}
            settings={settings}
            onUpdateOrderContext={handleSaveOrderContext}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveCartItem={handleRemoveCartItem}
            onClearCart={() => setCart([])}
          />
        )}

        {currentRoute === '/contact' && (
          <ContactPage settings={settings} onNavigate={navigateTo} />
        )}
      </main>

      {/* DEEP-BROWN FOOTER */}
      <footer className="bg-[#52321B] text-[#FDFAF5] border-t-2 border-[#CFA878] pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <AbbasiLogo variant="horizontal" size="md" theme="dark" />
              <p className="text-sm text-[#FDFAF5]/80 leading-relaxed max-w-sm pt-1">
                Fresh cakes, traditional sweets and bakery favorites made for every special moment.
              </p>
              <div className="pt-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLocationPopupOpen(true)}
                  className="text-xs text-[#CFA878] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {orderType} · {selectedLocation}
                </button>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-serif-display text-xl font-bold text-[#CFA878] tracking-wider uppercase">
                Navigation
              </h3>
              <ul className="space-y-2 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.route}>
                    <a
                      href={link.route}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(link.route);
                      }}
                      className="text-[#FDFAF5]/80 hover:text-[#CFA878] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-serif-display text-xl font-bold text-[#CFA878] tracking-wider uppercase">
                Contact
              </h3>
              <div className="space-y-2.5 text-sm text-[#FDFAF5]/85">
                <p className="flex items-center gap-2 tabular-nums">
                  <Phone className="w-4 h-4 text-[#CFA878] shrink-0" />
                  <a href={`tel:${settings.phoneTel}`} className="hover:text-[#CFA878]">
                    {settings.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-start gap-2 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#CFA878] shrink-0 mt-1" />
                  <span>
                    Sarwar Rd, Barakahu,
                    <br />
                    Islamabad, Pakistan
                  </span>
                </p>
              </div>
            </div>

            {/* Social & CMS Column */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-serif-display text-xl font-bold text-[#CFA878] tracking-wider uppercase">
                Social
              </h3>
              <div className="flex flex-col space-y-2.5 text-sm">
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#FDFAF5]/85 hover:text-[#CFA878] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#CFA878]" />
                  Instagram
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#FDFAF5]/85 hover:text-[#CFA878] transition-colors"
                >
                  <Facebook className="w-4 h-4 text-[#CFA878]" />
                  Facebook
                </a>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setCmsModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#CFA878]/80 hover:text-[#CFA878] border border-[#CFA878]/40 px-3 py-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Settings className="w-3.5 h-3.5" />
                  CMS Manager
                </button>
              </div>
            </div>
          </div>

          {/* Gold Divider Line */}
          <div className="h-[1px] w-full bg-[#CFA878]/40 my-6" aria-hidden="true" />

          {/* Bottom Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDFAF5]/70">
            <p>© 2026 Abbasi Bakers &amp; Sweets. All Rights Reserved.</p>
            <p>Sarwar Rd, Barakahu, Islamabad · {settings.phoneDisplay}</p>
          </div>
        </div>
      </footer>

      {/* FLOATING CONTACT CONTROLS (Call & WhatsApp) */}
      <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-2.5">
        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
            'Assalam-o-Alaikum Abbasi Bakers & Sweets! I would like to place an order / inquire about a cake.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Abbasi Bakers & Sweets"
          className="h-11 px-4 bg-[#52321B] text-[#FDFAF5] border border-[#CFA878] shadow-lg flex items-center gap-2 text-xs font-semibold tracking-wider uppercase hover:bg-[#CFA878] hover:text-[#52321B] transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 text-[#CFA878] shrink-0" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        <a
          href={`tel:${settings.phoneTel}`}
          aria-label="Call Abbasi Bakers & Sweets"
          className="h-11 px-4 bg-[#FDFAF5] text-[#52321B] border border-[#52321B] shadow-lg flex items-center gap-2 text-xs font-semibold tracking-wider uppercase hover:bg-[#F5EDE1] transition-colors whitespace-nowrap"
        >
          <Phone className="w-4 h-4 text-[#CFA878] shrink-0" />
          <span className="hidden sm:inline">{settings.phoneDisplay}</span>
        </a>
      </div>

      {/* ORDER LOCATION POPUP */}
      <LocationPopup
        isOpen={locationPopupOpen}
        orderType={orderType}
        selectedLocation={selectedLocation}
        onClose={() => {
          sessionStorage.setItem('abbasi_location_confirmed', 'true');
          setLocationPopupOpen(false);
        }}
        onSave={handleSaveOrderContext}
      />

      {/* PRODUCT QUICK VIEW MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        showSamplePrices={settings.showSamplePrices}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* SHOPPING CART DRAWER */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        items={cart}
        orderType={orderType}
        deliveryFee={settings.deliveryFee}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemove={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setCartDrawerOpen(false);
          navigateTo('/order-online');
        }}
      />

      {/* CMS MANAGER MODAL */}
      <CmsModal
        isOpen={cmsModalOpen}
        products={products}
        categories={categories}
        settings={settings}
        editingProduct={editingProduct}
        onClose={() => {
          setCmsModalOpen(false);
          setEditingProduct(null);
        }}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateCategory={(updatedCat) =>
          setCategories((prev) =>
            prev.map((c) => (c.id === updatedCat.id ? updatedCat : c))
          )
        }
        onUpdateSettings={setSettings}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
