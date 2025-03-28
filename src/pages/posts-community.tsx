import { useQuery } from "@tanstack/react-query";
import { Heart, Loader2Icon, MessageCircleMore } from "lucide-react";
import { Link, useParams } from "react-router";
import { supabase } from "../../supabase-client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  user_name: string;
  avatar_url: string | null;
  like_count?: number;
  comment_count?: number;
  communities: {
    name: string;
  };
}

const fetchCommunityPosts = async (communityId: number): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("post")
    .select("*, communities(name)")
    .eq("community_id", communityId);

  if (error) throw new Error(error.message);

  return data as Post[];
};

const PostsCommunity = () => {
  const { id: communityId } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["communityPost"],
    queryFn: () => fetchCommunityPosts(Number(communityId)),
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-xl">
        {data && data.length > 0 && data[0].communities.name}
      </h1>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 ">
          {data?.map((post) => (
            <Card
              className="w-full transition-shadow duration-300 hover:shadow-base hover:shadow-green-300"
              key={post.id}
            >
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
      ) : (
        <div className="flex w-full justify-center items-center text-muted-foreground">
          Essa comunidade ainda não tem posts
        </div>
      )}
    </div>
  );
};

export default PostsCommunity;
