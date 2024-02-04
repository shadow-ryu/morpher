// "use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { buttonVariants } from "../ui/button";
interface link {
  title: string;
  label?: string;
  icon: LucideIcon;
  route: string;
  variant: "default" | "ghost";
}
interface NavProps {
  isCollapsed?: boolean;
  links: Array<link>;
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 "
    >
      <nav
        className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
        style={{ fontSize: "10px" }}
      >
        {links.map(
          (link, index) => (
            // isCollapsed ? (
            //   <Tooltip key={index} delayDuration={0}>
            //     <TooltipTrigger asChild>
            //       <Link
            //         href="#"
            //         className={cn(
            //           buttonVariants({ variant: link.variant, size: "icon" }),
            //           "h-9 w-9",
            //           // link.variant === "default" &&
            //           "text-muted-foreground hover:bg-gray-500 hover:text-white"
            //         )}
            //       >
            //         <link.icon className="h-4 w-4 " />
            //         <span className="sr-only">{link.title}</span>
            //       </Link>
            //     </TooltipTrigger>
            //     <TooltipContent
            //       side="right"
            //       className="flex   text-black items-center gap-4"
            //     >
            //       <p className=" ">{link.title}</p>
            //     </TooltipContent>
            //   </Tooltip>
            // ) : (
            <Link
              key={index}
              href={link.route}
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                // link.variant === "default" &&
                "text-muted-foreground hover:bg-gray-500 hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 text-base" />
              <p className=" text-white   hover:text-black">{link.title}</p>
            </Link>
          )
          // )
        )}
      </nav>
    </div>
  );
}
