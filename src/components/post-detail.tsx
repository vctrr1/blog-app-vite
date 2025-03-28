import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase-client";
import { format } from "date-fns";
import LikeDislikeButton from "./like-dislike-button";
import { Separator } from "./ui/separator";
import CommentSection from "./comment-section";
import { Loader2Icon } from "lucide-react";

interface PostDetailProps {
  id: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  user_name: string;
  avatar_url: string | null;
}

const fetchPostById = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Post;
};

const PostDetail = ({ id }: PostDetailProps) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });

  if (error) return <div>{error.message}</div>;
  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex w-full justify-between">
        <div className="h-5 w-full flex justify-start  items-center gap-2 text-muted-foreground text-sm mb-5">
          Publicado por:
          {data?.avatar_url && (
            <div className="h-5 w-5 rounded-full">
              <img src={data?.avatar_url} />
            </div>
          )}
          <p>{data?.user_name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {data?.created_at
              ? format(new Date(data.created_at), "dd/MM/yy kk:mm")
              : "Data não disponível"}
          </p>
        </div>
      </div>
      <p className="text-2xl text-center mb-3">{data?.title}</p>
      <img
        className=" w-[90%] rounded-2xl max-w-[500px] max-h-[500px] mb-4"
        src={data?.image_url}
      />
      <LikeDislikeButton postId={data!.id} />
      <Separator className="m-5" />
      <p className="">{data?.content}</p>
      <Separator className="m-6" />
      <div className="flex flex-col items-start w-full gap-4 mb-6">
        <h3 className="text-xl">Comentários</h3>
        <CommentSection postId={data!.id} />
      </div>
    </div>
  );
};

export default PostDetail;
