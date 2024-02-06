"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "../db";
import { Guild } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
      ownerId: guildData.ownerId,
    },
  });

  return result;
};

interface SubscribeProps {
  guildId: string;
  guildHandle: string;
  userId: string;
}
export const subscribeToGuild = async ({
  userId,
  guildId,
  guildHandle,
}: SubscribeProps) => {
  const subscriptionExists = await db.subscription.findFirst({
    where: {
      guildId,
      userId: userId,
    },
  });

  if (subscriptionExists) {
    return { message: "already Subscribed", subscribe: true };
  }

  // create subreddit and associate it with the user
  const result = await db.subscription.create({
    data: {
      guildId,
      userId: userId,
    },
  });

  return { message: ` Subscribed to ${guildHandle} `, subscribe: true };
};

export const unSubscribeToGuild = async ({
  userId,
  guildId,
  guildHandle,
}: SubscribeProps) => {
  const subscriptionExists = await db.subscription.findFirst({
    where: {
      guildId,
      userId: userId,
    },
  });
  console.log(subscriptionExists);
  if (!subscriptionExists) {
    return { message: ` Not subscribed to ${guildHandle} ` };
  }

  // create subreddit and associate it with the user
  const result = await db.subscription.delete({
    where: {
      userId_guildId: {
        guildId,
        userId: userId,
      },
    },
  });

  return { message: ` Unsubscribed to ${guildHandle} `, subscribe: false };
};
