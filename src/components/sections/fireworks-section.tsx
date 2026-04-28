 "use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Container from "../ui/container";
import FireworkProductCard from "../fireworks/product-card";
import { colors } from "@/src/constants/colors";
import { heroProducts } from "@/src/constants/products";

const descriptions = [
  "A vibrant aerial firework that blooms into colorful, flower-like bursts, creating a lively and beautiful display in the night sky.",
  "A classic ground firework that emits steady showers of colorful sparks, creating a bright and sparkling display.",
  "A powerful aerial firework that delivers rapid, high-energy bursts with bright flashes and crackling effects in the sky.",
  "A ground fountain firework that sprays colorful sparks in a fan shape, inspired by a peacock's vibrant feathers.",
];

const arrowAnimationStyle = `
  @keyframes moveArrow {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(6px); }
  }
  .arrow-animate {
    animation: moveArrow 1.5s ease-in-out infinite;
    display: inline-block;
  }
`;

export default function FireworksSection() {
  const [current, setCurrent] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [disableSlideTransition, setDisableSlideTransition] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const circularProducts = [...heroProducts, heroProducts[0]];

  const goToSlide = (idx: number) => {
    if (idx === current) {
      return;
    }

    setTextVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setTextVisible(true);
    }, 300);
  };

  const getSlideIndex = (idx: number) => idx % heroProducts.length;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTextVisible(false);

      setTimeout(() => {
        setCurrent((index) => {
          const isWrapping = index === heroProducts.length - 1;

          if (isWrapping) {
            setDisableSlideTransition(true);
          }

          return (index + 1) % heroProducts.length;
        });
        setTextVisible(true);
      }, 300);
    }, 3800);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!disableSlideTransition) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      setDisableSlideTransition(false);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [disableSlideTransition]);

  return (
    <section
      id="fireworks"
      className="relative overflow-hidden scroll-mt-20 py-12 sm:py-16 lg:py-20"
      style={{ background: "#000211", minHeight: "750px" }}
    >
      <style>{arrowAnimationStyle}</style>
      <Container className="relative">
        <div className="mb-10 text-center sm:mb-14">
          <h2
            className="text-4xl font-semibold tracking-[0.01em] text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Fireworks
          </h2>

          <div
            className="mx-auto mt-4 h-px w-40 sm:w-45"
            style={{
              background: `linear-gradient(to right, transparent, ${colors.accentSoft}, transparent)`,
            }}
          />
        </div>

        <div className="relative" style={{ minHeight: "580px" }}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="relative z-10">
              <div className="overflow-hidden" style={{ height: "136px" }}>
                <div
                  style={{
                    transform: `translateY(-${current * 136}px)`,
                    transition: disableSlideTransition
                      ? "none"
                      : "transform 500ms ease-in-out",
                  }}
                >
                  {heroProducts.map((product) => (
                    <div
                      key={product.id}
                      style={{
                        height: "136px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        className="block font-medium text-white whitespace-nowrap"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "clamp(20px, 2.5vw, 32px)",
                          lineHeight: "1.14",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {product.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="mt-3 transition-all duration-300"
                style={{
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <p
                  className="max-w-[498px] font-normal text-white/65"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(14px, 1.55vw, 24px)",
                    lineHeight: "1.5",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {descriptions[current]}
                </p>
              </div>

              <Link
                href="/products"
                className="mt-8 inline-flex h-[56px] w-[155px] items-center justify-center gap-2 rounded-lg bg-white text-base tracking-wide text-black transition-opacity hover:opacity-90"
              >
                View More
                <svg
                  className="arrow-animate h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="overflow-hidden">
              <div
                className="flex gap-4 sm:gap-5"
                style={{
                  transform: `translateX(${-current * 228}px)`,
                  transition: disableSlideTransition
                    ? "none"
                    : "transform 500ms ease-in-out",
                }}
              >
                {circularProducts.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="transition-all duration-500"
                    onMouseEnter={() => goToSlide(getSlideIndex(index))}
                    style={{
                      transform: index === current ? "scale(1)" : "scale(0.88)",
                      opacity:
                        Math.abs(index - current) > 1
                          ? 0.4
                          : index === current
                            ? 1
                            : 0.72,
                      transformOrigin: "center center",
                    }}
                  >
                    <FireworkProductCard
                      product={product}
                      size={index === current ? "large" : "small"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-2 sm:bottom-1">
          {heroProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="rounded-full transition-all duration-300"
              style={{
                width: "14px",
                height: "14px",
                background:
                  index === current ? "#FFFFFF" : "rgba(217,217,217,0.45)",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
