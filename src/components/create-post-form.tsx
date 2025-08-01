import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import React, { ChangeEvent, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { useAuth } from "@/hooks/use-auth";
import { Community } from "./communities-list";
import { SelectCommunityButton } from "./select-community-button";

interface PostInput {
  title: string;
  content: string;
  avatar_url: string | null;
  user_name: string;
  community_id?: number | null;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicURLData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("post")
    .insert({ ...post, image_url: publicURLData.publicUrl });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const fetchCommunities = async () => {
  const { data, error } = await supabase.from("communities").select("*");

  if (error) throw new Error(error.message);

  return data;
};

const CreatePostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const formref = useRef<HTMLFormElement>(null);
  const { user } = useAuth();

  const { data: communities } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      formref.current?.reset();
      return createPost(data.post, data.imageFile);
    },
    onSuccess: () => {
      setSuccessMessage("Post criado com sucesso!");
      formref.current?.reset();
      setTitle("");
      setContent("");
      setSelectedFile(null);
      setSelectedCommunity(null);

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;
    mutate({
      post: {
        title,
        content,
        avatar_url: user?.user_metadata.avatar_url || null,
        user_name: user?.user_metadata.user_name,
        community_id: selectedCommunity || null,
      },
      imageFile: selectedFile,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSelectCommunity = (value: string) => {
    const numFormated = Number(value);
    setSelectedCommunity(numFormated);
  };

  return (
    <form onSubmit={handleSubmit} ref={formref}>
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
            className="h-full max-h-[300px] md:max-h-none overflow-auto scrollbar-hide"
            required
            rows={10}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Foto:</Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Comunidade:</Label>
          <SelectCommunityButton
            onSelectCategory={handleSelectCommunity}
            communities={communities ?? []}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full rounded-base"
        disabled={isPending}
      >
        Criar
        {isPending && <Loader2Icon className="animate-spin" />}
      </Button>
      {error && (
        <div className="flex justify-center p-4">
          <p>Erro ao criar post, usuario precisa estar logado</p>
        </div>
      )}
      {successMessage && (
        <div className="flex justify-center p-4 text-green-600 bg-green-100 border border-green-300 rounded-md mb-4">
          <p>{successMessage}</p>
        </div>
      )}
    </form>
  );
};

export default CreatePostForm;
