"use client";

import Marquee from "./Marquee";
import DesktopGallery from "./DesktopGallery";
import MobileEditorial from "./MobileEditorial";

export default function PastProjects() {
  return (
    <section className="overflow-hidden bg-[#fffff0]">

      <Marquee />

      <DesktopGallery />

      <MobileEditorial />

    </section>
  );
}