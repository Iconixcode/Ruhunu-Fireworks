"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Container from "../ui/container";
import { navigationLinks } from "@/src/constants/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const sectionIds = navigationLinks
      .map((item) => {
        if (item.href.includes("#")) {
          return item.href.split("#")[1];
        }

        if (item.href === "/") {
          return "home";
        }

        return "";
      })
      .filter(Boolean);

    const updateActiveSection = () => {
      let currentSection = "";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (!section) {
          return;
        }

        const sectionTop = section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {
          currentSection = id;
        }
      });

      if (window.scrollY < 120) {
        currentSection = "home";
      }

      setActiveHash(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    if (href.includes("#")) {
      const hashValue = href.split("#")[1];
      setActiveHash(hashValue);
      return;
    }

    if (href === "/") {
      setActiveHash("home");
    }
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/" && activeHash === "home";
    }

    if (href.includes("#")) {
      const hashValue = href.split("#")[1];
      return pathname === "/" && activeHash === hashValue;
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container>
        <nav
          className="mt-3 rounded-4xl px-3 py-2 sm:mt-4 sm:px-5 md:px-6"
          style={{
            background:
              "linear-gradient(120deg, rgba(9, 21, 36, 0.82), rgba(13, 28, 45, 0.66))",
            backdropFilter: "blur(16px) saturate(140%)",
            WebkitBackdropFilter: "blur(16px) saturate(140%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(15,35,58,0.72), 0 10px 28px rgba(0,0,0,0.35)",
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => handleNavClick("/")}
            >
              <Image
                src="/images/logo.png"
                alt="Ruhunu Fireworks logo"
                width={168}
                height={56}
                className="h-10 w-auto max-w-30 object-contain sm:h-12 sm:max-w-38 md:h-14 md:max-w-42"
                priority
              />
            </Link>

            <div className="hidden items-center gap-7 lg:flex xl:gap-9">
              {navigationLinks.map((item) => {
                const active = isActiveLink(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="group relative px-1 py-2 text-[0.95rem] font-medium transition duration-300 xl:text-md"
                    style={{ color: "rgba(255, 255, 255, 0.82)" }}
                  >
                    <span
                      className={`relative z-10 transition duration-300 group-hover:text-white ${
                        active ? "text-white" : ""
                      }`}
                    >
                      {item.label}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -inset-x-2 -inset-y-1 z-0 rounded-full blur-md transition duration-300 group-hover:opacity-100 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(255,180,92,0.22), rgba(255,180,92,0))",
                      }}
                    />

                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -bottom-1 left-1/2 h-px -translate-x-1/2 rounded-full bg-linear-to-r from-transparent via-[#ffc786] to-transparent transition-all duration-300 group-hover:w-full ${
                        active ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center text-white transition duration-300 hover:text-[#ffc786] lg:hidden"
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <Menu
                  className={`absolute h-5 w-5 transition duration-300 ${
                    isOpen
                      ? "rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                <X
                  className={`absolute h-5 w-5 transition duration-300 ${
                    isOpen
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0"
                  }`}
                />
              </span>
            </button>
          </div>

          <div
            className={`grid overflow-hidden transition-all duration-500 ease-in-out lg:hidden ${
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <div className="mt-3 border-t border-white/10 pt-4">
                <div className="flex flex-col gap-2 pb-3">
                  {navigationLinks.map((item, index) => {
                    const active = isActiveLink(item.href);

                    return (
                      <Link
                        key={`mobile-${item.label}`}
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={`relative block rounded-xl px-4 py-3 text-[0.95rem] font-medium transition-all duration-300 ${
                          active
                            ? "bg-[#ffc786]/10 text-[#ffc786]"
                            : "text-white/70 hover:text-[#ffc786]"
                        }`}
                        style={{
                          transitionDelay: isOpen ? `${index * 55}ms` : "0ms",
                          transform: isOpen
                            ? "translateY(0)"
                            : "translateY(-8px)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute inset-0 rounded-xl transition duration-300 ${
                            active ? "opacity-100" : "opacity-0"
                          }`}
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(255,199,134,0.12), rgba(255,199,134,0.04), rgba(255,199,134,0.01))",
                          }}
                        />

                        <span
                          aria-hidden="true"
                          className={`absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-[#ffc786] transition-all duration-300 ${
                            active
                              ? "scale-y-100 opacity-100"
                              : "scale-y-0 opacity-0"
                          }`}
                        />

                        <span className="relative z-10">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}