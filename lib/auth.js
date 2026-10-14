import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phoneNumber: {
          label: "شماره تماس",
          type: "number",
          placeholder: "شماره تماس",
        },
        code: {
          label: "کد تایید",
          type: "number",
          placeholder: "کد تایید",
        },
        token: {
          label: "توکن",
          type: "number",
          placeholder: "توکن",
        },
      },

      async authorize(credentials, req) {
        const { phoneNumber, code, token } = credentials;

        const res = await fetch(`${process.env.BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
            code,
            token,
          }),
        });

        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

export function auth(...args) {
  return getServerSession(...args, options);
}
