"use client";

import TakeoverImage from "./TakeoverImage";

export default function TakeoverSection({
  children,
  image,
  eyebrow,
  title,
}) {
  return (
    <section className="takeover relative bg-[#080808]">
      {/* ===============================
          SECTION A
      =============================== */}

      <div className="takeover__stage">
        <div className="takeover__content">
          {children}
        </div>
      </div>

      {/* ===============================
          SECTION B
      =============================== */}

      <TakeoverImage
        image={image}
        eyebrow={eyebrow}
        title={title}
      />
    </section>
  );
}