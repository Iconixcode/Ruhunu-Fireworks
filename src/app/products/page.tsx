"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import Navbar from "@/src/components/layout/navbar";
import FireworkProductCard from "@/src/components/fireworks/product-card";
import Container from "@/src/components/ui/container";
import { products } from "@/src/constants/products";

export default function ProductsPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".product-card-anim");
    if (!cards) {
      return;
    }

    cards.forEach((card, index) => {
      const element = card as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(32px)";

      setTimeout(() => {
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 100 + index * 80);
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#000211] pb-16 pt-32 sm:pt-36">
      <Navbar />

      <Container>
        <p
          className="mb-10 text-white"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "30px",
            letterSpacing: "-0.01em",
            maxWidth: "1176px",
          }}
        >
          Explore our full collection of fireworks designed to bring color,
          excitement, and unforgettable moments to every celebration.
        </p>

        <div
          ref={gridRef}
          className="grid gap-x-8 gap-y-12"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 328px))",
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="product-card-anim">
              <FireworkProductCard product={product} size="large" />
            </div>
          ))}
        </div>

        <div
          className="mt-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
          style={{ maxWidth: "1176px", marginInline: "auto" }}
        >
          <div>
            <h2
              className="mb-2 text-white"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: "48px",
                letterSpacing: "-0.01em",
              }}
            >
              Need Help Choosing the Right Fireworks?
            </h2>
            <p
              className="text-white"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "30px",
                letterSpacing: "-0.01em",
              }}
            >
              Contact us for product details and recommendations for your celebration.
            </p>
          </div>

          <Link
            href="/#contact"
            className="flex shrink-0 items-center gap-3 rounded-md border border-white/25 bg-[#04134780] px-8 py-4 text-2xl text-white/80 transition-opacity hover:opacity-80"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Contact us
          </Link>
        </div>
      </Container>
    </main>
  );
}
