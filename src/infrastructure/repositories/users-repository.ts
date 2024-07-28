import { IUserRepository } from "@/src/application/i-repositories/i-users";
import axios, { AxiosInstance } from "axios";

export class UsersRepository implements IUserRepository {
  private _client: AxiosInstance;
  constructor() {
    this._client = axios.create({
      baseURL: process.env.API_URL,
      timeout: 1000,
    });
  }

  async create(user: User): Promise<User> {
    const newUser = await this._client.post("/chat-users", { data: user });
    console.log("created user : ", newUser);
    return newUser.data.data.attributes as User;
  }

  async validate(user: UserValidate): Promise<boolean> {
    const newUser = await this._client.get(
      `/chat-users?filters[username][$eq]=${user.username}&populate=*`
    );
    return newUser.data.data[0].attributes.password === user.password;
  }

  async isExistingUser(user: UserCheck): Promise<boolean> {
    const url = `/chat-users?filters[username][$eq]=${user.username}`;
    const isExistingUser = await this._client.get(url);
    return isExistingUser.data.data.length > 0;
  }

  async update(user: User): Promise<User> {
    return user;
  }
  async delete(userId: UserDelete): Promise<void> {}
}
