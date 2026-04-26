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
      className="py-16 text-white sm:py-20 lg:py-24"
      style={{ backgroundColor: colors.background }}
    >
      <Container>
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="text-4xl font-semibold tracking-[0.01em] sm:text-5xl lg:text-6xl">
            About Us
          </h2>
          <div
            className="mx-auto mt-4 h-px w-45"
            style={{
              background: `linear-gradient(to right, transparent, ${colors.accentSoft}, transparent)`,
            }}
          />
        </div>

        <div className="grid items-start gap-10 sm:grid-cols-2 sm:gap-8 md:gap-12 lg:gap-16">
          <div>
            <h3 className="max-w-xl text-xl font-medium leading-tight sm:text-2xl lg:text-[2rem] lg:leading-[1.18]">
              Crafting Brilliant Moments, Lighting Every Celebration
            </h3>

            <div className="mt-8 sm:mt-10">
              <h4 className="text-lg font-semibold">
                Your Celebration, Our Passion
              </h4>

              <p
                className="mt-5 max-w-xl text-base leading-8"
                style={{ color: colors.textMuted }}
              >
                We offer high-quality fireworks that bring color, excitement,
                and unforgettable moments to every celebration.
              </p>
            </div>

            <div className="mt-8 hidden w-full max-w-[430px] grid-cols-3 gap-2 sm:mt-10 sm:grid sm:gap-4 md:max-w-[520px] lg:max-w-[560px]">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="text-[1.8rem] font-semibold leading-none sm:text-[1.95rem] md:text-[2rem] lg:text-3xl">
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

          <div className="mx-auto flex w-full max-w-[460px] flex-col items-center pt-0 sm:justify-self-end sm:max-w-[380px] sm:items-end md:ml-auto md:max-w-[430px] lg:max-w-[460px]">
            <div className="relative order-1 h-[245px] w-full max-w-[320px] self-center min-[447px]:h-[300px] min-[447px]:max-w-[380px] sm:order-2 sm:h-[260px] sm:max-w-[380px] sm:self-end md:h-[320px] md:max-w-[430px] lg:h-[360px] lg:max-w-[460px]">
              <Image
                src="/images/about-section.png"
                alt="Ruhunu Fireworks collage"
                fill
                className="object-contain scale-100 sm:scale-100 md:scale-108 lg:scale-120"
              />
            </div>

            <div className="order-2 mt-6 grid w-full max-w-[320px] grid-cols-3 gap-3 min-[447px]:max-w-[380px] sm:hidden">
              {stats.map((stat) => (
                <div key={`mobile-${stat.label}`} className="text-center">
                  <p className="text-[1.8rem] font-semibold leading-none">
                    <span>{stat.format ? stat.format(stat.target) : stat.target}</span>
                    <span style={{ color: colors.red }}>{stat.suffix}</span>
                  </p>
                  <p
                    className="mt-2 text-[0.72rem] leading-tight"
                    style={{ color: colors.textMuted }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="order-3 mt-6 flex w-full max-w-[300px] justify-center gap-3 px-1 sm:order-1 sm:mb-6 sm:mt-0 sm:w-fit sm:max-w-none sm:flex-nowrap sm:justify-end sm:px-0 sm:gap-3 md:mb-6 md:gap-4">
              <Link
                href="#fireworks"
                className="inline-flex h-10 min-w-[136px] items-center justify-center whitespace-nowrap rounded-md border bg-white/5 px-3 text-[0.8rem] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.14)] backdrop-blur-md transition duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white sm:min-w-[124px] sm:flex-none md:min-w-[134px]"
                style={{ borderColor: colors.border, color: colors.textSecondary }}
              >
                Explore Fireworks
              </Link>

              <Link
                href="#contact"
                className="inline-flex h-10 min-w-[126px] items-center justify-center whitespace-nowrap rounded-md border border-[#27376f] bg-[#0b1a44] px-3 text-[0.8rem] font-medium text-white/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.14)] transition duration-200 hover:border-[#3a55ad] hover:bg-[#10215a] hover:text-white sm:min-w-[116px] sm:flex-none md:min-w-[126px]"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}