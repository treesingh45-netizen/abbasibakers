import React, { useState, useRef } from 'react';
import {
  X,
  ZoomIn,
  Truck,
  Store,
  MapPin,
  Navigation,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Phone,
  MessageCircle,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';
import {
  AbbasiLogo,
  WheatDivider,
  InstagramIcon as Instagram,
  FacebookIcon as Facebook,
} from '../components/AbbasiLogo';
import { BakeryImage, CartItem } from '../components/SharedModals';
import {
  BakeryProduct,
  BARAKAHU_LOCATIONS,
  GALLERY_ITEMS,
  GalleryItem,
  MenuCategory,
  StoreSettings,
} from '../data/bakeryData';
import { PageRoute } from './HomeAndAboutPages';

type GalleryFilter = 'All' | 'Cakes' | 'Sweets' | 'Bakery' | 'Celebrations' | 'Custom Cakes';

interface GalleryPageProps {
  settings: StoreSettings;
  onNavigate: (route: PageRoute) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ settings }) => {
  const [filter, setFilter] = useState<GalleryFilter>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filters: GalleryFilter[] = [
    'All',
    'Cakes',
    'Sweets',
    'Bakery',
    'Celebrations',
    'Custom Cakes',
  ];

  const items = GALLERY_ITEMS.filter(
    (item) => filter === 'All' || item.category === filter
  );

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F5EDE1] border-b border-[#CFA878]/30 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#CFA878]">
            ABBASI BAKERS &amp; SWEETS
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#52321B]">
            Our Sweet Creations
          </h1>
          <p className="text-base sm:text-lg text-[#52321B]/80">
            Explore our cakes, sweets, bakery products and celebration moments.
          </p>
          <WheatDivider className="pt-2" />
        </div>
      </section>

      {/* GALLERY FILTER */}
      <section className="py-8 px-4 sm:px-8 bg-[#FDFAF5] border-b border-[#CFA878]/25">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase border transition-colors cursor-pointer whitespace-nowrap ${
                filter === f
                  ? 'bg-[#52321B] text-white border-[#52321B]'
                  : 'bg-white text-[#52321B] border-[#CFA878]/50 hover:bg-[#F5EDE1]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* MASONRY-STYLE EDITORIAL GALLERY */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <figure
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group bg-white border border-[#CFA878]/35 p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between"
            >
              <div
                className={`relative w-full overflow-hidden bg-[#F5EDE1] ${
                  item.aspect === 'tall'
                    ? 'aspect-[4/4]'
                    : item.aspect === 'wide'
                    ? 'aspect-[4/3]'
                    : 'aspect-[4/3]'
                }`}
              >
                <BakeryImage
                  src={item.image}
                  alt={`${item.title} - Abbasi Bakers & Sweets`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#52321B]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-11 h-11 rounded-full bg-[#FDFAF5] text-[#52321B] flex items-center justify-center border border-[#CFA878]">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
              </div>
              <figcaption className="pt-4 pb-2 px-2">
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#CFA878]">
                  {item.category}
                </span>
                <h3 className="font-serif-display text-xl font-bold text-[#52321B] mt-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#52321B]/75 mt-1">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#52321B]/80 backdrop-blur-xs p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
        >
          <div className="relative max-w-4xl w-full bg-[#FDFAF5] border-2 border-[#CFA878] p-4 sm:p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Close lightbox"
              className="absolute top-3 right-3 z-10 w-10 h-10 bg-[#52321B] text-white flex items-center justify-center hover:bg-[#CFA878] hover:text-[#52321B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#F5EDE1]">
              <BakeryImage
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#CFA878]">
                  {lightboxItem.category}
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#52321B]">
                  {lightboxItem.title}
                </h3>
                <p className="text-sm text-[#52321B]/75">{lightboxItem.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INSTAGRAM & FACEBOOK SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F5EDE1] border-t border-[#CFA878]/30 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
            @AbbasiBakersAndSweets
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#52321B]">
            More From Instagram
          </h2>
          <p className="text-base text-[#52321B]/80">
            Follow us for our latest creations, offers and celebrations.
          </p>
          <WheatDivider className="py-2" />
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-7 bg-[#52321B] text-white text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center gap-2 hover:bg-[#CFA878] hover:text-[#52321B] transition-colors whitespace-nowrap"
            >
              <Instagram className="w-4 h-4" />
              FOLLOW ON INSTAGRAM
            </a>
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-7 bg-white text-[#52321B] border border-[#52321B] text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center gap-2 hover:bg-[#52321B] hover:text-white transition-colors whitespace-nowrap"
            >
              <Facebook className="w-4 h-4 text-[#CFA878]" />
              CONNECT ON FACEBOOK
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

interface OrderOnlinePageProps {
  products: BakeryProduct[];
  cart: CartItem[];
  orderType: 'DELIVERY' | 'TAKEAWAY';
  selectedLocation: string;
  settings: StoreSettings;
  onUpdateOrderContext: (type: 'DELIVERY' | 'TAKEAWAY', location: string) => void;
  onAddToCart: (product: BakeryProduct, size?: string, price?: number, qty?: number) => void;
  onUpdateCartQty: (productId: string, sizeLabel: string, delta: number) => void;
  onRemoveCartItem: (productId: string, sizeLabel: string) => void;
  onClearCart: () => void;
}

interface ConfirmedOrder {
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  landmark: string;
  notes: string;
  orderType: 'DELIVERY' | 'TAKEAWAY';
  location: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const OrderOnlinePage: React.FC<OrderOnlinePageProps> = ({
  products,
  cart,
  orderType,
  selectedLocation,
  settings,
  onUpdateOrderContext,
  onAddToCart,
  onUpdateCartQty,
  onRemoveCartItem,
  onClearCart,
}) => {
  const menuSectionRef = useRef<HTMLDivElement>(null);
  const checkoutSectionRef = useRef<HTMLFormElement>(null);

  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [locating, setLocating] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const [customer, setCustomer] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: selectedLocation,
    landmark: '',
    notes: '',
  });

  const categories: MenuCategory[] = [
    'All',
    'Cakes',
    'Bakery',
    'Sweets',
    'Cupcakes',
    'Desserts',
    'Snacks',
  ];

  const filteredProducts = products.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = orderType === 'DELIVERY' && cart.length > 0 ? settings.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  const getProductQty = (id: string) => quantities[id] || 1;
  const setProductQty = (id: string, qty: number) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, qty) }));

  const handleUseCurrentLocation = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          onUpdateOrderContext(orderType, 'Sarwar Rd, Barakahu, Islamabad');
          setCustomer((prev) => ({ ...prev, address: 'Sarwar Rd, Barakahu, Islamabad' }));
          setLocating(false);
        },
        () => {
          onUpdateOrderContext(orderType, 'Barakahu, Islamabad');
          setLocating(false);
        },
        { timeout: 3500 }
      );
    } else {
      onUpdateOrderContext(orderType, 'Barakahu, Islamabad');
      setLocating(false);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const orderNum = `ABS-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      customerName: customer.fullName,
      phone: customer.phone,
      email: customer.email,
      address: customer.address || selectedLocation,
      landmark: customer.landmark,
      notes: customer.notes,
      orderType,
      location: selectedLocation,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
    });
    onClearCart();
  };

  if (confirmedOrder) {
    const whatsappSummary = `Assalam-o-Alaikum Abbasi Bakers & Sweets!\nNew Online Order: ${confirmedOrder.orderNumber}\nType: ${confirmedOrder.orderType} (${confirmedOrder.location})\nCustomer: ${confirmedOrder.customerName}\nPhone: ${confirmedOrder.phone}\nAddress: ${confirmedOrder.address}\nItems:\n${confirmedOrder.items
      .map(
        (i) => `- ${i.quantity}x ${i.product.name} (${i.selectedSize}) = PKR ${(i.unitPrice * i.quantity).toLocaleString()}`
      )
      .join('\n')}\nTotal: PKR ${confirmedOrder.total.toLocaleString()}`;

    return (
      <div className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FDFAF5] animate-fade-in">
        <div className="max-w-2xl mx-auto bg-white border-2 border-[#CFA878] p-8 sm:p-12 text-center space-y-6 shadow-lg">
          <AbbasiLogo variant="badge" size="md" />
          <CheckCircle2 className="w-12 h-12 text-[#CFA878] mx-auto" />
          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#52321B]">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-[#52321B]/80">
            Your order has been registered with Abbasi Bakers &amp; Sweets, Sarwar Rd, Barakahu, Islamabad.
          </p>

          <div className="bg-[#FDFAF5] border border-[#CFA878]/50 p-6 text-left space-y-3 text-sm">
            <div className="flex justify-between border-b border-[#CFA878]/30 pb-2">
              <span className="text-[#52321B]/70">Order Number</span>
              <span className="font-bold text-[#52321B] tabular-nums">
                {confirmedOrder.orderNumber}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#CFA878]/30 pb-2">
              <span className="text-[#52321B]/70">Customer Name</span>
              <span className="font-semibold text-[#52321B]">{confirmedOrder.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-[#CFA878]/30 pb-2">
              <span className="text-[#52321B]/70">Phone Number</span>
              <span className="font-semibold text-[#52321B] tabular-nums">
                {confirmedOrder.phone}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#CFA878]/30 pb-2">
              <span className="text-[#52321B]/70">Order Option</span>
              <span className="font-semibold text-[#52321B]">
                {confirmedOrder.orderType} · {confirmedOrder.location}
              </span>
            </div>

            <div className="pt-2 space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#CFA878] block">
                Order Summary
              </span>
              {confirmedOrder.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex justify-between text-xs sm:text-sm"
                >
                  <span>
                    {item.quantity}x {item.product.name} ({item.selectedSize})
                  </span>
                  <span className="font-medium tabular-nums">
                    PKR {(item.unitPrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#CFA878]/30 flex justify-between font-bold text-base text-[#52321B]">
                <span>Total Amount</span>
                <span className="tabular-nums">PKR {confirmedOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${settings.phoneTel}`}
              className="py-3.5 px-6 bg-[#52321B] text-white text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-[#CFA878] hover:text-[#52321B] transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              CALL US
            </a>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                whatsappSummary
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 bg-[#CFA878] text-[#52321B] text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-[#52321B] hover:text-white transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              WHATSAPP US
            </a>
          </div>

          <button
            type="button"
            onClick={() => setConfirmedOrder(null)}
            className="text-xs font-semibold uppercase tracking-wider text-[#52321B]/70 hover:text-[#52321B] underline cursor-pointer"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 bg-[#F5EDE1] border-b border-[#CFA878]/30 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#CFA878]">
            ABBASI BAKERS &amp; SWEETS
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#52321B]">
            Order Your Favorites Online
          </h1>
          <p className="text-base sm:text-lg text-[#52321B]/80">
            Choose your favorite cakes, sweets and bakery treats.
          </p>
          <WheatDivider className="pt-2" />
        </div>
      </section>

      {/* ORDER TYPE & LOCATION */}
      <section className="py-12 px-4 sm:px-8 bg-[#FDFAF5] border-b border-[#CFA878]/30">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Two Large Order Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              type="button"
              onClick={() => onUpdateOrderContext('DELIVERY', selectedLocation)}
              className={`p-6 sm:p-8 text-left border-2 transition-all cursor-pointer flex items-start gap-4 ${
                orderType === 'DELIVERY'
                  ? 'bg-[#52321B] text-[#FDFAF5] border-[#52321B] shadow-md'
                  : 'bg-white text-[#52321B] border-[#CFA878]/50 hover:border-[#CFA878]'
              }`}
            >
              <div className="w-12 h-12 rounded-full border border-[#CFA878] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-[#CFA878]" />
              </div>
              <div>
                <h2 className="font-serif-display text-2xl font-bold tracking-wider uppercase">
                  DELIVERY
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    orderType === 'DELIVERY' ? 'text-[#FDFAF5]/80' : 'text-[#52321B]/75'
                  }`}
                >
                  Get your favorite treats delivered.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onUpdateOrderContext('TAKEAWAY', selectedLocation)}
              className={`p-6 sm:p-8 text-left border-2 transition-all cursor-pointer flex items-start gap-4 ${
                orderType === 'TAKEAWAY'
                  ? 'bg-[#52321B] text-[#FDFAF5] border-[#52321B] shadow-md'
                  : 'bg-white text-[#52321B] border-[#CFA878]/50 hover:border-[#CFA878]'
              }`}
            >
              <div className="w-12 h-12 rounded-full border border-[#CFA878] flex items-center justify-center shrink-0">
                <Store className="w-5 h-5 text-[#CFA878]" />
              </div>
              <div>
                <h2 className="font-serif-display text-2xl font-bold tracking-wider uppercase">
                  TAKEAWAY
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    orderType === 'TAKEAWAY' ? 'text-[#FDFAF5]/80' : 'text-[#52321B]/75'
                  }`}
                >
                  Order ahead and collect from our shop.
                </p>
              </div>
            </button>
          </div>

          {/* Select Your Location */}
          <div className="bg-white border border-[#CFA878]/50 p-6 sm:p-8">
            <h3 className="font-serif-display text-2xl font-bold text-[#52321B] mb-4">
              Select Your Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-6 relative">
                <MapPin className="w-4 h-4 text-[#CFA878] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    onUpdateOrderContext(orderType, e.target.value);
                    setCustomer((prev) => ({ ...prev, address: e.target.value }));
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-[#FDFAF5] border border-[#CFA878] text-sm font-medium text-[#52321B]"
                >
                  {BARAKAHU_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="w-full py-3 px-4 bg-[#F5EDE1] hover:bg-[#CFA878]/30 text-[#52321B] border border-[#CFA878]/60 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#CFA878]" />
                  {locating ? 'LOCATING...' : 'USE CURRENT LOCATION'}
                </button>
              </div>

              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={() => menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 px-6 bg-[#52321B] hover:bg-[#CFA878] text-white hover:text-[#52321B] text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer whitespace-nowrap"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ONLINE MENU + CART + CHECKOUT */}
      <section ref={menuSectionRef} className="py-12 sm:py-16 px-4 sm:px-8 bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 8 Columns: Online Menu */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#52321B] text-white border-[#52321B]'
                      : 'bg-white text-[#52321B] border-[#CFA878]/50 hover:bg-[#F5EDE1]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map((product) => {
                const qty = getProductQty(product.id);
                const defaultSize = product.sizes[0]?.label || 'Standard';
                return (
                  <div
                    key={product.id}
                    className="bg-white border border-[#CFA878]/35 flex flex-col justify-between p-4"
                  >
                    <div>
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5EDE1] mb-4">
                        <BakeryImage
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#CFA878]">
                        {product.category}
                      </span>
                      <h3 className="font-serif-display text-2xl font-bold text-[#52321B] mt-0.5">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#52321B]/75 mt-1 mb-3 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#CFA878]/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#52321B] tabular-nums">
                          PKR {product.price.toLocaleString()}{' '}
                          <span className="text-xs font-normal text-[#52321B]/60">
                            ({defaultSize})
                          </span>
                        </span>

                        <div className="inline-flex items-center border border-[#CFA878]/70">
                          <button
                            type="button"
                            onClick={() => setProductQty(product.id, qty - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#52321B] hover:bg-[#F5EDE1] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setProductQty(product.id, qty + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#52321B] hover:bg-[#F5EDE1] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(product, defaultSize, product.price, qty);
                          setProductQty(product.id, 1);
                        }}
                        className="w-full py-2.5 px-4 bg-[#52321B] hover:bg-[#CFA878] text-white hover:text-[#52321B] text-xs font-semibold tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 4 Columns: Sticky Cart & Checkout */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8">
            {/* CART MODULE */}
            <div className="bg-white border border-[#CFA878] p-6 space-y-5">
              <div className="border-b border-[#CFA878]/30 pb-3 flex items-center justify-between">
                <h2 className="font-serif-display text-2xl font-bold text-[#52321B]">
                  Your Order Cart
                </h2>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#CFA878]">
                  {orderType}
                </span>
              </div>

              {cart.length === 0 ? (
                <p className="text-sm text-[#52321B]/70 py-6 text-center">
                  Your cart is currently empty. Add cakes, sweets, or bakery treats from the menu.
                </p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex items-center justify-between gap-2 border-b border-[#CFA878]/20 pb-3 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-[#52321B] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-[#52321B]/65 tabular-nums">
                          {item.selectedSize} · PKR {item.unitPrice.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="inline-flex items-center border border-[#CFA878]/60">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateCartQty(item.product.id, item.selectedSize, -1)
                            }
                            className="w-6 h-6 flex items-center justify-center text-[#52321B] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateCartQty(item.product.id, item.selectedSize, 1)
                            }
                            className="w-6 h-6 flex items-center justify-center text-[#52321B] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            onRemoveCartItem(item.product.id, item.selectedSize)
                          }
                          className="text-[#52321B]/45 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Totals */}
              <div className="pt-2 space-y-1.5 text-sm border-t border-[#CFA878]/30">
                <div className="flex justify-between text-[#52321B]/80">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium">
                    PKR {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#52321B]/80">
                  <span>Delivery Fee</span>
                  <span className="tabular-nums font-medium">
                    {deliveryFee === 0 ? 'PKR 0 (Takeaway)' : `PKR ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#52321B] pt-2 border-t border-[#CFA878]/30">
                  <span>Total</span>
                  <span className="tabular-nums">PKR {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    checkoutSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="w-full py-3 bg-[#52321B] text-white text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#CFA878] hover:text-[#52321B] transition-colors cursor-pointer whitespace-nowrap"
                >
                  PROCEED TO CHECKOUT
                </button>
                <button
                  type="button"
                  onClick={() => menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-2.5 bg-[#FDFAF5] text-[#52321B] border border-[#52321B]/50 text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#F5EDE1] transition-colors cursor-pointer whitespace-nowrap"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>

            {/* CHECKOUT FORM */}
            <form
              ref={checkoutSectionRef}
              onSubmit={handlePlaceOrder}
              className="bg-[#F5EDE1] border border-[#CFA878] p-6 space-y-4"
            >
              <h3 className="font-serif-display text-2xl font-bold text-[#52321B]">
                Checkout Details
              </h3>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFA878]/70 text-sm text-[#52321B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="03XX XXXXXXX"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFA878]/70 text-sm text-[#52321B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="Optional email for receipt"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFA878]/70 text-sm text-[#52321B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="House / Street / Area in Barakahu, Islamabad"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFA878]/70 text-sm text-[#52321B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1">
                  Nearest Landmark
                </label>
                <input
                  type="text"
                  value={customer.landmark}
                  onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                  placeholder="e.g. Near Sarwar Rd / Main Bazaar"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFA878]/70 text-sm text-[#52321B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1">
                  Order Notes
                </label>
                <textarea
                  rows={2}
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="Message on cake, preferred delivery time, etc."
                  className="w-full px-3.5 py-2 bg-white border border-[#CFA878]/70 text-sm text-[#52321B]"
                />
              </div>

              {/* Payment Notice */}
              <div className="p-3.5 bg-white border border-[#CFA878]/50 text-xs text-[#52321B]/85 leading-relaxed">
                <strong className="block uppercase tracking-wider text-[#52321B] mb-1">
                  Payment Confirmation
                </strong>
                Payment is collected upon {orderType === 'DELIVERY' ? 'delivery' : 'shop pickup'} or confirmed directly with our Barakahu counter at {settings.phoneDisplay}.
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full py-3.5 px-6 bg-[#52321B] hover:bg-[#CFA878] disabled:opacity-40 text-white hover:text-[#52321B] text-xs font-bold tracking-[0.2em] uppercase transition-colors cursor-pointer whitespace-nowrap"
              >
                PLACE ORDER
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ContactPageProps {
  settings: StoreSettings;
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, onNavigate }) => {
  const [sent, setSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F5EDE1] border-b border-[#CFA878]/30 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#CFA878]">
            ABBASI BAKERS &amp; SWEETS
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#52321B]">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-[#52321B]/80">
            We’re here to help with your orders, celebrations and custom cake requests.
          </p>
          <WheatDivider className="pt-2" />
        </div>
      </section>

      {/* QUICK CONTACT (Three Elegant Cards) */}
      <section className="py-14 px-4 sm:px-8 bg-[#FDFAF5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 border border-[#CFA878]/40 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border border-[#CFA878] flex items-center justify-center text-[#CFA878] mx-auto">
              <Phone className="w-5 h-5" />
            </div>
            <h2 className="font-serif-display text-2xl font-bold text-[#52321B]">
              CALL US
            </h2>
            <p className="text-base font-semibold text-[#52321B] tabular-nums">
              <a href={`tel:${settings.phoneTel}`} className="hover:text-[#CFA878] transition-colors">
                {settings.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="bg-white p-8 border border-[#CFA878]/40 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border border-[#CFA878] flex items-center justify-center text-[#CFA878] mx-auto">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="font-serif-display text-2xl font-bold text-[#52321B]">
              VISIT US
            </h2>
            <p className="text-sm text-[#52321B]/85 leading-relaxed">
              Sarwar Rd, Barakahu, Islamabad
            </p>
          </div>

          <div className="bg-white p-8 border border-[#CFA878]/40 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border border-[#CFA878] flex items-center justify-center text-[#CFA878] mx-auto">
              <Instagram className="w-5 h-5" />
            </div>
            <h2 className="font-serif-display text-2xl font-bold text-[#52321B]">
              FOLLOW US
            </h2>
            <div className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider text-[#52321B]">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#CFA878] underline decoration-[#CFA878] underline-offset-4"
              >
                Instagram
              </a>
              <span className="text-[#CFA878]">&amp;</span>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#CFA878] underline decoration-[#CFA878] underline-offset-4"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION & CONTACT FORM */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 bg-[#FDFAF5] border-t border-[#CFA878]/25">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-6 bg-[#F5EDE1] p-8 border border-[#CFA878]/40">
            <AbbasiLogo variant="horizontal" size="sm" />
            <div className="h-[1px] w-16 bg-[#CFA878]" aria-hidden="true" />
            <h3 className="font-serif-display text-3xl font-bold text-[#52321B]">
              Abbasi Bakers &amp; Sweets
            </h3>

            <div className="space-y-4 text-sm text-[#52321B]">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#CFA878] mb-1">
                  Phone
                </span>
                <a
                  href={`tel:${settings.phoneTel}`}
                  className="text-base font-semibold hover:text-[#CFA878] tabular-nums"
                >
                  {settings.phoneDisplay}
                </a>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#CFA878] mb-1">
                  Address
                </span>
                <p className="text-base leading-relaxed">
                  Sarwar Rd, Barakahu, Islamabad, Pakistan
                </p>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#CFA878] mb-1">
                  Official Social Channels
                </span>
                <div className="flex items-center gap-4 pt-1">
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#52321B] hover:text-[#CFA878]"
                  >
                    <Instagram className="w-4 h-4 text-[#CFA878]" />
                    Instagram
                  </a>
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#52321B] hover:text-[#CFA878]"
                  >
                    <Facebook className="w-4 h-4 text-[#CFA878]" />
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 border border-[#CFA878]/40">
            <h3 className="font-serif-display text-3xl font-bold text-[#52321B] mb-6">
              Send Us a Message
            </h3>

            {sent ? (
              <div className="p-8 bg-[#FDFAF5] border border-[#CFA878] text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-[#CFA878] mx-auto" />
                <h4 className="font-serif-display text-2xl font-bold text-[#52321B]">
                  Message Received
                </h4>
                <p className="text-sm text-[#52321B]/80">
                  Thank you, {contactForm.fullName}. Our team at Abbasi Bakers &amp; Sweets will respond to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#CFA878] underline cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.fullName}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#FDFAF5] border border-[#CFA878]/70 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#FDFAF5] border border-[#CFA878]/70 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#FDFAF5] border border-[#CFA878]/70 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#FDFAF5] border border-[#CFA878]/70 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#FDFAF5] border border-[#CFA878]/70 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3.5 px-8 bg-[#52321B] hover:bg-[#CFA878] text-white hover:text-[#52321B] text-xs font-bold tracking-[0.2em] uppercase transition-colors cursor-pointer whitespace-nowrap"
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* GOOGLE MAP */}
      <section className="py-14 px-4 sm:px-8 bg-[#F5EDE1] border-t border-[#CFA878]/30">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#CFA878]">
                Directions
              </span>
              <h2 className="font-serif-display text-3xl font-bold text-[#52321B]">
                Sarwar Rd, Barakahu, Islamabad, Pakistan
              </h2>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sarwar+Rd+Barakahu+Islamabad+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:self-auto py-3 px-6 bg-[#52321B] text-white text-xs font-semibold tracking-[0.18em] uppercase inline-flex items-center gap-2 hover:bg-[#CFA878] hover:text-[#52321B] transition-colors whitespace-nowrap"
            >
              GET DIRECTIONS
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-2 bg-white border border-[#CFA878]">
            <iframe
              title="Google Map - Sarwar Rd, Barakahu, Islamabad, Pakistan"
              src="https://www.google.com/maps?q=Sarwar+Rd,+Barakahu,+Islamabad,+Pakistan&output=embed"
              className="w-full h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#52321B] text-[#FDFAF5] text-center border-t-2 border-[#CFA878]">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold">
            Let’s Make Your Celebration Special
          </h2>
          <div>
            <button
              type="button"
              onClick={() => onNavigate('/order-online')}
              className="py-3.5 px-8 bg-[#CFA878] text-[#52321B] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
