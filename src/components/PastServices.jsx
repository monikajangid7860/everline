import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Editorial Campaign",
    img: "https://images.unsplash.com/photo-1551880213-0861c4ae7460?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmludGFnZSUyMG1vZGVsfGVufDB8fDB8fHww",
  },
  {
    title: "Editorial Campaign",
    img: "https://images.unsplash.com/photo-1553544260-f87e671974ee?w=800",
  },
  {
    title: "Personal Shoot",
    img: "https://plus.unsplash.com/premium_photo-1683133857379-9068081bc7bf?w=800",
  },
  {
    title: "Personal Shoot",
    img: "https://plus.unsplash.com/premium_photo-1664870883253-ab5b5d9b585d?w=800",
  },
  {
    title: "Fashion Shoots",
    img: "https://images.unsplash.com/photo-1580478491436-fd6a937acc9e?w=800",
  },
  {
    title: "Fashion Shoots",
    img: "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vZGVsfGVufDB8fDB8fHww",
  }
];

export default function PastProjects() {
  const marqueeRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  /* ---------- MARQUEE ---------- */
  useLayoutEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const loop = gsap.to(el, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.addEventListener("refreshInit", () =>
        gsap.set(el, { xPercent: 0 })
      );

      return () => loop.kill();
    });

    return () => ctx.revert();
  }, []);

  /* ---------- HORIZONTAL SCROLL ---------- */
  useLayoutEffect(() => {
  const section = sectionRef.current;
  const track = trackRef.current;
  if (!section || !track) return;

  const ctx = gsap.context(() => {
    const cards = cardsRef.current;

    const scrollAmount = () => track.scrollWidth - window.innerWidth;

    const horizontal = gsap.to(track, {
      x: () => -scrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollAmount()}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    // base state (NOT too faded)
    gsap.set(cards, {
      opacity: 0.8,
      scale: 0.90,
      willChange: "transform, opacity",
    });

    // focus logic — THIS IS THE KEY
    cards.forEach((card) => {
      const img = card.querySelector("img");

      gsap.to(card, {
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontal,
          start: "left center",
          end: "right center",
          scrub: true,
        },
      });

      gsap.fromTo(
        img,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontal,
            start: "left center",
            end: "right center",
            scrub: true,
          },
        }
      );
    });
  }, section);

  return () => ctx.revert();
}, []);


  return (
    <section className="bg-[#fffff0] overflow-hidden">
      {/* ---------- MARQUEE ---------- */}
      <div className="border-y border-black/10 py-6 overflow-hidden bg-[#3b3c36]">
        <div
          ref={marqueeRef}
          className="flex gap-16 whitespace-nowrap text-[#fffff0]"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {Array.from({ length: 6 }).map((_, j) => (
                <span
                  key={j}
                  className="text-3xl font-semibold tracking-widest max-md:text-xl"
                >
                  PAST PROJECTS
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- HORIZONTAL SCROLL ---------- */}
      <div ref={sectionRef} className="h-screen overflow-hidden relative max-md:h-[75vh]">
           
        <div
          ref={trackRef}
          className="z-20 flex gap-24 items-center h-full w-max px-[10vw] max-md:gap-6 max-md:px-6"
        >
          <h1 className="text-4xl text-[#990f02] z-10 max-md:text-2xl">
            PAST <br />SERVICES
           </h1>
          {projects.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="min-w-[420px] shrink-0 max-md:min-w-[78vw]"
            >
              <div className="border border-black/10 p-2">
                <img
                  src={`${item.img}&auto=format&fit=crop&w=900&q=80`}
                  alt={item.title}
                  className="w-full h-[520px] object-cover max-md:h-[52vh]"
                />
              </div>
              <p className="mt-4 text-sm text-center">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
