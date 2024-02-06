"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CardContent, Card } from "../ui/card";

const ProfileSubSection = () => {
  return (
    <div>
      {" "}
      <Tabs defaultValue="account" className="w-full ">
        <TabsList className="flex justify-evenly gap-1 items-center w-full ">
          <TabsTrigger value="account">Posts</TabsTrigger>
          <TabsTrigger value="password">Members</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <CardContent className="space-y-2"></CardContent>
        </TabsContent>
        <TabsContent value="password">
          <CardContent className="space-y-2"></CardContent>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSubSection;
