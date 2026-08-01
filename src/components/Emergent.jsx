"use client";

/**
 * InkEmergenceSection
 * ---------------------------------------------------------------------------
 * A pinned, scroll-scrubbed cinematic sequence where lines of type appear to
 * surface out of near-black darkness — like ink rising through liquid, or
 * fog slowly giving a word its edges — then dissolve back into it as the
 * next line is already emerging underneath.
 *
 * IMPORTANT — this is by design: at rest (before the user scrolls) the type
 * is meant to be almost invisible, per the brief. If the section fills the
 * viewport and nothing has been scrolled yet, a mostly-dark screen is the
 * correct starting frame, not a bug. A small scroll cue is included below to
 * make that legible to a first-time visitor — delete the "SCROLL CUE" block
 * if you don't want it.
 *
 * No reference image was attached to the brief, so the mood below (deep
 * warm-black, single ember accent, Fraunces display serif) was composed
 * from the written direction. The default copy leans into "something
 * emerging from the dark" as a proofing-dough moment, since this is meant
 * to slot into an editorial bakery site — swap the `sentences` prop for any
 * other context.
 *
 * USAGE
 *   <InkEmergenceSection
 *     sentences={["Something is rising in the dark.", "..."]}
 *   />
 *
 * DEPENDENCIES
 *   npm install gsap
 *
 * FONTS
 *   Expects "Fraunces" (display) and "Inter" (utility) to be loaded globally,
 *   e.g. via next/font in the root layout, exposed as --font-fraunces and
 *   --font-inter. Falls back to system serif/sans if not present.
 *
 * STYLING
 *   All CSS lives in a plain <style> tag at the bottom of this component —
 *   it renders as a real, unscoped <style> element, so it works in any React
 *   setup (Next.js, Vite, CRA) with no build-plugin dependency (deliberately
 *   NOT using styled-jsx, which needs a compiler most non-Next setups don't
 *   have). You can still lift that block into a global stylesheet if you'd
 *   rather keep component files style-free — nothing about it is scoped.
 * ---------------------------------------------------------------------------
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// useLayoutEffect warns during SSR; this swaps to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ============================================================================
// RESPONSIVE ANIMATION CONFIG
// Every "handcrafted" value the brief asked for (blur depth, stagger, drift,
// scroll distance) lives here per breakpoint so mobile isn't just a shrunk
// desktop — it's calmer and shorter, per spec.
// ============================================================================
const CONFIG = {
  desktop: {
    enterDur: 1.15,
    holdDur: 0.9,
    exitDur: 1.0,
    stepFactor: 0.62, // how much of a sentence's total duration the next one waits before starting (<1 = overlap)
    blurIn: 30,
    brightnessIn: 0.2,
    blurOut: 24,
    brightnessOut: 1.55,
    spread: 26,
    riseIn: 20,
    riseOut: 16,
    rotMax: 8,
    scaleIn: 0.85,
    scaleOut: 1.07,
    stagger: 0.022,
    scrollPerSentence: 1500,
  },
  tablet: {
    enterDur: 1.0,
    holdDur: 0.75,
    exitDur: 0.85,
    stepFactor: 0.6,
    blurIn: 24,
    brightnessIn: 0.22,
    blurOut: 18,
    brightnessOut: 1.45,
    spread: 18,
    riseIn: 16,
    riseOut: 12,
    rotMax: 6,
    scaleIn: 0.88,
    scaleOut: 1.05,
    stagger: 0.018,
    scrollPerSentence: 1200,
  },
  mobile: {
    enterDur: 0.85,
    holdDur: 0.6,
    exitDur: 0.7,
    stepFactor: 0.58,
    blurIn: 14,
    brightnessIn: 0.28,
    blurOut: 11,
    brightnessOut: 1.35,
    spread: 9,
    riseIn: 10,
    riseOut: 8,
    rotMax: 3,
    scaleIn: 0.93,
    scaleOut: 1.03,
    stagger: 0.012,
    scrollPerSentence: 850,
  },
};

const DEFAULT_SENTENCES = [
  "Something is rising in the dark.",
  "Warmth finds its way through stone.",
  "What was formless takes its shape.",
  "This is where bread begins.",
];

// ============================================================================
// HELPERS
// ============================================================================

// Deterministic pseudo-random in [0,1) — avoids Math.random() so server and
// client render identical markup on first paint (no hydration mismatch).
function seeded(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Splits a sentence into per-character <span> elements, grouped so whole
 * words stay together on line-wrap while every character inside a word is
 * still an independent, individually-animatable node.
 */
