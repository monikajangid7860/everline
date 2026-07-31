"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT = "WE BUILD DIGITAL EXPERIENCES THAT PEOPLE NEVER FORGET.";

export default function FlyingTextSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // No forEach loop needed! Target the class directly.
      gsap.fromTo(
        ".flying-letter",
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        },
        {
          // Passing "random(min, max)" as a string tells GSAP to pick 
          // a unique random value for EACH letter automatically.
          x: "random(-600, 600)",
          y: "random(-900, -250)",
          rotation: "random(-540, 540)",
          scale: "random(0.3, 2)",
          opacity: 0,
          filter: "blur(8px)",
          ease: "none",
          // A single ScrollTrigger controls the entire group tween
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="h-screen bg-zinc-900 flex items-center justify-center">
        <h2 className="text-5xl font-bold text-white">Scroll Down ↓</h2>
      </section>

      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-black flex items-center justify-center px-6"
      >
        <div className="max-w-7xl text-center leading-none">
          {TEXT.split("").map((char, index) => (
            <span
              key={index}
              className="flying-letter inline-block whitespace-pre text-white font-black select-none will-change-transform text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[8rem]"
            >
              {char}
            </span>
          ))}
        </div>
      </section>

      <section className="h-screen bg-white flex items-center justify-center">
        <h2 className="text-5xl font-bold">Next Section</h2>
      </section>
    </>
  );
}
