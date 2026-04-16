"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";

type NewsItem = {
  title: string;
  summary: string;
  date: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    title: "智能平台发布全新数据中枢",
    summary: "通过统一数据模型与实时分析能力，帮助企业更快完成业务决策。",
    date: "2026-04-10",
  },
  {
    title: "云边协同能力再升级",
    summary: "新架构可在高并发场景下保持低延迟，支撑关键业务稳定运行。",
    date: "2026-04-08",
  },
  {
    title: "AI 质检模块上线",
    summary: "结合视觉识别与规则引擎，显著提升生产检测效率与准确率。",
    date: "2026-04-05",
  },
  {
    title: "海外节点扩展至 16 个地区",
    summary: "进一步提升全球访问速度，为跨境业务提供更稳定的服务体验。",
    date: "2026-04-02",
  },
  {
    title: "获得年度数字创新产品奖",
    summary: "凭借完整的平台化能力与落地实践，入选年度重点推荐案例。",
    date: "2026-03-28",
  },
];

function Section05Three() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsScrollerRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRafRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const MARQUEE_ITEMS = [...NEWS_ITEMS, ...NEWS_ITEMS];

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false);
          window.requestAnimationFrame(() => {
            setIsVisible(true);
          });
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = cardsScrollerRef.current;
    if (!target) return;

    const step = () => {
      if (!dragStateRef.current.isDragging && !isHoveringRef.current) {
        target.scrollLeft += 0.3;
        const half = target.scrollWidth / 2;
        if (target.scrollLeft >= half) {
          target.scrollLeft -= half;
        }
      }
      autoScrollRafRef.current = window.requestAnimationFrame(step);
    };

    autoScrollRafRef.current = window.requestAnimationFrame(step);

    return () => {
      if (autoScrollRafRef.current !== null) {
        window.cancelAnimationFrame(autoScrollRafRef.current);
      }
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = cardsScrollerRef.current;
    if (!target) return;

    dragStateRef.current.isDragging = true;
    dragStateRef.current.startX = event.clientX;
    dragStateRef.current.startScrollLeft = target.scrollLeft;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = cardsScrollerRef.current;
    if (!target || !dragStateRef.current.isDragging) return;

    event.preventDefault();
    const deltaX = event.clientX - dragStateRef.current.startX;
    target.scrollLeft = dragStateRef.current.startScrollLeft - deltaX * 1.35;
  };

  const stopDragging = () => {
    dragStateRef.current.isDragging = false;
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[100vh] overflow-hidden bg-cover bg-center px-6 py-12"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,26,68,0.45)_0%,rgba(7,18,42,0.62)_55%,rgba(4,10,28,0.72)_100%)]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between gap-10 pt-[12vh] text-white">
        <motion.div
          className="flex items-center justify-between gap-6 px-[6vw]"
          initial={{ opacity: 0, y: 56 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-black tracking-wide sm:text-5xl">新闻资讯</h2>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-sky-900"
          >
            探索更多
          </button>
        </motion.div>

        <motion.div
          className="px-[6vw] pb-8"
          initial={{ opacity: 0, y: 64 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 64 }}
          transition={{ duration: 1.25, ease: "easeOut", delay: 0.12 }}
        >
          <div
            ref={cardsScrollerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={() => {
              stopDragging();
              isHoveringRef.current = false;
            }}
            onMouseEnter={() => {
              isHoveringRef.current = true;
            }}
            className="flex cursor-grab gap-0 overflow-x-auto py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden active:cursor-grabbing"
          >
            {MARQUEE_ITEMS.map((item, index) => (
              <article
                key={`${item.title}-${item.date}-${index}`}
                className="group mx-3 flex h-[256px] w-[214px] shrink-0 flex-col rounded-xl border border-white/30 bg-black/25 p-5 text-white transition-colors duration-300 hover:bg-[#3066d0] focus-within:bg-[#3066d0] backdrop-blur-sm"
              >
                <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85 transition-colors duration-300 group-hover:text-white group-focus-within:text-white">
                  {item.summary}
                </p>
                <div className="mt-auto flex items-end justify-between pt-4">
                  <p className="text-xs font-semibold tracking-wide text-sky-200 transition-colors duration-300 group-hover:text-white group-focus-within:text-white">
                    {item.date}
                  </p>
                  <ArrowDownRight className="size-4 text-white/90 transition-colors duration-300 group-hover:text-white group-focus-within:text-white" />
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Page() {
  return <Section05Three />;
}
