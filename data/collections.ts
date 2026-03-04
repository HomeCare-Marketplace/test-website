import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "col-1",
    handle: "sheets",
    title: "Sheet Sets",
    description: "Breathable and brushed sheet sets crafted for year-round comfort.",
    image: "/images/collections/sheets.jpg",
    group: "Sheets",
    featured: true,
  },
  {
    id: "col-2",
    handle: "duvet-covers",
    title: "Duvet Covers",
    description: "Layer your bed with elegant, easy-care duvet covers in soft neutrals.",
    image: "/images/collections/duvet-covers.jpg",
    group: "Layers",
    featured: true,
  },
  {
    id: "col-3",
    handle: "comforters",
    title: "Comforters",
    description: "Lofty comforters with premium fill and cloud-soft drape.",
    image: "/images/collections/comforters.jpg",
    group: "Layers",
  },
  {
    id: "col-4",
    handle: "pillowcases",
    title: "Pillowcases",
    description: "Silky-smooth pillowcases designed for restful nights.",
    image: "/images/collections/pillowcases.jpg",
    group: "Accessories",
  },
  {
    id: "col-5",
    handle: "protectors",
    title: "Mattress Protectors",
    description: "Quiet, waterproof protection with breathable comfort.",
    image: "/images/collections/protectors.jpg",
    group: "Protection",
  },
  {
    id: "col-6",
    handle: "blankets-quilts",
    title: "Blankets & Quilts",
    description: "Textured layers and cozy warmth in elevated finishes.",
    image: "/images/collections/blankets-quilts.jpg",
    group: "Layers",
  },
];
