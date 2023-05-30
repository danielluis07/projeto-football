import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        apikey: { label: "API Key", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.apikey) {
          throw new Error("Credenciais inválidas");
        }
        const user = await prisma.user.findUnique({
          where: {
            apikey: credentials?.apikey,
          },
        });

        if (!user || !user?.apikey) {
          throw new Error("erro");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
