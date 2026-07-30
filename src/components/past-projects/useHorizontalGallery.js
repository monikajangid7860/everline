import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned horizontal gallery driven by vertical scroll.
 * Used by desktop (full pin) and tablet (shorter pin, tighter layout).
 */
export default function useHorizontalGallery({
  sectionRef,
  trackRef,
  cardsRef,
  mediaQuery,
  pinMultiplier = 1,
  scrub = true,
  inactiveOpacity = 0.8,
  inactiveScale = 0.9,
  imageZoomFrom = 1.1,
  focusStart = "left center",
  focusEnd = "right center",
}) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(mediaQuery, () => {
        const cards = cardsRef.current.filter(Boolean);
        const fullDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);
        const pinDistance = () => fullDistance() * pinMultiplier;

        const horizontal = gsap.to(track, {
          x: () => -fullDistance(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${pinDistance()}`,
            scrub,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(cards, {
          opacity: inactiveOpacity,
          scale: inactiveScale,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        });

        cards.forEach((card) => {
          const img = card.querySelector(".past-project-card__img");

          gsap.to(card, {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontal,
              start: focusStart,
              end: focusEnd,
              scrub: true,
            },
          });

          gsap.fromTo(
            img,
            { scale: imageZoomFrom },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontal,
                start: focusStart,
                end: focusEnd,
                scrub: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, [
    sectionRef,
    trackRef,
    cardsRef,
    mediaQuery,
    pinMultiplier,
    scrub,
    inactiveOpacity,
    inactiveScale,
    imageZoomFrom,
    focusStart,
    focusEnd,
  ]);
}
