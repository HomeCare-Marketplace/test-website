/** A single navigation link. */
export type NavChild = { label: string; href: string };

/** A titled column of links shown inside a mega-menu panel. */
export type NavGroup = { title: string; links: NavChild[] };

export type NavItem = {
  label: string;
  href: string;
  /** Flat list — renders a simple dropdown. */
  children?: NavChild[];
  /** Grouped columns — renders a mega-menu panel. */
  groups?: NavGroup[];
  /** Optional highlight links shown separately (e.g. Best Sellers). */
  highlights?: NavChild[];
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
  group: "Sheets" | "Layers" | "Protection" | "Accessories";
  featured?: boolean;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  shortDescription: string;
  summary: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  colorOptions: string[];
  sizeOptions: string[];
  material: string;
  productType: string;
  availableForSale: boolean;
  productHighlights: string[];
  careInstructions: string;
  sizeGuide: string;
  shippingAndReturns: string;
  rating: number;
  reviewCount: number;
  badges: string[];
  featured?: boolean;
  bestseller?: boolean;
  collectionHandles: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  location: string;
  rating: number;
  product?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type TrustBenefit = {
  id: string;
  icon: "truck" | "moon" | "leaf" | "shield";
  title: string;
  description: string;
};

export type CartSelectedOptions = {
  color: string;
  size: string;
};

export type CartLine = {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions: CartSelectedOptions;
};
