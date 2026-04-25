import Image from "next/image";
import Link from "next/link";

import Container from "../ui/container";
import { navigationLinks } from "@/src/constants/navigation";


export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container>
        <nav
          className="mt-3 rounded-4xl px-3 py-2 sm:mt-4 sm:px-6"
          style={{
            background:
              "linear-gradient(120deg, rgba(9, 21, 36, 0.78), rgba(13, 28, 45, 0.62))",
            backdropFilter: "blur(16px) saturate(140%)",
            WebkitBackdropFilter: "blur(16px) saturate(140%)",
            // border: "1px solid rgba(29, 192, 255, 0.78)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(15,35,58,0.72), 0 10px 28px rgba(0,0,0,0.35)",
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <Link href="#" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Ruhunu Fireworks logo"
                width={168}
                height={56}
                className="h-10 w-auto max-w-30 object-contain sm:h-14 sm:max-w-42"
                priority
              />
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navigationLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative px-1 py-1 text-md font-medium transition duration-300"
                  style={{ color: "rgba(255, 255, 255, 0.82)" }}
                >
                  <span className="relative z-10 transition duration-300 group-hover:text-white">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-2 -inset-y-1 z-0 rounded-full opacity-0 blur-md transition duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(255,180,92,0.22), rgba(255,180,92,0))",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 rounded-full bg-linear-to-r from-transparent via-[#ffc786] to-transparent transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {navigationLinks.map((item) => (
              <Link
                key={`mobile-${item.label}`}
                href={item.href}
                className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85 transition hover:border-white/30 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}