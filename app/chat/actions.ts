"use server";

import {
  createMessageUseCase,
  getSortedMessagesByRoomUseCase,
} from "@/src/application/use-cases/message-usecases";
import { authAction } from "../_shared-actions/auth";
import {
  createRoomUseCase,
  getRoomsByUserUseCase,
  getUsersByRoomUseCase,
} from "@/src/application/use-cases/rooms-usecases";
import { Room } from "@/src/entities/models/room";

export async function sendMessage(
  message: Message
): Promise<{ message: Message; user: UserSession }> {
  const user = await authAction();
  const newMessage = await createMessageUseCase(message);

  return { message: newMessage, user: user };
}

export async function fetchMessages(
  input: MessageGet
): Promise<{ messages: Message[]; user: UserSession }> {
  const user = await authAction();
  const messages = await getSortedMessagesByRoomUseCase(input);
  return { messages: messages, user: user };
}

export async function joinRoom(
  room: Room
): Promise<{ room: Room; user: UserSession }> {
  const user = await authAction();
  const newRoom = await createRoomUseCase(room);
  return { room: newRoom, user: user };
}

export async function fetchRooms(): Promise<{
  rooms: Room[];
  user: UserSession;
}> {
  const user = await authAction();
  const rooms = await getRoomsByUserUseCase(user);
  return { rooms: rooms, user: user };
}

export async function fetchUsersByRoom(room: string): Promise<UserSession[]> {
  const users = await getUsersByRoomUseCase({ room: room });
  return users;
}
