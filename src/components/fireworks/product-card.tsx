"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/src/constants/products";

interface ProductCardProps {
  product: Product;
  size?: "large" | "small";
}

export default function FireworkProductCard({
  product,
  size = "large",
}: ProductCardProps) {
  const isLarge = size === "large";

  return (
    <Link
      href={`/products/${product.id}`}
      className="relative block flex-shrink-0 overflow-hidden rounded-[26px] border border-white/35 bg-[#080C17]"
      style={{
        width: isLarge ? "328px" : "210px",
        height: isLarge ? "418px" : "218px",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 100%, rgba(183,1,4,0.35) 0%, rgba(222,226,0,0.15) 60%, transparent 80%)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: "100%",
          height: "40%",
          bottom: 0,
          left: 0,
          background: "linear-gradient(0deg, rgba(70,41,220,0.18) 0%, transparent 100%)",
          filter: "blur(20px)",
        }}
      />

      <div
        className="absolute"
        style={
          isLarge
            ? { right: "20px", bottom: "60px", width: "160px", height: "160px" }
            : { right: "10px", bottom: "22px", width: "90px", height: "90px" }
        }
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full rounded-xl object-cover"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      <div
        className="absolute"
        style={{
          left: isLarge ? "33px" : "14px",
          top: isLarge ? "43px" : "18px",
          right: isLarge ? "20px" : "10px",
        }}
      >
        <h3
          className="mb-2 font-semibold leading-tight text-white"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: isLarge ? "24px" : "13px",
            letterSpacing: "-0.06em",
          }}
        >
          {product.name}
        </h3>
        <p
          className="leading-snug text-white/70"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: isLarge ? "15px" : "8px",
            letterSpacing: "-0.06em",
            maxWidth: isLarge ? "261px" : "150px",
          }}
        >
          {product.shortDesc}
        </p>
      </div>

      <span
        className="absolute flex items-center gap-1 rounded-full bg-white/10 transition-opacity hover:opacity-80"
        style={{
          left: isLarge ? "33px" : "14px",
          top: isLarge ? "140px" : "60px",
          padding: isLarge ? "5px 14px" : "4px 10px",
        }}
      >
        <span
          className="text-white"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: isLarge ? "12px" : "7px" }}
        >
          Learn more
        </span>
        <ArrowRight size={isLarge ? 12 : 8} className="text-white" />
      </span>
    </Link>
  );
}
