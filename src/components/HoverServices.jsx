import { useEffect, useRef } from "react";
import gsap from "gsap";

const services = [
  {
    title: "Brand Editorial Shoots",
    image: "https://images.unsplash.com/photo-1649899052132-f1f17bbae3bb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM0fHx8ZW58MHx8fHx8",
    desc: "Curated, story-driven sessions that translate your brand essence into elevated, magazine-worthy imagery.",
  },
  {
    title: "Art Direction & Styling",
    image: "https://images.unsplash.com/photo-1718913134930-96f19a282232?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
    desc: "Creative oversight to ensure visuals are cohesive, intentional, and beautifully on-brand.",
  },
  {
    title: "Content Suites for Launches",
    image: "https://plus.unsplash.com/premium_photo-1734415282663-89db1f179216?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
    desc: "Custom imagery packages for product launches, campaigns, and seasonal storytelling.",
  },
];

export default function HoverServices() {
  const rowsRef = useRef([]);

  useEffect(() => {
  rowsRef.current.forEach((row) => {
    if (!row) return;

    const imageWrap = row.querySelector(".hover-image");
    const image = imageWrap.querySelector("img");
    const text = row.querySelector(".hover-text");
    const accent = row.querySelector(".accent-line");

    // ===== Initial quiet state =====
    gsap.set(imageWrap, {
      opacity: 0,
      clipPath: "inset(20% 20% 20% 20%)",
    });
    gsap.set(image, { scale: 1.12 });
    gsap.set(text, { opacity: 0, y: 24 });
    gsap.set(accent, { width: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(imageWrap, {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        image,
        {
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        text,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.35"
      )
      .to(
        accent,
        {
          width: "15rem",
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

    // ===== Mouse move (image drift) =====
    const move = (e) => {
      const bounds = imageWrap.getBoundingClientRect();
      const px = (e.clientX - bounds.left) / bounds.width - 0.5;
      const py = (e.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(image, {
        x: px * 18,
        y: py * 18,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    const reset = () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    };

    // ===== Hover orchestration =====
    row.addEventListener("mouseenter", () => {
      tl.play();
      row.classList.add("active");

      rowsRef.current.forEach((r) => {
        if (r !== row) gsap.to(r, { opacity: 0.35, duration: 0.3 });
      });

      imageWrap.addEventListener("mousemove", move);
    });

    row.addEventListener("mouseleave", () => {
      tl.reverse();
      row.classList.remove("active");
      reset();

      rowsRef.current.forEach((r) =>
        gsap.to(r, { opacity: 1, duration: 0.3 })
      );

      imageWrap.removeEventListener("mousemove", move);
    });
  });
}, []);


  return (
    <section className="bg-[#3b3c36] py-40">
      <div className="max-w-7xl mx-auto bg-[#fffff0] mb-8">

        {services.map((item, i) => (
          <div
            key={i}
            ref={(el) => (rowsRef.current[i] = el)}
            className="
  relative grid grid-cols-[1.3fr_1fr_1fr]
  items-center px-12 py-24
  border-t border-black/10
  transition-all duration-300
  hover:-translate-y-1
"

          >
            {/* TITLE */}
            <h3 className="text-5xl font-semibold text-[#3b3c36] leading-tight">
              {item.title}
            </h3>

            {/* IMAGE */}
            <div className="hover-image overflow-hidden w-75">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* TEXT */}
            <p className="hover-text max-w-sm text-[#232323] leading-relaxed">
              {item.desc}
            </p>

            {/* ACCENT */}
            <span className="accent-line absolute bottom-0 left-12 h-[2px] bg-[#990f02]" />

          </div>
        ))}

      </div>
    </section>
  );
}
