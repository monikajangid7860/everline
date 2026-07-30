import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Button from "./Button";
import Header from "./Header";
import LiquidImage from "./LiquidImage";
import { useLayoutEffect } from "react";

export default function Hero() {
  const heroRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const caretRef = useRef(null);

  /* ================= TYPING EFFECT (FIXED) ================= */
  const words = ["DESIGN", "STORIES", "IMAGERY"];
  const [text, setText] = useState("");

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const type = () => {
      const word = words[wordIndex];

      if (!deleting) {
        charIndex++;
        setText(word.slice(0, charIndex));

        if (charIndex === word.length) {
          deleting = true;
          timeoutId = setTimeout(type, 1200);
          return;
        }
      } else {
        charIndex--;
        setText(word.slice(0, charIndex));

        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      timeoutId = setTimeout(type, deleting ? 70 : 120);
    };

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  /* ================= GSAP MOTION ================= */


useLayoutEffect(() => {
  if (!heroRef.current || !imageWrapRef.current || !imageRef.current) return;

  const ctx = gsap.context(() => {
    const img = imageRef.current;
    const wrap = imageWrapRef.current;

    // caret animation
    if (caretRef.current) {
      gsap.to(caretRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });
    }

    // base state
    gsap.set(img, {
      scale: 1.05,
      transformPerspective: 1200,
      transformStyle: "preserve-3d",
    });

    const move = (e) => {
      const b = wrap.getBoundingClientRect();
      if (!b.width) return;

      const px = (e.clientX - b.left) / b.width - 0.5;
      const py = (e.clientY - b.top) / b.height - 0.5;

      gsap.to(img, {
        x: px * 40,
        y: py * 40,
        rotateX: py * -12,
        rotateY: px * 12,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const reset = () => {
      gsap.to(img, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1.05,
        duration: 1,
        ease: "power3.out",
      });
    };

    wrap.addEventListener("mousemove", move);
    wrap.addEventListener("mouseleave", reset);
  }, heroRef);

  return () => ctx.revert();
}, []);



  return (
    <section
      ref={heroRef}
      className="min-h-screen grid grid-cols-3 bg-[#fffff0]"
    >
      {/* LEFT — TEXT */}
      <div className="relative z-10 flex  col-span-2 flex-col justify-center px-20">
        
        <div className="flex items-center gap-6 mt-24">
          <h1 className="text-[clamp(4rem,8vw,7rem)] font-extrabold leading-none text-[#232323]">
            EVER&nbsp;{text}
          </h1>

          <span
            ref={caretRef}
            className="block w-[6px] h-[120px] bg-[#990f02]"
          />
        </div>

        <p className="mt-10 max-w-xl text-sm tracking-wide leading-relaxed text-[#232323]">
          EVERLINE STUDIO CREATES SOULFUL, EDITORIAL-STYLE EXPERIENCES
          ROOTED IN INTENTION AND DRIVEN BY DETAIL.
        </p>

        <div className="mt-14">
          <Button />
        </div>
      </div>

      {/* RIGHT — IMAGE (ANCHORED) */}
<div className="relative h-full bg-black">
  <LiquidImage img="https://images.unsplash.com/photo-1571513800374-df1bbe650e56?w=800" />
</div>

    </section>
  );
}
