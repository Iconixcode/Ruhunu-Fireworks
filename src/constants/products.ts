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
    howItWorks:
      "Akasa Frame launches a sequence of aerial shots that expand into wide, frame-like bursts across the sky. Each shot opens smoothly with vibrant colors and crackling effects, creating layered patterns that spread evenly, giving a bold and elegant visual display.",
    image:
      "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Akasa Frame 100 Tharu",
      },
      {
        src: "https://images.pexels.com/photos/933277/pexels-photo-933277.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Akasa Frame 50 Tharu",
      },
      {
        src: "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Akasa Frame 100 Wedi",
      },
      {
        src: "https://images.pexels.com/photos/1721172/pexels-photo-1721172.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Akasa Frame 100 Tharu Mix Whistle",
      },
      {
        src: "https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Akasa Frame 60 Whistle",
      },
      {
        src: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Akasa Frame 100 Tharu",
      },
    ],
  },
  2: {
    name: "Spring Flowers",
    shortDesc: "A vibrant aerial firework that blooms into colorful, flower-like bursts.",
    longDesc:
      "A vibrant aerial firework that blooms into colorful, flower-like bursts, creating a lively and beautiful display in the night sky.",
    specs: {
      duration: "30-40 seconds",
      height: "100-120 feet",
      effects: "Flower petal bursts",
      shots: "15-20 shots",
    },
    howItWorks:
      "Spring Flowers launches aerial shells that open into wide, petal-shaped bursts of vivid color. Each shell blooms outward in layers, creating a cascading floral pattern across the night sky.",
    image:
      "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Spring Flowers Gold",
      },
      {
        src: "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Spring Flowers Color",
      },
      {
        src: "https://images.pexels.com/photos/933277/pexels-photo-933277.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Spring Flowers Burst",
      },
      {
        src: "https://images.pexels.com/photos/1721172/pexels-photo-1721172.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Spring Flowers Night",
      },
      {
        src: "https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Spring Flowers Sky",
      },
      {
        src: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Spring Flowers Festival",
      },
    ],
  },
  3: {
    name: "Sparkling Flower Pots",
    shortDesc: "A classic ground firework that emits steady showers of colorful sparks.",
    longDesc:
      "A classic ground firework that emits steady showers of colorful sparks, creating a bright and sparkling display.",
    specs: {
      duration: "60-90 seconds",
      height: "10-15 feet",
      effects: "Cascading spark showers",
      shots: "Continuous fountain",
    },
    howItWorks:
      "Sparkling Flower Pots ignites from the ground and sprays a continuous fountain of colorful sparks upward. The sparks cascade outward in a fan-shaped shower, creating a dazzling ground-level display safe for all celebrations.",
    image:
      "https://images.pexels.com/photos/933277/pexels-photo-933277.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Flower Pots Gold",
      },
      {
        src: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Flower Pots Multi",
      },
      {
        src: "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Flower Pots Night",
      },
      {
        src: "https://images.pexels.com/photos/1721172/pexels-photo-1721172.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Flower Pots Color",
      },
      {
        src: "https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Flower Pots Sky",
      },
      {
        src: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Flower Pots Festival",
      },
    ],
  },
  4: {
    name: "Witchcraft",
    shortDesc: "A powerful aerial firework with rapid, high-energy crackling bursts.",
    longDesc:
      "A powerful aerial firework that delivers rapid, high-energy bursts with bright flashes and crackling effects in the sky.",
    specs: {
      duration: "25-35 seconds",
      height: "120-150 feet",
      effects: "Crackling flash bursts",
      shots: "30-36 shots",
    },
    howItWorks:
      "Witchcraft fires rapid aerial shells in quick succession, each detonating with sharp crackling sounds and intense flashes of light. The tight timing creates an overwhelming cascade of energy across the sky.",
    image:
      "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/933277/pexels-photo-933277.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Witchcraft Gold",
      },
      {
        src: "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Witchcraft Multi",
      },
      {
        src: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Witchcraft Night",
      },
      {
        src: "https://images.pexels.com/photos/1721172/pexels-photo-1721172.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Witchcraft Color",
      },
      {
        src: "https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Witchcraft Sky",
      },
      {
        src: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Witchcraft Festival",
      },
    ],
  },
  5: {
    name: "Peacock Fountain",
    shortDesc: "A ground fountain that sprays colorful sparks in a peacock fan shape.",
    longDesc:
      "A ground fountain firework that sprays colorful sparks in a fan shape, inspired by a peacock's vibrant feathers.",
    specs: {
      duration: "50-70 seconds",
      height: "8-12 feet",
      effects: "Fan-shaped spark spray",
      shots: "Continuous fountain",
    },
    howItWorks:
      "Peacock Fountain burns from the base, projecting a wide fan of colored sparks that mimics the spread of a peacock tail. The colors shift and layer as the fountain progresses, creating a mesmerizing ground display.",
    image:
      "https://images.pexels.com/photos/1721172/pexels-photo-1721172.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Peacock Fountain Gold",
      },
      {
        src: "https://images.pexels.com/photos/933277/pexels-photo-933277.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Peacock Fountain Multi",
      },
      {
        src: "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Peacock Fountain Night",
      },
      {
        src: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Peacock Fountain Color",
      },
      {
        src: "https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Peacock Fountain Sky",
      },
      {
        src: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Peacock Fountain Festival",
      },
    ],
  },
  6: {
    name: "Galaxy Storm",
    shortDesc: "A dramatic aerial barrage of multi-burst shells filling the sky.",
    longDesc:
      "Galaxy Storm is a relentless aerial barrage that fires multi-break shells in rapid sequence, filling the sky with overlapping waves of color and sound.",
    specs: {
      duration: "35-45 seconds",
      height: "150-180 feet",
      effects: "Multi-break aerial shells",
      shots: "25-36 shots",
    },
    howItWorks:
      "Galaxy Storm fires high-altitude shells that break twice in the air, first releasing a bright flash and then opening into a wide burst of trailing stars. The overlapping shells create a dense, storm-like canopy of light.",
    image:
      "https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Galaxy Storm Gold",
      },
      {
        src: "https://images.pexels.com/photos/1721172/pexels-photo-1721172.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Galaxy Storm Multi",
      },
      {
        src: "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Galaxy Storm Night",
      },
      {
        src: "https://images.pexels.com/photos/933277/pexels-photo-933277.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Galaxy Storm Color",
      },
      {
        src: "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Galaxy Storm Sky",
      },
      {
        src: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Galaxy Storm Festival",
      },
    ],
  },
};

const productIds = [1, 2, 3, 4, 5, 6] as const;

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
