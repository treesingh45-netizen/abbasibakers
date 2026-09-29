export type MenuCategory =
  | 'All'
  | 'Cakes'
  | 'Bakery'
  | 'Sweets'
  | 'Cupcakes'
  | 'Desserts'
  | 'Snacks';

export interface ProductSizeOption {
  label: string;
  price: number;
}

export interface BakeryProduct {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  shortDescription: string;
  fullDescription: string;
  price: number; // Sample editable price in PKR
  unitLabel: string;
  sizes: ProductSizeOption[];
  image: string;
  isBestSeller?: boolean;
  isTraditionalSweet?: boolean;
}

export interface CategoryFeature {
  id: string;
  name: string;
  filterKey: Exclude<MenuCategory, 'All'>;
  description: string;
  image: string;
}

export interface CakeCollectionItem {
  id: string;
  name: string;
  description: string;
  servingNote: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Cakes' | 'Sweets' | 'Bakery' | 'Celebrations' | 'Custom Cakes';
  caption: string;
  image: string;
  aspect: 'tall' | 'wide' | 'square';
  relatedProductId?: string;
}

export interface StoreSettings {
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string;
  address: string;
  area: string;
  instagramUrl: string;
  facebookUrl: string;
  deliveryFee: number;
  showSamplePrices: boolean;
}

export const IMAGES = {
  heroCelebrationCake:
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=85',
  chocolateFudgeCake:
    'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=85',
  redVelvetCake:
    'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=1000&q=85',
  traditionalMithai:
    'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=1000&q=85',
  bakeryAssortment:
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85',
  celebrationFeatureCake:
    'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1200&q=85',
  aboutStoryCake:
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=85',
};

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  phoneDisplay: '0317 0035007',
  phoneTel: '+923170035007',
  whatsappNumber: '923170035007',
  address: 'Sarwar Rd, Barakahu, Islamabad, Pakistan',
  area: 'Barakahu, Islamabad',
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
  deliveryFee: 150,
  showSamplePrices: true,
};

export const BARAKAHU_LOCATIONS = [
  'Barakahu, Islamabad',
  'Sarwar Rd, Barakahu, Islamabad',
  'Main Murree Rd, Barakahu, Islamabad',
  'Athal Chowk, Barakahu, Islamabad',
  'Simly Dam Rd, Barakahu, Islamabad',
  'Bani Gala, Islamabad',
  'Chak Shahzad, Islamabad',
  'Park Road, Islamabad',
];

export const INITIAL_CATEGORIES: CategoryFeature[] = [
  {
    id: 'cat-cakes',
    name: 'Cakes',
    filterKey: 'Cakes',
    description: 'Signature chocolate fudge, red velvet, fresh cream and custom celebration cakes.',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cat-bakery',
    name: 'Bakery',
    filterKey: 'Bakery',
    description: 'Oven-fresh artisan biscuits, butter cookies, tea cakes and daily baked favorites.',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cat-sweets',
    name: 'Traditional Sweets',
    filterKey: 'Sweets',
    description: 'Authentic Pakistani mithai including warm Gulab Jamun, Rasmalai, Barfi and Jalebi.',
    image:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cat-cupcakes',
    name: 'Cupcakes',
    filterKey: 'Cupcakes',
    description: 'Hand-piped gourmet cupcakes in Belgian chocolate, red velvet and vanilla bean.',
    image:
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cat-desserts',
    name: 'Desserts',
    filterKey: 'Desserts',
    description: 'Fudgy walnut brownies, chilled cream desserts, and layered pastry delights.',
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cat-snacks',
    name: 'Snacks',
    filterKey: 'Snacks',
    description: 'Crisp savory patties, teatime baked snacks and flaky puff pastries for guests.',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
  },
];

