"use client";

export default function TakeoverImage({
  image,
  eyebrow,
  title,
}) {
  return (
    <section className="takeover-image relative">
      <div className="takeover-image__sticky">

        {/* Editorial Frame */}

        <div className="takeover-image__frame">

          {/* Image */}

          <div className="takeover-image__media">

            <img
              src={image}
              alt={title || ""}
              className="takeover-image__img"
            />

            {/* Dark vignette */}

            <div className="takeover-image__vignette" />

            {/* Film grain */}

            <div className="takeover-image__grain" />

            {/* Soft glow */}

            <div className="takeover-image__light" />

          </div>

          {/* Caption */}

          <div className="takeover-image__caption">

            {eyebrow && (
              <p className="takeover-image__eyebrow">
                {eyebrow}
              </p>
            )}

            {title && (
              <h2 className="takeover-image__title">
                {title}
              </h2>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}