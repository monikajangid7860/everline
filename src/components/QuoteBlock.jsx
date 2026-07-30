"use client";

export default function QuoteBlock({ quote }) {
  return (
    <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-[#fffff0] px-8">

      {/* Huge Background Quote */}

      <span className="absolute left-4 top-8 font-serif text-[180px] leading-none text-black/[0.03]">
        "
      </span>

      <div className="relative z-10 max-w-sm text-center">

        <p className="text-[34px] font-serif leading-[1.15] text-[#171717]">
          {quote}
        </p>

      </div>

    </section>
  );
}