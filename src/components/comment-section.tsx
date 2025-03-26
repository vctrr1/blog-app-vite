import { useAuth } from "@/hooks/use-auth";
import { Textarea } from "./ui/textarea";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../supabase-client";
import { Loader2Icon } from "lucide-react";

interface CommentSectionProp {
  postId: number;
}

interface NewComment {
  content: string;
  parent_comment_id: number | null;
}

const createComment = async (
  newComment: NewComment,
  postId: number,
  userId: string,
  author: string
) => {
  if (!userId || !author) throw new Error("Deve estar logado para comentar");

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: newComment,
    parent_comment_id: newComment.parent_comment_id,
    user_id: userId,
    author: author,
  });

  if (error) throw new Error(error.message);
};

const CommentSection = ({ postId }: CommentSectionProp) => {
  const { user } = useAuth();
  const [newCommentText, setNewCommentText] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (newComment: NewComment) =>
      createComment(
        newComment,
        postId,
        user!.id,
        user?.user_metadata?.user_name
      ),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCommentText) return;
    mutate({ content: newCommentText, parent_comment_id: null });
    formRef.current?.reset();
  };

  return (
    <div className="w-full">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <Textarea
          rows={4}
          value={newCommentText}
          placeholder="Escreva seu comentario!"
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <Button disabled={!newCommentText} type="submit">
          {isPending ? <Loader2Icon className="animate-spin" /> : "Comentar"}
        </Button>
        {isError && <p>Erro ao criar comentario.</p>}
      </form>
    </div>
  );
};

export default CommentSection;
