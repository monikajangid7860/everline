import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const marqueeRef = useRef(null);
  const imageLeftRef = useRef(null);
  const imageSmallRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);


useLayoutEffect(() => {
  const ctx = gsap.context(() => {

    /* ===== SECTION ATMOSPHERE ===== */
    gsap.fromTo(
      sectionRef.current,
      { backgroundColor: "#fffff0" },
      {
        backgroundColor: "#f7f7ee",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    /* ===== MARQUEE (SCROLL-AWARE LUXURY) ===== */
    const el = marqueeRef.current;
    const singleBlockHeight = el.scrollHeight / 2;

    const marqueeTween = gsap.to(el, {
      y: -singleBlockHeight,
      duration: 26,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: (y) => `${parseFloat(y) % singleBlockHeight}px`,
      },
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        marqueeTween.timeScale(0.6 + self.getVelocity() / 3000);
      },
    });

    /* ===== LEFT IMAGE (CINEMA PARALLAX) ===== */
    gsap.fromTo(
      imageLeftRef.current,
      { y: 120, scale: 1.12 },
      {
        y: -120,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    /* ===== TEXT (EDITORIAL REVEAL) ===== */
    const lines = textRef.current.children;

    gsap.from(lines, {
      y: 40,
      skewY: 2,
      opacity: 0,
      duration: 1.4,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 75%",
      },
    });

    /* ===== SMALL IMAGE (PAGE TURN EFFECT) ===== */
    gsap.set(imageSmallRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      scale: 1.15,
    });

    gsap.to(imageSmallRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration: 1.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: imageSmallRef.current,
        start: "top 80%",
      },
    });

    gsap.to(imageSmallRef.current, {
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: imageSmallRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
    /* ===== CHAPTER TRANSITION ===== */
const dividerLine = dividerRef.current.children[0];

gsap.to(dividerLine, {
  height: "120px",
  ease: "power3.out",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "bottom 85%",
    end: "bottom 50%",
    scrub: true,
  },
});

/* compress content slightly */
gsap.to(textRef.current, {
  scale: 0.96,
  opacity: 0.6,
  ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "bottom 80%",
    end: "bottom 40%",
    scrub: true,
  },
});

/* background deepens before next act */
gsap.to(sectionRef.current, {
  backgroundColor: "#efefe3",
  ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "bottom 70%",
    end: "bottom top",
    scrub: true,
  },
});


  }, sectionRef);

  return () => ctx.revert();
}, []);



  return (
    <section
      ref={sectionRef}
      className="relative max-w-full m-auto overflow-hidden min-h-screen bg-[#fffff0] flex max-md:flex-col"
    >
      {/* LEFT IMAGE */}
      <div className="w-[40%] p-12 flex items-center max-md:w-full max-md:p-6">
        <img
          ref={imageLeftRef}
          src="https://images.unsplash.com/photo-1660018322139-0e58555df00d?w=800"
          alt="Founder portrait"
          className="w-full h-screen object-cover max-md:h-[70vh]"
        />
      </div>

      {/* MOVING STRIP */}
      <div className="relative w-[8%] bg-[#3b3c36] overflow-hidden max-md:w-full max-md:h-14">
        <div
          ref={marqueeRef}
          className="absolute top-0 left-0 w-full will-change-transform"
        >
          {[...Array(2)].map((_, block) => (
            <div key={block}>
              {Array.from({ length: 8 }).map((_, i) => (
                <p
                  key={i}
                  className="my-20 text-xs tracking-widest rotate-90 text-center text-[#f2f2f2]"
                >
                  MEET CAMILLE EVANS
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div
        ref={textRef}
        className="w-[52%] px-20 py-32 flex flex-col justify-center max-lg:px-12 max-md:w-full max-md:px-6 max-md:py-16"
      >
        <h2 className="text-4xl font-semibold text-[#3b3c36] leading-tight max-md:text-3xl">
          Meet Camille Evans
        </h2>

        <p className="mt-3 text-xs uppercase tracking-widest text-[#990f02]">
          Founder · Photographer · Creative Director
        </p>

        <p className="mt-10 max-w-xl text-[#18181a] leading-relaxed">
          With a refined, less-is-more approach to visual storytelling,
          Camille creates thoughtful imagery rooted in emotion, nuance,
          and restraint.
        </p>

        <p className="mt-6 max-w-xl text-black/70 leading-relaxed">
          From editorial campaigns to art direction, each project is
          approached with care, clarity, and a deep respect for the
          brand’s voice.
        </p>

        <div className="mt-14 w-142 h-75 overflow-hidden max-md:mt-10 max-md:w-full max-md:h-auto max-md:aspect-[16/9]">
          <img
            ref={imageSmallRef}
            src="https://images.unsplash.com/photo-1565672377218-afb6d165973a?w=600"
            alt="Detail portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* CHAPTER DIVIDER */}
<div
  ref={dividerRef}
  className="absolute bottom-0 left-0 w-full h-[40vh] flex items-end justify-center pointer-events-none"
>
  <div className="w-[1px] h-0 bg-[#3b3c36]" />
</div>

    </section>
  );
}
