import PostDetail from "@/components/post-detail";
import { useParams } from "react-router";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  return <PostDetail id={Number(id)} />;
};

export default Post;
