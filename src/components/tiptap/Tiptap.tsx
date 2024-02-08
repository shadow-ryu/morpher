/* eslint-disable import/no-anonymous-default-export */
"use client";

import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import React from "react";
import { Button } from "../ui/button";
import Toolbar from "./Toolbar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import CodeBlockComponent from "./extentions/Codeblock";
import CodeBlock from "@tiptap/extension-code-block";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";
const Tiptap = ({ isDetail = false, content, onChange }) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      CodeBlock,
      Image,
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent); // eslint-disable-line no-console
              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "rounded-xl border min-h-[10rem]   bg-slate-50 text-black overflow-scroll  w-[40rem] " +
          `${isDetail ? " max-h-30rem]" : " max-h-[18rem]"}`,
      },
    },
    onUpdate({ editor }) {
      console.log(editor.getJSON());
      onChange(editor.getJSON());
    },
  });

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <Toolbar editor={editor} />
      </CardHeader>
      <CardContent className=" overflow-y-scroll">
        <EditorContent editor={editor} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Tiptap;
