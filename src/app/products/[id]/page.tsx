import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Navbar from "@/src/components/layout/navbar";
import FooterSection from "@/src/components/layout/footer";
import Container from "@/src/components/ui/container";
import ProductVideoCard from "@/src/components/fireworks/product-video-card";
import ProductDetailsReveal from "@/src/components/animations/product-details-reveal";
import { products } from "../../../constants/products";

const specRows = [
  { key: "duration" as const, label: "Duration" },
  { key: "height" as const, label: "Height" },
  { key: "effects" as const, label: "Effects" },
  { key: "shots" as const, label: "Shots" },
];

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#000211] pt-32 sm:pt-36">
      <Navbar />

      <Container>
        <ProductDetailsReveal>
          <h1
            className="product-detail-animate mb-6 text-white"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "60px",
              letterSpacing: "-0.06em",
            }}
          >
            {product.name}
          </h1>

          <div className="mb-8 flex flex-col gap-8 lg:flex-row">
            <div className="product-detail-animate flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                width={222}
                height={222}
                unoptimized
                className="rounded-2xl object-cover"
              />
            </div>

            <div className="product-detail-animate relative flex-1 overflow-hidden rounded-2xl border border-white/40 bg-[#080C17] px-6 py-7 md:px-8">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(255,255,255,0.04) 0%, transparent 60%)",
                }}
              />

              <h3
                className="mb-3 text-white"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                  lineHeight: "36px",
                  letterSpacing: "0.02em",
                }}
              >
                About
              </h3>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "20px",
                  lineHeight: "30px",
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.64)",
                }}
              >
                {product.longDesc}
              </p>
            </div>
          </div>

          <div className="mb-12 grid gap-6 lg:grid-cols-2">
            <div className="product-detail-animate relative overflow-hidden rounded-2xl border border-white/35 bg-[#080C17] px-6 py-7 md:px-8">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(255,255,255,0.05) 0%, transparent 50%)",
                }}
              />

              <h3
                className="mb-6 text-white"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                  lineHeight: "36px",
                  letterSpacing: "0.02em",
                }}
              >
                Specifications
              </h3>

              <div className="flex flex-col">
                {specRows.map(({ key, label }, index) => (
                  <div key={key}>
                    <div className="flex items-center justify-between py-4">
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "20px",
                          lineHeight: "30px",
                          color: "rgba(255,255,255,0.64)",
                        }}
                      >
                        {label}
                      </span>

                      <span
                        className="text-right text-white"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "20px",
                          lineHeight: "30px",
                        }}
                      >
                        {product.specs[key]}
                      </span>
                    </div>

                    {index < specRows.length - 1 && (
                      <div
                        style={{
                          height: "1px",
                          background: "rgba(255,255,255,0.31)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="product-detail-animate relative overflow-hidden rounded-2xl border border-white/35 bg-[#080C17] px-6 py-7 md:px-8">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(255,255,255,0.05) 0%, transparent 50%)",
                }}
              />

              <h3
                className="mb-6 text-white"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                  lineHeight: "36px",
                  letterSpacing: "0.02em",
                }}
              >
                How It Works
              </h3>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "20px",
                  lineHeight: "30px",
                  color: "rgba(255,255,255,0.71)",
                }}
              >
                {product.howItWorks}
              </p>
            </div>
          </div>

          <div className="product-detail-animate mb-16">
            <h2
              className="mb-8 text-white"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "36px",
                lineHeight: "54px",
                letterSpacing: "0.02em",
              }}
            >
              Gallery
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {product.galleryImages.map(({ label }, index) => (
                <ProductVideoCard
                  key={`${product.id}-${label}-${index}`}
                  title={label}
                  videoSrc="/videos/products/firework-product.mp4"
                />
              ))}
            </div>
          </div>

          <Link
            href="/products"
            className="product-detail-animate inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-white transition hover:bg-white/15"
          >
            <ArrowLeft size={16} />
            Back to products
          </Link>
        </ProductDetailsReveal>
      </Container>

      <FooterSection />
    </main>
  );
}