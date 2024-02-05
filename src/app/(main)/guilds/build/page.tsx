import GuildForm from "@/components/forms/GuildForm";
import { Card } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async() => {
 const loggedUser  =await  currentUser()
 if(!loggedUser?.id){
  redirect('/auth/sign-in')
 }
  return (
    <div className="flex justify-center items-center">
      <GuildForm ownerId={loggedUser.id} />
    </div>
  );
};

export default page;
