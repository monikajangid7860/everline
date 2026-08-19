"use client";

import { useRef, useLayoutEffect } from "react";
// import { Fraunces } from "next/font/google";
import gsap from "gsap";

// const fraunces = Fraunces({
//   subsets: ["latin"],
//   weight: ["400", "500"],
//   style: ["italic", "normal"],
//   variable: "--font-fraunces",
// });

// ---------------------------------------------------------------------------
// Floating image configuration
// All position values (x, y) are PERCENTAGES of the section's own width /
// height, not pixels. Velocities (vx, vy) are also %/second. Keeping the
// motion system in percentage-space means it never needs to be rescaled on
// resize — the pixel conversion happens once per frame, at the very end.
// ---------------------------------------------------------------------------
const FLOATING_IMAGES = [
  {
    id: "img-1",
    src: "https://picsum.photos/seed/atelier-01/500/650",
    sizeClass: "w-28 h-36 sm:w-32 sm:h-44 lg:w-36 lg:h-48",
    visibilityClass: "",
    x: 6,
    y: 16,
    vx: 0.14,
    vy: -3.4,
    rotation: -8,
    rotAmp: 3,
    rotSpeed: 0.22,
    scaleBase: 1,
    scaleAmp: 0.04,
    scaleSpeed: 0.18,
    zIndex: 20,
    parallax: 14,
    phase: 0.2,
  },
  {
    id: "img-2",
    src: "https://picsum.photos/seed/atelier-02/560/720",
    sizeClass: "w-32 h-44 sm:w-40 sm:h-52 lg:w-48 lg:h-64",
    visibilityClass: "",
    x: 1,
    y: 54,
    vx: -0.1,
    vy: 2.7,
    rotation: -5,
    rotAmp: 2.5,
    rotSpeed: 0.16,
    scaleBase: 1,
    scaleAmp: 0.05,
    scaleSpeed: 0.13,
    zIndex: 10,
    parallax: 24,
    phase: 1.4,
  },
  {
    id: "img-3",
    src: "https://picsum.photos/seed/atelier-03/480/620",
    sizeClass: "w-24 h-32 sm:w-28 sm:h-36 lg:w-32 lg:h-44",
    visibilityClass: "",
    x: 11,
    y: 84,
    vx: 0.22,
    vy: -2.1,
    rotation: 6,
    rotAmp: 3.5,
    rotSpeed: 0.27,
    scaleBase: 1,
    scaleAmp: 0.04,
    scaleSpeed: 0.21,
    zIndex: 25,
    parallax: 10,
    phase: 2.6,
  },
  {
    id: "img-4",
    src: "https://picsum.photos/seed/atelier-04/480/560",
    sizeClass: "w-24 h-28 sm:w-28 sm:h-36 lg:w-32 lg:h-40",
    visibilityClass: "",
    x: 35,
    y: 8,
    vx: -0.16,
    vy: 3.3,
    rotation: -4,
    rotAmp: 2,
    rotSpeed: 0.14,
    scaleBase: 0.96,
    scaleAmp: 0.03,
    scaleSpeed: 0.11,
    zIndex: 4,
    parallax: 18,
    phase: 3.8,
  },
  {
    id: "img-5",
    src: "https://picsum.photos/seed/atelier-05/560/700",
    sizeClass: "w-32 h-40 sm:w-40 sm:h-52 lg:w-52 lg:h-64",
    visibilityClass: "",
    x: 87,
    y: 12,
    vx: -0.2,
    vy: -2.5,
    rotation: 7,
    rotAmp: 3,
    rotSpeed: 0.19,
    scaleBase: 1,
    scaleAmp: 0.04,
    scaleSpeed: 0.16,
    zIndex: 20,
    parallax: 16,
    phase: 4.4,
  },
  {
    id: "img-6",
    src: "https://picsum.photos/seed/atelier-06/500/640",
    sizeClass: "w-28 h-36 sm:w-32 sm:h-44 lg:w-40 lg:h-52",
    visibilityClass: "hidden sm:block",
    x: 93,
    y: 46,
    vx: 0.18,
    vy: 1.9,
    rotation: -9,
    rotAmp: 2.5,
    rotSpeed: 0.24,
    scaleBase: 1,
    scaleAmp: 0.05,
    scaleSpeed: 0.2,
    zIndex: 15,
    parallax: 24,
    phase: 0.9,
  },
  {
    id: "img-7",
    src: "https://picsum.photos/seed/atelier-07/540/680",
    sizeClass: "w-32 h-40 sm:w-36 sm:h-48 lg:w-44 lg:h-56",
    visibilityClass: "hidden sm:block",
    x: 81,
    y: 85,
    vx: 0.1,
    vy: -2.9,
    rotation: 5,
    rotAmp: 3,
    rotSpeed: 0.17,
    scaleBase: 1,
    scaleAmp: 0.04,
    scaleSpeed: 0.14,
    zIndex: 20,
    parallax: 12,
    phase: 2.1,
  },
  {
    id: "img-8",
    src: "https://picsum.photos/seed/atelier-08/460/580",
    sizeClass: "w-24 h-32 sm:w-28 sm:h-36 lg:w-32 lg:h-40",
    visibilityClass: "hidden lg:block",
    x: 53,
    y: 91,
    vx: -0.28,
    vy: 2.3,
    rotation: -6,
    rotAmp: 2,
    rotSpeed: 0.15,
    scaleBase: 0.94,
    scaleAmp: 0.03,
    scaleSpeed: 0.12,
    zIndex: 6,
    parallax: 20,
    phase: 3.3,
  },
  {
    id: "img-9",
    src: "https://picsum.photos/seed/atelier-09/420/500",
    sizeClass: "w-20 h-24 sm:w-24 sm:h-28 lg:w-28 lg:h-32",
    visibilityClass: "hidden lg:block",
    x: 69,
    y: 5,
    vx: 0.3,
    vy: -1.7,
    rotation: 10,
    rotAmp: 4,
    rotSpeed: 0.29,
    scaleBase: 1,
    scaleAmp: 0.05,
    scaleSpeed: 0.23,
    zIndex: 30,
    parallax: 8,
    phase: 1.9,
  },
];

