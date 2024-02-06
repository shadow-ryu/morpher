"use client";

import { useCustomToasts } from "@/hooks/use-custom-toast";
// import { useCustomToasts } from "@/hooks/use-custom-toast";
// import { toast } from "@/hooks/use-toast";
// import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
// import { useMutation } from "@tanstack/react-query";
// import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";
import { Button } from "../ui/button";
import {
  subscribeToGuild,
  unSubscribeToGuild,
} from "@/lib/actions/guild.action";
import { toast } from "../ui/use-toast";

interface SubscribeProps {
  isSubscribed: boolean;
  guildId: string;
  userId: string;
  guildHandle: string;
}
const SubscribeLeaveToggle = (props: SubscribeProps) => {
  const { isSubscribed, guildId, guildHandle, userId } = props;
  const { loginToast } = useCustomToasts();
  const router = useRouter();

  const handleSubscription = async ({ subscribe = true }) => {
    console.log("object");
    if (!userId) {
      loginToast();
      return;
    }
    const selectFunc = subscribe ? subscribeToGuild : unSubscribeToGuild;
    const result = await selectFunc({
      guildId,
      userId,
      guildHandle,
    });
    console.log(result);
    if (result) {
      toast({
        title: result?.message,

        variant: result?.subscribe ? "default" : "destructive",
      });
      router.refresh()
    }
  };
  return (
    <div className="my-3">
      <Button
        variant="outline"
        className="w-full rounded"
        //   isLoading={isUnSubLoading}
        //   disabled={isUnSubLoading}
        onClick={() => handleSubscription({ subscribe: !isSubscribed })}
      >
        {isSubscribed ? "Leave the community" : "  Join the community"}
      </Button>
    </div>
  );
};

export default SubscribeLeaveToggle;
