import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Shared data. `blurb` and `plate` are additive fields used only by
   the mobile editorial layout — the desktop gallery still reads just
   `title` and `img`, exactly as before. */
const projects = [
  {
    title: "Editorial Campaign",
    img: "https://images.unsplash.com/photo-1551880213-0861c4ae7460?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmludGFnZSUyMG1vZGVsfGVufDB8fDB8fHww",
    blurb: "Studio-lit story crafted for print and digital placement.",
  },
  {
    title: "Editorial Campaign",
    img: "https://images.unsplash.com/photo-1553544260-f87e671974ee?w=800",
    blurb: "Studio-lit story crafted for print and digital placement.",
  },
  {
    title: "Personal Shoot",
    img: "https://plus.unsplash.com/premium_photo-1683133857379-9068081bc7bf?w=800",
    blurb: "An intimate exploration of natural light and mood.",
  },
  {
    title: "Personal Shoot",
    img: "https://plus.unsplash.com/premium_photo-1664870883253-ab5b5d9b585d?w=800",
    blurb: "An intimate exploration of natural light and mood.",
  },
  {
    title: "Fashion Shoots",
    img: "https://images.unsplash.com/photo-1580478491436-fd6a937acc9e?w=800",
    blurb: "Look-book imagery styled for a contemporary label.",
  },
  {
    title: "Fashion Shoots",
    img: "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vZGVsfGVufDB8fDB8fHww",
    blurb: "Look-book imagery styled for a contemporary label.",
  },
];

export default function PastProjects() {
  const marqueeRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileListRef = useRef(null);
  const mobileCardsRef = useRef([]);

  /* ---------- MARQUEE (unchanged, runs at every breakpoint) ---------- */
  useLayoutEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const loop = gsap.to(el, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.addEventListener("refreshInit", () =>
        gsap.set(el, { xPercent: 0 })
      );

      return () => loop.kill();
    });

    return () => ctx.revert();
  }, []);

  /* ---------- DESKTOP / TABLET: HORIZONTAL PINNED SCROLL ----------
     Untouched logic, just scoped behind gsap.matchMedia so it only
     ever initializes at >=768px (the same breakpoint at which the
     markup below switches from `hidden` to visible). Below 768px
     this entire block never runs — no ScrollTrigger, no pin, no
     wasted work — and matchMedia automatically reverts it if the
     viewport crosses the breakpoint (e.g. rotating a tablet). */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = cardsRef.current;

      const scrollAmount = () => track.scrollWidth - window.innerWidth;

      const horizontal = gsap.to(track, {
        x: () => -scrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollAmount()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // base state (NOT too faded)
      gsap.set(cards, {
        opacity: 0.8,
        scale: 0.9,
        willChange: "transform, opacity",
      });

      // focus logic — THIS IS THE KEY
      cards.forEach((card) => {
        const img = card.querySelector("img");

        gsap.to(card, {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontal,
            start: "left center",
            end: "right center",
            scrub: true,
          },
        });

        gsap.fromTo(
          img,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontal,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );
      });

      // cleanup for this breakpoint only
      return () => {
        horizontal.kill();
      };
    });

    return () => mm.revert();
  }, []);

  /* ---------- MOBILE: VERTICAL EDITORIAL ENTRANCE ----------
     Only registered below 768px. Each card animates once as it
     enters the viewport; `prefers-reduced-motion` skips the motion
     entirely and shows the final state immediately. */
  useLayoutEffect(() => {
    const cards = mobileCardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isMobile, reduceMotion } = context.conditions;
        if (!isMobile) return;

        if (reduceMotion) {
          cards.forEach((card) => {
            const img = card.querySelector("[data-project-image]");
            const text = card.querySelectorAll("[data-project-text]");
            gsap.set(card, { opacity: 1, y: 0 });
            if (img) gsap.set(img, { scale: 1 });
            if (text.length) gsap.set(text, { opacity: 1, y: 0 });
          });
          return;
        }

        cards.forEach((card) => {
          const img = card.querySelector("[data-project-image]");
          const text = card.querySelectorAll("[data-project-text]");
          const trigger = {
            trigger: card,
            start: "top 85%",
            once: true,
          };

          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: trigger,
            }
          );

          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.08 },
              {
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: trigger,
              }
            );
          }

          if (text.length) {
            gsap.fromTo(
              text,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.08,
                delay: 0.15,
                scrollTrigger: trigger,
              }
            );
          }
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="bg-[#fffff0] overflow-hidden">
      {/* ---------- MARQUEE ---------- */}
      <div className="border-y border-black/10 py-6 overflow-hidden bg-[#3b3c36]">
        <div
          ref={marqueeRef}
          className="flex gap-16 whitespace-nowrap text-[#fffff0]"
          aria-hidden="true"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {Array.from({ length: 6 }).map((_, j) => (
                <span
                  key={j}
                  className="text-3xl font-semibold tracking-widest max-md:text-xl"
                >
                  PAST PROJECTS
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- DESKTOP / TABLET: HORIZONTAL SCROLL (≥768px) ---------- */}
      <div ref={sectionRef} className="hidden md:block h-screen overflow-hidden relative">
        <div
          ref={trackRef}
          className="z-20 flex gap-24 items-center h-full w-max px-[10vw]"
        >
          <h1 className="text-4xl text-[#990f02] z-10">
            PAST <br />
            SERVICES
          </h1>
          {projects.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="min-w-[420px] shrink-0"
            >
              <div className="border border-black/10 p-2">
                <img
                  src={`${item.img}&auto=format&fit=crop&w=900&q=80`}
                  alt={item.title}
                  className="w-full h-[520px] object-cover"
                />
              </div>
              <p className="mt-4 text-sm text-center">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- MOBILE: VERTICAL EDITORIAL LAYOUT (<768px) ---------- */}
      <div className="md:hidden">
        <header className="px-6 pt-16 pb-8 text-center">
          <span className="block text-xs tracking-[0.3em] text-[#990f02] font-medium mb-3">
            PAST PROJECTS
          </span>
          <h2 className="font-serif text-3xl text-[#1a1a1a]">Selected Works</h2>
        </header>

        <div ref={mobileListRef}>
          {projects.map((project, i) => (
            <article
              key={i}
              ref={(el) => (mobileCardsRef.current[i] = el)}
              className="px-6 py-10 border-b border-black/10 last:border-b-0"
            >
              <div className="max-w-sm mx-auto">
                <div
                  className="flex items-baseline justify-between mb-4"
                  data-project-text
                >
                  <span className="text-xs tracking-[0.25em] text-black/40">
                    PLATE {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="overflow-hidden">
                  <img
                    data-project-image
                    src={`${project.img}&auto=format&fit=crop&w=900&q=80`}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>

                <div className="mt-5" data-project-text>
                  <h3 className="font-serif text-xl text-[#1a1a1a]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-black/55 leading-relaxed">
                    {project.blurb}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
