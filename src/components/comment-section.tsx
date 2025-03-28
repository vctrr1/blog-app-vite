import { useAuth } from "@/hooks/use-auth";
import { Textarea } from "./ui/textarea";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Loader2Icon } from "lucide-react";
import CommentItem from "./comment-item";

interface CommentSectionProp {
  postId: number;
}

interface NewComment {
  content: string;
  parent_comment_id: number | null;
}

export interface Comment {
  id: number;
  post_id: number;
  parent_comment_id: number | null;
  content: string;
  user_id: string;
  created_at: string;
  author: string;
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
    content: newComment.content,
    parent_comment_id: newComment.parent_comment_id,
    user_id: userId,
    author: author,
  });

  if (error) throw new Error(error.message);
};

const fetchComments = async (postId: number): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Comment[];
};

const CommentSection = ({ postId }: CommentSectionProp) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newCommentText, setNewCommentText] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    refetchInterval: 5000,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (newComment: NewComment) =>
      createComment(
        newComment,
        postId,
        user!.id,
        user?.user_metadata?.user_name
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCommentText) return;
    mutate({ content: newCommentText, parent_comment_id: null });
    formRef.current?.reset();
    setNewCommentText("");
  };

  //map os comments - organize replies - return tree
  const buildCommentTree = (
    flatComments: Comment[]
  ): (Comment & { children?: Comment[] })[] => {
    if (!flatComments || flatComments.length === 0) return [];

    const map = new Map<number, Comment & { children?: Comment[] }>();
    const roots: (Comment & { children?: Comment[] })[] = [];

    // Criar um mapa de todos os comentários
    flatComments.forEach((comment) => {
      map.set(comment.id, { ...comment, children: [] });
    });

    // Atribuir comentários como filhos de seus respectivos pais
    flatComments.forEach((comment) => {
      if (comment.parent_comment_id) {
        const parent = map.get(comment.parent_comment_id);
        if (parent) {
          parent.children!.push(map.get(comment.id)!);
        }
      } else {
        roots.push(map.get(comment.id)!);
      }
    });

    return roots;
  };

  if (isLoading) {
    return <div> Loading Comments...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  const commentTree = comments ? buildCommentTree(comments) : [];

  return (
    <div className="w-full">
      {/**Formulario de comentario */}
      <div>
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
      {/**Comentarios */}
      <div className="mt-3 space-y-3">
        {/**faz um loop no array de comentarios */}
        {commentTree.map((comment, key) => (
          <CommentItem key={key} postId={postId} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
