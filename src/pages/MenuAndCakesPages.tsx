import React, { useState, useRef } from 'react';
import {
  Search,
  Settings,
  Upload,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { WheatDivider } from '../components/AbbasiLogo';
import { BakeryImage, ProductCard } from '../components/SharedModals';
import {
  BakeryProduct,
  CAKE_COLLECTIONS,
  MenuCategory,
  StoreSettings,
} from '../data/bakeryData';
import { PageRoute } from './HomeAndAboutPages';

interface MenuPageProps {
  products: BakeryProduct[];
  initialCategory?: MenuCategory;
  settings: StoreSettings;
  isCmsMode: boolean;
  onToggleCmsMode: () => void;
  onOpenCmsModal: (product?: BakeryProduct) => void;
  onAddToCart: (product: BakeryProduct, size?: string, price?: number, qty?: number) => void;
  onQuickView: (product: BakeryProduct) => void;
}

const MENU_CATEGORIES: MenuCategory[] = [
  'All',
  'Cakes',
  'Bakery',
  'Sweets',
  'Cupcakes',
  'Desserts',
  'Snacks',
];

export const MenuPage: React.FC<MenuPageProps> = ({
  products,
  initialCategory = 'All',
  settings,
  isCmsMode,
  onToggleCmsMode,
  onOpenCmsModal,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 bg-[#F5EDE1] border-b border-[#CFA878]/30 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#CFA878]">
            ABBASI BAKERS &amp; SWEETS
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#52321B]">
            Our Menu
          </h1>
          <p className="text-base sm:text-lg text-[#52321B]/80">
            Discover cakes, sweets, bakery favorites and delicious treats.
          </p>
          <WheatDivider className="pt-2" />
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="py-8 px-4 sm:px-8 bg-[#FDFAF5] border-b border-[#CFA878]/25 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Horizontal Category Navigation */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0"
            role="tablist"
            aria-label="Menu Categories"
          >
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#52321B] text-white border-[#52321B]'
                    : 'bg-white text-[#52321B] border-[#CFA878]/50 hover:bg-[#F5EDE1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & CMS Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#CFA878] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes, mithai, treats..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#CFA878]/60 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
              />
            </div>

            <button
              type="button"
              onClick={onToggleCmsMode}
              className={`px-3.5 py-2 text-xs font-semibold tracking-wider uppercase border flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                isCmsMode
                  ? 'bg-[#CFA878] text-[#52321B] border-[#52321B]'
                  : 'bg-[#F5EDE1] text-[#52321B] border-[#CFA878]/60 hover:bg-[#CFA878]/30'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              {isCmsMode ? 'CMS Edit Mode: ON' : 'CMS Edit'}
            </button>

            {isCmsMode && (
              <button
                type="button"
                onClick={() => onOpenCmsModal()}
                className="px-3.5 py-2 bg-[#52321B] text-white text-xs font-semibold tracking-wider uppercase cursor-pointer whitespace-nowrap"
              >
                + Add / Manage Catalog
              </button>
            )}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#CFA878]/30 p-8">
              <h3 className="font-serif-display text-2xl font-bold text-[#52321B] mb-2">
                No Matching Treats Found
              </h3>
              <p className="text-sm text-[#52321B]/70 mb-4">
                Try selecting &ldquo;All&rdquo; categories or clearing your search filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="py-2.5 px-6 bg-[#52321B] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Show All Menu Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showSamplePrices={settings.showSamplePrices}
                  isCmsMode={isCmsMode}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  onEditProduct={(p) => onOpenCmsModal(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

interface OurCakesPageProps {
  settings: StoreSettings;
  onNavigate: (route: PageRoute, categoryFilter?: MenuCategory) => void;
}

export const OurCakesPage: React.FC<OurCakesPageProps> = ({ settings, onNavigate }) => {
  const customFormRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [referencePreview, setReferencePreview] = useState<string | null>(null);
  const [referenceFileName, setReferenceFileName] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    occasion: 'Birthday',
    flavor: 'Chocolate Fudge',
    size: '2 Pounds',
    guests: '15–20 Guests',
    preferredDesign: '',
    specialInstructions: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReferenceFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setReferencePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToCustomForm = (preselectedOccasion?: string) => {
    if (preselectedOccasion) {
      setFormData((prev) => ({ ...prev, occasion: preselectedOccasion }));
    }
    customFormRef.current?.scrollIntoView({ behavior: 'smooth' });
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
            Cakes for Every Occasion
          </h1>
          <p className="text-base sm:text-lg text-[#52321B]/80">
            Beautiful cakes made to make your special moments even sweeter.
          </p>
          <WheatDivider className="pt-2" />
        </div>
      </section>

      {/* CAKE COLLECTION (8 Categories) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {CAKE_COLLECTIONS.map((cakeCat) => (
              <div
                key={cakeCat.id}
                className="group bg-white border border-[#CFA878]/35 flex flex-col justify-between overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5EDE1]">
                    <BakeryImage
                      src={cakeCat.image}
                      alt={`${cakeCat.name} - Abbasi Bakers & Sweets Islamabad`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#CFA878] block mb-1.5">
                      {cakeCat.servingNote}
                    </span>
                    <h2 className="font-serif-display text-2xl font-bold text-[#52321B] mb-2">
                      {cakeCat.name}
                    </h2>
                    <p className="text-sm text-[#52321B]/75 leading-relaxed">
                      {cakeCat.description}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-[#CFA878]/20 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      cakeCat.id === 'cake-custom'
                        ? scrollToCustomForm('Custom Celebration')
                        : onNavigate('/menu', 'Cakes')
                    }
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#52321B] group-hover:text-[#CFA878] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 text-[#CFA878]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM CAKES BANNER */}
      <section className="py-16 px-4 sm:px-8 bg-[#52321B] text-[#FDFAF5] border-y-2 border-[#CFA878]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <span className="text-xs font-semibold tracking-[0.24em] uppercase text-[#CFA878]">
            Bespoke Cake Studio · Barakahu
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold">
            Create a Cake That Feels Personal
          </h2>
          <p className="text-base text-[#FDFAF5]/85 max-w-2xl mx-auto leading-relaxed">
            Have a special theme, color, flavor or design in mind? Share your idea with us and let us help create a cake for your celebration.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => scrollToCustomForm()}
              className="py-3.5 px-8 bg-[#CFA878] text-[#52321B] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
            >
              REQUEST CUSTOM CAKE
            </button>
          </div>
        </div>
      </section>

      {/* CUSTOM CAKE FORM */}
      <section
        ref={customFormRef}
        className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F5EDE1]"
      >
        <div className="max-w-4xl mx-auto bg-[#FDFAF5] border border-[#CFA878] p-6 sm:p-12 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#CFA878]">
              Custom Cake Inquiry
            </span>
            <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl font-bold text-[#52321B]">
              Design Your Celebration Cake
            </h2>
            <WheatDivider className="mt-3" />
          </div>

          {submitted ? (
            <div className="bg-white border border-[#CFA878] p-8 text-center space-y-5 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-[#CFA878] mx-auto" />
              <h3 className="font-serif-display text-3xl font-bold text-[#52321B]">
                Custom Cake Request Received
              </h3>
              <p className="text-sm text-[#52321B]/80 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. We have recorded your inquiry for a{' '}
                <strong>{formData.size} {formData.flavor}</strong> cake ({formData.occasion}) on{' '}
                <strong>{formData.eventDate || 'your selected date'}</strong>. Our team at Sarwar Rd, Barakahu will contact you at{' '}
                <strong className="tabular-nums">{formData.phone}</strong> shortly.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                    `Assalam-o-Alaikum Abbasi Bakers & Sweets! I submitted a Custom Cake Request:\nName: ${formData.fullName}\nPhone: ${formData.phone}\nOccasion: ${formData.occasion}\nFlavor: ${formData.flavor}\nSize: ${formData.size}\nEvent Date: ${formData.eventDate}\nDesign Notes: ${formData.preferredDesign}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-[#52321B] text-white text-xs font-semibold tracking-[0.18em] uppercase inline-flex items-center gap-2 hover:bg-[#CFA878] hover:text-[#52321B] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  SEND DETAILS ON WHATSAPP
                </a>

                <a
                  href={`tel:${settings.phoneTel}`}
                  className="py-3 px-6 bg-white text-[#52321B] border border-[#52321B] text-xs font-semibold tracking-[0.18em] uppercase inline-flex items-center gap-2 hover:bg-[#F5EDE1] transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#CFA878]" />
                  CALL {settings.phoneDisplay}
                </a>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#CFA878] underline cursor-pointer"
                >
                  Submit Another Custom Cake Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 bg-white border border-[#CFA878]/70 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="03XX XXXXXXX"
                    className="w-full px-4 py-3 bg-white border border-[#CFA878]/70 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white border border-[#CFA878]/70 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#CFA878]/70 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                    Occasion *
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#CFA878]/70 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
                  >
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding / Nikah / Walima">Wedding / Nikah / Walima</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Engagement / Bridal Shower">Engagement / Bridal Shower</option>
                    <option value="Kids Party">Kids Party</option>
                    <option value="Graduation / Corporate">Graduation / Corporate</option>
                    <option value="Family Gathering">Family Gathering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                    Cake Flavor *
                  </label>
                  <select
                    value={formData.flavor}
                    onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#CFA878]/70 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
                  >
                    <option value="Chocolate Fudge">Chocolate Fudge</option>
                    <option value="Red Velvet & Cream Cheese">Red Velvet &amp; Cream Cheese</option>
                    <option value="Black Forest">Black Forest</option>
                    <option value="Fresh Cream Pineapple">Fresh Cream Pineapple</option>
                    <option value="Belgian Dark Truffle">Belgian Dark Truffle</option>
                    <option value="Vanilla Bean Buttercream">Vanilla Bean Buttercream</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                    Cake Size *
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#CFA878]/70 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
                  >
                    <option value="2 Pounds">2 Pounds (Single Tier)</option>
                    <option value="3 Pounds">3 Pounds</option>
                    <option value="4 Pounds (Two Tier)">4 Pounds (Two Tier)</option>
                    <option value="5+ Pounds (Multi-Tier Custom)">5+ Pounds (Multi-Tier Custom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                    Number of Guests
                  </label>
                  <input
                    type="text"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    placeholder="e.g. 20 - 30 Guests"
                    className="w-full px-4 py-3 bg-white border border-[#CFA878]/70 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                  Preferred Design / Theme &amp; Colors *
                </label>
                <input
                  type="text"
                  required
                  value={formData.preferredDesign}
                  onChange={(e) => setFormData({ ...formData, preferredDesign: e.target.value })}
                  placeholder="Describe colors, floral piping, message on cake, or theme..."
                  className="w-full px-4 py-3 bg-white border border-[#CFA878]/70 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                  Special Instructions
                </label>
                <textarea
                  rows={3}
                  value={formData.specialInstructions}
                  onChange={(e) =>
                    setFormData({ ...formData, specialInstructions: e.target.value })
                  }
                  placeholder="Any dietary notes, delivery timing in Barakahu/Islamabad, or cake topper details..."
                  className="w-full px-4 py-3 bg-white border border-[#CFA878]/70 text-sm text-[#52321B] focus:outline-none focus:border-[#52321B]"
                />
              </div>

              {/* Reference Image Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#52321B] mb-2">
                  Reference Image Upload (Optional)
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#CFA878] bg-white p-6 cursor-pointer hover:bg-[#F5EDE1]/50 transition-colors">
                  <Upload className="w-6 h-6 text-[#CFA878] mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#52321B]">
                    {referenceFileName ? `Selected: ${referenceFileName}` : 'Click to Upload Reference Photo'}
                  </span>
                  <span className="text-[11px] text-[#52321B]/60 mt-1">
                    JPG, PNG or WebP cake inspiration photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {referencePreview && (
                  <div className="mt-3 flex items-center gap-3 bg-white p-2 border border-[#CFA878]/40 w-fit">
                    <img
                      src={referencePreview}
                      alt="Uploaded cake reference preview"
                      className="w-16 h-16 object-cover"
                    />
                    <span className="text-xs text-[#52321B] pr-2">Reference attached</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 bg-[#52321B] hover:bg-[#CFA878] text-white hover:text-[#52321B] text-xs font-bold tracking-[0.22em] uppercase transition-colors cursor-pointer"
              >
                SUBMIT REQUEST
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
