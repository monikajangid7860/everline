import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PastProjectsMarquee() {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          const loop = gsap.to(track, {
            xPercent: -50,
            duration: isMobile ? 22 : 30,
            ease: "none",
            repeat: -1,
          });

          const resetMarquee = () => gsap.set(track, { xPercent: 0 });
          ScrollTrigger.addEventListener("refreshInit", resetMarquee);

          return () => {
            loop.kill();
            ScrollTrigger.removeEventListener("refreshInit", resetMarquee);
          };
        }
      );

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-black/10 bg-[#3b3c36] py-5 md:py-6"
    >
      <div
        ref={trackRef}
        className="flex w-max gap-12 whitespace-nowrap text-[#fffff0] md:gap-16"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-12 md:gap-16">
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                className="text-xl font-semibold tracking-[0.35em] md:text-3xl md:tracking-widest"
              >
                PAST PROJECTS
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
