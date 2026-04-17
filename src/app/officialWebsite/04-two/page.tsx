"use client";

import { useEffect, useRef, useState } from "react";

import { motion } from "motion/react";

const HONOR_LIST = [
  {
    counter: "50强",
    subline: "2025 福布斯 中国 ESG",
    metaTop: "行业领先",
    metaBottom: "持续上榜",
  },
  {
    counter: "TOP 10",
    subline: "2024 年度科技品牌价值",
    metaTop: "综合评分",
    metaBottom: "98.2",
  },
  {
    counter: "NO.1",
    subline: "智能服务创新能力评估",
    metaTop: "评测机构",
    metaBottom: "IDC",
  },
  {
    counter: "A+",
    subline: "企业数字化平台口碑榜",
    metaTop: "客户推荐",
    metaBottom: "五星",
  },
];

function Section04Two() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[100vh] bg-cover bg-center px-6 py-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,28,66,0.78)_0%,rgba(8,39,88,0.62)_45%,rgba(14,78,158,0.42)_100%)]" />

      <motion.div
        className="relative z-10 flex w-full flex-row flex-nowrap items-start justify-between gap-6 pt-[16vh] text-white"
        initial={{ opacity: 0, y: 72 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 72 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="ml-[10vw] min-w-0 max-w-[42vw] flex-1 pb-2">
          <h2 className="text-[30px] font-black tracking-wide text-white">
            智能产品平台
          </h2>
          <p className="mt-5 w-2/3 text-base leading-relaxed text-white/90">
            聚合数据、模型与自动化能力，帮助企业快速构建可持续演进的智能业务系统。
            我们以稳定架构和高可扩展能力为核心，让创新更快落地。
          </p>
          <button
            type="button"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-sky-900"
          >
            探索更多
          </button>
        </div>

        <div className="mr-[10vw] min-w-0 max-w-[24vw] flex-1 bg-transparent p-0">
          <ul className="space-y-3">
            {HONOR_LIST.map((item) => (
              <li
                key={`${item.counter}-${item.subline}`}
                className="flex items-center justify-between gap-4 border-b border-white/70 bg-transparent px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-black leading-none text-white">
                      {item.counter}
                    </p>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs text-white/80">{item.metaTop}</span>
                      <span className="text-xs text-white/80">
                        {item.metaBottom}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-white/85">{item.subline}</p>
                </div>
                <div className="shrink-0">
                  <img
                    src="https://api.iconify.design/lucide:trophy.svg?color=white"
                    alt="honor icon"
                    className="h-8 w-8 object-contain opacity-90"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function Page() {
  return <Section04Two />;
}
