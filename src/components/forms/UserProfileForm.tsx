"use client";
import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
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
// import { isBase64Image } from "@/lib/utils";

import { UserValidation } from "@/lib/validations/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { isBase64Image } from "@/lib/utils";
import { initUser } from "@/lib/actions/user.action";
import { toast } from "../ui/use-toast";
// import { updateUser } from "@/lib/actions/user.actions";
// import { register } from "module";

const AccountProfile = ({ user, btnTitle }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      avatarUrl: user?.image ? user.image : "",
      name: user?.name ? user.name : "",
      email: user.email,
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  });
  const {
    formState: { errors },
  } = form;
  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log(errors);
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Something went wrong.",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.avatarUrl;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.avatarUrl = imgRes[0].url;
      }
    }
    let data = { id: user.id, ...values };
    // @ts-ignore ( ignore  due create update not found error )
    const userData = await initUser(data);
    if (userData) {
      toast({
        title: "Account created succesfully",

        variant: "default",
      });
      router.push("/");
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
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[400px]  md:w-full p-2 rounded-xl">
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col justify-start gap-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="avatarUrl"
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
                        width={34}
                        height={34}
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
                    Name
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
              name="username"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Username
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
              name="bio"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      className="account-form_input no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant={"default"}>
              save
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default AccountProfile;
