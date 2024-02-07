import LeftSidebar from "@/components/global/Sidebar";
import Tiptap from "@/components/tiptap/Tiptap";
import React from "react";

const page = () => {
  return (
    <div className=" flex  justify-start gap-3 items-center w-full h-full">
      <LeftSidebar />
      <div className=" bg-white text-black">
        <Tiptap />
      </div>
    </div>
  );
};

export default page;
