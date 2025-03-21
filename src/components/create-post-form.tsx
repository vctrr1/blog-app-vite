import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../supabase-client";

interface PostInput {
  title: string;
  content: string;
}

const createPost = async (post: PostInput) => {
  const { data, error } = await supabase.from("post").insert(post);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate } = useMutation({ mutationFn: createPost });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mb-7">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Titulo:</Label>
          <Input
            type="text"
            id="title"
            placeholder=""
            required
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Conteudo:</Label>
          <Textarea
            id="content"
            placeholder="..."
            required
            rows={10}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Foto:</Label>
          <Input id="picture" type="file" />
        </div>
      </div>
      <Button type="submit" className="w-full rounded-base">
        Criar Post
        <Send />
      </Button>
    </form>
  );
};

export default CreatePostForm;
