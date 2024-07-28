import { MessageRepository } from "@/src/infrastructure/repositories/messages-repository";

const messageRepository = new MessageRepository();

export async function createMessageUseCase(message: Message): Promise<Message> {
  return await messageRepository.create(message);
}

export async function getSortedMessagesByRoomUseCase(
  message: MessageGet
): Promise<Message[]> {
  return await messageRepository.getSortedMessagesByRoom(message);
}
