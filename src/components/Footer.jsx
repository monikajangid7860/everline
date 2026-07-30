import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button2";

gsap.registerPlugin(ScrollTrigger);

export default function FinalContact() {
  const sectionRef = useRef(null);
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const textMarqueeRef = useRef(null);
  const imageMarqueeRef = useRef(null);

  /* ---------- CONTACT REVEAL ---------- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contactRef.current, {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(formRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---------- TEXT MARQUEE (SCROLL-AWARE) ---------- */
  useLayoutEffect(() => {
    const el = textMarqueeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const dist = el.scrollWidth / 2;

      const tween = gsap.to(el, {
        x: -dist,
        duration: 35,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % dist}px`,
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          tween.timeScale(0.6 + self.getVelocity() / 3000);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  /* ---------- IMAGE MARQUEE (EDITORIAL STRIP) ---------- */
  useLayoutEffect(() => {
    const el = imageMarqueeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const dist = el.scrollWidth / 2;

      gsap.to(el, {
        x: -dist,
        duration: 45,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % dist}px`,
        },
      });

      gsap.from(el.children, {
        opacity: 0,
        scale: 0.96,
        duration: 1,
        stagger: 0.08,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#fffff0] overflow-hidden"
    >
      {/* ---------- CONTACT BLOCK ---------- */}
      <div
        ref={contactRef}
        className="max-w-6xl mx-auto px-12 pb-30 grid grid-cols-2 gap-24 items-center max-md:grid-cols-1 max-md:gap-10 max-md:px-6 max-md:pb-16"
      >
        {/* LEFT */}
        <div ref={titleRef}>
          <h2 className="text-5xl font-bold tracking-wide text-[#3b3c36] max-md:text-4xl">
            GET IN TOUCH
          </h2>
        </div>

        {/* RIGHT FORM */}
        <div ref={formRef} className="space-y-8 text-sm">
          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-4">
            <input className="border-b border-black p-2 outline-none" placeholder="First name" />
            <input className="border-b border-black p-2 outline-none" placeholder="Last name" />
          </div>
          <input className="border-b border-black p-2 w-full outline-none" placeholder="Email" />
          <input className="border-b border-black p-2 w-full outline-none" placeholder="Subject" />
          <textarea className="border-b border-black p-2 w-full outline-none" placeholder="Message" />
          <Button />
        </div>
      </div>

      {/* ---------- TEXT STRIP ---------- */}
      <div className="bg-[#fffff0] py-6 overflow-hidden border-t border-black">
        <div
          ref={textMarqueeRef}
          className="flex gap-16 whitespace-nowrap will-change-transform"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {Array.from({ length: 6 }).map((_, j) => (
                <span key={j} className="text-xs tracking-widest">
                  TUESDAY–THURSDAY · 11AM–9PM · FRIDAY–SUNDAY · 12PM–11PM
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- IMAGE STRIP ---------- */}
      <div className="bg-[#990f02] py-10 overflow-hidden">
        <div
          ref={imageMarqueeRef}
          className="flex gap-10 w-max will-change-transform px-10"
        >
          {[...Array(2)].map((_, block) =>
            [
              "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
              "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
              "https://images.unsplash.com/photo-1520975916090-3105956dac38",
              "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
            ].map((img, i) => (
              <img
                key={`${block}-${i}`}
                src={`${img}?auto=format&fit=crop&w=400&q=80`}
                className="w-40 h-40 object-cover max-md:w-28 max-md:h-28"
                alt=""
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
