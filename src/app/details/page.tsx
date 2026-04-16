"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { RightFloatingActions } from "@/app/01-right/right-floating-actions";
import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";

const DETAILS_CONTENT: Record<string, string> = {
  个人电脑:
    "dongliang技术已构建全栈式个人电脑产品矩阵，涵盖笔记本电脑、一体机、台式机、打印机及电脑周边配件等多元产品组合，与全球头部品牌客户建立稳定合作关系。通过在智能手机行业的积累，将核心技术及创新设计等迁移至 PC 产品研发中，加速 PC 产品的迭代创新；同时，依托公司智能产品平台的竞争优势，个人电脑业务的研发效率、质量管理、生产制造、运营效率均处于行业领先水平。",
  数据中心:
    "面向云计算与大模型时代，dongliang技术构建覆盖服务器、存储、网络与基础软件的全栈数据中心能力。通过高密度算力设计、智能运维平台与绿色节能方案，帮助企业实现弹性扩容、稳定交付与长期可持续运营，持续提升关键业务系统的可靠性与效率。",
};

const getFallbackDescription = (title: string) =>
  `${title}是当前模块中的重点方向。我们围绕该方向持续进行能力建设与实践落地，通过标准化流程、稳定交付体系与长期迭代机制，为业务增长提供可靠支撑。`;

function DetailsMainSection() {
  return (
    <div
      className="relative flex h-[75vh] items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative text-center text-white">
        <h2 className="text-3xl font-bold tracking-wide sm:text-4xl">
          让智慧办公触手可及
        </h2>
      </div>
    </div>
  );
}

type DetailsTabsBarProps = {
  activeTab: string;
  tabLabels: string[];
  onTabChange: (tab: string) => void;
  className?: string;
};

function DetailsTabsBar({ activeTab, tabLabels, onTabChange, className }: DetailsTabsBarProps) {
  return (
    <div className={`border-b border-[#d7d7d7] bg-white ${className ?? ""}`}>
      <div className="mx-auto flex w-full items-center justify-between px-6">
        <div className="flex w-[70%] items-center gap-8 text-[18px]">
          {tabLabels.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => onTabChange(label)}
              className={`py-3 text-sm ${activeTab === label ? "border-b-2 border-[#2f56d6] font-bold text-[#2f56d6]" : "font-medium text-[#5b6470]"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-sm text-[#7b828c]">
          首页 <span className="px-1">&gt;</span> 产品与服务{" "}
          <span className="px-1">&gt;</span> 计算及数据中心{" "}
          <span className="px-1">&gt;</span> {activeTab}
        </p>
      </div>
    </div>
  );
}

function DetailsIntroSection({ onStickyChange }: { onStickyChange: (isSticky: boolean) => void }) {
  const searchParams = useSearchParams();
  const tabLabels = useMemo(() => {
    const tab1 = searchParams.get("tab1")?.trim();
    const tab2 = searchParams.get("tab2")?.trim();
    const list = [tab1, tab2].filter((item): item is string => Boolean(item));
    if (list.length >= 2 && list[0] !== list[1]) return [list[0], list[1]];
    return ["个人电脑", "数据中心"];
  }, [searchParams]);
  const [activeTab, setActiveTab] = useState<string>(tabLabels[0]);
  const tabAnchorRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const activeFromQuery = searchParams.get("active")?.trim();
    if (activeFromQuery && tabLabels.includes(activeFromQuery)) {
      setActiveTab(activeFromQuery);
      return;
    }
    setActiveTab(tabLabels[0]);
  }, [searchParams, tabLabels]);

  useEffect(() => {
    const anchor = tabAnchorRef.current;
    if (!anchor) return;

    const updateSticky = () => {
      const top = anchor.getBoundingClientRect().top;
      const shouldStick = top <= 20;

      setIsSticky(shouldStick);
      onStickyChange(shouldStick);
    };

    updateSticky();
    window.addEventListener("scroll", updateSticky, { passive: true });
    window.addEventListener("resize", updateSticky);

    return () => {
      window.removeEventListener("scroll", updateSticky);
      window.removeEventListener("resize", updateSticky);
      onStickyChange(false);
    };
  }, [onStickyChange]);

  useEffect(() => {
    if (!isSticky) return;
    const bar = tabAnchorRef.current;
    if (!bar) return;
  }, [isSticky]);

  return (
    <section className="w-full bg-[#f2f2f2] text-[#1f2329]">
      <div ref={tabAnchorRef}>
        <DetailsTabsBar
          activeTab={activeTab}
          tabLabels={tabLabels}
          onTabChange={setActiveTab}
          className={isSticky ? "invisible" : ""}
        />
      </div>
      {isSticky ? (
        <DetailsTabsBar
          activeTab={activeTab}
          tabLabels={tabLabels}
          onTabChange={setActiveTab}
          className="fixed inset-x-0 top-0 z-[80] shadow-sm"
        />
      ) : null}

      <div className="mx-auto flex w-full max-w-[1200px] justify-center px-6 py-16">
        <div className="max-w-[760px] text-left">
          <h3 className="mb-8 text-center text-5xl font-bold text-[#20252d]">
            {activeTab}
          </h3>
          <p className="text-lg leading-10 text-[#373d46]">
            {DETAILS_CONTENT[activeTab] ?? getFallbackDescription(activeTab)}
          </p>
        </div>
      </div>
    </section>
  );
}

function TechFeatureSection({
  title,
  description,
  imageUrl,
  reverse = false,
}: {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}) {
  return (
    <section className="min-h-screen w-full bg-white text-black">
      <div
        className={`mx-auto flex min-h-screen w-full max-w-[1400px] items-center gap-10 px-[8vw] py-16 ${reverse ? "flex-row-reverse" : "flex-row"}`}
      >
        <div className="w-1/2">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl shadow-black/10">
            <Image
              src={imageUrl}
              alt={title}
              width={1600}
              height={1000}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={75}
              className="h-[70vh] w-full object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 space-y-6">
          <h3 className="text-4xl font-black tracking-wide text-black lg:text-5xl">{title}</h3>
          <p className="max-w-xl text-lg leading-9 text-black/75">{description}</p>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const [replaceNavbar, setReplaceNavbar] = useState(false);

  return (
    <div className="bg-background">
      {replaceNavbar ? null : <Navbar />}
      <RightFloatingActions />
      <section id="details-main" className="relative w-full">
        <DetailsMainSection />
      </section>
      <DetailsIntroSection onStickyChange={setReplaceNavbar} />
      <TechFeatureSection
        title="智能研发中台"
        description="以代码智能分析、自动化测试与持续交付为核心，构建贯穿需求、开发与上线全周期的工程平台，让团队在复杂项目中依然保持高效协同。"
        imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
      />
      <TechFeatureSection
        title="实时数据指挥舱"
        description="整合业务流、设备流与告警流，提供毫秒级可视化洞察与预测分析能力，帮助管理者快速感知趋势并做出更精准的决策。"
        imageUrl="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80"
        reverse
      />
      <section id="footer" className="relative w-full">
        <Footer />
      </section>
    </div>
  );
}
