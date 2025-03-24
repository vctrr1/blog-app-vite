import PostListComponent from "@/components/post-list-component";

const Home = () => {
  return (
    <div className="flex flex-col gap-5 justify-center md:items-center">
      <h1 className="text-xl text-muted-foreground">Postes Recentes</h1>
      <div>
        <PostListComponent />
      </div>
    </div>
  );
};

export default Home;
