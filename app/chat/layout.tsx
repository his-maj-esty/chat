import { auth, signIn } from "@/auth";

export default async function layout({ children }: any) {
  const session = await auth();
  if (!session) {
    return signIn();
  }
  return <div>{children}</div>;
}
