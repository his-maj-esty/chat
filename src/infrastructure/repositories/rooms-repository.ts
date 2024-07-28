import { IRoomsRepository } from "@/src/application/i-repositories/i-rooms";
import { Room, RoomUserGet } from "@/src/entities/models/room";
import axios, { AxiosInstance } from "axios";

export class RoomsRepository implements IRoomsRepository {
  private _client: AxiosInstance;
  constructor() {
    this._client = axios.create({
      baseURL: process.env.API_URL,
      timeout: 1000,
    });
  }

  async create(room: Room): Promise<Room> {
    const newRoom = await this._client.post("/rooms", {
      data: room,
    });
    return newRoom.data.data.attributes as Room;
  }

  async getRoomsByUser(user: UserCheck): Promise<Room[]> {
    const rooms = await this._client.get(
      `/rooms?filters[username][$eq]=${user.username}&populate=*`
    );
    const formattedMessages: Room[] = rooms.data.data.map(
      (room: any) => room.attributes
    );
    return formattedMessages;
  }

  async getUsersByRoom(input: RoomUserGet): Promise<UserSession[]> {
    const users = await this._client.get(
      `/rooms?filters[room][$eq]=${input.room}&populate=*`
    );
    const formattedUsers: UserSession[] = users.data.data.map((user: any) => ({
      username: user.attributes.username,
    }));
    return formattedUsers;
  }
}
