export interface Room {
  room: string;
  username: string;
}

export type RoomUserGet = Pick<Room, "room">;
