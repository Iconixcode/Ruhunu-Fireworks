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
      { src: "", label: "Akasa Frame 50 Whistle" },
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
    name: "Fountains",
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
      { src: "", label: "Colour Fountain (C)" },
      { src: "", label: "Golden Fountain (C)" },
      { src: "", label: "Crackling Fountain (C)" },
      { src: "", label: "SPECIAL Fountain" },
    ],
  },
  5: {
    name: "3''  Magic Bombs",
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
      
      { src: "", label: "3\" Inch White Colour Shell" },
      { src: "", label: "3\" Inch Silver Colour Shell" },
      { src: "", label: "3\" Inch Yellow Colour Shell" },
      { src: "", label: "3\" Inch Green Colour Shell" },
      { src: "", label: "3\" Inch Red Colour Shell" },
      { src: "", label: "3\" Inch Blue Colour Shell" },
      { src: "", label: "3\" Inch Multi Colour Shell" },
      { src: "", label: "3\" Inch Crackling Shell" },
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
  61: {
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
  7: {
    name: "Celestial Burst",
    shortDesc: "A mesmerizing display of shimmering celestial effects and bright trails.",
    longDesc:
      "Celestial Burst combines brilliant sparkles with sweeping light trails, creating a stunning celestial display that illuminates the entire sky with its ethereal beauty.",
    specs: {
      duration: "40-50 seconds",
      height: "160-190 feet",
      effects: "Shimmering celestial effects",
      shots: "20-28 shots",
    },
    howItWorks:
      "Celestial Burst launches shells that break open with shimmering effects and bright trailing stars. Each burst creates layers of light that cascade gracefully, giving the appearance of a celestial canopy.",
    image:
      "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Celestial Burst Silver",
      },
      {
        src: "https://images.pexels.com/photos/1721172/pexels-photo-1721172.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Celestial Burst Gold",
      },
      {
        src: "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Celestial Burst Multi",
      },
      {
        src: "https://images.pexels.com/photos/933277/pexels-photo-933277.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Celestial Burst Color",
      },
      {
        src: "https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Celestial Burst Sky",
      },
      {
        src: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Celestial Burst Festival",
      },
    ],
  },
  8: {
    name: "Inferno Flash",
    shortDesc: "An intense aerial display with rapid-fire bursts and vivid color transitions.",
    longDesc:
      "Inferno Flash delivers an intense, high-energy display with rapid bursts of vibrant colors and dramatic flashing effects that command attention.",
    specs: {
      duration: "30-40 seconds",
      height: "140-170 feet",
      effects: "Rapid vivid color bursts",
      shots: "32-40 shots",
    },
    howItWorks:
      "Inferno Flash fires shells in rapid succession, each bursting with bright flashes and vivid color transitions. The quick rhythm creates an intense, adrenaline-pumping visual experience.",
    image:
      "https://images.pexels.com/photos/1721172/pexels-photo-1721172.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/933277/pexels-photo-933277.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Inferno Flash Red",
      },
      {
        src: "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Inferno Flash Orange",
      },
      {
        src: "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Inferno Flash Yellow",
      },
      {
        src: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Inferno Flash Multi",
      },
      {
        src: "https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Inferno Flash Intense",
      },
      {
        src: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Inferno Flash Night",
      },
    ],
  },
  9: {
    name: "Phantom Dreams",
    shortDesc: "A mystical aerial show with ethereal effects and smooth color waves.",
    longDesc:
      "Phantom Dreams creates an enchanting display with soft, ethereal effects and smooth color transitions that evoke a sense of mystery and wonder.",
    specs: {
      duration: "45-55 seconds",
      height: "150-180 feet",
      effects: "Ethereal soft bursts",
      shots: "18-24 shots",
    },
    howItWorks:
      "Phantom Dreams launches shells that burst with soft, ethereal effects and smooth color waves. The gentle, mesmerizing patterns create a dreamlike quality, perfect for intimate celebrations.",
    image:
      "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600",
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Phantom Dreams Purple",
      },
      {
        src: "https://images.pexels.com/photos/1721172/pexels-photo-1721172.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Phantom Dreams Blue",
      },
      {
        src: "https://images.pexels.com/photos/933277/pexels-photo-933277.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Phantom Dreams Green",
      },
      {
        src: "https://images.pexels.com/photos/1387577/pexels-photo-1387577.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Phantom Dreams Silver",
      },
      {
        src: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Phantom Dreams Multi",
      },
      {
        src: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=600",
        label: "Phantom Dreams Mystical",
      },
    ],
  },
};

const productIds = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

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
