import { useRef } from "react";
import pastProjects from "./pastProjectsData";
import PastProjectCard from "./PastProjectCard";
import useHorizontalGallery from "./useHorizontalGallery";

export default function PastProjectsDesktop() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  useHorizontalGallery({
    sectionRef,
    trackRef,
    cardsRef,
    mediaQuery: "(min-width: 1024px)",
    pinMultiplier: 1,
    scrub: true,
    inactiveOpacity: 0.8,
    inactiveScale: 0.9,
    imageZoomFrom: 1.1,
    focusStart: "left center",
    focusEnd: "right center",
  });

  return (
    <div
      ref={sectionRef}
      className="relative hidden h-screen overflow-hidden lg:block"
    >
      <div
        ref={trackRef}
        className="flex h-full w-max items-center gap-24 px-[10vw]"
      >
        <header className="shrink-0">
          <h2 className="text-4xl leading-none text-[#990f02]">
            PAST
            <br />
            SERVICES
          </h2>
        </header>

        {pastProjects.map((project, index) => (
          <div
            key={project.id}
            ref={(element) => {
              cardsRef.current[index] = element;
            }}
            className="min-w-[420px]"
          >
            <PastProjectCard project={project} imageClassName="h-[520px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
