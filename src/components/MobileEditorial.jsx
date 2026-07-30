"use client";

const projects = [
  {
    id: "01",
    category: "EDITORIAL",
    title: "Editorial Campaign",
    description:
      "Studio-lit story crafted for print and digital placement.",
    image:
      "https://images.unsplash.com/photo-1551880213-0861c4ae7460?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "02",
    category: "PORTRAIT",
    title: "Personal Shoot",
    description:
      "An intimate exploration of natural light and emotion.",
    image:
      "https://plus.unsplash.com/premium_photo-1683133857379-9068081bc7bf?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "03",
    category: "FASHION",
    title: "Fashion Story",
    description:
      "Luxury editorial styling created for contemporary brands.",
    image:
      "https://images.unsplash.com/photo-1580478491436-fd6a937acc9e?w=1200&auto=format&fit=crop&q=80",
  },
];
export default function MobileEditorial() {
  return (
    <section className="md:hidden bg-[#fffff0]">

      {/* Hero */}

      <div className="px-7 pt-20 pb-16">

        <p className="uppercase tracking-[0.45em] text-xs text-[#990f02]">
          Past Projects
        </p>

        <h2 className="mt-5 text-5xl leading-none text-[#171717]">
          Selected
          <br />
          Works
        </h2>

        <p className="mt-6 text-sm leading-7 text-black/55 max-w-xs">
          A collection of fashion campaigns, editorial stories and portrait
          photography crafted with a timeless visual language.
        </p>

      </div>

      {/* Projects */}

      <div>

        {projects.map((project, index) => (

          <section
            key={project.id}
            className="relative px-7 pb-28"
          >

            {/* Divider */}

            <div className="mb-10 h-px bg-black/10" />

            {/* Huge Number */}

            <span className="absolute top-10 right-6 text-[120px] font-light text-black/[0.04] leading-none pointer-events-none select-none">
              {project.id}
            </span>

            {/* Image */}

            <div
              className={`overflow-hidden ${
                index % 2 === 0
                  ? ""
                  : "ml-auto w-[88%]"
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>

            {/* Content */}

            <div
              className={`mt-8 ${
                index % 2 === 0
                  ? ""
                  : "pl-8"
              }`}
            >
              <p className="uppercase tracking-[0.35em] text-[11px] text-[#990f02]">
                {project.category}
              </p>

              <h3 className="mt-3 text-3xl leading-tight text-[#171717]">
                {project.title}
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-black/60">
                {project.description}
              </p>

              <button className="group mt-8 flex items-center gap-3">

                <span className="uppercase tracking-[0.25em] text-xs">
                  View Project
                </span>

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>

              </button>

            </div>

          </section>

        ))}

      </div>

      {/* Ending */}

      <section className="px-7 py-24">

        <div className="h-px bg-black/10 mb-12" />

        <h2 className="text-5xl leading-tight text-[#171717]">
          Let's Create
          <br />
          Something
          <br />
          Beautiful.
        </h2>

        <button className="mt-10 border border-black px-8 py-4 uppercase tracking-[0.25em] text-xs hover:bg-black hover:text-[#fffff0] transition">
          Get In Touch
        </button>

      </section>

    </section>
  );
}