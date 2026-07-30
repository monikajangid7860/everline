import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const reasons = [
  {
    text: "Editorial storytelling over trend-driven visuals",
    image: "https://plus.unsplash.com/premium_photo-1664882424873-e5f5d727c4e2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
  },
  {
    text: "Deep understanding of beauty, wellness & lifestyle brands",
    image: "https://plus.unsplash.com/premium_photo-1682125353819-b3b168a8abaf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
  },
  {
    text: "Natural light & studio-based shooting options",
    image: "https://plus.unsplash.com/premium_photo-1661374969466-ea7d18790510?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMzfHx8ZW58MHx8fHx8",
  },
  {
    text: "Thoughtful art direction from concept to delivery",
    image: "https://plus.unsplash.com/premium_photo-1663956144126-365e985ef324?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ1fHx8ZW58MHx8fHx8",
  },
  {
    text: "Imagery designed for emotional brand connection",
    image: "https://plus.unsplash.com/premium_photo-1706727291559-36b78effdf21?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDYwfHx8ZW58MHx8fHx8",
  },
];

export default function WhyWithImage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef([]);

  /* ---------- IMAGE TRANSITION ---------- */
  useEffect(() => {
    imageRefs.current.forEach((img, i) => {
      if (!img) return;

      gsap.to(img, {
        opacity: i === activeIndex ? 1 : 0,
        x: i === activeIndex ? 0 : 30,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  }, [activeIndex]);

  return (
    <section className="bg-[#fffff0] py-48">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 gap-24 items-center">

        {/* ---------- LEFT LIST ---------- */}
        <div>
          <h3 className="text-3xl font-semibold  mb-14 text-[#3b3c36] inline-block px-4 py-2">
            Why Brands Choose Everline
          </h3>

          <ul className="space-y-6  px-6 py-8">
            {reasons.map((item, i) => (
              <li
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                tabIndex={0}
                className={`
                  cursor-pointer transition-opacity duration-300 
                  ${activeIndex === i ? "opacity-100" : "opacity-50"}
                `}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- RIGHT IMAGE ---------- */}
        <div className="relative h-[520px] overflow-hidden">
          {reasons.map((item, i) => (
            <img
              key={i}
              ref={(el) => (imageRefs.current[i] = el)}
              src={`${item.image}?auto=format&fit=crop&w=900&q=80`}
              alt={item.text}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
