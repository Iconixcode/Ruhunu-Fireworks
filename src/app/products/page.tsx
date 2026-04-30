"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

import Navbar from "@/src/components/layout/navbar";
import { FaWhatsapp } from "react-icons/fa6";
import FooterSection from "@/src/components/layout/footer";
import FireworkProductCard from "@/src/components/fireworks/product-card";
import Container from "@/src/components/ui/container";
import { products } from "@/src/constants/products";

export default function ProductsPage() {
  const pageRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".products-intro-animate",
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.15,
        },
      );

      gsap.fromTo(
        ".product-card-anim",
        {
          y: 34,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.35,
        },
      );

      gsap.fromTo(
        ".products-cta-animate",
        {
          y: 28,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          delay: 0.55,
        },
      );
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-[#000211] pt-32 sm:pt-36"
    >
      <Navbar />

      <Container>
        <p
          className="products-intro-animate mb-10 text-white"
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
          className="products-cta-animate mt-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
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
              Contact us for product details and recommendations for your
              celebration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="flex shrink-0 items-center gap-3 rounded-md border border-white/25 bg-[#04134780] px-8 py-4 text-2xl text-white/80 transition-opacity hover:opacity-80"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Contact us
            </Link>

            <a
              href="https://wa.me/94722293300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-transparent text-white transition-opacity hover:opacity-80"
            >
              <FaWhatsapp size={48} color="white" />
            </a>
          </div>
        </div>
      </Container>

      <FooterSection />
    </main>
  );
}