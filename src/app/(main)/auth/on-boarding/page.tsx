import UserProfileForm from "@/components/forms/UserProfileForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthUserDetails } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const loggedUser = await currentUser();
  if (!loggedUser) {
    redirect("/auth/sign-in");
  }
  const existingUser = await getAuthUserDetails();
  if (existingUser) {
    redirect("/");
  }

  const userData = {
    id: loggedUser.id,

    username: loggedUser.username || "",
    email: loggedUser?.emailAddresses[0]?.emailAddress,
    name: loggedUser?.firstName || "",
    bio: "",
    image: loggedUser.imageUrl,
  };

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription> Enter the following details</CardDescription>
      </CardHeader>
      <CardContent>
        <UserProfileForm  user={userData}/>
      </CardContent>
    </Card>
  );
};

export default page;
