import * as React from "react";
import * as Primitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const NavigationMenu = Primitive.Root;
export const NavigationMenuList = Primitive.List;
export const NavigationMenuItem = Primitive.Item;
export const NavigationMenuLink = Primitive.Link;
export const NavigationMenuTrigger = React.forwardRef<React.ElementRef<typeof Primitive.Trigger>, React.ComponentPropsWithoutRef<typeof Primitive.Trigger>>(({ className, children, ...props }, ref) => (
  <Primitive.Trigger ref={ref} className={cn("group inline-flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-accent/15 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent/15 data-[state=open]:text-foreground", className)} {...props}>
    {children}<ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none" />
  </Primitive.Trigger>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
export const NavigationMenuContent = React.forwardRef<React.ElementRef<typeof Primitive.Content>, React.ComponentPropsWithoutRef<typeof Primitive.Content>>(({ className, ...props }, ref) => (
  <Primitive.Content ref={ref} className={cn("absolute left-0 top-full mt-2 w-[540px] rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-lg", className)} {...props} />
));
NavigationMenuContent.displayName = "NavigationMenuContent";
