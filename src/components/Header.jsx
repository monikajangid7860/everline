import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../assets/everline-logo.png";

export default function Header() {
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.from(headerRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 py-5 z-50 bg-[#3b3c36]/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-4">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Everline Studio"
            className="h-6 w-auto object-contain"
          />
          <span className="text-xs tracking-[0.3em] text-[#fffff0] font-semibold">
            EVERLINE
          </span>
        </div>

        {/* NAV */}
        <nav className="flex gap-10 text-xs tracking-widest text-[#fffff0]">
          <a className="relative group cursor-pointer">
            HOME
            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#fffff0] transition-all duration-300 group-hover:w-full" />
          </a>
          <a className="relative group cursor-pointer">
            WORK
            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#fffff0] transition-all duration-300 group-hover:w-full" />
          </a>
          <a className="relative group cursor-pointer">
            CONTACT
            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#fffff0] transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>
      </div>
    </header>
  );
}
