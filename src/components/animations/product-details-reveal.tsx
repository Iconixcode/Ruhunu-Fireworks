"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

type ProductDetailsRevealProps = {
  children: ReactNode;
};

export default function ProductDetailsReveal({
  children,
}: ProductDetailsRevealProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-detail-animate",
        {
          y: 28,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.15,
        },
      );
    }, wrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}