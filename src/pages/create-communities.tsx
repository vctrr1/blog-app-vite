import CreateCommunityForm from "@/components/create-community-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateCommunities = () => {
  return (
    <div className="w-full h-full flex justify-center">
      <Card className="w-full md:w-[80%] max-w-[700px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Criar nova comunidade</CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Crie um lugar para compartilhar suas ideias.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateCommunityForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCommunities;
