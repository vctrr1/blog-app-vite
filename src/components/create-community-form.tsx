import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supabase-client";
import { useNavigate } from "react-router";

interface CommunityInput {
  name: string;
  description: string;
}

const createCommunity = async (community: CommunityInput) => {
  const { error, data } = await supabase.from("communities").insert({
    name: community.name,
    description: community.description,
  });

  if (error) throw new Error(error.message);
  return data;
};

const CreateCommunityForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const formref = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      navigate("/communities");
      queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} ref={formref}>
      <div className="flex flex-col gap-4 mb-7">
        <div className="grid w-full items-center gap-1.5">
          <Label>Nome:</Label>
          <Input
            type="text"
            id="name"
            placeholder=""
            required
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Descrição:</Label>
          <Textarea
            id="description"
            className="h-full max-h-[300px] md:max-h-none overflow-auto scrollbar-hide"
            required
            rows={10}
            onChange={(event) => setDescription(event.target.value)}
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
          <p>Erro ao criar comunidade, usuario precisa estar logado</p>
        </div>
      )}
    </form>
  );
};

export default CreateCommunityForm;
