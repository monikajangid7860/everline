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

        if (mobile) {
          gsap.set([imageWrap, copy], { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set(image, { scale: 1 });
          gsap.set(accent, { width: "100%" });
          return;
        }

        const side = row === rowsRef.current[1] ? 1 : -1;

        // Scroll carries each editorial element into place before hover takes over.
        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            end: "top 42%",
            scrub: 0.8,
          },
        })
          .fromTo(title, { x: side * 100, y: 34, rotate: side * 2, autoAlpha: 0 }, { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: 1, ease: "none" }, 0)
          .fromTo(number, { x: side * 55, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, ease: "none" }, 0.08)
          .fromTo(imageWrap, { x: side * -75, y: 60, rotate: side * -3, autoAlpha: 0, clipPath: "inset(14% 18% 14% 18%)" }, { x: 0, y: 0, rotate: 0, autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" }, 0.05)
          .fromTo(image, { scale: 1.18 }, { scale: 1, duration: 1, ease: "none" }, 0.05)
          .fromTo(copy, { x: side * -45, y: 26, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.9, ease: "none" }, 0.18)
          .to(accent, { width: "100%", duration: 0.85, ease: "none" }, 0.15);

        gsap.set(accent, { width: 0 });

        const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        timeline
          .to(row, { backgroundColor: "#f5f0e4", duration: 0.55 }, 0)
          .to(title, { x: 18, letterSpacing: "0.015em", duration: 0.6 }, 0)
          .to(number, { color: "#990f02", x: 6, duration: 0.45 }, 0)
          .to(image, { scale: 1.04, duration: 0.75 }, 0.05);

        const drift = (event) => {
          const bounds = imageWrap.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          gsap.to(image, { x: x * 14, y: y * 14, duration: 0.65, ease: "power3.out" });
        };
        const resetImage = () => gsap.to(image, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
        const play = () => timeline.play();
        const reverse = () => {
          timeline.reverse();
          resetImage();
        };

        row.addEventListener("mouseenter", play);
        row.addEventListener("mouseleave", reverse);
        row.addEventListener("focusin", play);
        row.addEventListener("focusout", reverse);
        imageWrap.addEventListener("mousemove", drift);
        imageWrap.addEventListener("mouseleave", resetImage);

        cleanups.push(() => {
          row.removeEventListener("mouseenter", play);
          row.removeEventListener("mouseleave", reverse);
          row.removeEventListener("focusin", play);
          row.removeEventListener("focusout", reverse);
          imageWrap.removeEventListener("mousemove", drift);
          imageWrap.removeEventListener("mouseleave", resetImage);
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
