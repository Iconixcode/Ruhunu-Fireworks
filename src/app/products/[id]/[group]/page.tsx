import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Navbar from "@/src/components/layout/navbar";
import FooterSection from "@/src/components/layout/footer";
import Container from "@/src/components/ui/container";
import ProductVideoCard from "@/src/components/fireworks/product-video-card";
import ProductVariantsGrid from "@/src/components/fireworks/product-variants-grid";
import ProductDetailsReveal from "@/src/components/animations/product-details-reveal";
import {
  getProductById,
  getProductSubpage,
  getProductSubpageParams,
} from "@/src/constants/products";
import { variantSlug } from "@/src/lib/variant-slug";

type ProductGroupPageProps = {
  params: Promise<{ id: string; group: string }>;
};

export function generateStaticParams() {
  return getProductSubpageParams();
}

export const dynamicParams = false;

export default async function ProductGroupPage({
  params,
}: ProductGroupPageProps) {
  const { id, group } = await params;
  const productId = Number(id);
  const product = getProductById(productId);
  const subpage = getProductSubpage(productId, group);

  if (!product || !subpage) {
    notFound();
  }

  const pageTitle = `${product.name} — ${subpage.name}`;

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
              fontSize: "36px",
              lineHeight: "54px",
              letterSpacing: "-0.06em",
            }}
          >
            {pageTitle}
          </h1>

          <div className="mb-8 flex flex-col gap-8 lg:flex-row">
            <div className="product-detail-animate flex-shrink-0">
              <Image
                src={product.image}
                alt={pageTitle}
                width={222}
                height={222}
                priority
                sizes="222px"
                className="h-auto rounded-2xl object-cover"
                style={{ height: "auto" }}
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
                  fontSize: "20px",
                  lineHeight: "30px",
                  letterSpacing: "0.02em",
                }}
              >
                About
              </h3>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  lineHeight: "28px",
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.64)",
                }}
              >
                {subpage.longDesc}
              </p>
            </div>
          </div>

          <div className="mb-12">
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
                  fontSize: "20px",
                  lineHeight: "30px",
                  letterSpacing: "0.02em",
                }}
              >
                Products
              </h3>

              <ProductVariantsGrid variants={subpage.variants} />
            </div>
          </div>

          <div className="product-detail-animate mb-16">
            <h2
              className="mb-8 text-white"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "32px",
                lineHeight: "48px",
                letterSpacing: "0.02em",
              }}
            >
              Gallery
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {subpage.galleryImages.map(({ label, src }, index) => (
                <ProductVideoCard
                  key={`${product.id}-${group}-${label}-${index}`}
                  id={variantSlug(label)}
                  title={label}
                  videoSrc={src}
                />
              ))}
            </div>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="product-detail-animate inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-white transition hover:bg-white/15"
          >
            <ArrowLeft size={16} />
            Back to {product.name}
          </Link>
        </ProductDetailsReveal>
      </Container>

      <FooterSection />
    </main>
  );
}
