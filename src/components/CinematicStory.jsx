import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyLines = [
  {
    label: "01 / The point of view",
    title: "TYPES OF",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    imagePosition: "right",
    exitDirection: 1,
    position: "top-[29%]",
  },
  {
    label: "02 / The visual language",
    title: "BÁNH MÌ",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    imagePosition: "left",
    exitDirection: -1,
    position: "top-1/2",
  },
  {
    label: "03 / The lasting impression",
    title: "FILLINGS",
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
    imagePosition: "right",
    exitDirection: 1,
    position: "top-[64%]",
  },
];

export default function CinematicStory() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const lines = lineRefs.current.filter(Boolean);
    if (!section || !lines.length) return undefined;

    const ctx = gsap.context(() => {
      // xPercent centers each line; x is reserved exclusively for scroll travel.
      gsap.set(lines, { xPercent: -50, x: 0, willChange: "transform" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(
        lines,
        {
          x: (index) =>
            storyLines[index].exitDirection * window.innerWidth * 1.15,
          duration: 1,
          ease: "none",
        },
        0
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Everline creative philosophy"
      className="relative h-screen overflow-hidden bg-[#fffff0] text-[#171717]"
    >
      <p className="absolute left-6 top-7 text-[10px] uppercase tracking-[0.32em] text-[#171717]/50 md:left-10 md:top-10">
        Everline / Visual stories
      </p>

      <p className="absolute bottom-7 right-6 text-[10px] uppercase tracking-[0.32em] text-[#171717]/50 md:bottom-10 md:right-10">
        Scroll to continue
      </p>

      {storyLines.map((line, index) => (
        <article
          key={line.title}
          ref={(element) => (lineRefs.current[index] = element)}
          className={`absolute left-1/2 flex w-max items-center gap-3 md:gap-6 ${line.position} ${
            index === 1 ? "-translate-y-1/2" : ""
          }`}
        >
          {line.imagePosition === "left" && (
            <img
              src={line.image}
              alt=""
              className="h-12 w-20 object-cover sm:h-16 sm:w-28 md:h-22 md:w-40"
            />
          )}

          <div>
            <p className="mb-1 text-[8px] uppercase tracking-[0.24em] text-[#990f02] md:text-[10px]">
              {line.label}
            </p>
            <h2 className="whitespace-nowrap font-serif text-[clamp(2.15rem,7.2vw,6.6rem)] font-semibold leading-[0.8] tracking-[-0.06em]">
              {line.title}
            </h2>
          </div>

          {line.imagePosition === "right" && (
            <img
              src={line.image}
              alt=""
              className="h-12 w-20 object-cover sm:h-16 sm:w-28 md:h-22 md:w-40"
            />
          )}
        </article>
      ))}
    </section>
  );
}
