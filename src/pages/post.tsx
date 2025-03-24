import PostDetail from "@/components/post-detail";
import { useParams } from "react-router";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <PostDetail id={Number(id)} />
    </div>
  );
};

export default Post;
