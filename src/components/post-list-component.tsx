import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase-client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "react-router";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .order("created_at", { ascending: false });

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
    return <div>Carregando...</div>;
  }
  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 ">
      {data?.map((post) => (
        <Card className="w-full" key={post.id}>
          <Link to="/create" key={post.id} className="block">
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
          </Link>
          <div className="flex flex-col h-full">
            {/*essa div é pra afastar colocar os botões pra baixo caso o content seja pequeno, osa o flex-auto na div acima */}
            <CardContent className="flex-auto">
              <p className="line-clamp-3">{post.content}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost">
                <ThumbsUp />
              </Button>
              <Button variant="ghost">
                <ThumbsDown />
              </Button>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PostListComponent;
