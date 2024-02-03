import Navigation from "@/components/site/navigation";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const siteLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <main className="h-full">
      <Navigation user={user} />
      {children}
    </main>
  );
};

export default siteLayout;
