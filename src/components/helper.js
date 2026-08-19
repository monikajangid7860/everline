import gsap from "gsap";

/* -------------------------------------------------------
   Clamp
------------------------------------------------------- */

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/* -------------------------------------------------------
   Lerp
------------------------------------------------------- */

export function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

/* -------------------------------------------------------
   Normalize
------------------------------------------------------- */

export function normalize(value, min, max) {
  return (value - min) / (max - min);
}

/* -------------------------------------------------------
   Map Range
------------------------------------------------------- */

export function mapRange(
  value,
  inMin,
  inMax,
  outMin,
  outMax
) {
  return gsap.utils.mapRange(
    inMin,
    inMax,
    outMin,
    outMax,
    value
  );
}

/* -------------------------------------------------------
   Smoothstep
------------------------------------------------------- */

export function smoothstep(min, max, value) {
  const x = clamp((value - min) / (max - min), 0, 1);

  return x * x * (3 - 2 * x);
}

/* -------------------------------------------------------
   Device Config
------------------------------------------------------- */

export function getMotionConfig() {
  const width = window.innerWidth;

  if (width < 768) {
    return {
      scroll: 1400,
      imageScale: 0.985,
      imageMove: 60,
      radius: 18,
      blur: 8,
      revealStart: 0.18,
      revealEnd: 0.82,
    };
  }

  if (width < 1200) {
    return {
      scroll: 1800,
      imageScale: 0.98,
      imageMove: 90,
      radius: 24,
      blur: 10,
      revealStart: 0.15,
      revealEnd: 0.86,
    };
  }

  return {
    scroll: 2400,
    imageScale: 0.975,
    imageMove: 120,
    radius: 28,
    blur: 12,
    revealStart: 0.12,
    revealEnd: 0.9,
  };
}

/* -------------------------------------------------------
   Motion Defaults
------------------------------------------------------- */

export const MOTION = {

  easePrimary: "power4.inOut",

  easeSoft: "power2.out",

  easeSettle: "expo.out",

  scrub: 1,

  anticipatePin: 1,

  duration: {

    intro: 1,

    reveal: 2.8,

    hold: 1.2,

    outro: 1.4,

  },

};

/* -------------------------------------------------------
   Will Change
------------------------------------------------------- */

export function applyWillChange(element) {

  if (!element) return;

  element.style.willChange =
    "transform, opacity, filter";

}

/* -------------------------------------------------------
   Cleanup
------------------------------------------------------- */

export function clearWillChange(element) {

  if (!element) return;

  element.style.willChange = "";

}