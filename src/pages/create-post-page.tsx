import CreatePostForm from "@/components/create-post-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreatePostPage = () => {
  return (
    <div className="w-full h-full flex justify-center">
      <Card className="w-full md:w-[80%] max-w-[700px]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Criar novo post</CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Compartilhe suas ideias com o mundo. Escreva com autenticidade, seja
            você mesmo e inspire outras pessoas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePostForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostPage;
