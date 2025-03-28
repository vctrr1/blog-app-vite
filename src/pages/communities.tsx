import CommunitiesList from "@/components/communities-list";

const CommunitiesPage = () => {
  return (
    <div className="flex flex-col gap-4 md:items-center">
      <h1 className="text-muted-foreground text-xl md:text-center">
        Todas as comunidades
      </h1>
      <div className="w-full md:w-[70%] mb-8">
        <CommunitiesList />
      </div>
    </div>
  );
};

export default CommunitiesPage;
