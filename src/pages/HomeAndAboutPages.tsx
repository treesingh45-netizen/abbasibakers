import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Award,
  Gift,
  HeartHandshake,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  ExternalLink,
  MapPinned,
} from 'lucide-react';
import { AbbasiLogo, WheatDivider } from '../components/AbbasiLogo';
import { BakeryImage, ProductCard } from '../components/SharedModals';
import {
  BakeryProduct,
  CategoryFeature,
  IMAGES,
  MenuCategory,
  StoreSettings,
  GALLERY_ITEMS,
} from '../data/bakeryData';

export type PageRoute =
  | '/'
  | '/about-us'
  | '/menu'
  | '/cakes'
  | '/gallery'
  | '/order-online'
  | '/contact';

interface HomePageProps {
  products: BakeryProduct[];
  categories: CategoryFeature[];
  settings: StoreSettings;
  isCmsMode: boolean;
  orderType: 'DELIVERY' | 'TAKEAWAY';
  selectedLocation: string;
  onNavigate: (route: PageRoute, categoryFilter?: MenuCategory) => void;
  onOpenLocationPopup: () => void;
  onAddToCart: (product: BakeryProduct, size?: string, price?: number, qty?: number) => void;
  onQuickView: (product: BakeryProduct) => void;
  onEditProduct: (product: BakeryProduct) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  settings,
  isCmsMode,
  orderType,
  selectedLocation,
  onNavigate,
  onOpenLocationPopup,
  onAddToCart,
  onQuickView,
  onEditProduct,
}) => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 6);
  const traditionalSweets = products.filter((p) => p.isTraditionalSweet || p.category === 'Sweets').slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Subtle Interactive Order Mode Bar */}
      <div className="bg-[#F5EDE1] border-b border-[#CFA878]/30 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-[#52321B]">
          <div className="flex items-center gap-2">
            <MapPinned className="w-3.5 h-3.5 text-[#CFA878] shrink-0" />
            <span>
              Ordering Preference: <strong className="font-semibold">{orderType}</strong>
              <span className="mx-1.5 text-[#CFA878]">·</span>
              <span>{selectedLocation}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenLocationPopup}
            className="font-semibold uppercase tracking-[0.14em] text-[#52321B] underline decoration-[#CFA878] underline-offset-4 hover:text-[#CFA878] transition-colors cursor-pointer whitespace-nowrap"
          >
            Change Order Option / Location
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative bg-[#FDFAF5] py-12 sm:py-20 lg:py-24 px-4 sm:px-8 border-b border-[#CFA878]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-3">
              <AbbasiLogo variant="badge" size="sm" />
              <span className="h-[1px] w-8 bg-[#CFA878]" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-[0.26em] uppercase text-[#CFA878]">
                ABBASI BAKERS &amp; SWEETS
              </span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#52321B] leading-[1.08]">
              Freshly Baked.
              <br />
              Made for Every Celebration.
            </h1>

            <div className="h-[1px] w-24 bg-[#CFA878]" aria-hidden="true" />

            <p className="text-base sm:text-lg text-[#52321B]/80 leading-relaxed max-w-xl">
              From beautiful cakes and traditional sweets to freshly prepared bakery favorites, Abbasi Bakers &amp; Sweets brings something special to every occasion in Islamabad.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/order-online')}
                className="py-3.5 px-7 bg-[#52321B] text-white text-xs font-semibold tracking-[0.2em] uppercase border border-[#52321B] hover:bg-[#CFA878] hover:border-[#CFA878] hover:text-[#52321B] transition-colors cursor-pointer whitespace-nowrap"
              >
                ORDER NOW
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/menu')}
                className="py-3.5 px-7 bg-transparent text-[#52321B] text-xs font-semibold tracking-[0.2em] uppercase border border-[#52321B] hover:bg-[#F5EDE1] transition-colors cursor-pointer whitespace-nowrap"
              >
                EXPLORE MENU
              </button>
            </div>

            {/* Quiet Unboxed Metadata */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-[#52321B]/70">
              <span>Sarwar Rd, Barakahu, Islamabad</span>
              <span aria-hidden="true" className="text-[#CFA878]">·</span>
              <span>Freshly Prepared Daily</span>
              <span aria-hidden="true" className="text-[#CFA878]">·</span>
              <span>Delivery &amp; Takeaway</span>
            </div>
          </div>

          {/* Right Hero Photography */}
          <div className="lg:col-span-6">
            <div className="relative p-3 sm:p-4 bg-white border border-[#CFA878]/50 shadow-[0_20px_50px_-20px_rgba(82,50,27,0.18)]">
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#F5EDE1]">
                <BakeryImage
                  src={IMAGES.heroCelebrationCake}
                  alt="Signature celebration cake by Abbasi Bakers & Sweets in Barakahu Islamabad"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#52321B]/75 px-1">
                <span className="font-serif-display italic text-sm text-[#52321B]">
                  Handcrafted Cakes &amp; Traditional Mithai
                </span>
                <span className="font-urdu text-sm text-[#CFA878]">عباسی بیکرز اینڈ سویٹس</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
              Curated Selection
            </span>
            <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#52321B]">
              Explore Our Favorites
            </h2>
            <WheatDivider className="mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group bg-white border border-[#CFA878]/35 flex flex-col justify-between overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5EDE1]">
                    <BakeryImage
                      src={cat.image}
                      alt={`${cat.name} at Abbasi Bakers & Sweets Barakahu`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif-display text-2xl font-bold text-[#52321B] mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-[#52321B]/75 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-[#CFA878]/20">
                  <button
                    type="button"
                    onClick={() => onNavigate('/menu', cat.filterKey)}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#52321B] group-hover:text-[#CFA878] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    View Collection
                    <ArrowRight className="w-3.5 h-3.5 text-[#CFA878]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F5EDE1] border-y border-[#CFA878]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
                Signature Creations
              </span>
              <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#52321B]">
                Customer Favorites
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/menu')}
              className="self-start md:self-auto py-3 px-6 bg-[#FDFAF5] text-[#52321B] border border-[#52321B] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#52321B] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              VIEW FULL MENU
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showSamplePrices={settings.showSamplePrices}
                isCmsMode={isCmsMode}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onEditProduct={onEditProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ABBASI */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
              Our Bakery Standard
            </span>
            <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#52321B]">
              Made With Care, Served With Love
            </h2>
            <WheatDivider className="mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Freshly Prepared',
                desc: 'Baked and prepared daily in our Barakahu kitchen for peak flavor and softness.',
              },
              {
                icon: Award,
                title: 'Quality Ingredients',
                desc: 'Selected cocoa, pure dairy cream, aromatic cardamom, and roasted nuts in every batch.',
              },
              {
                icon: Gift,
                title: 'Beautiful Presentation',
                desc: 'Thoughtfully finished cakes and gift-ready sweet boxes worthy of your guests.',
              },
              {
                icon: HeartHandshake,
                title: 'Made for Every Occasion',
                desc: 'From intimate family tea to grand weddings, birthdays, and festive gatherings.',
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-7 border border-[#CFA878]/35 text-center flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full border border-[#CFA878] flex items-center justify-center text-[#CFA878] mb-5">
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#52321B] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#52321B]/75 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CELEBRATION SECTION (Split Layout) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F5EDE1] border-t border-[#CFA878]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="p-3 bg-white border border-[#CFA878]/50">
              <div className="aspect-[4/3] overflow-hidden bg-[#FDFAF5]">
                <BakeryImage
                  src={IMAGES.redVelvetCake}
                  alt="Celebration cakes at Abbasi Bakers & Sweets Islamabad"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
              Bespoke &amp; Signature Cakes
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#52321B] leading-tight">
              Make Every Celebration Sweeter
            </h2>
            <div className="h-[1px] w-20 bg-[#CFA878]" aria-hidden="true" />
            <p className="text-base sm:text-lg text-[#52321B]/80 leading-relaxed">
              Birthdays, anniversaries, weddings, family gatherings or simple moments worth celebrating — choose something delicious from Abbasi Bakers &amp; Sweets.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/cakes')}
                className="py-3.5 px-7 bg-[#52321B] text-white text-xs font-semibold tracking-[0.2em] uppercase border border-[#52321B] hover:bg-[#CFA878] hover:border-[#CFA878] hover:text-[#52321B] transition-colors cursor-pointer whitespace-nowrap"
              >
                ORDER YOUR CAKE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRADITIONAL SWEETS */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FDFAF5] border-t border-[#CFA878]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
              Authentic Pakistani Mithai
            </span>
            <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#52321B]">
              A Taste of Tradition
            </h2>
            <p className="mt-3 text-base text-[#52321B]/75">
              Enjoy classic Pakistani sweets prepared for celebrations, gatherings and everyday cravings.
            </p>
            <WheatDivider className="mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {traditionalSweets.map((sweet) => (
              <ProductCard
                key={sweet.id}
                product={sweet}
                showSamplePrices={settings.showSamplePrices}
                isCmsMode={isCmsMode}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onEditProduct={onEditProduct}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('/menu', 'Sweets')}
              className="py-3.5 px-8 bg-[#52321B] text-white text-xs font-semibold tracking-[0.2em] uppercase border border-[#52321B] hover:bg-[#CFA878] hover:border-[#CFA878] hover:text-[#52321B] transition-colors cursor-pointer whitespace-nowrap"
            >
              VIEW SWEETS
            </button>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F5EDE1] border-t border-[#CFA878]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
                Connect With Us
              </span>
              <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl font-bold text-[#52321B]">
                Follow Abbasi Bakers &amp; Sweets
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#52321B]/75">
                See our latest cakes, sweets, bakery creations and special offers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-white text-[#52321B] border border-[#CFA878] text-xs font-semibold tracking-wider uppercase flex items-center gap-2 hover:bg-[#52321B] hover:text-white transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4 text-[#CFA878]" />
                Instagram
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-white text-[#52321B] border border-[#CFA878] text-xs font-semibold tracking-wider uppercase flex items-center gap-2 hover:bg-[#52321B] hover:text-white transition-colors whitespace-nowrap"
              >
                <Facebook className="w-4 h-4 text-[#CFA878]" />
                Facebook
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {GALLERY_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate('/gallery')}
                className="group relative aspect-square overflow-hidden bg-white border border-[#CFA878]/30 cursor-pointer"
              >
                <BakeryImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#52321B]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                  <span className="text-xs font-medium text-[#FDFAF5] line-clamp-2">
                    {item.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FDFAF5] border-t border-[#CFA878]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6 bg-white p-8 border border-[#CFA878]/40">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
              Our Bakery Location
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#52321B]">
              Visit Us in Barakahu
            </h2>
            <div className="h-[1px] w-16 bg-[#CFA878]" aria-hidden="true" />

            <div className="space-y-4 text-sm text-[#52321B]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#CFA878] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold uppercase tracking-wider text-xs text-[#CFA878] mb-1">
                    Address
                  </p>
                  <p className="text-base leading-relaxed">
                    Sarwar Rd,
                    <br />
                    Barakahu,
                    <br />
                    Islamabad, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#CFA878] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold uppercase tracking-wider text-xs text-[#CFA878] mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${settings.phoneTel}`}
                    className="text-base font-semibold hover:text-[#CFA878] transition-colors tabular-nums"
                  >
                    {settings.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Sarwar+Rd+Barakahu+Islamabad+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3.5 px-7 bg-[#52321B] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#CFA878] hover:text-[#52321B] transition-colors whitespace-nowrap"
              >
                GET DIRECTIONS
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-2 bg-white border border-[#CFA878]/50">
              <iframe
                title="Abbasi Bakers & Sweets - Sarwar Rd, Barakahu, Islamabad"
                src="https://www.google.com/maps?q=Sarwar+Rd,+Barakahu,+Islamabad,+Pakistan&output=embed"
                className="w-full h-[360px] sm:h-[400px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#52321B] text-[#FDFAF5] border-t-2 border-[#CFA878]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <AbbasiLogo variant="badge" size="md" theme="dark" />
          <WheatDivider light className="my-2" />
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FDFAF5] tracking-wide">
            Something Sweet Is Waiting for You
          </h2>
          <p className="text-sm sm:text-base text-[#FDFAF5]/80 max-w-xl mx-auto">
            Order your favorite celebration cakes, traditional sweets, and freshly baked treats online for delivery or takeaway in Barakahu, Islamabad.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/order-online')}
              className="py-4 px-9 bg-[#CFA878] text-[#52321B] text-xs font-bold tracking-[0.22em] uppercase hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
            >
              ORDER ONLINE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F5EDE1] border-b border-[#CFA878]/30 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#CFA878]">
            ABBASI BAKERS &amp; SWEETS
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#52321B]">
            About Abbasi Bakers &amp; Sweets
          </h1>
          <p className="text-base sm:text-lg text-[#52321B]/80">
            Where quality, tradition and celebration come together.
          </p>
          <WheatDivider className="pt-2" />
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FDFAF5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
              Barakahu, Islamabad
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#52321B]">
              Our Story
            </h2>
            <div className="h-[1px] w-20 bg-[#CFA878]" aria-hidden="true" />
            <p className="text-base text-[#52321B]/85 leading-relaxed">
              Located on Sarwar Rd in Barakahu, Islamabad, Abbasi Bakers &amp; Sweets is dedicated to bringing families, friends, and neighbors together over freshly prepared cakes, traditional Pakistani sweets, and everyday bakery favorites.
            </p>
            <p className="text-base text-[#52321B]/85 leading-relaxed">
              Every item in our display — from rich chocolate fudge cakes and airy fresh cream creations to warm Gulab Jamun, saffron Rasmalai, and crisp teatime biscuits — is prepared with care so that every visit and every order feels welcoming, trustworthy, and celebratory.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="p-3 bg-white border border-[#CFA878]/50">
              <div className="aspect-[4/3] overflow-hidden bg-[#F5EDE1]">
                <BakeryImage
                  src={IMAGES.heroCelebrationCake}
                  alt="Abbasi Bakers & Sweets craftsmanship in Barakahu Islamabad"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F5EDE1] border-y border-[#CFA878]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
              What Guides Us
            </span>
            <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl font-bold text-[#52321B]">
              Our Values
            </h2>
            <WheatDivider className="mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'QUALITY',
                desc: 'Carefully selected ingredients and attention to preparation.',
              },
              {
                title: 'FRESHNESS',
                desc: 'Products prepared with freshness and presentation in mind.',
              },
              {
                title: 'TRADITION',
                desc: 'Classic flavors alongside modern bakery creations.',
              },
            ].map((val, index) => (
              <div
                key={val.title}
                className="bg-[#FDFAF5] p-8 border border-[#CFA878]/40 text-center space-y-3"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-[#CFA878]">
                  0{index + 1}
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#52321B] tracking-wider">
                  {val.title}
                </h3>
                <div className="h-[1px] w-10 bg-[#CFA878] mx-auto" aria-hidden="true" />
                <p className="text-sm text-[#52321B]/80 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROMISE & LARGE BAKERY PHOTOGRAPHY */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FDFAF5]">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
                Our Promise
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#52321B]">
                Made for Your Special Moments
              </h2>
              <p className="text-base text-[#52321B]/80 leading-relaxed">
                We are committed to providing beautiful and delicious bakery creations and traditional sweets tailored for every occasion in your home:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  'Birthdays',
                  'Weddings',
                  'Anniversaries',
                  'Family Gatherings',
                  'Festivals',
                  'Everyday Treats',
                ].map((occasion) => (
                  <div
                    key={occasion}
                    className="p-3.5 bg-white border border-[#CFA878]/35 text-sm font-medium text-[#52321B]"
                  >
                    {occasion}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-3 bg-white border border-[#CFA878]/50">
                <div className="aspect-[4/3] overflow-hidden bg-[#F5EDE1]">
                  <BakeryImage
                    src={IMAGES.traditionalMithai}
                    alt="Traditional Pakistani sweets and celebration treats at Abbasi Bakers & Sweets"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#52321B] text-[#FDFAF5] text-center border-t-2 border-[#CFA878]">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold">
            Planning Your Next Celebration?
          </h2>
          <p className="text-sm sm:text-base text-[#FDFAF5]/80">
            Browse our full menu of freshly prepared cakes, traditional sweets, and bakery treats.
          </p>
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
