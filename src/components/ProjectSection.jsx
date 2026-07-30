"use client";

import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";

const ProjectSection = forwardRef(({ project, index }, ref) => {
  const layout = index % 4;

  // ---------------- Layout 1 ----------------

  if (layout === 0) {
    return (
      <section
        ref={ref}
        className="relative min-h-screen flex flex-col justify-center bg-[#fffff0] py-20"
      >
        <span className="project-number absolute right-4 top-12 text-[160px] font-light text-black/[0.04] leading-none">
          {project.id}
        </span>

        <div className="px-3">
          <img
            src={project.image}
            alt={project.title}
            className={`project-image w-full ${project.height} object-cover`}
          />
        </div>

        <div className="mt-14 px-8">
          <p className="project-category uppercase tracking-[0.45em] text-xs text-[#990f02]">
            {project.category}
          </p>

          <h2 className="project-title mt-5 font-serif text-5xl leading-none">
            {project.title}
          </h2>

          <p className="project-description mt-7 max-w-[260px] leading-8 text-black/60">
            {project.description}
          </p>

          <button className="project-button group mt-10 flex items-center gap-3">
            <span className="uppercase tracking-[0.3em] text-xs">
              View Project
            </span>

            <ArrowRight
              size={18}
              className="transition-transform duration-500 group-hover:translate-x-2"
            />
          </button>
        </div>
      </section>
    );
  }

  // ---------------- Layout 2 ----------------

  if (layout === 1) {
    return (
      <section
        ref={ref}
        className="min-h-screen bg-[#fffff0] flex flex-col justify-center py-20"
      >
        <div className="px-8">

          <span className="project-number text-7xl font-light text-black/10">
            {project.id}
          </span>

          <h2 className="project-title mt-5 font-serif text-[48px] leading-none">
            {project.title}
          </h2>

          <p className="project-description mt-6 max-w-[250px] leading-8 text-black/60">
            {project.description}
          </p>

        </div>

        <div className="mt-16 pl-12 pr-3">
          <img
            src={project.image}
            alt={project.title}
            className={`project-image w-full ${project.height} object-cover`}
          />
        </div>
      </section>
    );
  }

  // ---------------- Layout 3 ----------------

  if (layout === 2) {
    return (
      <section
        ref={ref}
        className="relative min-h-screen flex flex-col justify-center bg-[#fffff0]"
      >
        <div className="px-2">
          <img
            src={project.image}
            alt={project.title}
            className={`project-image w-full ${project.height} object-cover`}
          />
        </div>

        <div className="absolute bottom-24 left-8 bg-[#fffff0]/90 backdrop-blur-sm p-6 max-w-[260px]">

          <p className="project-category uppercase tracking-[0.35em] text-xs text-[#990f02]">
            {project.category}
          </p>

          <h2 className="project-title mt-4 font-serif text-4xl leading-none">
            {project.title}
          </h2>

        </div>

        <span className="project-number absolute right-2 bottom-8 text-[180px] font-light text-black/[0.05] leading-none">
          {project.id}
        </span>
      </section>
    );
  }

  // ---------------- Layout 4 ----------------

  return (
    <section
      ref={ref}
      className="min-h-screen bg-[#fffff0] flex flex-col justify-center py-24"
    >
      <div className="px-8">

        <p className="project-category uppercase tracking-[0.45em] text-xs text-[#990f02]">
          {project.category}
        </p>

        <h2 className="project-title mt-5 font-serif text-[56px] leading-[0.9]">
          {project.title}
        </h2>

      </div>

      <div className="mt-14 px-6">
        <img
          src={project.image}
          alt={project.title}
          className={`project-image w-full ${project.height} object-cover`}
        />
      </div>

      <div className="mt-10 flex items-center justify-between px-8">

        <p className="project-description max-w-[220px] text-sm leading-7 text-black/60">
          {project.description}
        </p>

        <span className="project-number text-6xl font-light text-black/10">
          {project.id}
        </span>

      </div>
    </section>
  );
});

ProjectSection.displayName = "ProjectSection";

export default ProjectSection;