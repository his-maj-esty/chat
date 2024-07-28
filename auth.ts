import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  isExistingUserUseCase,
  loginUserUseCase,
  registerUserUseCase,
} from "./src/application/use-cases/users-usecases";

import { object, string } from "zod";

export const signInSchema = object({
  username: string({ required_error: "Username is required" }).min(
    1,
    "Username is required"
  ),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      //@ts-ignore
      authorize: async (credentials) => {
        const { username, password } = await signInSchema.parseAsync(
          credentials
        );

        let user = null;
        const isExistingUser = await isExistingUserUseCase(username);
        if (!isExistingUser) {
          user = await registerUserUseCase({
            username: username,
            password: password,
          });
        } else {
          user = await loginUserUseCase({
            username: username,
            password: password,
          });
        }
        return user;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      //@ts-ignore

      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
