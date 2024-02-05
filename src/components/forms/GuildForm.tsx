"use client";
import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import defaultImg from "../../../public/assest/user-profile-preview.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { isBase64Image } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { GuildValidation } from "@/lib/validations/guild";
import { initGuild } from "@/lib/actions/guild.action";

const AccountProfile = ({ guild, ownerId }: any) => {
  const router = useRouter();
  const { startUpload } = useUploadThing("media");

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof GuildValidation>>({
    resolver: zodResolver(GuildValidation),
    defaultValues: {
      guildLogo: guild?.guildLogo ? guild.guildLogo : "",
      ownerId: guild?.ownerId || ownerId,
      info: guild?.info,
      guildHandle: guild?.guildHandle ? guild.guildHandle : "",
      tags: guild?.tags ? guild.tags : "",
    },
  });
  const {
    formState: { errors },
  } = form;
  useEffect(() => {
    console.log(form.getValues());
    if (Object.keys(errors).length) {
      console.log(errors);
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Something went wrong.",
          description:JSON.stringify(errors),
          variant: "destructive",
        });
      }
    }
  }, [errors]);
  const onSubmit = async (values: z.infer<typeof GuildValidation>) => {
    const blob = values.guildLogo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.guildLogo = imgRes[0].url;
      }
    }
    // @ts-ignore ( ignore  due create update not found error )
    const guildData = await initGuild(values);
    if (guildData) {
      form.reset()
      toast({
        title: "Guild created successfully",
        variant: "default",
      });
      router.push(`/guilds/${guildData.id}/setup`);
    } else {
      toast({
        title: "Something went wrong. Plz try again",
        variant: "destructive",
      });
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() ?? "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-[400px]  max-w-[500px] md:w-full p-2 rounded-xl">
      <CardHeader>
        <CardTitle>Guild Details</CardTitle>
        <CardDescription> Enter the following details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col justify-start gap-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="guildLogo"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="account-form_image-label">
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="avatar"
                        width={96}
                        height={96}
                        priority
                        className="rounded-full object-fit"
                      />
                    ) : (
                      <Image
                        src={defaultImg}
                        alt="icon"
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    )}
                  </FormLabel>
                  <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Add profile photo"
                      className="account-form_image-input"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Guild Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="account-form_input no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guildHandle"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Guild handle
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="account-form_input no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Guild Info
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      className="account-form_input h-[3rem] no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Guild Tags
                  </FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Textarea
                      rows={10}
                      className="account-form_input  h-[3rem]  no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant={"default"}>
              Create
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AccountProfile;
