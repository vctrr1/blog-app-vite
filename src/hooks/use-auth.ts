import { useContext } from "react";
import { AuthContextType, AuthContext } from "../context/auth-context";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
};
