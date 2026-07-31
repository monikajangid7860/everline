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
  "WELCOME TO",
  "TEKIART STUDIO",
];

export default function CavityTextSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const textRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const texts = textRefs.current;

gsap.set(texts, {
  opacity: 0,

  y: 180,

  z: -900,

  scale: .55,

  rotateX: -78,

  rotateY: gsap.utils.random(-8,8),

  filter:"blur(30px)",

  force3D:true,

  transformPerspective:2200,

  transformOrigin:"center center",
});

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${TEXTS.length * 900}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      texts.forEach((text) => {
        tl.to(text,{
    duration:1.8,

    opacity:1,

    y:0,

    z:0,

    scale:1,

    rotateX:0,

    rotateY:0,

    filter:"blur(0px)",

    ease:"power4.out"
});

        tl.to(
          text,
          {
            opacity: 1,
            duration: 0.6,
          }
        );

        tl.to(text, {
          opacity: 0,
          y: -120,
          rotateX: 30,
          scale: 1.05,
          filter: "blur(12px)",
          duration: 1.2,
          ease: "power4.in",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#050505]"
    >
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[180px]" />
      </div>

      {/* Perspective stage */}
      <div
  ref={stageRef}
  className="absolute inset-0 flex items-center justify-center"
  style={{
    perspective: "2200px",
    transformStyle: "preserve-3d",
  }}
>
  {/* ---------------- BACK GLOW ---------------- */}

  <div
    className="absolute rounded-full"
    style={{
      width: 900,
      height: 900,
      background:
        "radial-gradient(circle, rgba(255,255,255,.08), transparent 70%)",
      filter: "blur(120px)",
      transform: "translateZ(-800px)",
    }}
  />

  {/* ---------------- TUNNEL BACK ---------------- */}

  <div
    className="absolute"
    style={{
      width: "100%",
      height: 260,
      background: "#010101",
      transform: "translateZ(-600px)",
      boxShadow: "0 0 250px rgba(255,255,255,.04) inset",
    }}
  />

  {/* ---------------- TOP WALL ---------------- */}

  <div
    className="absolute"
    style={{
      width: "100%",
      height: "42%",
      top: 0,
      background:
        "linear-gradient(to bottom,#0b0b0b,#040404 60%,transparent)",
      transform:
        "rotateX(-72deg) translateY(-120px) translateZ(220px)",
      transformOrigin: "bottom",
      boxShadow:
        "0 120px 180px rgba(0,0,0,.95) inset",
    }}
  />

  {/* ---------------- BOTTOM WALL ---------------- */}

  <div
    className="absolute"
    style={{
      width: "100%",
      height: "42%",
      bottom: 0,
      background:
        "linear-gradient(to top,#0b0b0b,#040404 60%,transparent)",
      transform:
        "rotateX(72deg) translateY(120px) translateZ(220px)",
      transformOrigin: "top",
      boxShadow:
        "0 -120px 180px rgba(0,0,0,.95) inset",
    }}
  />

  {/* ---------------- LEFT WALL ---------------- */}

  <div
    className="absolute"
    style={{
      left: 0,
      width: 180,
      height: 220,
      background:
        "linear-gradient(to right,#050505,transparent)",
      transform:
        "rotateY(78deg) translateX(-90px) translateZ(180px)",
      transformOrigin: "right",
    }}
  />

  {/* ---------------- RIGHT WALL ---------------- */}

  <div
    className="absolute"
    style={{
      right: 0,
      width: 180,
      height: 220,
      background:
        "linear-gradient(to left,#050505,transparent)",
      transform:
        "rotateY(-78deg) translateX(90px) translateZ(180px)",
      transformOrigin: "left",
    }}
  />

  {/* ---------------- CENTER OPENING ---------------- */}

  <div
    className="absolute overflow-hidden"
    style={{
      width: "100%",
      height: 220,
      transformStyle: "preserve-3d",
    }}
  >
    {TEXTS.map((item, index) => (
      <div
        key={index}
        ref={(el) => (textRefs.current[index] = el)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h2
          className="font-black uppercase text-center text-white leading-none"
          style={{
            fontSize: "clamp(60px,9vw,170px)",
            letterSpacing: "-0.06em",
            textShadow:
              "0 0 35px rgba(255,255,255,.05)",
            transform: "translateZ(0px)",
          }}
        >
          {item}
        </h2>
      </div>
    ))}
  </div>

  {/* ---------------- TOP LIP ---------------- */}

  <div
    className="absolute pointer-events-none"
    style={{
      width: "100%",
      height: 25,
      top: "calc(50% - 110px)",
      background:
        "linear-gradient(to bottom,rgba(255,255,255,.08),transparent)",
      filter: "blur(4px)",
    }}
  />

  {/* ---------------- BOTTOM LIP ---------------- */}

  <div
    className="absolute pointer-events-none"
    style={{
      width: "100%",
      height: 25,
      top: "calc(50% + 85px)",
      background:
        "linear-gradient(to top,rgba(255,255,255,.05),transparent)",
      filter: "blur(4px)",
    }}
  />
</div>
    </section>
  );
}