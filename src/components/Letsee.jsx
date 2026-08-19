"use client";

import { useRef } from "react";

export default function Letsee({
  eyebrow = "[ INTRO ]",
  heading = "THE INVISIBLE ECHO",
  description = "Before the gesture, there is a sound. Before the form, an echo. Every interaction begins long before it is seen.",
  leftImage = "/images/desktop.avif",
  rightImage = "/images/mobile.avif",
  className = "",
}) {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className={`letsee ${className}`}
    >
      {/* Background */}

      <div className="letsee__bg" />

      {/* Decorative glow */}

      <div className="letsee__ambient" />

      {/* Main editorial grid */}

      <div className="letsee__grid">

        {/* LEFT IMAGE */}

        <aside className="letsee__aside letsee__aside--left">

          <div className="editorial-card editorial-card--left">

            <div className="editorial-card__media">

              <img
                src={leftImage}
                alt=""
                className="editorial-card__image"
              />

            </div>

          </div>

        </aside>

        {/* CENTER */}

        <main className="letsee__content">

          <span className="letsee__eyebrow">
            {eyebrow}
          </span>

          <h1 className="letsee__title">

            <span>THE</span>

            <span>INVISIBLE</span>

            <span>ECHO</span>

          </h1>

          <p className="letsee__description">
            {description}
          </p>

        </main>

        {/* RIGHT IMAGE */}

        <aside className="letsee__aside letsee__aside--right">

          <div className="editorial-card editorial-card--right">

            <div className="editorial-card__media">

              <img
                src={rightImage}
                alt=""
                className="editorial-card__image"
              />

            </div>

          </div>

        </aside>

      </div>

      {/* Background texture */}

      <div className="letsee__noise" />

    </section>
  );
}