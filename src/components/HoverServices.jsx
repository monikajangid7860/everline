import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Brand Editorial Shoots",
    image: "https://images.unsplash.com/photo-1649899052132-f1f17bbae3bb?w=800&auto=format&fit=crop&q=80",
    desc: "Curated, story-driven sessions that translate your brand essence into elevated, magazine-worthy imagery.",
  },
  {
    title: "Art Direction & Styling",
    image: "https://images.unsplash.com/photo-1718913134930-96f19a282232?w=800&auto=format&fit=crop&q=80",
    desc: "Creative oversight to ensure visuals are cohesive, intentional, and beautifully on-brand.",
  },
  {
    title: "Content Suites for Launches",
    image: "https://plus.unsplash.com/premium_photo-1734415282663-89db1f179216?w=800&auto=format&fit=crop&q=80",
    desc: "Custom imagery packages for product launches, campaigns, and seasonal storytelling.",
  },
];

export default function HoverServices() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useLayoutEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const cleanups = [];
    const context = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;

        const imageWrap = row.querySelector(".hover-image");
        const image = row.querySelector(".hover-image img");
        const copy = row.querySelector(".hover-copy");
        const title = row.querySelector(".service-title");
        const number = row.querySelector(".service-number");
        const accent = row.querySelector(".accent-line");

        const side = row === rowsRef.current[1] ? 1 : -1;
        const revealOffset = mobile ? { titleX: side * 50, numberX: side * 28, imageX: 0, imageY: 36, copyX: 0, copyY: 18 } : { titleX: side * 100, numberX: side * 55, imageX: side * -75, imageY: 60, copyX: side * -45, copyY: 26 };
        const revealStart = mobile ? "top 95%" : "top 88%";
        const revealEnd = mobile ? "top 55%" : "top 42%";

        gsap.set([imageWrap, copy, title, number, accent], { autoAlpha: 1 });
        gsap.set(image, { scale: 1.08, x: 0, y: 0 });
        gsap.set(accent, { width: 0 });

        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: revealStart,
            end: revealEnd,
            scrub: 0.8,
          },
        })
          .fromTo(
            title,
            { x: revealOffset.titleX, y: 34, rotate: side * 2, autoAlpha: 0 },
            { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: 1, ease: "none" },
            0
          )
          .fromTo(
            number,
            { x: revealOffset.numberX, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.8, ease: "none" },
            0.08
          )
          .fromTo(
            imageWrap,
            { x: revealOffset.imageX, y: revealOffset.imageY, rotate: side * -3, autoAlpha: 0, clipPath: "inset(18% 18% 18% 18%)" },
            { x: 0, y: 0, rotate: 0, autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" },
            0.05
          )
          .fromTo(
            image,
            { scale: 1.16 },
            { scale: 1.02, duration: 1, ease: "none" },
            0.05
          )
          .fromTo(
            copy,
            { x: revealOffset.copyX, y: revealOffset.copyY, autoAlpha: 0 },
            { x: 0, y: 0, autoAlpha: 1, duration: 0.9, ease: "none" },
            0.18
          )
          .to(
            accent,
            { width: "100%", duration: 0.85, ease: "none" },
            0.15
          );

        const hoverTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        hoverTimeline
          .to(row, { backgroundColor: "#f5f0e4", duration: 0.55 }, 0)
          .to(title, { x: 18, letterSpacing: "0.015em", duration: 0.55 }, 0)
          .to(number, { color: "#990f02", x: 4, duration: 0.45 }, 0)
          .to(accent, { width: "100%", duration: 0.45 }, 0)
          .to(image, { scale: 1.12, duration: 0.65 }, 0)
          .to(image, { rotation: side * 1.5, duration: 0.65 }, 0);

        const drift = (event) => {
          const bounds = imageWrap.getBoundingClientRect();
          const x = ((event.clientX || event.touches?.[0]?.clientX) - bounds.left) / bounds.width - 0.5;
          const y = ((event.clientY || event.touches?.[0]?.clientY) - bounds.top) / bounds.height - 0.5;
          const multiplier = mobile ? 10 : 14;
          gsap.to(image, { x: x * multiplier, y: y * multiplier, duration: 0.7, ease: "power3.out" });
        };
        const resetImage = () => gsap.to(image, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
        const play = () => hoverTimeline.play();
        const reverse = () => {
          hoverTimeline.reverse();
          resetImage();
        };

        row.addEventListener("pointerenter", play);
        row.addEventListener("pointerleave", reverse);
        row.addEventListener("focusin", play);
        row.addEventListener("focusout", reverse);
        imageWrap.addEventListener("pointermove", drift);
        imageWrap.addEventListener("pointerleave", resetImage);
        imageWrap.addEventListener("touchstart", play, { passive: true });
        imageWrap.addEventListener("touchend", reverse, { passive: true });

        if (mobile) {
          const floatTween = gsap.to(image, {
            y: 10,
            duration: 3.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          cleanups.push(() => floatTween.kill());
        }

        cleanups.push(() => {
          row.removeEventListener("pointerenter", play);
          row.removeEventListener("pointerleave", reverse);
          row.removeEventListener("focusin", play);
          row.removeEventListener("focusout", reverse);
          imageWrap.removeEventListener("pointermove", drift);
          imageWrap.removeEventListener("pointerleave", resetImage);
          imageWrap.removeEventListener("touchstart", play);
          imageWrap.removeEventListener("touchend", reverse);
        });
      });
    }, sectionRef);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#3b3c36] py-40 max-md:py-16">
      <div className="mx-auto mb-8 max-w-7xl bg-[#fffff0]">
        {services.map((service, index) => (
          <article
            key={service.title}
            ref={(element) => (rowsRef.current[index] = element)}
            tabIndex={0}
            className="relative grid grid-cols-[1.3fr_1fr_1fr] items-center gap-8 border-t border-black/10 px-12 py-24 outline-none first:border-t-0 max-md:grid-cols-1 max-md:gap-8 max-md:px-6 max-md:py-12"
          >
            <div className="min-w-0">
              <span className="service-number mb-5 block text-xs tracking-[0.3em] text-[#3b3c36]/55 transition-colors">
                0{index + 1}
              </span>
              <h3 className="service-title text-5xl font-semibold leading-tight text-[#3b3c36] max-md:text-3xl">
                {service.title}
              </h3>
            </div>

            <div className="hover-image w-75 overflow-hidden max-md:w-full">
              <img
                src={service.image}
                alt={service.title}
                className="h-64 w-full object-cover max-md:h-auto max-md:aspect-[4/3]"
              />
            </div>

            <div>
              <p className="hover-copy max-w-sm leading-relaxed text-[#232323]">
                {service.desc}
              </p>
              <span className="mt-7 block text-[10px] uppercase tracking-[0.28em] text-[#990f02] max-md:mt-5">
                Explore service
              </span>
            </div>

            <span className="accent-line absolute bottom-0 left-0 h-[2px] bg-[#990f02]" />
          </article>
        ))}
      </div>
    </section>
  );
}
