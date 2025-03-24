import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase-client";

interface PostDetailProps {
  id: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
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
  if (isLoading) return <div>Carregando...</div>;

  return <div>{data?.title}</div>;
};

export default PostDetail;
