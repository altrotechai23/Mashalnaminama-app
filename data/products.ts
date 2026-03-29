export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "tops" | "bottoms" | "sets";
  isNew?: boolean;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Aura Drape Top",
    price: 1250,
    image: "/photo-1.jpg",
    category: "tops",
    isNew: true,
    description: "A contemporary silhouette featuring hand-stitched detailing and a fluid, asymmetrical drape. Crafted in Cape Town from sustainable linen-blend fabric."
  },
  {
    id: "2",
    name: "Horizon Wide-Leg Trousers",
    price: 1800,
    image: "/photo-1.jpg",
    category: "bottoms",
    isNew: true,
    description: "High-waisted tailored trousers with a dramatic wide-leg cut. Designed for both versatility and structural elegance."
  },
  {
    id: "3",
    name: "Nomad Two-Piece Set",
    price: 3200,
    image: "/photo-1.jpg",
    category: "sets",
    isNew: false,
    description: "Our signature co-ord set. Includes a cropped structured blazer and matching high-rise culottes in a neutral charcoal weave."
  },
  {
    id: "4",
    name: "Solaris Vest",
    price: 950,
    image: "/photo-1.jpg",
    category: "tops",
    isNew: false,
    description: "A minimal, boxy vest designed for layering. Features raw-edge finishes and a breathable cotton-hemp texture."
  },
  {
    id: "5",
    name: "Lunar Column Skirt",
    price: 1450,
    image: "/photo-1.jpg",
    category: "bottoms",
    isNew: true,
    description: "A sleek, ankle-length column skirt with a subtle side slit. Perfect for transitioning from daytime studio wear to evening gallery openings."
  },
  {
    id: "6",
    name: "Origin Utility Set",
    price: 2900,
    image: "/photo-1.jpg",
    category: "sets",
    isNew: false,
    description: "Function meets form in this heavy-weight cotton utility set. Features multiple architectural pockets and a reinforced waistband."
  }
];

// Add this to your src/data/products.ts
export type Collection = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
};



// Ensure your products have a collection field matching these IDs
export const collections = [
  {
    id: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Fresh drops for the season",
    description: "The latest additions to the Mashalnaminema universe — pieces that push boundaries while honoring the craft.",
  },
  {
    id: "editorial",
    title: "Editorial",
    subtitle: "Statement pieces, crafted for impact",
    description: "Bold, sculptural garments born from the intersection of couture technique and streetwear rebellion.",
  },
  {
    id: "essentials",
    title: "Essentials",
    subtitle: "The foundation of every wardrobe",
    description: "Timeless staples engineered for longevity — heavyweight fabrics, clean lines, and impeccable construction.",
  },
];