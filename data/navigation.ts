import type { NavItem } from "@/types";

export const announcementText = "Free US shipping on orders over $75 • 30-night comfort guarantee";

export const navItems: NavItem[] = [
  {
    label: "Shop",
    href: "/collections",
    groups: [
      {
        title: "Bedding",
        links: [
          { label: "Sheet Sets", href: "/collections/sheets" },
          { label: "Duvet Covers", href: "/collections/duvet-covers" },
          { label: "Comforters", href: "/collections/comforters" },
          { label: "Blankets & Quilts", href: "/collections/blankets-quilts" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { label: "Pillowcases", href: "/collections/pillowcases" },
          { label: "Mattress Protectors", href: "/collections/protectors" },
        ],
      },
    ],
    highlights: [
      { label: "Best Sellers", href: "/collections" },
      { label: "New Arrivals", href: "/collections" },
    ],
  },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "Sheet Sets", href: "/collections/sheets" },
      { label: "Duvet Covers", href: "/collections/duvet-covers" },
      { label: "Comforters", href: "/collections/comforters" },
      { label: "Blankets & Quilts", href: "/collections/blankets-quilts" },
      { label: "Pillowcases", href: "/collections/pillowcases" },
      { label: "All Collections", href: "/collections" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
