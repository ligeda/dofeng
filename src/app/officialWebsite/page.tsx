"use client";

import { useEffect, useRef, useState } from "react";

import { RightFloatingActions } from "@/app/officialWebsite/01-right/right-floating-actions";
import Section02Right from "@/app/officialWebsite/02-right/page";
import Section03One from "@/app/officialWebsite/03-one/page";
import Section04Two from "@/app/officialWebsite/04-two/page";
import Section05Three from "@/app/officialWebsite/05-three/page";
import { Agreement } from "@/components/blocks/agreement";
import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";

type SectionEntry = {
  id: string;
  Component: () => React.JSX.Element;
};

const SECTION_ENTRIES: SectionEntry[] = [
  { id: "02-right", Component: Section02Right },
  { id: "03-one", Component: Section03One },
  { id: "04-two", Component: Section04Two },
  { id: "05-three", Component: Section05Three },
  { id: "footer", Component: Footer },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const getSnapTop = (section: HTMLElement) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (sectionHeight < viewportHeight) {
        return Math.max(0, sectionTop + sectionHeight - viewportHeight);
      }

      return sectionTop;
    };

    const scrollToIndex = (nextIndex: number) => {
      const targetSection = sectionRefs.current[nextIndex];
      if (!targetSection) return;

      isAnimatingRef.current = true;
      setActiveIndex(nextIndex);

      window.scrollTo({
        top: getSnapTop(targetSection),
        behavior: "smooth",
      });

      window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, 700);
    };

    const onWheel = (event: WheelEvent) => {
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const threshold = 20;
      if (Math.abs(event.deltaY) < threshold) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        SECTION_ENTRIES.length - 1,
        Math.max(0, activeIndex + direction),
      );

      if (nextIndex === activeIndex) return;

      event.preventDefault();
      scrollToIndex(nextIndex);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex]);

  return (
    <div className="bg-background">
      <Navbar />
      <RightFloatingActions />
      {SECTION_ENTRIES.map(({ id, Component }, index) => (
        <section
          key={id}
          id={id}
          ref={(node) => {
            sectionRefs.current[index] = node;
          }}
          className="relative w-full"
        >
          <Component />
        </section>
      ))}
      <Agreement />
    </div>
  );
}
