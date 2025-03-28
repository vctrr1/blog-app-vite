import React, { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js"; // Confirme se esse é o pacote correto
import { supabase } from "../supabase-client";
import { AuthContext } from "../context/auth-context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //getSession retorna uma promise, para acessar o usuario da sessao paga o data: {session} do retorno
    //da promise .then()
    supabase.auth
      .getSession()
      .then(({ data: { session } }: { data: { session: Session | null } }) => {
        setUser(session?.user ?? null);
      });
    //se deslogar o onAuthStateChange vai rodar e vai setar o  user como null, se logar o user vai ser setado
    // cria um listener para o evento de mudança de autenticação
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // retorna uma função que é chamada quando o componente é desmontado, usamos para desinscrever o listener
    //criado acima para evitar memory leak
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGitHub = () => {
    supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGitHub, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
