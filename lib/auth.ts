/* eslint-disable no-undef */
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const AUTH_URL = process.env.AUTH_URL || "";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { email, password } = credentials;
          const response = await (
            await fetch(AUTH_URL, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            })
          ).json();

          if (!response.status) {
            return null;
          }

          return response.data;
        } catch (e: any) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      const data = {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
        },
      };
      return data;
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        const data = {
          ...token,
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          accessToken: u.accessToken,
        };
        return data;
      }
      return token;
    },
  },
  debug: process.env.ENVIRONMENT === "development",
  secret: process.env.NEXTAUTH_SECRET,
};
