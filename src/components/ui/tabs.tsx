"use client";

import { createContext, useContext } from "react";

import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string | null;
  onValueChange?: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue>({
  value: null,
  onValueChange: undefined,
});

type TabsProps = {
  value: string | null;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
};

export function Tabs({ value, onValueChange, className, children }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn(className)}>{children}</div>
    </TabsContext.Provider>
  );
}

type TabsListProps = {
  className?: string;
  children: React.ReactNode;
};

export function TabsList({ className, children }: TabsListProps) {
  return (
    <div role="tablist" className={cn("flex h-full items-center gap-10", className)}>
      {children}
    </div>
  );
}

type TabsTriggerProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function TabsTrigger({
  value,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
}: TabsTriggerProps) {
  const { value: currentValue, onValueChange } = useContext(TabsContext);
  const isActive = currentValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onMouseEnter={() => {
        onValueChange?.(value);
        onMouseEnter?.();
      }}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group text-current relative inline-flex h-full items-center gap-1 text-sm font-medium transition-opacity hover:opacity-75",
        isActive && "opacity-90",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-[rgb(0,119,182)] transition-[width] duration-900 ease-out",
          isActive ? "w-full" : "w-0",
        )}
      />
    </button>
  );
}
