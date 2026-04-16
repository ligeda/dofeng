"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

function Section02Right() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Retrigger animation every time this section becomes visible.
          setIsButtonVisible(false);
          window.requestAnimationFrame(() => {
            setIsButtonVisible(true);
          });
        } else {
          setIsButtonVisible(false);
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-[100vh] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://picsum.photos/seed/one/1920/1080"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-coding-sequences-ewaZWXUxd7/1080p.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative flex min-h-[100vh] items-end justify-center px-6 pb-20">
        <button
          type="button"
          className={`w-auto rounded-full border border-white px-4 py-1 text-base font-semibold text-white transition-all duration-700 ease-out hover:border-[rgb(0,119,182)] hover:bg-[rgb(0,119,182)] hover:text-white focus-visible:border-[rgb(0,119,182)] focus-visible:bg-[rgb(0,119,182)] focus-visible:text-white ${isButtonVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          我要合作
        </button>
      </div>

      <div
        className={`pointer-events-none absolute bottom-8 right-6 z-20 transition-opacity duration-700 ease-out sm:bottom-10 sm:right-10 ${isButtonVisible ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      >
        <motion.div
          className="flex flex-col items-center text-white/90 drop-shadow-md"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="size-10" strokeWidth={2.25} />
        </motion.div>
      </div>
    </div>
  );
}

export default function Page() {
  return <Section02Right />;
}
