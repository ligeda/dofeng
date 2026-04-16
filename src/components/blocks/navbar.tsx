"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Menu, X } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type PipChildItem = {
  pipTitle: string;
  pipUrl: string;
};

type ChildItem = {
  title: string;
  url: string;
  pipChildren: PipChildItem[];
};

type NavItem = {
  label: string;
  value: string;
  children: ChildItem[];
};

const ITEMS = [
  {
    label: "关于我",
    value: "about",
    children: [
      {
        title: "个人简介",
        url: "/about/profile",
        pipChildren: [
          { pipTitle: "成长经历", pipUrl: "/about/profile/story" },
          { pipTitle: "工作履历", pipUrl: "/about/profile/career" },
        ],
      },
      {
        title: "技能能力",
        url: "/about/skills",
        pipChildren: [
          { pipTitle: "前端开发", pipUrl: "/about/skills/frontend" },
          { pipTitle: "产品设计", pipUrl: "/about/skills/design" },
        ],
      },
      {
        title: "联系我",
        url: "/about/contact",
        pipChildren: [
          { pipTitle: "邮箱联系", pipUrl: "/about/contact/email" },
          { pipTitle: "社交媒体", pipUrl: "/about/contact/social" },
        ],
      },
    ],
  },
  {
    label: "产品与服务",
    value: "product",
    children: [
      {
        title: "核心产品",
        url: "/product/core",
        pipChildren: [
          { pipTitle: "产品A", pipUrl: "/product/core/a" },
          { pipTitle: "产品B", pipUrl: "/product/core/b" },
        ],
      },
      {
        title: "解决方案",
        url: "/product/solution",
        pipChildren: [
          { pipTitle: "行业方案", pipUrl: "/product/solution/industry" },
          { pipTitle: "企业方案", pipUrl: "/product/solution/enterprise" },
        ],
      },
      {
        title: "交付服务",
        url: "/product/service",
        pipChildren: [
          { pipTitle: "实施支持", pipUrl: "/product/service/implementation" },
          { pipTitle: "运维服务", pipUrl: "/product/service/ops" },
        ],
      },
    ],
  },
  {
    label: "可持续发展",
    value: "sustainable",
    children: [
      {
        title: "环境责任",
        url: "/sustainable/environment",
        pipChildren: [
          { pipTitle: "碳排管理", pipUrl: "/sustainable/environment/carbon" },
          { pipTitle: "绿色办公", pipUrl: "/sustainable/environment/green" },
        ],
      },
      {
        title: "社会责任",
        url: "/sustainable/social",
        pipChildren: [
          { pipTitle: "社区计划", pipUrl: "/sustainable/social/community" },
          { pipTitle: "公益活动", pipUrl: "/sustainable/social/public" },
        ],
      },
      {
        title: "治理体系",
        url: "/sustainable/governance",
        pipChildren: [
          { pipTitle: "合规制度", pipUrl: "/sustainable/governance/compliance" },
          { pipTitle: "风险管理", pipUrl: "/sustainable/governance/risk" },
        ],
      },
    ],
  },
  {
    label: "价格清单",
    value: "pricing",
    children: [
      {
        title: "基础版",
        url: "/pricing/basic",
        pipChildren: [
          { pipTitle: "功能列表", pipUrl: "/pricing/basic/features" },
          { pipTitle: "适用场景", pipUrl: "/pricing/basic/scenes" },
        ],
      },
      {
        title: "专业版",
        url: "/pricing/pro",
        pipChildren: [
          { pipTitle: "功能增强", pipUrl: "/pricing/pro/features" },
          { pipTitle: "服务等级", pipUrl: "/pricing/pro/sla" },
        ],
      },
      {
        title: "企业版",
        url: "/pricing/enterprise",
        pipChildren: [
          { pipTitle: "定制报价", pipUrl: "/pricing/enterprise/quote" },
          { pipTitle: "专属支持", pipUrl: "/pricing/enterprise/support" },
        ],
      },
    ],
  },
] satisfies NavItem[];

