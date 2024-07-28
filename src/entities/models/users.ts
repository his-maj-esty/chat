interface User {
  username: string;
  userId: string;
  password: string;
}

type UserUpdate = Pick<User, "password" | "username">;

type UserDelete = Pick<User, "username">;

type UserValidate = Pick<User, "username" | "password">;

type UserCheck = Pick<User, "username">;

type UserSession = Pick<User, "username">;
