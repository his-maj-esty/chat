import { UsersRepository } from "@/src/infrastructure/repositories/users-repository";
import { randomUUID } from "crypto";

export async function loginUserUseCase({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ username: string } | null> {
  const usersRepository = new UsersRepository();
  const isValidUser = await usersRepository.validate({ username, password });
  if (!isValidUser) {
    throw new UserNotAuthorized();
    return null;
  }
  return { username };
}

export async function registerUserUseCase(user: {
  username: string;
  password: string;
}): Promise<{ username: string }> {
  const usersRepository = new UsersRepository();
  const userObj = {
    ...user,
    userId: randomUUID(),
  };
  const newUser = await usersRepository.create(userObj);
  return { username: newUser.username };
}

export async function isExistingUserUseCase(
  username: string
): Promise<boolean> {
  const usersRepository = new UsersRepository();
  console.log("username : ", username);
  const isExistingUser = await usersRepository.isExistingUser({ username });
  return isExistingUser;
}
