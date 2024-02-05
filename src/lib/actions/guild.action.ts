"use server";

import { clerkClient, currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import { db } from "../db";
import { Guild } from "@prisma/client";


// const response = await db.user.create({
export const initGuild = async (guildData: Partial<Guild>) => {
  const user = await currentUser();
  if (!user) return;
  console.log(guildData);
  const result = await db.guild.create({
    data: {
      guildLogo: guildData.guildLogo!,
      guildHandle: guildData.guildHandle,
      info: guildData.info!,
      name: guildData.name!,
      tags: guildData.tags,
      ownerId: guildData.ownerId
    },
  });

  return result;
};
