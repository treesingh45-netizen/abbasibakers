import React, { useState } from 'react';
import {
  X,
  MapPin,
  Navigation,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Eye,
  Check,
  Edit3,
  Truck,
  Store,
  Settings,
  RotateCcw,
} from 'lucide-react';
import { AbbasiLogo } from './AbbasiLogo';
import {
  BakeryProduct,
  CategoryFeature,
  MenuCategory,
  BARAKAHU_LOCATIONS,
  StoreSettings,
  IMAGES,
} from '../data/bakeryData';

export interface CartItem {
  product: BakeryProduct;
  selectedSize: string;
  unitPrice: number;
  quantity: number;
}

function resolveBundledImageSrc(src: string): string {
  if (!src) return IMAGES.heroCelebrationCake;
  if (src.includes('hero_celebration_cake')) return IMAGES.heroCelebrationCake;
  if (src.includes('chocolate_fudge_cake')) return IMAGES.chocolateFudgeCake;
  if (src.includes('red_velvet_cream_cake')) return IMAGES.redVelvetCake;
  if (src.includes('pakistani_traditional_mithai')) return IMAGES.traditionalMithai;
  if (src.includes('bakery_patisserie_assortment')) return IMAGES.bakeryAssortment;
  return src;
}

export const BakeryImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = resolveBundledImageSrc(src);

  if (hasError || !resolvedSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EDE1] to-[#FDFAF5] text-[#52321B] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <AbbasiLogo variant="badge" size="md" />
        <span className="mt-3 font-serif-display text-sm font-semibold text-[#52321B] line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};

interface ProductCardProps {
  product: BakeryProduct;
  showSamplePrices: boolean;
  isCmsMode: boolean;
  onAddToCart: (product: BakeryProduct, sizeLabel?: string, price?: number, qty?: number) => void;
  onQuickView: (product: BakeryProduct) => void;
  onEditProduct?: (product: BakeryProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showSamplePrices,
  isCmsMode,
  onAddToCart,
  onQuickView,
  onEditProduct,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    const defaultSize = product.sizes[0]?.label || 'Standard';
    const defaultPrice = product.sizes[0]?.price || product.price;
    onAddToCart(product, defaultSize, defaultPrice, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="group bg-white border border-[#CFA878]/30 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(82,50,27,0.12)]">
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5EDE1]">
          <BakeryImage
            src={product.image}
            alt={`${product.name} - Abbasi Bakers & Sweets Barakahu Islamabad`}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          {isCmsMode && onEditProduct && (
            <button
              type="button"
              onClick={() => onEditProduct(product)}
              className="absolute top-3 right-3 bg-[#52321B] text-[#FDFAF5] px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 border border-[#CFA878] shadow-sm hover:bg-[#3d2413] transition-colors whitespace-nowrap"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#CFA878]" />
              Edit Product
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase text-[#CFA878] mb-2">
            <span>{product.category}</span>
            {product.isBestSeller && (
              <>
                <span aria-hidden="true" className="text-[#52321B]/30">·</span>
                <span className="text-[#52321B]/75">Customer Favorite</span>
              </>
            )}
          </div>

          <h3 className="font-serif-display text-2xl font-semibold text-[#52321B] leading-snug mb-2">
            {product.name}
          </h3>

          <p className="text-sm text-[#52321B]/75 leading-relaxed line-clamp-2 mb-4">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Price & Contiguous Action Footer */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-[#CFA878]/20 flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-2">
          {showSamplePrices ? (
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-[#52321B] tabular-nums">
                PKR {product.price.toLocaleString()}
              </span>
              <span className="text-xs text-[#52321B]/60">
                · {product.sizes[0]?.label || 'Standard'}
              </span>
            </div>
          ) : (
            <span className="text-sm font-medium text-[#CFA878]">
              Freshly Prepared · Price on Selection
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleAdd}
            className="py-2.5 px-3 bg-[#52321B] text-white text-xs font-semibold tracking-wider uppercase border border-[#52321B] hover:bg-[#CFA878] hover:border-[#CFA878] hover:text-[#52321B] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                Add to Cart
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="py-2.5 px-3 bg-[#FDFAF5] text-[#52321B] text-xs font-semibold tracking-wider uppercase border border-[#52321B]/40 hover:border-[#52321B] hover:bg-[#F5EDE1] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 shrink-0 text-[#CFA878]" />
            Quick View
          </button>
        </div>
      </div>
    </article>
  );
};

interface LocationPopupProps {
  isOpen: boolean;
  orderType: 'DELIVERY' | 'TAKEAWAY';
  selectedLocation: string;
  onClose: () => void;
  onSave: (orderType: 'DELIVERY' | 'TAKEAWAY', location: string) => void;
}

export const LocationPopup: React.FC<LocationPopupProps> = ({
  isOpen,
  orderType: initialOrderType,
  selectedLocation: initialLocation,
  onClose,
  onSave,
}) => {
  const [mode, setMode] = useState<'DELIVERY' | 'TAKEAWAY'>(initialOrderType);
  const [location, setLocation] = useState(initialLocation || 'Barakahu, Islamabad');
  const [locating, setLocating] = useState(false);
  const [geoStatus, setGeoStatus] = useState('');

  if (!isOpen) return null;

  const handleUseCurrentLocation = () => {
    setLocating(true);
    setGeoStatus('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation('Sarwar Rd, Barakahu, Islamabad');
          setGeoStatus('Location detected near Barakahu, Islamabad');
          setLocating(false);
        },
        () => {
          setLocation('Barakahu, Islamabad');
          setGeoStatus('Defaulted to Barakahu, Islamabad service area');
          setLocating(false);
        },
        { timeout: 4000 }
      );
    } else {
      setLocation('Barakahu, Islamabad');
      setGeoStatus('Selected Barakahu, Islamabad');
      setLocating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#52321B]/60 backdrop-blur-[2px] p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-popup-title"
    >
      <div className="relative w-full max-w-lg bg-[#FDFAF5] border-2 border-[#CFA878] shadow-2xl rounded-xl p-6 sm:p-8 text-[#52321B]">
        {/* Close Button X */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close location popup"
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[#52321B]/70 hover:text-[#52321B] hover:bg-[#F5EDE1] rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Identity Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <AbbasiLogo variant="badge" size="md" />
          <p className="mt-3 text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
            ABBASI BAKERS &amp; SWEETS
          </p>
          <h2
            id="location-popup-title"
            className="mt-2 font-serif-display text-2xl sm:text-3xl font-bold text-[#52321B]"
          >
            Where Would You Like to Order From?
          </h2>
          <p className="mt-1.5 text-sm text-[#52321B]/75">
            Select your preferred order option to continue.
          </p>
        </div>

        {/* Order Options: DELIVERY | TAKEAWAY */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setMode('DELIVERY')}
            className={`py-3.5 px-4 rounded-lg border text-xs font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              mode === 'DELIVERY'
                ? 'bg-[#52321B] text-white border-[#52321B] shadow-sm'
                : 'bg-white text-[#52321B] border-[#CFA878]/60 hover:bg-[#F5EDE1]'
            }`}
          >
            <Truck className="w-4 h-4 text-[#CFA878] shrink-0" />
            DELIVERY
          </button>

          <button
            type="button"
            onClick={() => setMode('TAKEAWAY')}
            className={`py-3.5 px-4 rounded-lg border text-xs font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              mode === 'TAKEAWAY'
                ? 'bg-[#52321B] text-white border-[#52321B] shadow-sm'
                : 'bg-white text-[#52321B] border-[#CFA878]/60 hover:bg-[#F5EDE1]'
            }`}
          >
            <Store className="w-4 h-4 text-[#CFA878] shrink-0" />
            TAKEAWAY
          </button>
        </div>

        {/* Select Your Location */}
        <div className="space-y-3 mb-6">
          <label
            htmlFor="popup-location-select"
            className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#52321B]"
          >
            Select Your Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#CFA878] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="popup-location-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#CFA878] rounded-lg text-sm font-medium text-[#52321B] focus:outline-none focus:ring-2 focus:ring-[#CFA878]"
            >
              {BARAKAHU_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={locating}
            className="w-full py-2.5 px-4 bg-[#F5EDE1] hover:bg-[#CFA878]/25 text-[#52321B] border border-[#CFA878]/60 rounded-lg text-xs font-semibold tracking-[0.14em] uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Navigation className="w-3.5 h-3.5 text-[#CFA878]" />
            {locating ? 'DETECTING LOCATION...' : 'USE CURRENT LOCATION'}
          </button>

          {geoStatus && (
            <p className="text-xs text-[#52321B]/80 text-center">{geoStatus}</p>
          )}
        </div>

        {/* Primary Button: CONTINUE */}
        <button
          type="button"
          onClick={() => onSave(mode, location)}
          className="w-full py-3.5 px-6 bg-[#52321B] hover:bg-[#CFA878] text-white hover:text-[#52321B] font-semibold text-xs tracking-[0.2em] uppercase rounded-lg border border-[#52321B] transition-colors cursor-pointer"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

interface QuickViewModalProps {
  product: BakeryProduct | null;
  showSamplePrices: boolean;
  onClose: () => void;
  onAddToCart: (product: BakeryProduct, sizeLabel: string, unitPrice: number, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  showSamplePrices,
  onClose,
  onAddToCart,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const activeSize = product.sizes[selectedSizeIndex] || {
    label: 'Standard',
    price: product.price,
  };

  const handleAdd = () => {
    onAddToCart(product, activeSize.label, activeSize.price, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#52321B]/60 backdrop-blur-[2px] p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
    >
      <div className="relative w-full max-w-3xl bg-[#FDFAF5] border border-[#CFA878] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-3 right-3 z-10 w-10 h-10 bg-[#FDFAF5]/90 hover:bg-[#52321B] text-[#52321B] hover:text-white flex items-center justify-center border border-[#CFA878]/40 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="aspect-[4/3] md:aspect-auto md:h-full bg-[#F5EDE1]">
          <BakeryImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details & Contiguous Purchase Module */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#CFA878] mb-2">
              {product.category} · Abbasi Bakers &amp; Sweets
            </div>
            <h2
              id="quickview-title"
              className="font-serif-display text-3xl font-bold text-[#52321B] mb-3"
            >
              {product.name}
            </h2>
            {showSamplePrices && (
              <p className="text-xl font-semibold text-[#52321B] tabular-nums mb-4">
                PKR {activeSize.price.toLocaleString()}{' '}
                <span className="text-xs font-normal text-[#52321B]/60">
                  ({activeSize.label})
                </span>
              </p>
            )}
            <p className="text-sm text-[#52321B]/80 leading-relaxed mb-6">
              {product.fullDescription}
            </p>

            {/* Available Sizes */}
            <div className="mb-6">
              <span className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#52321B] mb-2.5">
                Available Sizes / Weight
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz, idx) => (
                  <button
                    key={sz.label}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`px-3.5 py-2 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                      selectedSizeIndex === idx
                        ? 'bg-[#52321B] text-white border-[#52321B]'
                        : 'bg-white text-[#52321B] border-[#CFA878]/60 hover:bg-[#F5EDE1]'
                    }`}
                  >
                    {sz.label}
                    {showSamplePrices ? ` — PKR ${sz.price.toLocaleString()}` : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="pt-4 border-t border-[#CFA878]/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#52321B]">
                Quantity
              </span>
              <div className="inline-flex items-center border border-[#CFA878]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 flex items-center justify-center text-[#52321B] hover:bg-[#F5EDE1] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-9 h-9 flex items-center justify-center text-[#52321B] hover:bg-[#F5EDE1] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="w-full py-3.5 px-6 bg-[#52321B] hover:bg-[#CFA878] text-white hover:text-[#52321B] text-xs font-semibold tracking-[0.18em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
              {showSamplePrices
                ? ` · PKR ${(activeSize.price * quantity).toLocaleString()}`
                : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  orderType: 'DELIVERY' | 'TAKEAWAY';
  deliveryFee: number;
  onClose: () => void;
  onUpdateQty: (productId: string, sizeLabel: string, delta: number) => void;
  onRemove: (productId: string, sizeLabel: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  orderType,
  deliveryFee,
  onClose,
  onUpdateQty,
  onRemove,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const fee = orderType === 'DELIVERY' && items.length > 0 ? deliveryFee : 0;
  const total = subtotal + fee;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#52321B]/50 backdrop-blur-[2px] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      <div className="w-full max-w-md bg-[#FDFAF5] h-full flex flex-col justify-between border-l border-[#CFA878] shadow-2xl">
        {/* Top Bar */}
        <div className="p-6 border-b border-[#CFA878]/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#CFA878]">
              Abbasi Bakers &amp; Sweets
            </span>
            <h2 className="font-serif-display text-2xl font-bold text-[#52321B]">
              Your Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping cart"
            className="w-10 h-10 flex items-center justify-center text-[#52321B] hover:bg-[#F5EDE1] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#CFA878] mx-auto stroke-[1.5]" />
              <h3 className="font-serif-display text-2xl font-semibold text-[#52321B]">
                Your Bag Is Empty
              </h3>
              <p className="text-sm text-[#52321B]/70 max-w-xs mx-auto">
                Explore our freshly baked celebration cakes, traditional Pakistani mithai, and bakery treats.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4 bg-white p-4 border border-[#CFA878]/30"
              >
                <div className="w-20 h-20 bg-[#F5EDE1] shrink-0 overflow-hidden">
                  <BakeryImage
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif-display text-lg font-bold text-[#52321B] truncate">
                      {item.product.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onRemove(item.product.id, item.selectedSize)}
                      aria-label={`Remove ${item.product.name}`}
                      className="text-[#52321B]/50 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#52321B]/65 mb-2">
                    Size: {item.selectedSize} · PKR {item.unitPrice.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center border border-[#CFA878]/60">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.product.id, item.selectedSize, -1)}
                        className="w-7 h-7 flex items-center justify-center text-[#52321B] hover:bg-[#F5EDE1] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.product.id, item.selectedSize, 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#52321B] hover:bg-[#F5EDE1] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-[#52321B] tabular-nums">
                      PKR {(item.unitPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary & Actions */}
        <div className="p-6 bg-[#F5EDE1] border-t border-[#CFA878]/40 space-y-4">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-[#52321B]/80">
              <span>Subtotal</span>
              <span className="font-medium tabular-nums">PKR {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#52321B]/80">
              <span>Delivery Fee ({orderType})</span>
              <span className="font-medium tabular-nums">
                {fee === 0 ? 'Free / Takeaway' : `PKR ${fee.toLocaleString()}`}
              </span>
            </div>
            <div className="pt-2 border-t border-[#CFA878]/30 flex justify-between text-base font-bold text-[#52321B]">
              <span>Total</span>
              <span className="tabular-nums">PKR {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              type="button"
              onClick={onProceedToCheckout}
              disabled={items.length === 0}
              className="w-full py-3.5 px-5 bg-[#52321B] hover:bg-[#CFA878] disabled:opacity-40 text-white hover:text-[#52321B] text-xs font-semibold tracking-[0.18em] uppercase transition-colors cursor-pointer whitespace-nowrap"
            >
              PROCEED TO CHECKOUT
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-5 bg-[#FDFAF5] hover:bg-white text-[#52321B] border border-[#52321B] text-xs font-semibold tracking-[0.18em] uppercase transition-colors cursor-pointer whitespace-nowrap"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CmsModalProps {
  isOpen: boolean;
  products: BakeryProduct[];
  categories: CategoryFeature[];
  settings: StoreSettings;
  editingProduct: BakeryProduct | null;
  onClose: () => void;
  onSaveProduct: (product: BakeryProduct) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateCategory: (category: CategoryFeature) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
  onResetDefaults: () => void;
}

export const CmsModal: React.FC<CmsModalProps> = ({
  isOpen,
  products,
  categories,
  settings,
  editingProduct,
  onClose,
  onSaveProduct,
  onDeleteProduct,
  onUpdateSettings,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [draft, setDraft] = useState<BakeryProduct>(
    editingProduct || {
      id: `prod-${Date.now()}`,
      name: '',
      category: 'Cakes',
      shortDescription: '',
      fullDescription: '',
      price: 1500,
      unitLabel: '1 Pound',
      sizes: [{ label: '1 Pound', price: 1500 }],
      image: IMAGES.chocolateFudgeCake,
      isBestSeller: false,
    }
  );

  React.useEffect(() => {
    if (editingProduct) {
      setDraft(editingProduct);
      setActiveTab('products');
    }
  }, [editingProduct]);

  if (!isOpen) return null;

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    const updatedSizes =
      draft.sizes.length > 0
        ? [{ ...draft.sizes[0], price: Number(draft.price) }, ...draft.sizes.slice(1)]
        : [{ label: 'Standard', price: Number(draft.price) }];
    onSaveProduct({
      ...draft,
      price: Number(draft.price),
      sizes: updatedSizes,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#52321B]/60 backdrop-blur-[2px] p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Bakery CMS Editor"
    >
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#FDFAF5] border-2 border-[#CFA878] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#52321B] text-[#FDFAF5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-[#CFA878]" />
            <div>
              <h2 className="font-serif-display text-2xl font-bold">
                Abbasi Bakers CMS Manager
              </h2>
              <p className="text-xs text-[#CFA878]">
                Edit products, prices, images, categories &amp; social links live
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-[#FDFAF5] hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#CFA878]/30 bg-[#F5EDE1] px-6 pt-3 gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#FDFAF5] text-[#52321B] border-t-2 border-[#CFA878]'
                : 'text-[#52321B]/70 hover:text-[#52321B]'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#FDFAF5] text-[#52321B] border-t-2 border-[#CFA878]'
                : 'text-[#52321B]/70 hover:text-[#52321B]'
            }`}
          >
            Store Settings &amp; Social Links
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'products' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Product Editor Form */}
              <form onSubmit={handleProductSubmit} className="lg:col-span-6 space-y-4 bg-white p-5 border border-[#CFA878]/40">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-display text-xl font-bold text-[#52321B]">
                    {products.some((p) => p.id === draft.id) ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        id: `prod-${Date.now()}`,
                        name: '',
                        category: 'Cakes',
                        shortDescription: '',
                        fullDescription: '',
                        price: 1500,
                        unitLabel: '1 Pound',
                        sizes: [{ label: '1 Pound', price: 1500 }],
                        image: IMAGES.chocolateFudgeCake,
                        isBestSeller: false,
                      })
                    }
                    className="text-xs font-semibold text-[#CFA878] hover:underline cursor-pointer"
                  >
                    + New Blank Product
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#CFA878]/60 text-sm"
                    placeholder="e.g. Pistachio Kunafa Cake"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={draft.category}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          category: e.target.value as Exclude<MenuCategory, 'All'>,
                        })
                      }
                      className="w-full px-3 py-2 border border-[#CFA878]/60 text-sm bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.filterKey}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                      Price (PKR)
                    </label>
                    <input
                      type="number"
                      min={0}
                      required
                      value={draft.price}
                      onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-[#CFA878]/60 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                    Preset Bakery Image or Custom URL
                  </label>
                  <select
                    value={draft.image}
                    onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                    className="w-full px-3 py-2 border border-[#CFA878]/60 text-sm bg-white mb-2"
                  >
                    <option value={IMAGES.chocolateFudgeCake}>Signature Chocolate Fudge Cake</option>
                    <option value={IMAGES.redVelvetCake}>Red Velvet &amp; Fresh Cream Cake</option>
                    <option value={IMAGES.heroCelebrationCake}>Gold Celebration Tiered Cake</option>
                    <option value={IMAGES.traditionalMithai}>Traditional Pakistani Mithai</option>
                    <option value={IMAGES.bakeryAssortment}>Bakery &amp; Cupcakes Assortment</option>
                  </select>
                  <input
                    type="text"
                    value={draft.image}
                    onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                    className="w-full px-3 py-2 border border-[#CFA878]/60 text-xs"
                    placeholder="Or paste custom image URL..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={draft.shortDescription}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        shortDescription: e.target.value,
                        fullDescription: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#CFA878]/60 text-sm"
                  />
                </div>

                <label className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(draft.isBestSeller)}
                    onChange={(e) => setDraft({ ...draft, isBestSeller: e.target.checked })}
                  />
                  Feature in Homepage &ldquo;Customer Favorites&rdquo;
                </label>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#52321B] hover:bg-[#CFA878] text-white hover:text-[#52321B] text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Save Product to Menu
                </button>
              </form>

              {/* Existing Products List */}
              <div className="lg:col-span-6 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 p-3 bg-white border border-[#CFA878]/30"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BakeryImage
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 object-cover shrink-0 bg-[#F5EDE1]"
                      />
                      <div className="min-w-0">
                        <p className="font-serif-display font-bold text-base text-[#52321B] truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-[#52321B]/70 tabular-nums">
                          {p.category} · PKR {p.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setDraft(p)}
                        className="px-2.5 py-1.5 text-xs font-medium bg-[#F5EDE1] hover:bg-[#CFA878] text-[#52321B] cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-[#52321B]/50 hover:text-red-700 cursor-pointer"
                        aria-label={`Delete ${p.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-xl space-y-4 bg-white p-6 border border-[#CFA878]/40">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Official Instagram Link
                </label>
                <input
                  type="url"
                  value={settings.instagramUrl}
                  onChange={(e) => onUpdateSettings({ ...settings, instagramUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-[#CFA878]/60 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Official Facebook Link
                </label>
                <input
                  type="url"
                  value={settings.facebookUrl}
                  onChange={(e) => onUpdateSettings({ ...settings, facebookUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-[#CFA878]/60 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Standard Delivery Fee (PKR)
                </label>
                <input
                  type="number"
                  value={settings.deliveryFee}
                  onChange={(e) =>
                    onUpdateSettings({ ...settings, deliveryFee: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-[#CFA878]/60 text-sm"
                />
              </div>
              <div className="pt-2">
                <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showSamplePrices}
                    onChange={(e) =>
                      onUpdateSettings({ ...settings, showSamplePrices: e.target.checked })
                    }
                  />
                  Display sample prices on product cards
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5EDE1] border-t border-[#CFA878]/40 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetDefaults}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#52321B]/75 hover:text-[#52321B] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Sample Catalog
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#52321B] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
