import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase-client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router";
import { Heart, Loader2Icon, MessageCircleMore } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  avatar_url: string;
  user_name: string;
  like_count?: number;
  comment_count?: number;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase.rpc("get_posts_with_counts");

  if (error) {
    throw new Error(error.message);
  }

  return data as Post[];
};

const PostListComponent = () => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["post"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="w-full flex h-full justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 ">
      {data?.map((post) => (
        <Card className="w-full" key={post.id}>
          <Link
            to={`/post/${post.id}`}
            key={post.id}
            className="flex flex-col gap-2"
          >
            <CardHeader className="text-center gap-3">
              <CardTitle>{post.title}</CardTitle>
              <div className="flex-1">
                <img
                  alt={post.title}
                  src={post.image_url}
                  className="w-full h-[250px] rounded-md object-cover"
                />
              </div>
            </CardHeader>
            <div className="h-5 w-full flex justify-end pr-6 items-center gap-2 text-muted-foreground text-sm">
              Publicado por:
              {post.avatar_url && (
                <div className="h-5 w-5 rounded-full">
                  <img src={post.avatar_url} />
                </div>
              )}
              <p>{post.user_name}</p>
            </div>
          </Link>
          <div className="flex flex-col h-full">
            {/*essa div é pra afastar colocar os botões pra baixo caso o content seja pequeno, osa o flex-auto na div acima */}
            <CardContent className="flex-auto flex flex-col">
              <p className="line-clamp-3">{post.content}</p>
            </CardContent>
            <CardFooter className=" items-center mt-2">
              <div className="flex items-center gap-1">
                <Heart strokeWidth={1.25} size={19} fill="red" />
                {post.like_count ?? 0}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircleMore strokeWidth={1.25} size={19} />
                {post.comment_count ?? 0}
              </div>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PostListComponent;
