"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import Container from "../ui/container";

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
      className="bg-[#020617] py-20 text-white sm:py-24"
    >
      <Container>
        <div className="mb-14 text-center">
          <h2 className="text-5xl font-semibold tracking-[0.01em] sm:text-6xl">
            About Us
          </h2>
          <div className="mx-auto mt-4 h-px w-36 bg-gradient-to-r from-transparent via-orange-400/90 to-transparent" />
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="max-w-xl text-2xl font-medium leading-tight sm:text-[2rem] sm:leading-[1.18]">
              Crafting Brilliant Moments, Lighting Every Celebration
            </h3>

            <div className="mt-10">
              <h4 className="text-lg font-semibold">
                Your Celebration, Our Passion
              </h4>

              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                We offer high-quality fireworks that bring color, excitement,
                and unforgettable moments to every celebration.
              </p>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold">
                    <span
                      ref={(el) => {
                        numberRefs.current[index] = el;
                      }}
                    >
                      {stat.format ? stat.format(0) : "0"}
                    </span>
                    <span className="text-red-500">{stat.suffix}</span>
                  </p>
                  <p className="mt-1 text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[460px] flex-col pt-2">
            <div className="mb-8 flex w-full flex-nowrap justify-end gap-3 sm:gap-4">
              <Link
                href="#fireworks"
                className="inline-flex h-11 min-w-[146px] items-center justify-center rounded-md border border-white/20 bg-white/5 px-5 text-sm font-medium text-white/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.14)] backdrop-blur-md transition duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                Explore Fireworks
              </Link>

              <Link
                href="#contact"
                className="inline-flex h-11 min-w-[132px] items-center justify-center rounded-md border border-[#27376f] bg-[#0b1a44] px-5 text-sm font-medium text-white/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.14)] transition duration-200 hover:border-[#3a55ad] hover:bg-[#10215a] hover:text-white"
              >
                Contact us
              </Link>
            </div>

            <div className="relative h-[360px] w-full">
              <Image
                src="/images/about-section.png"
                alt="Ruhunu Fireworks collage"
                fill
                className="object-contain scale-120"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}