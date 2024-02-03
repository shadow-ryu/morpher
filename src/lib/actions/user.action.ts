"use server";

import { clerkClient, currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import { db } from "../db";
import { User } from "@prisma/client";

export const getAuthUserDetails = async () => {
  const user = await currentUser();
  if (!user) {
    return;
  }

  const userData = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return userData;
};
// const response = await db.user.create({
export const initUser = async (newUser: User) => {
  const user = await currentUser();
  if (!user) return;
  const userData = await db.user.upsert({
    where: {
      id: newUser.id,
    },
    update: newUser,
    create: {
      id: newUser.id,
      avatarUrl: newUser.avatarUrl,
      email: newUser.email,
      bio: newUser.bio,
      name: newUser.name,
      username: newUser.username,
    },
  });

  return userData;
};
