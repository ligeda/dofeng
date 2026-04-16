"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

/** 仅在主页面（挂载本组件的页面）且用户尚未接受全部 Cookie 时展示 */
const COOKIE_CONSENT_STORAGE_KEY = "mainline-home-cookie-consent-all";

export function Agreement() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "1") return;

    const id = window.setTimeout(() => {
      setOpen(true);
    }, 400);

    return () => window.clearTimeout(id);
  }, []);

  const handleAcceptAll = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "1");
    }
    setOpen(false);
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerContent className="px-4 pb-6 pt-2">
        <DrawerHeader className="gap-3 text-left sm:text-left">
          <DrawerTitle className="block text-left text-xl font-black text-black">
            我们重视您的隐私
          </DrawerTitle>
          <DrawerDescription className="text-neutral-800 text-left text-base leading-relaxed">
            我们使用 cookie 来个性化和增强您在我们网站上的浏览体验。点击「接受所有
            Cookie」，即表示您同意使用 Cookie。阅读我们的
            <Link
              href="#cookie-policy"
              className="text-neutral-900 underline decoration-neutral-400 underline-offset-2 hover:decoration-neutral-900"
            >
              Cookie 政策
            </Link>
            以了解更多信息。
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="mt-2 flex w-full flex-col gap-2 sm:flex-row sm:justify-stretch">
          <Button
            type="button"
            variant="outline"
            className="w-full border-neutral-300 bg-neutral-200 text-black hover:bg-neutral-300 hover:text-black focus-visible:border-neutral-300 focus-visible:shadow-lg focus-visible:ring-0 sm:flex-1"
            asChild
          >
            <Link href="#cookie-policy" className="text-black visited:text-black">
              Cookie 政策
            </Link>
          </Button>
          <Button
            type="button"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-0 focus-visible:shadow-lg sm:flex-1"
            onClick={handleAcceptAll}
          >
            接受所有的
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
