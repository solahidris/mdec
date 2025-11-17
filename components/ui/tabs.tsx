"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

const TabsListContext = React.createContext<{
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  tabsCount: number;
}>({
  activeIndex: 0,
  setActiveIndex: () => {},
  tabsCount: 0,
});

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const childArray = React.Children.toArray(children);
  const tabsCount = childArray.length;

  return (
    <TabsListContext.Provider value={{ activeIndex, setActiveIndex, tabsCount }}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] relative",
          className
        )}
        {...props}
      >
        {/* Sliding background indicator */}
        <div
          className="absolute inset-y-1.5 bg-white shadow-md rounded-xl transition-all duration-300 ease-in-out"
          style={{
            width: `calc(${100 / tabsCount}% - 0.375rem)`,
            left: `calc(${(activeIndex * 100) / tabsCount}% + 0.1875rem)`,
          }}
        />
        {children}
      </TabsPrimitive.List>
    </TabsListContext.Provider>
  )
}

function TabsTrigger({
  className,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const context = React.useContext(TabsListContext);
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const updateIndex = () => {
      const parent = ref.current?.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(
          (child) => child.getAttribute('data-slot') === 'tabs-trigger'
        ) as HTMLElement[];
        const index = siblings.indexOf(ref.current!);
        
        // Check if this tab is active
        const isActive = ref.current?.getAttribute('data-state') === 'active';
        if (isActive && index !== -1) {
          context.setActiveIndex(index);
        }
      }
    };

    // Initial update
    updateIndex();

    // Watch for attribute changes (when tab becomes active/inactive)
    const observer = new MutationObserver(updateIndex);
    observer.observe(ref.current, {
      attributes: true,
      attributeFilter: ['data-state'],
    });

    return () => observer.disconnect();
  }, [context]);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 relative z-10 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
