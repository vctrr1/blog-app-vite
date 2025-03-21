import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "@supabase/supabase-js";

interface UserAccountIconProps {
  user: User;
  signOut: () => void;
}

const UserAccountIcon = ({ user, signOut }: UserAccountIconProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <img
          src={user.user_metadata?.avatar_url}
          className="w-8 h-8 object-cover rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>
          {user?.user_metadata.user_name}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut />
          <button onClick={signOut}>Sair</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountIcon;
