import Container from "../ui/container";
import { colors } from "@/src/constants/colors";
import { siteConfig } from "@/src/constants/site";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden pt-[96px] sm:pt-[112px] lg:pt-[124px]"
      style={{ backgroundColor: colors.background }}
    >
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/landing-section.mp4" type="video/mp4" />
        </video>

        <video
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-35 blur-[1px]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/landing-section.mp4#t=1.8" type="video/mp4" />
        </video>
      </div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: colors.overlayDark }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.34), rgba(2,8,23,0.35), #020817)",
        }}
      />

      <Container className="relative z-10 flex min-h-[calc(100svh-96px)] items-center justify-center pb-16 sm:min-h-[calc(100svh-112px)] sm:pb-20 lg:min-h-[calc(100svh-124px)] lg:pb-24">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p
            className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.24em] sm:text-sm sm:tracking-[0.3em]"
            style={{ color: colors.accentSoft }}
          >
            Premium Fireworks Experience
          </p>

          <h1
            className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ color: colors.textPrimary }}
          >
            {siteConfig.name}
          </h1>

          <p
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 sm:text-base"
            style={{ color: colors.textSecondary }}
          >
            {siteConfig.description}
          </p>

          <div className="mt-8">
            <a
              href="#fireworks"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-bold leading-none tracking-wide transition duration-200 hover:scale-[1.03] sm:gap-3 sm:px-7 sm:py-3 sm:text-[1.35rem]"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.08))",
                backdropFilter: "blur(16px) saturate(140%)",
                WebkitBackdropFilter: "blur(16px) saturate(140%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), 0 0 0 1px rgba(255,255,255,0.22), 0 10px 24px rgba(0,0,0,0.3)",
                color: "#050505",
              }}
            >
              {siteConfig.ctaLabel}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M9 7h8v8" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}