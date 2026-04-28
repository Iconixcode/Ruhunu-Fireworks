"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../ui/container";
import { colors } from "@/src/constants/colors";

const stats = [
  {
    target: 200,
    suffix: "+",
    label: "Fireworks Products",
  },
  {
    target: 1000,
    suffix: "+",
    label: "Happy Customers",
    format: (value: number) => {
      if (value >= 1000) {
        return `${Math.floor(value / 1000)}K`;
      }

      return `${value}`;
    },
  },
  {
    target: 100,
    suffix: "%",
    label: "Quality & Safety Focus",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      stats.forEach((stat, index) => {
        const numberEl = numberRefs.current[index];

        if (!numberEl) {
          return;
        }

        const counter = { value: 0 };

        gsap.to(counter, {
          value: stat.target,
          duration: 1.8,
          delay: index * 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            const currentValue = Math.round(counter.value);
            numberEl.textContent = stat.format
              ? stat.format(currentValue)
              : `${currentValue}`;
          },
          onComplete: () => {
            numberEl.textContent = stat.format
              ? stat.format(stat.target)
              : `${stat.target}`;
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-20 py-16 text-white sm:py-20 lg:py-24"
      style={{ backgroundColor: colors.background }}
    >
      <Container>
        <div className="mx-auto w-full max-w-[1240px]">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="text-4xl font-semibold tracking-[0.01em] sm:text-5xl lg:text-6xl">
              About Us
            </h2>

            <div
              className="mx-auto mt-4 h-px w-40 sm:w-45"
              style={{
                background: `linear-gradient(to right, transparent, ${colors.accentSoft}, transparent)`,
              }}
            />
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20">
            {/* Left Content */}
            <div className="w-full text-center md:text-left">
              <h3 className="mx-auto max-w-xl text-xl font-medium leading-tight sm:text-2xl md:mx-0 lg:text-[2rem] lg:leading-[1.18]">
                Crafting Brilliant Moments, Lighting Every Celebration
              </h3>

              <div className="mt-8 sm:mt-10">
                <h4 className="text-lg font-semibold">
                  Your Celebration, Our Passion
                </h4>

                <p
                  className="mx-auto mt-5 max-w-xl text-base leading-8 md:mx-0"
                  style={{ color: colors.textMuted }}
                >
                  We offer high-quality fireworks that bring color, excitement,
                  and unforgettable moments to every celebration.
                </p>
              </div>

              {/* Desktop / Tablet Stats */}
              <div className="mx-auto mt-8 hidden w-full max-w-[560px] grid-cols-3 gap-4 sm:mt-10 sm:grid md:mx-0">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center md:text-left"
                  >
                    <p className="text-[1.75rem] font-semibold leading-none sm:text-[1.9rem] lg:text-3xl">
                      <span
                        ref={(el) => {
                          numberRefs.current[index] = el;
                        }}
                      >
                        {stat.format ? stat.format(0) : "0"}
                      </span>
                      <span style={{ color: colors.red }}>{stat.suffix}</span>
                    </p>

                    <p
                      className="mt-2 text-[0.72rem] leading-tight sm:text-sm"
                      style={{ color: colors.textMuted }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div className="flex w-full flex-col items-center md:items-end">
              <div className="order-1 flex w-full max-w-[320px] justify-center gap-3 sm:max-w-[360px] md:max-w-none md:justify-end md:gap-4">
                <Link
                  href="#fireworks"
                  className="inline-flex h-10 min-w-[136px] items-center justify-center whitespace-nowrap rounded-md border bg-white/5 px-3 text-[0.8rem] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.14)] backdrop-blur-md transition duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white sm:min-w-[144px] md:min-w-[134px]"
                  style={{
                    borderColor: colors.border,
                    color: colors.textSecondary,
                  }}
                >
                  Explore Fireworks
                </Link>

                <Link
                  href="#contact"
                  className="inline-flex h-10 min-w-[126px] items-center justify-center whitespace-nowrap rounded-md border border-[#27376f] bg-[#0b1a44] px-3 text-[0.8rem] font-medium text-white/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.14)] transition duration-200 hover:border-[#3a55ad] hover:bg-[#10215a] hover:text-white sm:min-w-[134px] md:min-w-[126px]"
                >
                  Contact us
                </Link>
              </div>

              <div className="relative order-2 mt-8 h-[245px] w-full max-w-[320px] min-[430px]:h-[280px] min-[430px]:max-w-[360px] sm:h-[320px] sm:max-w-[430px] md:mt-6 md:h-[320px] md:max-w-[430px] lg:h-[360px] lg:max-w-[460px]">
                <Image
                  src="/images/about-section.png"
                  alt="Ruhunu Fireworks collage"
                  fill
                  className="object-contain"
                  sizes="(max-width: 430px) 320px, (max-width: 640px) 360px, (max-width: 1024px) 430px, 460px"
                />
              </div>

              {/* Mobile Stats */}
              <div className="order-3 mt-6 grid w-full max-w-[320px] grid-cols-3 gap-3 min-[430px]:max-w-[360px] sm:hidden">
                {stats.map((stat) => (
                  <div key={`mobile-${stat.label}`} className="text-center">
                    <p className="text-[1.65rem] font-semibold leading-none">
                      <span>
                        {stat.format ? stat.format(stat.target) : stat.target}
                      </span>
                      <span style={{ color: colors.red }}>{stat.suffix}</span>
                    </p>

                    <p
                      className="mt-2 text-[0.7rem] leading-tight"
                      style={{ color: colors.textMuted }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}