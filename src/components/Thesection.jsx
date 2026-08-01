"use client";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-black text-white">

      {/* Desktop Background */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src="/images/desktop.avif"
          alt=""
          className="h-full w-full object-cover object-center scale-[1.02]"
        />
      </div>

      {/* Mobile Background */}
      <div className="absolute inset-0 md:hidden">
        <img
          src="/images/mobile.avif"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/25" /> */}

      {/* Radial Gradient Behind Text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,.08) 0%, rgba(0,0,0,.18) 35%, rgba(0,0,0,.55) 100%)",
        }}
      />

      {/* ---------------- Desktop ---------------- */}

      <div className="relative z-10 hidden h-full items-center justify-center md:flex">

        <div className="max-w-4xl text-center">

          <span className="mb-6 block text-sm uppercase tracking-[0.45em] text-white/70">
            Digital Design Studio
          </span>

          <h1 className="font-black leading-[0.88] tracking-[-0.05em]">

            <span className="block text-[7vw]">
              WE CREATE
            </span>

            <span className="block text-[7vw]">
              DIGITAL
            </span>

            <span className="block text-[7vw]">
              EXPERIENCES
            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/75">
            We craft thoughtful digital products with immersive interaction,
            motion and visual storytelling.
          </p>

        </div>

      </div>

      {/* ---------------- Mobile ---------------- */}

      <div className="relative z-10 flex h-full items-center justify-end px-6 md:hidden">

        <div className="w-[68%]">

          <span className="mb-5 block text-[11px] uppercase tracking-[0.4em] text-white/70">
            Digital Studio
          </span>

          <h1 className="font-black leading-[0.9] tracking-[-0.05em]">

            <span className="block text-[15vw]">
              WE
            </span>

            <span className="block text-[15vw]">
              CREATE
            </span>

            <span className="block text-[15vw]">
              DIGITAL
            </span>

            <span className="block text-[15vw]">
              EXPERIENCES
            </span>

          </h1>

          <p className="mt-6 text-sm leading-7 text-white/75">
            Building meaningful products through design, interaction and
            technology.
          </p>

        </div>

      </div>

    </section>
  );
}