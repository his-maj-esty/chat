"use server";
import { auth } from "@/auth";

export async function authAction(): Promise<UserSession> {
  const session = await auth();
  if (!session) {
    throw new UserNotAuthorized();
  }

  return session.user as UserSession;
}
