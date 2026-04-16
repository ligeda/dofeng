import Link from "next/link";

import { MessageCircle, Send } from "lucide-react";

export function Footer() {
  const columns = [
    {
      title: "关于企业",
      items: ["企业概览", "品牌理念", "媒体中心", "联系团队"],
    },
    {
      title: "产品与服务",
      items: ["移动终端", "计算及数据中心", "AIoT", "创新业务", "数字化场景", "核心能力"],
    },
    {
      title: "可持续发展",
      items: ["可持续管理", "科学治理", "绿色低碳", "责任表率", "健康生态", "荣誉与动态", "报告与政策"],
    },
    {
      title: "投资者关系",
      items: ["公司治理", "股票信息", "财务报告", "信息披露", "招股文件", "投资者联系"],
    },
    {
      title: "加入企业",
      items: ["工作在企业", "查看职位"],
    },
    {
      title: "友情链接",
      items: ["xxxxx", "xxxx"],
    },
  ];

  const legal = ["隐私政策", "免责声明", "Cookies政策", "网站地图"];

  return (
    <footer className="w-full bg-[#111317] text-white">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-14 px-[6vw] py-16 lg:flex-row lg:justify-between">
        <div className="min-w-[220px] space-y-4">
          <p className="text-4xl font-bold tracking-wide">dofeng技术</p>
          <p className="text-3xl font-medium">17280384855</p>
          <p className="text-sm text-white/70">E-mail: xxxxxx.com</p>
          <div className="flex items-center gap-4 text-white/70">
            <Link href="#" className="transition-colors hover:text-white" aria-label="微信">
              <MessageCircle className="size-5" />
            </Link>
            <Link href="#" className="transition-colors hover:text-white" aria-label="微博">
              <Send className="size-5" />
            </Link>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-base font-semibold text-white">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-white/65 transition-colors hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 px-[6vw] py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span>Copyright © 2020-2023 Huaqin Co.ltd. All rights reserved</span>
            <span>沪ICP备2024032188号-2</span>
          </div>
          <ul className="flex flex-wrap items-center gap-5">
            {legal.map((item) => (
              <li key={item}>
                <Link href="#" className="transition-colors hover:text-white/80">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
