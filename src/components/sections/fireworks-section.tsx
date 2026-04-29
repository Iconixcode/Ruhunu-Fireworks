"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../ui/container";
import FireworkProductCard from "../fireworks/product-card";
import { colors } from "../../constants/colors";
import { heroProducts } from "../../constants/products";

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

const slideWidth = 228;
const slideTransitionDuration = 500;

export default function FireworksSection() {
  const [current, setCurrent] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [disableSlideTransition, setDisableSlideTransition] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const mobileCardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const productCount = heroProducts.length;
  const activeIndex = current === productCount ? 0 : current;
  const circularProducts = [...heroProducts, heroProducts[0]];

  const scrollMobileCardIntoView = (index: number) => {
    const scrollContainer = mobileScrollRef.current;
    const selectedCard = mobileCardRefs.current[index];

    if (!scrollContainer || !selectedCard) {
      return;
    }

    const targetLeft =
      selectedCard.offsetLeft -
      scrollContainer.clientWidth / 2 +
      selectedCard.clientWidth / 2;

    scrollContainer.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  };

  const changeSlide = (nextIndex: number) => {
    setTextVisible(false);

    setTimeout(() => {
      setCurrent(nextIndex);
      setTextVisible(true);
    }, 300);
  };

  const goToSlide = (idx: number) => {
    const nextIndex = idx % productCount;

    scrollMobileCardIntoView(nextIndex);

    if (nextIndex === activeIndex) {
      return;
    }

    changeSlide(nextIndex);
  };

  const getSlideIndex = (idx: number) => idx % productCount;

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fireworks-animate",
        {
          y: 32,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTextVisible(false);

      setTimeout(() => {
        setCurrent((index) => index + 1);
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
    if (current !== productCount) {
      return;
    }

    const timeout = setTimeout(() => {
      setDisableSlideTransition(true);
      setCurrent(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisableSlideTransition(false);
        });
      });
    }, slideTransitionDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [current, productCount]);

  useEffect(() => {
    scrollMobileCardIntoView(activeIndex);
  }, [activeIndex]);

  return (
    <section
      id="fireworks"
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-hidden py-16 text-white sm:py-20 lg:py-24"
      style={{
        background:
          "linear-gradient(to bottom, #020817 0%, #010514 28%, #000211 58%, #000211 100%)",
      }}
    >
      <style>{arrowAnimationStyle}</style>

      <Container className="relative">
        <div className="mx-auto w-full max-w-[1240px]">
          <div className="fireworks-animate mb-10 text-center sm:mb-14">
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

          {/* Mobile and tablet layout */}
          <div className="lg:hidden">
            <div className="fireworks-animate text-center">
              <div className="flex min-h-[76px] items-center justify-center overflow-hidden sm:min-h-[84px]">
                <h3
                  className="mx-auto max-w-[420px] text-2xl font-medium leading-tight text-white transition-all duration-300 sm:text-3xl"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    opacity: textVisible ? 1 : 0,
                    transform: textVisible
                      ? "translateY(0)"
                      : "translateY(12px)",
                  }}
                >
                  {heroProducts[activeIndex]?.name}
                </h3>
              </div>

              <div className="mx-auto mt-4 flex min-h-[112px] max-w-[560px] items-start justify-center sm:min-h-[96px]">
                <p
                  className="text-sm leading-7 text-white/65 sm:text-base"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    opacity: textVisible ? 1 : 0,
                    transform: textVisible
                      ? "translateY(0)"
                      : "translateY(12px)",
                    transition: "opacity 300ms ease, transform 300ms ease",
                  }}
                >
                  {descriptions[activeIndex]}
                </p>
              </div>

              <Link
                href="/products"
                className="mt-8 inline-flex h-[48px] min-w-[140px] items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-90 sm:h-[52px] sm:min-w-[150px] sm:text-base"
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

            <div
              ref={mobileScrollRef}
              className="fireworks-animate mt-12 min-h-[230px] overflow-x-auto overflow-y-hidden pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex w-max gap-5 px-1">
                {heroProducts.map((product, index) => (
                  <button
                    key={product.id}
                    ref={(element) => {
                      mobileCardRefs.current[index] = element;
                    }}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className="shrink-0 cursor-pointer text-left transition duration-300"
                    style={{
                      opacity: index === activeIndex ? 1 : 0.72,
                      transform:
                        index === activeIndex ? "scale(1)" : "scale(0.94)",
                    }}
                    aria-label={`Select ${product.name}`}
                  >
                    <FireworkProductCard product={product} size="small" />
                  </button>
                ))}
              </div>
            </div>

            <div className="fireworks-animate mt-8 flex min-h-[14px] justify-center gap-2">
              {heroProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: index === activeIndex ? "28px" : "12px",
                    height: "12px",
                    background:
                      index === activeIndex
                        ? "#FFFFFF"
                        : "rgba(217,217,217,0.45)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden lg:block">
            <div className="grid min-h-[560px] gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div className="fireworks-animate relative z-10">
                <div className="overflow-hidden" style={{ height: "136px" }}>
                  <div
                    style={{
                      transform: `translateY(-${activeIndex * 136}px)`,
                      transition: "transform 500ms ease-in-out",
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
                          className="block whitespace-nowrap font-medium text-white"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "clamp(24px, 2.5vw, 32px)",
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
                  className="mt-3 flex min-h-[116px] items-start transition-all duration-300"
                  style={{
                    opacity: textVisible ? 1 : 0,
                    transform: textVisible
                      ? "translateY(0)"
                      : "translateY(12px)",
                  }}
                >
                  <p
                    className="max-w-[498px] font-normal text-white/65"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "clamp(16px, 1.55vw, 24px)",
                      lineHeight: "1.5",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {descriptions[activeIndex]}
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

              <div className="fireworks-animate overflow-hidden">
                <div
                  className="flex gap-5"
                  style={{
                    transform: `translateX(${-current * slideWidth}px)`,
                    transition: disableSlideTransition
                      ? "none"
                      : `transform ${slideTransitionDuration}ms ease-in-out`,
                  }}
                >
                  {circularProducts.map((product, index) => {
                    const slideIndex = getSlideIndex(index);
                    const isActiveCard = index === current;

                    return (
                      <div
                        key={`${product.id}-${index}`}
                        role="button"
                        tabIndex={0}
                        className="cursor-pointer transition-all duration-500"
                        onClick={() => goToSlide(slideIndex)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            goToSlide(slideIndex);
                          }
                        }}
                        style={{
                          transform: isActiveCard
                            ? "scale(1)"
                            : "scale(0.88)",
                          opacity:
                            Math.abs(index - current) > 1
                              ? 0.4
                              : isActiveCard
                                ? 1
                                : 0.72,
                          transformOrigin: "center center",
                        }}
                        aria-label={`Select ${product.name}`}
                      >
                        <FireworkProductCard
                          product={product}
                          size={isActiveCard ? "large" : "small"}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="fireworks-animate mt-10 flex min-h-[16px] justify-center gap-2">
              {heroProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: index === activeIndex ? "28px" : "14px",
                    height: "14px",
                    background:
                      index === activeIndex
                        ? "#FFFFFF"
                        : "rgba(217,217,217,0.45)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}