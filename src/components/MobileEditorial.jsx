"use client";

import projects from "./data";
import ProjectSection from "./ProjectSection";
import QuoteBlock from "./QuoteBlock";
import CTASection from "./CTAsection";

export default function MobileEditorial() {
  return (
    <section className="md:hidden bg-[#fffff0]">

      {/* ---------------- HERO ---------------- */}

      <header className="relative flex min-h-screen flex-col justify-center px-8">

        <span className="text-[11px] uppercase tracking-[0.45em] text-[#990f02]">
          Selected Works
        </span>

        <h1 className="mt-8 font-serif text-[62px] leading-[0.9] text-[#171717]">
          Past
          <br />
          Projects
        </h1>

        <p className="mt-10 max-w-[260px] text-[16px] leading-8 text-black/55">
          A curated collection of editorial campaigns, fashion stories and
          portrait photography crafted with timeless visual direction.
        </p>

        {/* Scroll Indicator */}

        <div className="absolute bottom-12 left-8 flex items-center gap-4">

          <span className="h-px w-12 bg-black/20" />

          <span className="text-xs uppercase tracking-[0.35em] text-black/40">
            Scroll
          </span>

        </div>

      </header>

      {/* ---------------- PROJECTS ---------------- */}

      {projects.map((project, index) => (
        <div key={project.id}>

          <ProjectSection
            project={project}
            index={index}
          />

          {/* Quote after every project except the last */}

          {index !== projects.length - 1 && (
            <QuoteBlock quote={project.quote} />
          )}

        </div>
      ))}

      {/* ---------------- CTA ---------------- */}

      <CTASection />

    </section>
  );
}