const WRAP_BUFFER = 30; // percent — generous enough that any card fully clears the edge before it's recycled

export default function FloatingHero() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  imageRefs.current = [];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionScale = reduceMotion ? 0.15 : 1;

    const dims = { width: 0, height: 0 };
    const updateDims = () => {
      const rect = section.getBoundingClientRect();
      dims.width = rect.width;
      dims.height = rect.height;
    };
    updateDims();

    // Per-image mutable motion state (kept outside React state on purpose —
    // this is a 60fps loop and must never trigger a re-render).
    const motion = FLOATING_IMAGES.map((cfg) => ({ x: cfg.x, y: cfg.y }));

    const setters = imageRefs.current.map((el) => {
      if (!el) return null;
      return {
        x: gsap.quickSetter(el, "x", "px"),
        y: gsap.quickSetter(el, "y", "px"),
        rotation: gsap.quickSetter(el, "rotation", "deg"),
        scale: gsap.quickSetter(el, "scale"),
      };
    });

    // Paint the very first frame synchronously so there's no flash at (0,0).
    FLOATING_IMAGES.forEach((cfg, i) => {
      const s = setters[i];
      if (!s) return;
      s.x((cfg.x / 100) * dims.width);
      s.y((cfg.y / 100) * dims.height);
      s.rotation(cfg.rotation);
      s.scale(cfg.scaleBase);
    });

    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    const mouse = { targetX: 0, targetY: 0, smoothX: 0, smoothY: 0 };

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouse.targetX = (e.clientX - cx) / cx;
      mouse.targetY = (e.clientY - cy) / cy;
    };

    if (isFinePointer) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const tick = (time, deltaTimeMs) => {
      // Clamp dt so a throttled/backgrounded tab doesn't cause a big jump
      // (which would look exactly like the "visible reset" we're avoiding).
      const dt = Math.min(deltaTimeMs / 1000, 0.1) * motionScale;

      mouse.smoothX += (mouse.targetX - mouse.smoothX) * 0.04;
      mouse.smoothY += (mouse.targetY - mouse.smoothY) * 0.04;

      const { width, height } = dims;

      for (let i = 0; i < FLOATING_IMAGES.length; i++) {
        const cfg = FLOATING_IMAGES[i];
        const s = setters[i];
        if (!s) continue;
        const st = motion[i];

        st.x += cfg.vx * dt;
        st.y += cfg.vy * dt;

        // Seamless recycling: once a card has fully cleared one edge it is
        // teleported just past the opposite edge, still moving the same
        // direction at the same speed. Nothing ever fades — it's simply
        // repositioned outside the visible area, one frame at a time.
        if (cfg.vy < 0 && st.y < -WRAP_BUFFER) st.y = 100 + WRAP_BUFFER;
        if (cfg.vy > 0 && st.y > 100 + WRAP_BUFFER) st.y = -WRAP_BUFFER;
        if (cfg.vx < 0 && st.x < -WRAP_BUFFER) st.x = 100 + WRAP_BUFFER;
        if (cfg.vx > 0 && st.x > 100 + WRAP_BUFFER) st.x = -WRAP_BUFFER;

        const rot =
          cfg.rotation + Math.sin(time * cfg.rotSpeed + cfg.phase) * cfg.rotAmp;
        const scale =
          cfg.scaleBase +
          Math.sin(time * cfg.scaleSpeed + cfg.phase) * cfg.scaleAmp;

        const parallaxX = mouse.smoothX * cfg.parallax;
        const parallaxY = mouse.smoothY * cfg.parallax;

        s.x((st.x / 100) * width + parallaxX);
        s.y((st.y / 100) * height + parallaxY);
        s.rotation(rot);
        s.scale(scale);
      }
    };

    gsap.ticker.add(tick);

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDims, 100);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", handleResize);
      if (isFinePointer) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={` relative w-full min-h-screen overflow-hidden bg-[#ECF3A6]`}
    >
      {/* Floating photographic cards */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {FLOATING_IMAGES.map((cfg, i) => (
          <div
            key={cfg.id}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className={`absolute top-0 left-0 ${cfg.sizeClass} ${cfg.visibilityClass}`}
            style={{
              zIndex: cfg.zIndex,
              willChange: "transform",
              transform: "translate3d(0,0,0)",
            }}
          >
            <img
              src={cfg.src}
              alt=""
              className="h-full w-full rounded-[2px] object-cover shadow-[0_18px_40px_-12px_rgba(59,42,31,0.45)]"
              draggable={false}
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* Central editorial content */}
      <div className="relative z-30 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1
          className="max-w-4xl text-[#242018] text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] italic"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          If you can&apos;t reach a million
          <br className="hidden sm:block" /> people with €0 ad spend,
          <br className="hidden sm:block" /> your branding sucks.
        </h1>

        <p className="mt-6 max-w-md text-sm sm:text-base text-[#3B3A2E]">
          We will 10x your social presence or work for
          <br className="hidden sm:block" /> free until it&apos;s done.
        </p>

        <div className="mt-8 flex items-center gap-6">
          <button
            type="button"
            className="rounded-full bg-[#242018] px-6 py-3 text-sm font-medium text-[#ECF3A6] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Our approach
          </button>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#242018]"
          >
            Work with us
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#242018] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