function renderSplitSentence(sentence, sentenceIndex) {
  const words = sentence.split(" ");
  return words.map((word, wi) => (
    <span className="ink-word" key={`w-${wi}`}>
      <span className="ink-word-inner">
        {word.split("").map((ch, ci) => (
          <span
            className="ink-char"
            key={`c-${sentenceIndex}-${wi}-${ci}`}
            aria-hidden="true"
          >
            {ch}
          </span>
        ))}
      </span>
      {wi < words.length - 1 ? " " : ""}
    </span>
  ));
}

// ============================================================================
// AMBIENT PARTICLES — a handful of soft drifting motes, purely decorative.
// ============================================================================
function EmberParticles({ count = 12, reduceMotion }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: seeded(i * 3.1 + 1) * 100,
        top: seeded(i * 7.7 + 2) * 100,
        size: 1.5 + seeded(i * 5.3 + 3) * 2.5,
        duration: 14 + seeded(i * 2.2 + 4) * 16,
        delay: seeded(i * 9.9 + 5) * -20,
        drift: 12 + seeded(i * 4.4 + 6) * 24,
        opacity: 0.15 + seeded(i * 6.6 + 7) * 0.3,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="ink-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: reduceMotion
              ? "none"
              : `ink-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            "--drift-x": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function InkEmergenceSection({
  sentences = DEFAULT_SENTENCES,
  className = "",
  id,
}) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Track OS-level reduced-motion preference at the React level so the
  // static, accessible layout (no pin, no overlap, no blur) can render
  // straight into normal document flow instead of the animated stack.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return; // static fallback handles this case, no GSAP needed

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

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
            stageRef.current?.querySelectorAll(".ink-sentence") || []
          );

          if (!sentenceEls.length) {
            console.warn(
              "[InkEmergenceSection] No .ink-sentence elements found — check that `sentences` is a non-empty array."
            );
            return;
          }

          const master = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${sentences.length * cfg.scrollPerSentence}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          const sentenceSpan = cfg.enterDur + cfg.holdDur + cfg.exitDur;
          const step = sentenceSpan * cfg.stepFactor;

          sentenceEls.forEach((el, i) => {
            const chars = el.querySelectorAll(".ink-char");
            const sub = gsap.timeline();

            sub.fromTo(
              el,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.01 },
              0
            );

            sub.fromTo(
              chars,
              {
                opacity: 0,
                x: () => gsap.utils.random(-cfg.spread, cfg.spread),
                y: cfg.riseIn,
                scale: cfg.scaleIn,
                rotationX: () => gsap.utils.random(-cfg.rotMax, cfg.rotMax),
                rotationY: () => gsap.utils.random(-cfg.rotMax, cfg.rotMax),
                filter: () =>
                  `blur(${gsap.utils.random(
                    cfg.blurIn * 0.7,
                    cfg.blurIn
                  )}px) brightness(${gsap.utils.random(
                    cfg.brightnessIn * 0.6,
                    cfg.brightnessIn
                  )})`,
              },
              {
                opacity: 1,
                x: 0,
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
            sub.to(
              chars,
              {
                opacity: 0,
                y: () => -cfg.riseOut - gsap.utils.random(0, 8),
                x: () =>
                  gsap.utils.random(-cfg.spread * 0.4, cfg.spread * 0.4),
                scale: cfg.scaleOut,
                rotationX: () => gsap.utils.random(-cfg.rotMax, cfg.rotMax),
                filter: () =>
                  `blur(${gsap.utils.random(
                    cfg.blurOut * 0.75,
                    cfg.blurOut
                  )}px) brightness(${gsap.utils.random(
                    cfg.brightnessOut * 0.85,
                    cfg.brightnessOut
                  )})`,
                duration: cfg.exitDur,
                ease: "power1.in",
                stagger: { each: cfg.stagger * 0.85, from: "random" },
              },
              exitStart
            );

            sub.to(
              el,
              {
                "--consume": 1,
                duration: cfg.exitDur * 1.1,
                ease: "power1.in",
              },
              exitStart
            );

            sub.to(el, { autoAlpha: 0, duration: 0.01 }, ">-0.01");
            master.add(sub, i * step);
          });
        }
      );

      gsap.to(".ink-bg-glow-a", {
        xPercent: 6,
        yPercent: -4,
        scale: 1.08,
        duration: 26,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".ink-bg-glow-b", {
        xPercent: -8,
        yPercent: 5,
        scale: 1.12,
        duration: 32,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3,
      });

      gsap.to(".ink-scroll-cue", {
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion, sentences]);


  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label="Editorial statement"
      className={`ink-section relative w-full overflow-hidden bg-[#08070a] ${
        reduceMotion ? "" : "h-screen"
      } ${className}`}
    >
      {/* Screen-reader text: the real content, read in order, once. */}
      <p className="sr-only">{sentences.join(" ")}</p>

      {/* ---------------------------------------------------------------- */}
      {/* BACKGROUND — layered radial gradients + grain + particles        */}
      {/* ---------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#08070a]" />
        <div className="ink-bg-glow-a absolute -left-1/4 -top-1/4 h-[70%] w-[70%] rounded-full opacity-60 blur-[110px] [background:radial-gradient(circle,rgba(120,72,32,0.28),transparent_70%)]" />
        <div className="ink-bg-glow-b absolute -bottom-1/3 -right-1/4 h-[65%] w-[65%] rounded-full opacity-50 blur-[130px] [background:radial-gradient(circle,rgba(60,40,70,0.22),transparent_70%)]" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(20,16,14,0)_0%,rgba(4,3,4,0.75)_78%)]" />
        <EmberParticles reduceMotion={reduceMotion} />
        <div className="ink-grain absolute inset-0" aria-hidden="true" />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* TYPE STAGE                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div
        className={`relative z-10 flex w-full items-center justify-center px-6 md:px-12 ${
          reduceMotion ? "py-28 flex-col gap-14" : "h-full"
        }`}
      >
        <div
          ref={stageRef}
          className={
            reduceMotion
              ? "w-full max-w-4xl"
              : "relative w-full max-w-5xl h-full"
          }
          style={{ perspective: "900px" }}
        >
          {sentences.map((sentence, i) => (
            <div
              key={i}
              data-sentence-index={i}
              className={
                reduceMotion
                  ? "ink-sentence-static text-center"
                  : "ink-sentence absolute inset-0 flex items-center justify-center opacity-0"
              }
              style={{ "--consume": 0 }}
            >
              <h2 className="ink-heading text-center">
                {reduceMotion ? sentence : renderSplitSentence(sentence, i)}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* SCROLL CUE — see note above; safe to delete this block. */}
      {!reduceMotion && (
        <div className="ink-scroll-cue pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <span className="ink-scroll-cue-label">Scroll</span>
          <span className="ink-scroll-cue-line" />
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* STYLES — plain, unscoped <style> tag, no build plugin required   */}
      {/* ---------------------------------------------------------------- */}
      <style>{`
        .ink-heading {
          font-family: var(--font-fraunces, "Fraunces", "Iowan Old Style", Georgia, serif);
          font-weight: 440;
          letter-spacing: -0.01em;
          line-height: 1.08;
          color: #f3ece0;
          font-size: clamp(2.5rem, 8vw, 6.5rem);
          text-shadow: 0 0 40px rgba(243, 220, 180, 0.16),
            0 0 90px rgba(220, 160, 90, 0.08);
        }

        .ink-word {
          display: inline-block;
        }
        .ink-word-inner {
          display: inline-block;
          white-space: nowrap;
        }
        .ink-char {
          display: inline-block;
          will-change: transform, opacity, filter;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        .ink-sentence {
          transform-style: preserve-3d;
          -webkit-mask-image: linear-gradient(
            to bottom,
            black calc((1 - var(--consume, 0)) * 100%),
            transparent calc((1 - var(--consume, 0)) * 100% + 42%)
          );
          mask-image: linear-gradient(
            to bottom,
            black calc((1 - var(--consume, 0)) * 100%),
            transparent calc((1 - var(--consume, 0)) * 100% + 42%)
          );
        }

        .ink-sentence-static {
          padding: 0.5rem 0;
        }

        .ink-particle {
          position: absolute;
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            rgba(240, 200, 150, 0.9),
            rgba(240, 200, 150, 0) 70%
          );
          filter: blur(0.5px);
          will-change: transform;
        }

        @keyframes ink-drift {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(var(--drift-x), -18px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .ink-grain {
          opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          animation: ink-grain-shift 1.4s steps(2) infinite;
        }

        @keyframes ink-grain-shift {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-1.5%, 1.5%, 0);
          }
        }

        .ink-scroll-cue {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }
        .ink-scroll-cue-label {
          font-family: var(--font-inter, "Inter", ui-sans-serif, system-ui, sans-serif);
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(243, 236, 224, 0.45);
        }
        .ink-scroll-cue-line {
          width: 1px;
          height: 28px;
          background: linear-gradient(
            to bottom,
            rgba(243, 236, 224, 0.5),
            transparent
          );
          animation: ink-cue-pulse 2.2s ease-in-out infinite;
        }
        @keyframes ink-cue-pulse {
          0%,
          100% {
            transform: scaleY(0.6);
            opacity: 0.4;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ink-particle,
          .ink-grain,
          .ink-scroll-cue-line {
            animation: none !important;
          }
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </section>
  );
}
