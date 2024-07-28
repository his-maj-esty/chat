import { Room, RoomUserGet } from "@/src/entities/models/room";

export interface IRoomsRepository {
  create(room: Room): Promise<Room>;
  getRoomsByUser(user: UserCheck): Promise<Room[]>;
  getUsersByRoom(input: RoomUserGet): Promise<UserSession[]>;
}
