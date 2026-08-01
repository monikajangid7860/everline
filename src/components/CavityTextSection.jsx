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

const CONFIG = {
  desktop: {
    enterDur: 1.1,
    holdDur: 0.9,
    exitDur: 1.0,
    stepFactor: 0.64,
    blurIn: 24,
    brightnessIn: 0.28,
    blurOut: 18,
    brightnessOut: 0.94,
    riseIn: 6,
    riseOut: 7,
    rotMax: 4,
    scaleIn: 0.98,
    scaleOut: 1.02,
    stagger: 0.028,
    scrollPerSentence: 680,
  },
  tablet: {
    enterDur: 1.0,
    holdDur: 0.8,
    exitDur: 0.9,
    stepFactor: 0.66,
    blurIn: 20,
    brightnessIn: 0.3,
    blurOut: 16,
    brightnessOut: 0.95,
    riseIn: 5,
    riseOut: 6,
    rotMax: 3,
    scaleIn: 0.985,
    scaleOut: 1.015,
    stagger: 0.024,
    scrollPerSentence: 620,
  },
  mobile: {
    enterDur: 0.9,
    holdDur: 0.7,
    exitDur: 0.75,
    stepFactor: 0.7,
    blurIn: 16,
    brightnessIn: 0.32,
    blurOut: 12,
    brightnessOut: 0.97,
    riseIn: 4,
    riseOut: 5,
    rotMax: 2,
    scaleIn: 0.99,
    scaleOut: 1.01,
    stagger: 0.018,
    scrollPerSentence: 520,
  },
};

function renderSplitSentence(sentence, sentenceIndex) {
  return sentence.split(" ").map((word, wordIndex) => (
    <span className="cavity-word" key={`word-${sentenceIndex}-${wordIndex}`}>
      <span className="cavity-word-inner">
        {word.split("").map((letter, letterIndex) => (
          <span
            key={`char-${sentenceIndex}-${wordIndex}-${letterIndex}`}
            className="cavity-char"
            aria-hidden="true"
          >
            {letter}
          </span>
        ))}
      </span>
      {wordIndex < sentence.split(" ").length - 1 ? <span className="cavity-space"> </span> : null}
    </span>
  ));
}

