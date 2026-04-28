import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { colors } from "@/src/constants/colors";

const storeLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Fireworks",
    href: "/products",
  },
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

const contactDetails = [
  {
    icon: Phone,
    text: "071 2293300",
    href: "tel:0712293300",
  },
  {
    icon: FaWhatsapp,
    text: "072 2293300",
    href: "https://wa.me/94722293300",
  },
  {
    icon: Mail,
    text: "ruhunumatara20@mail.com",
    href: "mailto:ruhunumatara20@mail.com",
  },
  {
    icon: MapPin,
    text: "Matara,Sri Lanka",
    href: "https://www.google.com/maps/search/?api=1&query=Matara%2CSri%20Lanka",
  },
];

export default function FooterSection() {
  return (
    <footer
      className="w-full px-5 pb-7 pt-8 sm:px-8 md:px-10 lg:px-14 xl:px-20"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="border-t border-white/45 pt-10 sm:pt-12">
          <div className="grid gap-12 border-b border-white/45 pb-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.75fr_1fr] lg:gap-20">
            {/* Brand Column */}
            <div className="flex flex-col items-start">
              <Link
                href="/"
                className="relative block h-[74px] w-[74px] transition duration-300 hover:scale-[1.03]"
              >
                <Image
                  src="/images/logo.png"
                  alt="Ruhunu Fireworks Logo"
                  fill
                  sizes="74px"
                  className="object-contain"
                />
              </Link>

              <p className="mt-5 max-w-[390px] text-[0.95rem] font-normal leading-[1.6] text-white/85 sm:text-[1rem]">
                Bringing color, excitement, and unforgettable moments to every
                celebration with premium fireworks
              </p>

              <div className="mt-5 flex items-center gap-2.5">
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2] text-white transition duration-300 hover:scale-110 hover:shadow-[0_6px_14px_rgba(24,119,242,0.45)]"
                >
                  <FaFacebookF size={14} />
                </Link>

                <Link
                  href="#"
                  aria-label="Instagram"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white transition duration-300 hover:scale-110 hover:shadow-[0_6px_14px_rgba(236,72,153,0.4)]"
                >
                  <FaInstagram size={14} />
                </Link>

                <Link
                  href="#"
                  aria-label="YouTube"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF0000] text-white transition duration-300 hover:scale-110 hover:shadow-[0_6px_14px_rgba(255,0,0,0.45)]"
                >
                  <FaYoutube size={14} />
                </Link>
              </div>
            </div>

            {/* Store Links */}
            <div className="flex flex-col items-start md:items-start">
              <h3 className="text-[1.35rem] font-semibold text-white sm:text-[1.5rem]">
                Our Store
              </h3>

              <nav className="mt-5 flex flex-col gap-4">
                {storeLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[0.95rem] font-normal text-white/80 transition duration-300 hover:text-[var(--footer-link-hover)] sm:text-[1rem]"
                    style={{ "--footer-link-hover": colors.accentSoft } as Record<string, string>}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col items-start">
              <h3 className="text-[1.35rem] font-semibold text-white sm:text-[1.5rem]">
                Contact
              </h3>

              <div className="mt-5 flex flex-col gap-4">
                {contactDetails.map((item) => {
                  const Icon = item.icon;

                  if (item.href) {
                    return (
                      <a
                        key={item.text}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-5 text-white/85 transition duration-300 hover:text-white"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-white" />
                        <span className="break-all text-[0.95rem] font-normal sm:text-[1rem]">
                          {item.text}
                        </span>
                      </a>
                    );
                  }

                  return (
                    <div
                      key={item.text}
                      className="flex items-center gap-5 text-white/85"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-white" />
                      <span className="break-all text-[0.95rem] font-normal sm:text-[1rem]">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-3 text-center">
            <p className="text-[0.85rem] font-normal text-white/70 sm:text-[0.95rem]">
              © 2026 FireGlow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}