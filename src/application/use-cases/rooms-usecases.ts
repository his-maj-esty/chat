import { Room, RoomUserGet } from "@/src/entities/models/room";
import { MessageRepository } from "@/src/infrastructure/repositories/messages-repository";
import { RoomsRepository } from "@/src/infrastructure/repositories/rooms-repository";

const roomsRepository = new RoomsRepository();

export async function createRoomUseCase(room: Room): Promise<Room> {
  return await roomsRepository.create(room);
}

export async function getRoomsByUserUseCase(user: UserCheck): Promise<Room[]> {
  return await roomsRepository.getRoomsByUser(user);
}

export async function getUsersByRoomUseCase(
  input: RoomUserGet
): Promise<UserSession[]> {
  return await roomsRepository.getUsersByRoom(input);
}