export default function OozeTextSection() {
  const section = useRef(null);
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    if (!section.current || !stageRef.current) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop, isTablet } = context.conditions;
          const cfg = isDesktop
            ? CONFIG.desktop
            : isTablet
            ? CONFIG.tablet
            : CONFIG.mobile;

          const sentenceEls = Array.from(
            stageRef.current.querySelectorAll(".cavity-sentence")
          );
          if (!sentenceEls.length) return;

          const totalTime = cfg.enterDur + cfg.holdDur + cfg.exitDur;
          const master = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: `+=${TEXTS.length * cfg.scrollPerSentence}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          sentenceEls.forEach((el, index) => {
            const chars = el.querySelectorAll(".cavity-char");
            const sentenceTl = gsap.timeline();

            sentenceTl.set(el, { autoAlpha: 1 }, 0);

            sentenceTl.fromTo(
              chars,
              {
                autoAlpha: 0,
                y: cfg.riseIn,
                scale: cfg.scaleIn,
                rotationX: () => gsap.utils.random(-cfg.rotMax, cfg.rotMax),
                rotationY: () => gsap.utils.random(-cfg.rotMax, cfg.rotMax),
                filter: () =>
                  `blur(${gsap.utils.random(cfg.blurIn * 0.78, cfg.blurIn)}px) brightness(${gsap.utils.random(
                    cfg.brightnessIn * 0.82,
                    cfg.brightnessIn
                  )})`,
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                filter: "blur(0px) brightness(1)",
                duration: cfg.enterDur,
                ease: "power2.out",
                stagger: { each: cfg.stagger, from: "random" },
              },
              0
            );

            const exitStart = cfg.enterDur + cfg.holdDur;
            sentenceTl.to(
              chars,
              {
                autoAlpha: 0,
                y: -cfg.riseOut,
                scale: cfg.scaleOut,
                rotationX: () => gsap.utils.random(-cfg.rotMax, cfg.rotMax),
                rotationY: () => gsap.utils.random(-cfg.rotMax, cfg.rotMax),
                filter: () =>
                  `blur(${gsap.utils.random(cfg.blurOut * 0.72, cfg.blurOut)}px) brightness(${gsap.utils.random(
                    cfg.brightnessOut * 0.88,
                    cfg.brightnessOut
                  )})`,
                duration: cfg.exitDur,
                ease: "power1.in",
                stagger: { each: cfg.stagger * 0.9, from: "random" },
              },
              exitStart
            );

            sentenceTl.to(
              el,
              {
                "--consume": 1,
                duration: cfg.exitDur * 1.05,
                ease: "power1.in",
              },
              exitStart
            );

            sentenceTl.to(el, { autoAlpha: 0, duration: 0.01 }, ">-0.01");
            master.add(sentenceTl, index * cfg.stepFactor * totalTime);
          });

          gsap.to(".cavity-glow-a", {
            xPercent: 4,
            yPercent: -5,
            scale: 1.05,
            duration: 28,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          gsap.to(".cavity-glow-b", {
            xPercent: -4,
            yPercent: 6,
            scale: 1.08,
            duration: 34,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 2,
          });

          gsap.to(".cavity-particle", {
            yPercent: -10,
            opacity: 0.03,
            duration: 18,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.4,
          });
        }
      );
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={section}
      className="relative h-screen overflow-hidden bg-[#fffff0]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,249,236,0.1),transparent_24%),radial-gradient(circle_at_70%_35%,rgba(153,15,2,0.08),transparent_18%),#09060b]" />
      <div className="cavity-glow-a absolute left-1/4 top-1/4 h-[520px] w-[520px] rounded-full bg-[#fffff0]/20 blur-[140px]" />
      <div className="cavity-glow-b absolute right-1/4 top-1/3 h-[420px] w-[420px] rounded-full bg-[#fffff0]/10 blur-[120px]" />
      <img
        src="/images/desktop.avif"
        alt="Floating editorial detail"
        className="corner-art corner-art-a"
      />
      <img
        src="/images/mobile.avif"
        alt="Floating editorial detail"
        className="corner-art corner-art-b"
      />
      <div className="cavity-vignette pointer-events-none absolute inset-0" />

      <div className="cavity-particles pointer-events-none absolute inset-0">
        <span className="cavity-particle" style={{ left: "12%", top: "16%", width: "10px", height: "10px" }} />
        <span className="cavity-particle" style={{ left: "72%", top: "14%", width: "14px", height: "14px" }} />
        <span className="cavity-particle" style={{ left: "27%", top: "58%", width: "8px", height: "8px" }} />
        <span className="cavity-particle" style={{ left: "60%", top: "70%", width: "12px", height: "12px" }} />
        <span className="cavity-particle" style={{ left: "82%", top: "42%", width: "6px", height: "6px" }} />
        <span className="cavity-particle" style={{ left: "48%", top: "26%", width: "7px", height: "7px" }} />
      </div>

      <div ref={stageRef} className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6 text-center">
        {TEXTS.map((text, index) => (
          <div
            key={text}
            className="cavity-sentence absolute inset-0 flex items-center justify-center opacity-0"
            style={{ "--consume": 0 }}
          >
            <h2
              className="cavity-heading max-w-5xl px-6 text-center font-black uppercase tracking-[0.04em] text-[#474644]"
              style={{ fontSize: "clamp(4.8rem, 8vw, 9.5rem)" }}
            >
              {renderSplitSentence(text, index)}
            </h2>
          </div>
        ))}
      </div>

      <div className="sr-only">{TEXTS.join(" ")}</div>

      <style>{`
        .cavity-heading {
          line-height: 0.92;
          text-shadow: 0 0 40px rgba(255,245,225,0.06), 0 18px 80px rgba(0,0,0,0.24);
          font-size: clamp(2.5rem, 7vw, 5.2rem);
          white-space: normal;
          word-break: break-word;
          overflow-wrap: anywhere;
          max-width: 100%;
        }

        .cavity-word {
          display: inline-flex;
          white-space: normal;
        }

        .cavity-word-inner {
          display: inline-flex;
          white-space: normal;
        }

        .cavity-space {
          width: 0.55em;
          display: inline-block;
        }

        .cavity-char {
          display: inline-block;
          will-change: transform, opacity, filter;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        .cavity-sentence {
          transform-style: preserve-3d;
          padding: 0 1rem;
          overflow-wrap: break-word;
          word-break: break-word;
          -webkit-mask-image: linear-gradient(
            to bottom,
            black calc((1 - var(--consume, 0)) * 100%),
            transparent calc((1 - var(--consume, 0)) * 100% + 28%)
          );
          mask-image: linear-gradient(
            to bottom,
            black calc((1 - var(--consume, 0)) * 100%),
            transparent calc((1 - var(--consume, 0)) * 100% + 28%)
          );
        }

        .cavity-vignette {
          background: radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 55%, rgba(255,249,236,0.08) 82%, rgba(255,249,236,0.14) 100%);
        }

        .corner-art {
          position: absolute;
          object-fit: cover;
          opacity: 1;
          filter: none;
          pointer-events: none;
          transform-origin: center;
          will-change: transform, opacity;
          height: auto;
          max-height: 40vh;
        }

        .corner-art-a {
          top: 0;
          left: 0;
          width: min(280px, 20vw);
          animation: none;
        }

        .corner-art-b {
          bottom: 0;
          right: 0;
          width: min(240px, 18vw);
          animation: none;
        }

        @keyframes float-corner-a {
          from {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          to {
            transform: translate3d(-10px, 8px, 0) rotate(-1.2deg);
          }
        }

        @keyframes float-corner-b {
          from {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          to {
            transform: translate3d(10px, -10px, 0) rotate(1.3deg);
          }
        }

        .cavity-particles {
          pointer-events: none;
        }

        .cavity-particle {
          position: absolute;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255,238,210,0.18), rgba(255,238,210,0) 55%);
          opacity: 0.08;
          filter: blur(3px);
          will-change: transform, opacity;
        }

        @media (max-width: 1023px) {
          .cavity-heading {
            font-size: clamp(3.8rem, 11vw, 7.5rem);
          }

          .corner-art-a,
          .corner-art-b {
            width: min(220px, 24vw);
          }
        }

        @media (max-width: 767px) {
          .cavity-heading {
            font-size: clamp(2.8rem, 12vw, 5rem);
            padding: 0 1rem;
          }

          .cavity-sentence {
            padding: 0 0.75rem;
          }

          .corner-art-a,
          .corner-art-b {
            width: min(180px, 30vw);
          }

          .cavity-glow-a,
          .cavity-glow-b {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
