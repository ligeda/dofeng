"use client";

import { useEffect, useState } from "react";

import { ArrowUp, Leaf, Phone, Users } from "lucide-react";

const ACTIONS = [
  { id: "join", label: "加入我们", icon: Users },
  { id: "sustainable", label: "可持续发展", icon: Leaf },
  { id: "contact", label: "联系我", icon: Phone },
  { id: "to-top", label: "回到顶部", icon: ArrowUp },
];

export function RightFloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY >= window.innerHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleActionClick = (id: string) => {
    if (id === "to-top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <aside className="fixed top-1/2 right-4 z-40 -translate-y-1/2">
      <div className="flex items-end flex-col gap-2">
        {ACTIONS.map((action) => {
          if (action.id === "to-top" && !showBackToTop) {
            return null;
          }

          const Icon = action.icon;

          return (
            <button
              key={action.id}
              type="button"
              onClick={() => handleActionClick(action.id)}
              className="group bg-black/65 text-white hover:text-[rgb(0,119,182)] focus-visible:text-[rgb(0,119,182)] flex h-10 min-w-10 items-center justify-end overflow-hidden rounded-md px-3 backdrop-blur-sm transition-[color,background-color] duration-500"
            >
              <span className="mr-0 inline-block max-w-0 overflow-hidden whitespace-nowrap text-right text-sm opacity-0 transition-all duration-500 group-hover:mr-2 group-hover:max-w-[20rem] group-hover:opacity-100 group-focus-visible:mr-2 group-focus-visible:max-w-[20rem] group-focus-visible:opacity-100">
                {action.label}
              </span>
              <Icon className="size-4 shrink-0" />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