export const INITIAL_PRODUCTS: BakeryProduct[] = [
  {
    id: 'prod-chocolate-fudge-cake',
    name: 'Chocolate Fudge Cake',
    category: 'Cakes',
    shortDescription: 'Moist dark cocoa sponge layered with glossy Belgian chocolate fudge ganache.',
    fullDescription:
      'Our signature Chocolate Fudge Cake is baked fresh in Barakahu with rich cocoa sponge layers and finished with a silky, hand-poured dark chocolate fudge glaze and chocolate curls.',
    price: 1850,
    unitLabel: '1 Pound (Sample Price)',
    sizes: [
      { label: '1 Pound', price: 1850 },
      { label: '2 Pounds', price: 3500 },
      { label: '3 Pounds', price: 5100 },
    ],
    image:
      'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=900&q=85',
    isBestSeller: true,
  },
  {
    id: 'prod-red-velvet-cake',
    name: 'Red Velvet Cake',
    category: 'Cakes',
    shortDescription: 'Velvety crimson sponge paired with smooth whipped cream cheese frosting.',
    fullDescription:
      'Delicate crimson cocoa sponge layered with silky cream frosting and finished with fine velvet crumbs and white chocolate shavings — a favorite for birthdays and anniversaries.',
    price: 1950,
    unitLabel: '1 Pound (Sample Price)',
    sizes: [
      { label: '1 Pound', price: 1950 },
      { label: '2 Pounds', price: 3700 },
      { label: '3 Pounds', price: 5400 },
    ],
    image:
      'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=900&q=85',
    isBestSeller: true,
  },
  {
    id: 'prod-black-forest-cake',
    name: 'Black Forest Cake',
    category: 'Cakes',
    shortDescription: 'Classic chocolate sponge layered with whipped dairy cream, cherries and chocolate shavings.',
    fullDescription:
      'A timeless celebration classic featuring airy chocolate sponge, cloud-light fresh cream, sweet cherry compote, and generous dark chocolate curls.',
    price: 1750,
    unitLabel: '1 Pound (Sample Price)',
    sizes: [
      { label: '1 Pound', price: 1750 },
      { label: '2 Pounds', price: 3300 },
      { label: '3 Pounds', price: 4850 },
    ],
    image:
      'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?auto=format&fit=crop&w=900&q=85',
    isBestSeller: true,
  },
  {
    id: 'prod-fresh-cream-cake',
    name: 'Fresh Cream Cake',
    category: 'Cakes',
    shortDescription: 'Light vanilla sponge finished with airy whipped fresh cream and delicate piping.',
    fullDescription:
      'Prepared daily for family gatherings and celebrations in Barakahu, featuring tender sponge and delicately sweetened fresh dairy cream.',
    price: 1600,
    unitLabel: '1 Pound (Sample Price)',
    sizes: [
      { label: '1 Pound', price: 1600 },
      { label: '2 Pounds', price: 3000 },
      { label: '3 Pounds', price: 4400 },
    ],
    image:
      'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=900&q=85',
    isBestSeller: true,
  },
  {
    id: 'prod-vanilla-cake',
    name: 'Vanilla Cake',
    category: 'Cakes',
    shortDescription: 'Fragrant Madagascar vanilla bean sponge with smooth buttercream rosettes.',
    fullDescription:
      'Soft, golden vanilla sponge layered with light vanilla bean frosting and delicate gold-toned piping suitable for every joyful occasion.',
    price: 1650,
    unitLabel: '1 Pound (Sample Price)',
    sizes: [
      { label: '1 Pound', price: 1650 },
      { label: '2 Pounds', price: 3100 },
    ],
    image:
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=900&q=85',
    isBestSeller: false,
  },
  {
    id: 'prod-gulab-jamun',
    name: 'Gulab Jamun',
    category: 'Sweets',
    shortDescription: 'Warm, melt-in-the-mouth khoya dumplings soaked in fragrant cardamom rose syrup.',
    fullDescription:
      'Prepared in traditional style with rich khoya, fried to a deep golden brown, steeped in warm green-cardamom syrup, and garnished with sliced pistachios.',
    price: 1250,
    unitLabel: '1 Kg Box (Sample Price)',
    sizes: [
      { label: 'Half Kg Box', price: 650 },
      { label: '1 Kg Gift Box', price: 1250 },
      { label: '2 Kg Celebration Box', price: 2400 },
    ],
    image:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=900&q=85',
    isBestSeller: true,
    isTraditionalSweet: true,
  },
  {
    id: 'prod-rasmalai',
    name: 'Rasmalai',
    category: 'Sweets',
    shortDescription: 'Soft cottage cheese medallions chilled in saffron-infused sweetened milk with pistachios.',
    fullDescription:
      'Delicate, pillowy rasmalai discs poached gently and served in chilled rabri milk perfumed with cardamom, saffron strands, and slivered almonds.',
    price: 1400,
    unitLabel: '1 Kg Box (Sample Price)',
    sizes: [
      { label: 'Half Kg Portion', price: 720 },
      { label: '1 Kg Family Bowl', price: 1400 },
    ],
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85',
    isBestSeller: true,
    isTraditionalSweet: true,
  },
  {
    id: 'prod-barfi',
    name: 'Barfi',
    category: 'Sweets',
    shortDescription: 'Rich milk-fudge squares topped with roasted pistachios, almonds, and edible silver leaf.',
    fullDescription:
      'Slow-cooked pure milk khoya barfi with a smooth, creamy texture and delicate nutty crunch — ideal for festive gifting, weddings, and joyous announcements.',
    price: 1350,
    unitLabel: '1 Kg Box (Sample Price)',
    sizes: [
      { label: 'Half Kg Box', price: 700 },
      { label: '1 Kg Gift Box', price: 1350 },
      { label: '2 Kg Assorted Mithai Box', price: 2650 },
    ],
    image:
      'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=900&q=85',
    isBestSeller: false,
    isTraditionalSweet: true,
  },
  {
    id: 'prod-jalebi',
    name: 'Jalebi',
    category: 'Sweets',
    shortDescription: 'Crisp, golden-spun spirals steeped in saffron syrup for an irresistible crunch.',
    fullDescription:
      'Freshly piped and fried to crisp perfection, dipped in warm aromatic syrup so every bite stays crunchy on the outside and juicy within.',
    price: 950,
    unitLabel: '1 Kg Box (Sample Price)',
    sizes: [
      { label: 'Half Kg Pack', price: 480 },
      { label: '1 Kg Pack', price: 950 },
    ],
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
    isBestSeller: false,
    isTraditionalSweet: true,
  },
  {
    id: 'prod-cupcakes',
    name: 'Cupcakes',
    category: 'Cupcakes',
    shortDescription: 'Assorted gourmet cupcakes crowned with swirls of chocolate fudge and cream frosting.',
    fullDescription:
      'Box of freshly baked cupcakes featuring dark chocolate ganache, red velvet cream cheese, and classic vanilla swirls.',
    price: 1200,
    unitLabel: 'Box of 6 (Sample Price)',
    sizes: [
      { label: 'Box of 6', price: 1200 },
      { label: 'Box of 12', price: 2250 },
    ],
    image:
      'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=900&q=85',
    isBestSeller: false,
  },
  {
    id: 'prod-brownies',
    name: 'Brownies',
    category: 'Desserts',
    shortDescription: 'Dense, crackle-top dark chocolate fudge brownies drizzled with ganache.',
    fullDescription:
      'Baked with rich cocoa and dark chocolate chunks for a fudgy center and delicate flaky top crust.',
    price: 1100,
    unitLabel: 'Box of 6 (Sample Price)',
    sizes: [
      { label: 'Box of 6', price: 1100 },
      { label: 'Box of 12', price: 2100 },
    ],
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85',
    isBestSeller: false,
  },
  {
    id: 'prod-cookies',
    name: 'Cookies',
    category: 'Bakery',
    shortDescription: 'Crisp golden bakery biscuits, almond nan khatai, and chocolate chip butter cookies.',
    fullDescription:
      'Our signature teatime bakery assortment prepared fresh daily for evening chai and family hospitality.',
    price: 900,
    unitLabel: 'Half Kg Box (Sample Price)',
    sizes: [
      { label: 'Half Kg Box', price: 900 },
      { label: '1 Kg Assorted Tin', price: 1750 },
    ],
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85',
    isBestSeller: false,
  },
  {
    id: 'prod-savory-snacks',
    name: 'Baked Puff Patties & Snacks',
    category: 'Snacks',
    shortDescription: 'Flaky golden puff pastries and savory bakery snacks baked fresh for teatime.',
    fullDescription:
      'Light, multi-layered golden puff pastries with seasoned fillings, ideal for high tea, guests, and evening gatherings.',
    price: 850,
    unitLabel: 'Box of 6 (Sample Price)',
    sizes: [
      { label: 'Box of 6', price: 850 },
      { label: 'Box of 12', price: 1600 },
    ],
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
    isBestSeller: false,
  },
];

