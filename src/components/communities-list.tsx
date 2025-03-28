import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase-client";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent } from "./ui/card";

export interface Community {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

const fetchCommunities = async () => {
  const { data, error } = await supabase.from("communities").select("*");

  if (error) throw new Error(error.message);

  return data;
};

const CommunitiesList = () => {
  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

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
    <div>
      {data?.map((community, index) => (
        <Link to={`/community/${community.id}`}>
          <Card
            key={index}
            className="mb-4 transition-shadow duration-300 hover:shadow-base hover:shadow-green-300"
          >
            <CardContent className="flex flex-col gap-2">
              <div className="text-center text-lg font-semibold">
                {community.name}
              </div>
              <div className="line-clamp-2 text-muted-foreground">
                {community.description}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CommunitiesList;
