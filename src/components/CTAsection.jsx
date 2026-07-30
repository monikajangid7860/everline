"use client";

import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative flex min-h-screen items-center bg-[#fffff0] overflow-hidden">

      {/* Background Number */}

      <span className="absolute -right-8 bottom-0 select-none text-[220px] font-light leading-none text-black/[0.03]">
        06
      </span>

      <div className="mx-auto w-full max-w-6xl px-8">

        {/* Divider */}

        <div className="mb-20 h-px w-full bg-black/10" />

        {/* Heading */}

        <div className="max-w-3xl">

          <span className="block text-[11px] uppercase tracking-[0.45em] text-[#990f02]">
            Let's Work Together
          </span>

          <h2 className="mt-8 font-serif text-[58px] leading-[0.95] text-[#171717] md:text-[92px]">
            Let's Create
            <br />
            Something
            <br />
            Beautiful.
          </h2>

          <p className="mt-10 max-w-md text-[16px] leading-8 text-black/55">
            Whether it's a fashion campaign, commercial shoot or creative
            direction, let's build something people will remember.
          </p>

        </div>

        {/* Button */}

        <button className="group mt-16 flex items-center gap-5">

          <span className="uppercase tracking-[0.35em] text-sm">
            Start a Project
          </span>

          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-black transition-all duration-500 group-hover:bg-black group-hover:text-[#fffff0]">

            <ArrowUpRight size={20} />

          </div>

        </button>

        {/* Footer Divider */}

        <div className="mt-24 h-px w-full bg-black/10" />

      </div>

    </section>
  );
}