import { Comment } from "./comment-section";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";

interface CommentItemProps {
  postId: number;
  comment: Comment & { children?: Comment[] };
}

const CommentItem = ({ postId, comment }: CommentItemProps) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="border p-2 rounded-lg mb-2">
      <div className="flex justify-between items-center">
        <span className="font-bold">
          {comment.author || "Usuário desconhecido"}
        </span>
        <span className="text-sm text-gray-500">
          {comment.created_at
            ? format(new Date(comment.created_at), "dd/MM/yy kk:mm")
            : "Data inválida"}
        </span>
        <Button onClick={() => setShowReply((prev) => !prev)}>
          {showReply ? "Cancelar" : "Comentar"}
        </Button>
      </div>
      <p className="mt-2">{comment.content}</p>
      {/* Renderizar replies */}
      {comment.children && comment.children.length > 0 && (
        <div className="ml-4 border-l pl-2">
          {comment.children.map((child) => (
            <CommentItem key={child.id} postId={postId} comment={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
