"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Container from "../ui/container";
import FireworkProductCard from "../fireworks/product-card";
import { heroProducts } from "@/src/constants/products";

const descriptions = [
  "A vibrant aerial firework that blooms into colorful, flower-like bursts, creating a lively and beautiful display in the night sky.",
  "A classic ground firework that emits steady showers of colorful sparks, creating a bright and sparkling display.",
  "A powerful aerial firework that delivers rapid, high-energy bursts with bright flashes and crackling effects in the sky.",
  "A ground fountain firework that sprays colorful sparks in a fan shape, inspired by a peacock's vibrant feathers.",
];

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
      className="relative overflow-hidden py-14 sm:py-20"
      style={{ background: "#000211", minHeight: "750px" }}
    >
      <Container className="relative">
        <div className="absolute left-0 right-0 top-0 z-10 flex justify-center pt-2 sm:pt-4">
          <h2
            className="text-center font-semibold text-white select-none"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(50px, 6vw, 68px)",
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}
          >
            Fireworks
          </h2>
        </div>

        <div
          className="relative pt-24 sm:pt-28 lg:pt-32"
          style={{ minHeight: "680px" }}
        >
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
                className="mt-8 inline-flex h-[62px] w-[210px] items-center justify-center rounded-lg bg-white text-xl tracking-wide text-black transition-opacity hover:opacity-90"
              >
                Explore
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

        <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-4 sm:bottom-5">
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