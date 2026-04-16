"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";

import { setUserLocale } from "@/actions/locale";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className }: LanguageToggleProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextLocale: Locale = locale === "en" ? "zh" : "en";
  const label = locale === "en" ? "EN" : "中";

  const onToggle = () => {
    startTransition(async () => {
      await setUserLocale(nextLocale);
      router.refresh();
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn(className)}
      onClick={onToggle}
      disabled={isPending}
      aria-label="Switch language"
      title="Switch language"
    >
      <Languages className="size-4" />
      <span className="sr-only">{`Switch language, current: ${label}`}</span>
    </Button>
  );
}
