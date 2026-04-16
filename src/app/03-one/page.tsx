"use client";

import { useMemo, useState } from "react";

type Panel = {
  title: string;
  description: string;
  backgroundImage: string;
};

const PANELS: Panel[] = [
  {
    title: "智能计算",
    description: "以高性能算力和低时延架构，驱动下一代实时智能应用。",
    backgroundImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "数据安全",
    description: "从传输到存储的全链路加密，为关键业务提供可靠防护。",
    backgroundImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "未来网络",
    description: "融合边缘节点与智能路由，让全球连接更稳定、更高效。",
    backgroundImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "工业智造",
    description: "借助自动化与数字孪生，打造更敏捷的现代化生产体系。",
    backgroundImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80",
  },
];

function Section03One() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const panelWidth = useMemo(
    () =>
      PANELS.map((_, index) => {
        if (hoveredIndex === null) return "25%";
        return index === hoveredIndex ? "40%" : "20%";
      }),
    [hoveredIndex],
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {PANELS.map((panel, index) => {
        const isActive = hoveredIndex === index;

        return (
          <section
            key={panel.title}
            className="relative h-full border-r border-white/20 last:border-r-0"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              width: panelWidth[index],
              transition: "width 500ms ease",
            }}
          >
            <button
              type="button"
              className="group relative flex h-full w-full items-end overflow-hidden text-left"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${panel.backgroundImage}')` }}
              />
              <div
                className={`absolute inset-0 bg-black/45 transition-colors duration-500 ${isActive ? "bg-black/40" : "bg-black/55"}`}
              />
              <div className="relative z-10 w-full px-5 pb-10 text-white sm:px-7">
                <h2
                  className={`text-xl font-extrabold tracking-wide text-white transition-transform duration-500 sm:text-2xl ${isActive ? "-translate-y-6" : "translate-y-0"}`}
                >
                  {panel.title}
                </h2>
                <div
                  className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-44 translate-y-0 opacity-100" : "max-h-0 translate-y-2 opacity-0"}`}
                >
                  <p className="mt-1 max-w-xs text-sm leading-relaxed text-white/90">
                    {panel.description}
                  </p>
                  <span className="mt-5 inline-flex w-32 items-center justify-center border border-white px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black [border-radius:64px/64px]">
                    探索更多
                  </span>
                </div>
              </div>
            </button>
          </section>
        );
      })}
    </div>
  );
}

export default function Page() {
  return <Section03One />;
}
