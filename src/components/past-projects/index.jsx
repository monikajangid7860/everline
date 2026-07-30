import PastProjectsMarquee from "./PastProjectsMarquee";
import PastProjectsMobile from "./PastProjectsMobile";
import PastProjectsTablet from "./PastProjectsTablet";
import PastProjectsDesktop from "./PastProjectsDesktop";

/**
 * Past Projects section — three independent galleries by breakpoint.
 * Mobile: vertical reveals. Tablet: lighter horizontal pin. Desktop: full horizontal pin.
 */
export default function PastProjectsSection() {
  return (
    <section className="overflow-hidden bg-[#fffff0]" aria-label="Past projects">
      <PastProjectsMarquee />
      <PastProjectsMobile />
      <PastProjectsTablet />
      <PastProjectsDesktop />
    </section>
  );
}
