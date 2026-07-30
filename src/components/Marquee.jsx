"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const TEXT = "PAST PROJECTS";

export default function Marquee() {
  const marqueeRef = useRef(null);

  useLayoutEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      const animation = gsap.to(marquee, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      return () => animation.kill();
    }, marquee);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-black/10 bg-[#3b3c36] py-6">
      <div
        ref={marqueeRef}
        className="flex w-max whitespace-nowrap"
        aria-hidden="true"
      >
        {[...Array(2)].map((_, group) => (
          <div
            key={group}
            className="flex shrink-0 items-center gap-12 px-6"
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-12"
              >
                <span className="text-xl font-medium tracking-[0.45em] uppercase text-[#fffff0] md:text-3xl">
                  {TEXT}
                </span>

                <span className="h-2 w-2 rounded-full bg-[#990f02]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}