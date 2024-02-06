import ProfileSubSection from "@/components/global/ProfileSubSection";
import SubscribeToggle from "@/components/global/SubscribeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
}
const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const loggedUser = await currentUser();
  console.log(slug);
  const guild = await db.guild.findFirst({
    where: { guildHandle: slug },
    include: {
      // posts: {
      //   include: {
      //     author: true,
      //     votes: true,
      //   },
      // },
    },
  });
  if (!guild) return notFound();
  let subscription = undefined;

  if (loggedUser) {
    subscription = await db.subscription.findFirst({
      where: {
        guild: {
          guildHandle: slug,
        },
        user: {
          id: loggedUser.id,
        },
      },
    });
  }

  const isSubscribed = !!subscription;

  const memberCount = await db.subscription.count({
    where: {
      guildId: guild.id,
    },
  });

  return (
    <div className="text-white flex justify-start items-center h-full ">
      <Card className=" border-none w-[20rem] md:w-[40rem] h-full rounded min-h-[10rem]">
        <CardHeader className=" md:flex-row  flex justify-between items-center">
          <aside className="sm:flex-col  flex md:flex-row gap-2  justify-start items-center ">
            <div className="">
              <Avatar className=" h-[4rem] w-[4rem] md:h-[6rem] md:w-[6rem]  items-center">
                {guild.guildLogo ? (
                  <div className="relative aspect-square min-h-[4rem]  h-full w-full">
                    <Image
                      fill
                      src={guild.guildLogo}
                      alt="guildLogo"
                      className=""
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <AvatarFallback>
                    <span className="sr-only">{guild?.guildHandle}</span>
                    {/* <User className="h-[8rem] w-[8rem]" /> */}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <p className=" text-lg  md:text-xl">guild name</p>
              <span className=" text-muted-foreground text-xs md:text-sm ">
                {" "}
                @guildHandle
              </span>
            </div>
          </aside>
          <aside className="flex flex-col ">
            {loggedUser?.id === guild?.ownerId ? (
              <Link
                href={`guilds/${guild.guildHandle}/update`}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" })
                )}
              >
                {" "}
                Edit
              </Link>
            ) : (
              <></>
            )}
            {loggedUser?.id !== guild?.ownerId ? (
              <SubscribeToggle
                userId={loggedUser?.id!}
                isSubscribed={isSubscribed}
                guildId={guild.id}
                guildHandle={guild.guildHandle!}
              />
            ) : null}
          </aside>
        </CardHeader>
        <CardDescription>current members ${memberCount}</CardDescription>
        <CardContent>
          <ProfileSubSection />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
