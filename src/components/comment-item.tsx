import { Comment } from "./comment-section";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Textarea } from "./ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Loader2Icon } from "lucide-react";

interface CommentItemProps {
  postId: number;
  comment: Comment & { children?: Comment[] };
}

const createReply = async (
  replyContent: string,
  postId: number,
  parenteCommentId: number,
  author: string,
  userId?: string
) => {
  if (!userId || !author) throw new Error("Deve estar logado para comentar");

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: replyContent,
    parent_comment_id: parenteCommentId,
    user_id: userId,
    author: author,
  });

  if (error) throw new Error(error.message);
};

const CommentItem = ({ postId, comment }: CommentItemProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement>(null);

  const [showReply, setShowReply] = useState<boolean>(false);
  const [isColapsed, setisColapsed] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (replyContent: string) =>
      createReply(
        replyContent,
        postId,
        comment.id,
        user?.user_metadata?.user_name,
        user!.id
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      formRef.current?.reset();
      setShowReply(false);
      setReplyText("");
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!replyText) return;
    mutate(replyText);
  };

  return (
    <div className="">
      <div className="">
        <div className="flex gap-3 items-center">
          <span className="font-bold">
            {comment.author || "Usuário desconhecido"}
          </span>
          <span className="text-sm text-muted-foreground">
            {comment.created_at
              ? format(new Date(comment.created_at), "dd/MM/yy kk:mm")
              : "Data inválida"}
          </span>
        </div>
        <p className="">{comment.content}</p>
        <Button
          variant="commentButton"
          className="p-0 text-green-500"
          onClick={() => setShowReply((prev) => !prev)}
        >
          {showReply ? "Cancelar" : "Responder"}
        </Button>
      </div>
      {/* Renderizar replies */}
      {showReply && user && (
        <form
          ref={formRef}
          onSubmit={handleReplySubmit}
          className="flex flex-col gap-3 md:w-[500px]"
        >
          <Textarea
            rows={2}
            value={replyText}
            placeholder="Escreva sua resposta!"
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Button disabled={!replyText} type="submit">
            {isPending ? <Loader2Icon className="animate-spin" /> : "Responder"}
          </Button>
          {isError && <p>Erro ao criar comentario.</p>}
        </form>
      )}
      {comment.children && comment.children.length > 0 && (
        <div>
          <Button
            variant="commentButton"
            className="p-0 text-green-500"
            onClick={() => setisColapsed((prev) => !prev)}
          >
            {isColapsed ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                Esconder respostas
              </div>
            ) : (
              <div className="flex items-center gap-2  text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Mostrar respostas
              </div>
            )}
          </Button>
          {isColapsed && (
            <div className="ml-6">
              {comment.children.map((child, key) => (
                <CommentItem key={key} comment={child} postId={postId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
