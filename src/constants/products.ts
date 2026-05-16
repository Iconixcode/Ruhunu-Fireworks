export type ProductVariantGroup = {
  name: string;
  href?: string;
  children?: ProductVariantGroup[];
};

export type ProductSubpage = {
  slug: string;
  name: string;
  longDesc: string;
  variants: string[];
  galleryImages: { src: string; label: string }[];
};

export interface Product {
  id: number;
  name: string;
  shortDesc: string;
  longDesc: string;
  specs: {
    duration: string;
    height: string;
    effects: string;
    shots: string;
  };
  /** When set, the detail page shows this list instead of the specifications panel. */
  variants?: string[];
  /** Nested product boxes that link to sub-pages (e.g. Magic Bombs → ab, bc, cd). */
  variantGroups?: ProductVariantGroup[];
  /** Sub-page content keyed by slug, used with variantGroups hrefs. */
  subpages?: Record<string, ProductSubpage>;
  howItWorks: string;
  image: string;
  galleryImages: { src: string; label: string }[];
}

type ProductContent = Omit<Product, "id">;

type ProductCatalog = Record<number, ProductContent>;

const productCatalog: ProductCatalog = {
  1: {
    name: "Akasa Frame",
    shortDesc: "Wide frame-like bursts of vibrant colors across the night sky.",
    longDesc:
      "Akasa Frame is a stunning aerial firework that opens into wide, frame-like bursts of vibrant colors across the night sky. With its smooth transitions and bright effects, it creates a bold and elegant display, making it perfect for celebrations and special occasions.",
    specs: {
      duration: "40-50 seconds",
      height: "140-160 feet",
      effects: "Multi-color frame bursts",
      shots: "20-25 shots",
    },
    variants: [
      "Akasa Frame 100 Tharu",
      "Akasa Frame 50 Tharu",
      "Akasa Frame 100 Wedi",
      "Akasa Frame 50 Wedi",
      "Akasa Frame 100 Tharu Mix Whistle",
      "Akasa Frame 50 Tharu Mix Whistle",
      "Akasa Frame 100 Wedi Mix Whistle",
      "Akasa Frame 50 Wedi Mix Whistle",
      "Akasa Frame 60 Whistle",
      "Akasa Frame 80 Whistle",
      "Akasa Frame 100 Whistle",
      "Akasa Frame 30 Whistle",
      "Akasa Frame 50Whistle",
    ],
    howItWorks:
      "Akasa Frame launches a sequence of aerial shots that expand into wide, frame-like bursts across the sky. Each shot opens smoothly with vibrant colors and crackling effects, creating layered patterns that spread evenly, giving a bold and elegant visual display.",
    image:
      "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      { src: "https://res.cloudinary.com/dxaguv8d0/video/upload/v1778844319/fire2_xzai5i.mp4", label: "Akasa Frame 100 Tharu" },
      { src: "https://res.cloudinary.com/dxaguv8d0/video/upload/q_auto/f_auto/v1778844320/fire1_e04mx8.mp4", label: "Akasa Frame 50 Tharu" },
      { src: "https://res.cloudinary.com/dxaguv8d0/video/upload/q_auto/f_auto/v1778857521/d491423186624050a3dbe397c9996a47-a10cd54e685cb5062a6827054db42a87-sd_cc6cws.mp4", label: "Akasa Frame 100 Wedi" },
      { src: "https://res.cloudinary.com/dxaguv8d0/video/upload/q_auto/f_auto/v1778857955/4_Inch_Shell_Multi_o8nimy.mov", label: "Akasa Frame 50 Wedi" },
      { src: "https://res.cloudinary.com/dxaguv8d0/video/upload/q_auto/f_auto/v1778857955/4_Inch_Shell_Multi_o8nimy.mov", label: "Akasa Frame 100 Tharu Mix Whistle" },
      { src: "https://res.cloudinary.com/dxaguv8d0/video/upload/q_auto/f_auto/v1778857955/4_Inch_Shell_Multi_o8nimy.mov", label: "Akasa Frame 50 Tharu Mix Whistle" },
      { src: "", label: "Akasa Frame 100 Wedi Mix Whistle" },
      { src: "", label: "Akasa Frame 50 Wedi Mix Whistle" },
      { src: "", label: "Akasa Frame 60 Whistle" },
      { src: "", label: "Akasa Frame 80 Whistle" },
      { src: "", label: "Akasa Frame 100 Whistle" },
      { src: "", label: "Akasa Frame 30 Whistle" },
      { src: "", label: "Akasa Frame 50Whistle" },
    ],
  },
  2: {
    name: "10 Shots",
    shortDesc: "A vibrant aerial firework that blooms into colorful, flower-like bursts.",
    longDesc:
      "A vibrant aerial firework that blooms into colorful, flower-like bursts, creating a lively and beautiful display in the night sky.",
    specs: {
      duration: "30-40 seconds",
      height: "100-120 feet",
      effects: "Flower petal bursts",
      shots: "15-20 shots",
    },
    variants: [
      "10 Shots Colour (C)",
      "10 Shots Crackling (C)",
      "10 Shots China (C)",
      
    ],
    howItWorks:
      "Spring Flowers launches aerial shells that open into wide, petal-shaped bursts of vivid color. Each shell blooms outward in layers, creating a cascading floral pattern across the night sky.",
    image:
      "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      { src: "", label: "10 SHOTS COLOUR (C)" },
      { src: "", label: "10 SHOTS Crackling (C)" },
      { src: "", label: "10 Shots China (C)" },
    ],
  },
  3: {
    name: "20 Shouts",
    shortDesc: "A classic ground firework that emits steady showers of colorful sparks.",
    longDesc:
      "A classic ground firework that emits steady showers of colorful sparks, creating a bright and sparkling display.",
    specs: {
      duration: "60-90 seconds",
      height: "10-15 feet",
      effects: "Cascading spark showers",
      shots: "Continuous fountain",
    },
    variants: [
      "20 Shots Colour (C)",
      "20 Shots Two in One (C)",
      
    ],
    howItWorks:
      "Sparkling Flower Pots ignites from the ground and sprays a continuous fountain of colorful sparks upward. The sparks cascade outward in a fan-shaped shower, creating a dazzling ground-level display safe for all celebrations.",
    image:
      "https://images.pexels.com/photos/933277/pexels-photo-933277.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      { src: "", label: "20 Shots Colour (C)" },
      { src: "", label: "20 Shots Two in One (C)" },
    ],
  },
  4: {
    name: " Fountains",
    shortDesc: "A powerful aerial firework with rapid, high-energy crackling bursts.",
    longDesc:
      "A powerful aerial firework that delivers rapid, high-energy bursts with bright flashes and crackling effects in the sky.",
    specs: {
      duration: "25-35 seconds",
      height: "120-150 feet",
      effects: "Crackling flash bursts",
      shots: "30-36 shots",
    },
    variants: [
      "Colour Fountain (C)",
      "Golden Fountain (C)",
      "Crackling Fountain (C)",
      "SPECIAL Fountain",
    ],
    howItWorks:
      "Witchcraft fires rapid aerial shells in quick succession, each detonating with sharp crackling sounds and intense flashes of light. The tight timing creates an overwhelming cascade of energy across the sky.",
    image:
      "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      { src: "", label: "Colour Fountain (C)" },
      { src: "", label: "Golden Fountain (C)" },
      { src: "", label: "Crackling Fountain (C)" },
      { src: "", label: "SPECIAL Fountain" },
    ],
  },
  5: {
    name: "Magic Bombs",
    shortDesc: "A ground fountain that sprays colorful sparks in a peacock fan shape.",
    longDesc:
      "Magic Bombs is a versatile ground firework range offering bold bursts and vibrant effects. Choose a product line below to explore variants and watch each one in the gallery.",
    specs: {
      duration: "50-70 seconds",
      height: "8-12 feet",
      effects: "Fan-shaped spark spray",
      shots: "Continuous fountain",
    },
    variantGroups: [
      { name: "3'' Magic Bombs", href: "/products/5/3'" },
      { name: "4'' Magic Bombs", href: "/products/5/4'" },
      { name: "6'' Magic Bombs", href: "/products/5/6'" },
    ],
    
    subpages: {
      '3\'': {
        slug: "3'",
        name: "3'' Magic Bombs  ",
        longDesc:
          "The 3' Inch Magic Bombs line delivers compact ground bursts with vivid colour and crisp timing—ideal for smaller displays and layered show sequences.",
        variants: ["3\"  White Colour Shell",
                   "3\" Silver Colour Shell", 
                   "3\"  Yellow Colour Shell",
                   "3\" Green Colour Shell",
                   "3\" Red Colour Shell",
                   "3\" Blue Colour Shell",
                   "3\" Multi Colour Shell",
                   "3\" Crackling Shell"],
        galleryImages: [
          { src: "", label: "3\"  White Colour Shell" },
          { src: "", label: "3\"  Silver Colour Shell" },
          { src: "", label: "3\"  Yellow Colour Shell" },
          { src: "", label: "3\"  Green Colour Shell" },
          { src: "", label: "3\"  Red Colour Shell" },
          { src: "", label: "3\"  Blue Colour Shell" },
          { src: "", label: "3\"  Multi Colour Shell" },
          { src: "", label: "3\"  Crackling Shell" },
        ],
      },
      '4\'': {
        slug: "4'",
        name: "4'' Magic Bombs",
        longDesc:
          "The 4' Inch Magic Bombs line offers mid-range power with balanced height and spread, pairing bright flashes with smooth colour transitions across the sky.",
          variants: ["4\"  White Colour Shell",
                     "4\" Silver Colour Shell", 
                     "4\" Yellow Colour Shell",
                     "4\" Green Colour Shell",
                     "4\" Red Colour Shell",
                     "4\" Blue Colour Shell",
                     "4\" Multi Colour Shell",
                     "4\" Crackling Shell"],
          galleryImages: [
            { src: "", label: "4\"  White Colour Shell" },
            { src: "", label: "4\"  Silver Colour Shell" },
            { src: "", label: "4\"  Yellow Colour Shell" },
            { src: "", label: "4\"  Green Colour Shell" },
            { src: "", label: "4\"  Red Colour Shell" },
            { src: "", label: "4\"  Blue Colour Shell" },
            { src: "", label: "4\"  Multi Colour Shell" },
            { src: "", label: "4\"  Crackling Shell" },
          ],
      },
      '6\'': {
        slug: "6'",
        name: "6'' Magic Bombs",
        longDesc:
          "The 6' Inch Magic Bombs line is built for maximum impact—larger bursts, longer trails, and a commanding presence for festival finales and grand celebrations.",
        variants: ["6\"  White Colour Shell",
                   "6\" Silver Colour Shell", 
                   "6\" Yellow Colour Shell",
                   "6\" Green Colour Shell",
                   "6\" Red Colour Shell",
                   "6\" Blue Colour Shell",
                   "6\" Multi Colour Shell",
                   "6\" Crackling Shell"],
        galleryImages: [
          { src: "", label: "6\"  White Colour Shell" },
          { src: "", label: "6\"  Silver Colour Shell" },
          { src: "", label: "6\"  Yellow Colour Shell" },
          { src: "", label: "6\"  Green Colour Shell" },
          { src: "", label: "6\"  Red Colour Shell" },
          { src: "", label: "6\"  Blue Colour Shell" },
          { src: "", label: "6\"  Multi Colour Shell" },
          { src: "", label: "6\"  Crackling Shell" },
        ],
      },
    },
    howItWorks:
      "Magic Bombs ignite from the ground and release rapid sequences of coloured sparks and bursts. Each product line is tuned for a different scale and intensity, so you can mix lines for a layered, professional display.",
    image:
      "https://images.pexels.com/photos/1721172/pexels-photo-1721172.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [],
  },
};

const productIds = [1, 2, 3, 4, 5] as const;

export const products: Product[] = productIds.map((id) => ({
  id,
  ...productCatalog[id],
}));

export const heroProducts = products.slice(1, 5);

export function getProductById(id: number) {
  const product = productCatalog[id];

  if (!product) {
    return undefined;
  }

  return {
    id,
    ...product,
  } satisfies Product;
}

export function getProductSubpage(productId: number, groupSlug: string) {
  const product = productCatalog[productId];

  if (!product?.subpages) {
    return undefined;
  }

  return product.subpages[groupSlug];
}

export function getProductSubpageParams() {
  const params: { id: string; group: string }[] = [];

  for (const product of products) {
    if (!product.subpages) {
      continue;
    }

    for (const slug of Object.keys(product.subpages)) {
      params.push({ id: String(product.id), group: slug });
    }
  }

  return params;
}
