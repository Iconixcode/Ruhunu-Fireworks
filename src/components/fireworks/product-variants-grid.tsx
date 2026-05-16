"use client";

import { variantSlug } from "@/src/lib/variant-slug";

type ProductVariantsGridProps = {
  variants: string[];
};

export default function ProductVariantsGrid({
  variants,
}: ProductVariantsGridProps) {
  const scrollToVideo = (label: string) => {
    const slug = variantSlug(label);
    const target = document.getElementById(slug);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    window.history.replaceState(null, "", `#${slug}`);
    target.dispatchEvent(new CustomEvent("gallery-highlight"));
  };

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((variant) => (
        <li key={variant}>
          <a
            href={`#${variantSlug(variant)}`}
            onClick={(event) => {
              event.preventDefault();
              scrollToVideo(variant);
            }}
            className="block rounded-xl border border-white/20 bg-white/5 px-4 py-4 text-white transition hover:border-amber-400/60 hover:bg-amber-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              lineHeight: "28px",
            }}
          >
            {variant}
          </a>
        </li>
      ))}
    </ul>
  );
}
