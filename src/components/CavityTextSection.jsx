"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXTS = [
  "WE BUILD",
  "DIGITAL EXPERIENCES",
  "THAT PEOPLE",
  "NEVER FORGET",
  "TEKIART STUDIO",
];

export default function OozeTextSection() {
  const section = useRef(null);
  const refs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: `+=${TEXTS.length * 700}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      refs.current.forEach((el) => {
        gsap.set(el, {
          opacity: 0,
          y: 30,
          scale: 0.88,
          filter: "blur(30px)",
          letterSpacing: "0.55em",
          clipPath: "inset(100% 0% 0% 0%)",
        });

        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            letterSpacing: "-0.05em",
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: "power4.out",
          },
          ">"
        );

        tl.to(el, {
          duration: 0.4,
          scale: 1.015,
        });

        tl.to(el, {
          opacity: 0,
          y: -25,
          scale: 1.05,
          filter: "blur(12px)",
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1,
          ease: "power3.in",
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Background glow */}

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[180px]" />
      </div>

      {/* Animated grain */}

      <div className="grain absolute inset-0 opacity-20" />

      {/* Text */}

      <div className="absolute inset-0 flex items-center justify-center">
        {TEXTS.map((text, i) => (
          <h2
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className="absolute max-w-7xl px-8 text-center font-black uppercase leading-[0.9] text-white"
            style={{
              fontSize: "clamp(58px,9vw,170px)",
              textShadow: "0 0 40px rgba(255,255,255,.04)",
            }}
          >
            {text}
          </h2>
        ))}
      </div>

      <style>{`
        .grain {
          background-image:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,.02) 0 1px, transparent 1px),
            radial-gradient(circle at 80% 60%, rgba(255,255,255,.015) 0 1px, transparent 1px),
            radial-gradient(circle at 30% 80%, rgba(255,255,255,.015) 0 1px, transparent 1px);
          background-size: 180px 180px;
          animation: drift 18s linear infinite;
        }

        @keyframes drift {
          from {
            transform: translate3d(0,0,0);
          }
          to {
            transform: translate3d(-180px,-180px,0);
          }
        }
      `}</style>
    </section>
  );
}