export const CAKE_COLLECTIONS: CakeCollectionItem[] = [
  {
    id: 'cake-birthday',
    name: 'Birthday Cakes',
    description:
      'Hand-finished celebration cakes in rich chocolate fudge, red velvet, and fresh cream with personalized name piping.',
    servingNote: 'Available in 1 lb, 2 lb, 3 lb & custom tiers',
    image:
      'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cake-wedding',
    name: 'Wedding Cakes',
    description:
      'Multi-tiered statement cakes adorned with champagne gold accents, floral piping, and refined flavors for Barat & Walima.',
    servingNote: 'Bespoke multi-tier consultations available',
    image:
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cake-anniversary',
    name: 'Anniversary Cakes',
    description:
      'Romantic red velvet, Belgian truffle, and ivory rosette cakes crafted to honor milestones with grace.',
    servingNote: 'Custom message plaques included',
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cake-chocolate',
    name: 'Chocolate Cakes',
    description:
      'Decadent layers of dark chocolate sponge, fudge ganache, Ferrero-style hazelnut crunch, and Belgian chocolate curls.',
    servingNote: 'Our signature best-selling collection',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cake-fresh-cream',
    name: 'Fresh Cream Cakes',
    description:
      'Light, airy sponges enveloped in delicately sweetened dairy cream with fruit compotes and classic bakery piping.',
    servingNote: 'Prepared fresh daily in Barakahu',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cake-theme',
    name: 'Theme Cakes',
    description:
      'Tailored designs for graduations, bridal showers, engagements, and corporate celebrations across Islamabad.',
    servingNote: 'Made to match your color palette',
    image:
      'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cake-kids',
    name: 'Kids Cakes',
    description:
      'Joyful, colorful, and deliciously soft celebration cakes designed around your child’s favorite themes and characters.',
    servingNote: 'Eggless & custom flavor options upon request',
    image:
      'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cake-custom',
    name: 'Custom Cakes',
    description:
      'Share your reference photo, flavor preference, and guest count — our cake decorators bring your vision to life.',
    servingNote: 'Upload your reference design below',
    image:
      'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=900&q=85',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Royal Gold & Dark Ganache Tiered Cake',
    category: 'Celebrations',
    caption: 'Hand-piped dark chocolate ganache rosettes with warm champagne gold accents.',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85',
    aspect: 'wide',
    relatedProductId: 'prod-chocolate-fudge-cake',
  },
  {
    id: 'gal-2',
    title: 'Signature Belgian Chocolate Fudge Cake',
    category: 'Cakes',
    caption: 'Glossy fudge glaze and dark chocolate curls prepared fresh at Sarwar Rd, Barakahu.',
    image:
      'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=85',
    aspect: 'tall',
    relatedProductId: 'prod-chocolate-fudge-cake',
  },
  {
    id: 'gal-3',
    title: 'Artisanal Pakistani Mithai Platter',
    category: 'Sweets',
    caption: 'Warm Gulab Jamun, pistachio Barfi, and saffron Rasmalai for family festivities.',
    image:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=1000&q=85',
    aspect: 'square',
    relatedProductId: 'prod-gulab-jamun',
  },
  {
    id: 'gal-4',
    title: 'Crimson Red Velvet Celebration Cake',
    category: 'Cakes',
    caption: 'Layered crimson cocoa sponge with silky cream frosting and white chocolate curls.',
    image:
      'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=1000&q=85',
    aspect: 'tall',
    relatedProductId: 'prod-red-velvet-cake',
  },
  {
    id: 'gal-5',
    title: 'Daily Patisserie & Cupcake Counter',
    category: 'Bakery',
    caption: 'Gourmet frosted cupcakes, butter biscuits, and flaky morning pastries.',
    image:
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=1000&q=85',
    aspect: 'wide',
    relatedProductId: 'prod-cupcakes',
  },
  {
    id: 'gal-6',
    title: 'Bespoke Anniversary & Engagement Cake',
    category: 'Custom Cakes',
    caption: 'Custom-designed tiered cake tailored for intimate family celebrations in Islamabad.',
    image:
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1000&q=85',
    aspect: 'square',
    relatedProductId: 'prod-fresh-cream-cake',
  },
];
