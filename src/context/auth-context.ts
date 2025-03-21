import { createContext } from "react";
import { User } from "@supabase/supabase-js"; // Confirme se esse é o pacote correto

export interface AuthContextType {
  user: User | null;
  signInWithGitHub: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signInWithGitHub: () => {},
  signOut: () => {},
});
