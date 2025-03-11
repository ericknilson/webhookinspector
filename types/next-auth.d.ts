import { DefaultSession } from "next-auth";

// Adicionamos o `id` e `accessToken` ao objeto de sessão do usuário
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface JWT {
    id: string;
    accessToken?: string;
  }
}
