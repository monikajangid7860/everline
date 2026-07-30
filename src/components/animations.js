import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------
   Project Reveal
------------------------- */

export function initProjectAnimations(cards) {
  cards.forEach((card) => {
    if (!card) return;

    const image = card.querySelector(".project-image");
    const number = card.querySelector(".project-number");
    const category = card.querySelector(".project-category");
    const title = card.querySelector(".project-title");
    const description = card.querySelector(".project-description");
    const button = card.querySelector(".project-button");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 75%",
        once: true,
      },
    });

    tl.from(card, {
      opacity: 0,
      y: 80,
      duration: 0.8,
      ease: "power3.out",
    });

    if (number) {
      tl.from(
        number,
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.5"
      );
    }

    if (image) {
      tl.from(
        image,
        {
          scale: 1.15,
          duration: 1.3,
          ease: "power4.out",
        },
        "-=0.7"
      );
    }

    tl.from(
      [category, title, description, button],
      {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.8"
    );
  });
}

/* -------------------------
   Image Parallax
------------------------- */

export function initParallax(cards) {
  cards.forEach((card) => {
    if (!card) return;

    const image = card.querySelector(".project-image");

    if (!image) return;

    gsap.to(image, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

/* -------------------------
   Quote Reveal
------------------------- */

export function initQuotes(quotes) {
  quotes.forEach((quote) => {
    if (!quote) return;

    gsap.from(quote, {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: quote,
        start: "top 80%",
        once: true,
      },
    });
  });
}

/* -------------------------
   CTA Reveal
------------------------- */

export function initCTA(cta) {
  if (!cta) return;

  gsap.from(cta, {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: cta,
      start: "top 75%",
      once: true,
    },
  });
}

/* -------------------------
   Cleanup
------------------------- */

export function destroyAnimations() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}