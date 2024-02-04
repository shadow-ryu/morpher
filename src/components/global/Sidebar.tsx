"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import {
  ActivitySquare,
  AlertCircle,
  Archive,
  ArchiveX,
  Bookmark,
  File,
  ImagePlus,
  Inbox,
  LucideIcon,
  MessagesSquare,
  PenBox,
  Search,
  Send,
  ShoppingCart,
  Swords,
  Trash2,
  Users2,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Nav } from "./Nav";

interface link {
  title: string;
  label?: string;
  icon: LucideIcon;
  route: string;
  variant: "default" | "ghost";
}
const LeftSidebar = ({ links }: { links?: Array<link> }) => {
  const router = useRouter();
  const pathname = usePathname();
  const defaultLinks: Array<link> = [
    {
      title: "Home",
      icon: Inbox,
      route: "/",
      variant: "default",
    },
    {
      title: "Drafts",
      route: "/drafts",
      icon: File,
      variant: "ghost",
    },
    {
      title: "Activity",
      route: "/activity",
      icon: ActivitySquare,
      variant: "ghost",
    },

    {
      title: "Bookmark",
      route: "/bookmark",
      icon: Bookmark,
      variant: "ghost",
    },
    {
      title: "Create Post",
      route: "",
      icon: ImagePlus,
      variant: "ghost",
    },

    {
      title: "Guilds",
      route: "/guilds",
      icon: Swords,
      variant: "ghost",
    },
    {
      title: "Updates",
      route: "/app_updates",
      icon: AlertCircle,
      variant: "ghost",
    },
  ];
  const { userId } = useAuth();
  return (
    <div
      className={
        "col-span-1 h-screen  w-fit min-w-[18rem] max-w-[25rem] hidden lg:block border-x border-white"
      }
    >
      <Nav
        links={links || defaultLinks}
        // isCollapsed={isCollapsed}
      />

      {/* <nav className="grid gap-1 my-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
  <SignedIn>

    <div className="flex justify-start w-full  text-white gap-3 items-center">
      <UserButton />
      {!isCollapsed ? <div className="">user</div> : ""}
    </div>
  </SignedIn>
  <SignedOut>
    <SignInButton />
  </SignedOut>
</nav> */}
    </div>
  );
};

export default LeftSidebar;
