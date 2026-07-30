import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const compositions = [
  {
    label: "01 — A considered pace",
    title: ["STORIES", "IN MOTION"],
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
    direction: 1,
    position: "top",
    layout: "image-left",
  },
  {
    label: "02 — A distinct point of view",
    title: ["FORM", "FOLLOWS", "FEELING"],
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    direction: -1,
    position: "center",
    layout: "image-right",
  },
  {
    label: "03 — Made to be remembered",
    title: ["A LASTING", "IMPRESSION"],
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85",
    direction: 1,
    position: "bottom",
    layout: "overlap",
  },
];

/**
 * A self-contained pinned editorial passage. Import and render it anywhere:
 * `import TravelingEditorialSection from "./TravelingEditorialSection";`
 */
export default function TravelingEditorialSection() {
  const sectionRef = useRef(null);
  const compositionRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const items = compositionRefs.current.filter(Boolean);
    if (!section || !items.length) return undefined;

    const context = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const travelDistance = isMobile ? 185 : 145;

      // One master timeline and one ScrollTrigger drive every composition.
      // Each item begins in its composed position and travels out in one
      // uninterrupted direction as the reader scrolls.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(items, { xPercent: 0, willChange: "transform" });

      timeline.to(
        items,
        {
          xPercent: (index) => compositions[index].direction * travelDistance,
          duration: 1,
          ease: "none",
        },
        0
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Editorial storytelling"
      className="relative h-screen overflow-hidden bg-[#f5f3ea] text-[#252622]"
    >
      <p className="absolute left-5 top-6 z-10 text-[9px] uppercase tracking-[0.32em] text-[#252622]/55 md:left-10 md:top-9 md:text-[10px]">
        Everline / Selected sensibilities
      </p>

      <p className="absolute bottom-6 right-5 z-10 text-[9px] uppercase tracking-[0.32em] text-[#252622]/55 md:bottom-9 md:right-10 md:text-[10px]">
        Keep moving
      </p>

      <div className="relative mx-auto h-full max-w-[1720px]">
        {compositions.map((composition, index) => {
          const positionClass =
            composition.position === "top"
              ? "top-[17%] md:top-[13%]"
              : composition.position === "center"
                ? "top-1/2 -translate-y-1/2"
                : "bottom-[16%] md:bottom-[11%]";
          const reverseOnDesktop = composition.layout === "image-right";

          return (
            <article
              key={composition.label}
              ref={(element) => (compositionRefs.current[index] = element)}
              className={`absolute left-1/2 flex w-[92vw] -translate-x-1/2 items-center gap-4 md:w-[84vw] md:gap-10 ${positionClass} ${
                reverseOnDesktop ? "md:flex-row-reverse" : ""
              }`}
            >
              <figure
                className={`relative shrink-0 overflow-hidden ${
                  composition.layout === "overlap"
                    ? "order-2 -ml-12 w-[31vw] md:-ml-28 md:w-[20vw]"
                    : "w-[25vw] md:w-[18vw]"
                }`}
              >
                <img
                  src={composition.image}
                  alt=""
                  className="aspect-[3/4] w-full object-cover"
                />
              </figure>

              <div
                className={`min-w-0 ${
                  composition.layout === "overlap" ? "relative z-10" : ""
                }`}
              >
                <p className="mb-2 text-[8px] uppercase tracking-[0.22em] text-[#252622]/60 md:mb-4 md:text-[10px] md:tracking-[0.35em]">
                  {composition.label}
                </p>
                <h2 className="font-serif text-[clamp(1.6rem,7.4vw,8rem)] font-medium leading-[0.78] tracking-[-0.06em]">
                  {composition.title.map((line) => (
                    <span key={line} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </h2>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
