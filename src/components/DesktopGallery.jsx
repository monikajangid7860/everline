"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function DesktopGallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

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

      gsap.set(cards, {
        opacity: 0.75,
        scale: 0.9,
        willChange: "transform, opacity",
      });

      cards.forEach((card) => {
        const image = card.querySelector("img");

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
          image,
          { scale: 1.12 },
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

      return () => {
        horizontal.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative hidden h-screen overflow-hidden bg-[#fffff0] md:block"
    >
      <div
        ref={trackRef}
        className="flex h-full w-max items-center gap-24 px-[10vw]"
      >
        {/* Intro */}
        <div className="w-[340px] shrink-0">
          <span className="block text-sm uppercase tracking-[0.4em] text-[#990f02]">
            Selected Works
          </span>

          <h2 className="mt-6 text-6xl font-serif leading-none text-[#171717]">
            Past
            <br />
            Projects
          </h2>

          <p className="mt-8 max-w-[260px] text-base leading-8 text-black/60">
            A curated collection of editorial campaigns, portrait sessions and
            fashion stories crafted with timeless visual direction.
          </p>
        </div>

        {/* Cards */}
        {projects.map((project, index) => (
          <article
            key={project.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="w-[430px] shrink-0"
          >
            <div className="overflow-hidden border border-black/10 p-2">
              <img
                src={project.image}
                alt={project.title}
                className="h-[560px] w-full object-cover"
              />
            </div>

            <div className="mt-6">
              <span className="text-xs uppercase tracking-[0.35em] text-[#990f02]">
                {project.category}
              </span>

              <h3 className="mt-3 text-3xl font-serif text-[#171717]">
                {project.title}
              </h3>

              <p className="mt-3 text-black/55">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}