const createDetailsHref = (current: string, sibling: string) => {
  const query = new URLSearchParams({
    tab1: current,
    tab2: sibling,
    active: current,
  }).toString();

  return `/details?${query}`;
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [displayTab, setDisplayTab] = useState<string | null>(null);
  const isExpanded = Boolean(activeTab);
  const [showBottomBorder, setShowBottomBorder] = useState(false);
  const collapseTimerRef = useRef<number | null>(null);
  const clearDisplayTimerRef = useRef<number | null>(null);
  const tabsAreaRef = useRef<HTMLDivElement | null>(null);
  const contentAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (collapseTimerRef.current) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }

    if (isExpanded) {
      setShowBottomBorder(true);
      return;
    }

    collapseTimerRef.current = window.setTimeout(() => {
      setShowBottomBorder(false);
    }, 600);

    return () => {
      if (collapseTimerRef.current) {
        window.clearTimeout(collapseTimerRef.current);
        collapseTimerRef.current = null;
      }
    };
  }, [isExpanded]);

  useEffect(() => {
    if (clearDisplayTimerRef.current) {
      window.clearTimeout(clearDisplayTimerRef.current);
      clearDisplayTimerRef.current = null;
    }

    if (activeTab) {
      setDisplayTab(activeTab);
      return;
    }

    // Keep previous content during collapse animation to avoid sudden text disappearance.
    clearDisplayTimerRef.current = window.setTimeout(() => {
      setDisplayTab(null);
    }, 600);

    return () => {
      if (clearDisplayTimerRef.current) {
        window.clearTimeout(clearDisplayTimerRef.current);
        clearDisplayTimerRef.current = null;
      }
    };
  }, [activeTab]);

  const isInsideElement = (target: EventTarget | null, el: HTMLElement | null) => {
    return target instanceof Node && Boolean(el?.contains(target));
  };
  const activeItem = ITEMS.find((item) => item.value === displayTab);

  return (
    <header
      className={cn(
        "group fixed top-0 right-0 left-0 z-50 w-screen text-white transition-colors duration-300",
        "hover:bg-white hover:text-black",
        isExpanded ? "bg-white text-black" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "relative flex h-16 w-full items-center justify-between px-6",
          showBottomBorder &&
            "after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-[#aaa] after:content-['']",
        )}
        onMouseMove={(event) => {
          const target = event.target as HTMLElement | null;
          const isOnTab = Boolean(target?.closest('[role="tab"]'));
          const rect = event.currentTarget.getBoundingClientRect();
          const isNearBottomBorder = rect.bottom - event.clientY <= 2;

          if (isNearBottomBorder) {
            return;
          }

          if (!isOnTab && activeTab !== null) {
            setActiveTab(null);
          }
        }}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/logo.svg"
            alt="logo"
            width={94}
            height={18}
            className={cn(
              "brightness-0 transition duration-300",
              isExpanded ? "invert-0" : "invert group-hover:invert-0",
            )}
          />
        </Link>

        <div
          ref={tabsAreaRef}
          className="flex h-full min-w-0 flex-1 items-center justify-center overflow-x-auto"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full min-w-max items-center justify-center"
          >
            <TabsList className="h-full">
              {ITEMS.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="group"
                >
                  <span>{item.label}</span>
                  <span className="text-current text-[10px]">
                    ▼
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2.5">
          <LanguageToggle className="border-current bg-transparent text-current hover:bg-transparent hover:text-current" />
          <ThemeToggle className="border-current bg-transparent text-current hover:bg-transparent hover:text-current" />

          <button
            className="relative flex size-8 items-center justify-center text-current lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        ref={contentAreaRef}
        onMouseLeave={(event) => {
          if (!isInsideElement(event.relatedTarget, tabsAreaRef.current)) {
            setActiveTab(null);
          }
        }}
        className={cn(
          "grid border-0 bg-white text-black transition-[grid-template-rows,opacity] duration-600",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex justify-center px-6 py-6">
            <div className="inline-flex items-stretch justify-center">
              <span className="my-1 w-px self-stretch bg-[#aaa]" />
              {(activeItem?.children ?? []).map((child, index, arr) => (
                <div key={child.title} className="inline-flex items-stretch">
                  <div className="px-12 pt-2 pb-4">
                    <div className="inline-block whitespace-nowrap space-y-4">
                      <Link
                        href={createDetailsHref(
                          child.pipChildren[0]?.pipTitle ?? child.title,
                          child.pipChildren[1]?.pipTitle ??
                            child.pipChildren[0]?.pipTitle ??
                            child.title,
                        )}
                        className="text-sm font-semibold transition-opacity hover:opacity-75"
                      >
                        {child.title}
                      </Link>
                      <ul className="space-y-1 pt-2">
                        {child.pipChildren.map((pip) => {
                          const sibling =
                            child.pipChildren.find((item) => item.pipTitle !== pip.pipTitle)
                              ?.pipTitle ?? pip.pipTitle;

                          return (
                            <li key={pip.pipTitle}>
                              <Link
                                href={createDetailsHref(pip.pipTitle, sibling)}
                                className="text-muted-foreground text-sm transition-colors hover:text-[rgb(0,119,182)]"
                              >
                                {pip.pipTitle}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {index < arr.length - 1 && (
                    <span className="my-1 w-px self-stretch bg-[#aaa]" />
                  )}
                </div>
              ))}
              <span className="my-1 w-px self-stretch bg-[#aaa]" />
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "bg-white text-black lg:hidden",
          isMenuOpen
            ? "max-h-80 opacity-100"
            : "max-h-0 overflow-hidden opacity-0",
        )}
      >
        <nav className="flex flex-col px-6 py-4">
          {ITEMS.map((item) => (
            <button
              type="button"
              key={item.value}
              className="group flex items-center gap-1 py-2 text-left text-base font-medium"
            >
              <span>{item.label}</span>
              <span className="text-[10px] transition-transform duration-200 group-hover:-translate-y-0.5">
                ▼
              </span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
