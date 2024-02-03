import ModeToggle from "@/components/global/ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../../public/pac-logo.png";
import { Button } from "@/components/ui/button";

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        <Image src={logo} width={40} height={40} alt=" logo" />
        <span className="text-xl font-bold"> Morphy.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Documentation</Link>
          <Link href={"#"}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={"/"}
          className="bg-primary text-white p-2 px-4 rounded-xl hover:bg-primary/80"
        >
          Home
        </Link>
        {/* <ModeToggle /> */}
      </aside>
    </div>
  );
};

export default Navigation;
