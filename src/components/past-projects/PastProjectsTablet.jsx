import { useRef } from "react";
import pastProjects from "./pastProjectsData";
import PastProjectCard from "./PastProjectCard";
import useHorizontalGallery from "./useHorizontalGallery";

/** Shorter vertical scroll for the same horizontal travel — lighter tablet feel. */
const TABLET_PIN_MULTIPLIER = 0.72;

export default function PastProjectsTablet() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  useHorizontalGallery({
    sectionRef,
    trackRef,
    cardsRef,
    mediaQuery: "(min-width: 768px) and (max-width: 1023px)",
    pinMultiplier: TABLET_PIN_MULTIPLIER,
    scrub: 0.6,
    inactiveOpacity: 0.85,
    inactiveScale: 0.92,
    imageZoomFrom: 1.08,
    focusStart: "left 55%",
    focusEnd: "right 45%",
  });

  return (
    <div
      ref={sectionRef}
      className="relative hidden h-[88vh] overflow-hidden md:block lg:hidden"
    >
      <div
        ref={trackRef}
        className="flex h-full w-max items-center gap-10 px-8 md:gap-12"
      >
        <header className="w-[28vw] max-w-[240px] shrink-0">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-none text-[#990f02]">
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
            className="w-[75vw] shrink-0"
          >
            <PastProjectCard project={project} imageClassName="h-[58vh]" />
          </div>
        ))}
      </div>
    </div>
  );
}
