import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pastProjects from "./pastProjectsData";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mobile (<768px): vertical editorial stack.
 * No pinning — each card reveals on natural vertical scroll (Option A).
 */
export default function PastProjectsMobile() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          const frame = card.querySelector(".mobile-card__frame");
          const img = card.querySelector(".mobile-card__img");
          const meta = card.querySelector(".mobile-card__meta");
          const side = index % 2 === 0 ? -1 : 1;

          gsap.set([card, frame, img, meta], {
            willChange: "transform, opacity",
            force3D: true,
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 58%",
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          })
            .fromTo(
              card,
              { autoAlpha: 0, y: 48, scale: 0.96 },
              { autoAlpha: 1, y: 0, scale: 1, ease: "none", duration: 1 },
              0
            )
            .fromTo(
              frame,
              { clipPath: "inset(10% 0% 10% 0%)", scale: 1.04 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                ease: "none",
                duration: 1,
              },
              0.05
            )
            .fromTo(
              img,
              { scale: 1.12 },
              { scale: 1, ease: "none", duration: 1 },
              0.05
            )
            .fromTo(
              meta,
              { autoAlpha: 0, x: side * 18, y: 12 },
              { autoAlpha: 1, x: 0, y: 0, ease: "none", duration: 0.7 },
              0.2
            );
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="md:hidden">
      <header className="px-6 pt-14 pb-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#990f02]">
          Selected Works
        </p>
        <h2 className="mt-4 text-[clamp(2rem,9vw,2.75rem)] leading-[0.95] text-[#171717]">
          Past
          <br />
          Services
        </h2>
      </header>

      <div className="flex flex-col gap-16 px-6 pb-20">
        {pastProjects.map((project, index) => {
          const alignRight = index % 2 === 1;

          return (
            <article
              key={project.id}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className={`mobile-card w-full ${
                alignRight ? "ml-auto max-w-[92%]" : "max-w-full"
              }`}
            >
              <div className="mobile-card__frame overflow-hidden border border-black/10 p-1.5">
                <img
                  src={`${project.image}&auto=format&fit=crop&w=800&q=80`}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="mobile-card__img aspect-[3/4] w-full object-cover"
                />
              </div>

              <div
                className={`mobile-card__meta mt-5 ${
                  alignRight ? "text-right" : "text-left"
                }`}
              >
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#990f02]">
                  {project.category}
                </span>
                <p className="mt-2 text-lg tracking-wide text-[#171717]">
                  {project.title}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
