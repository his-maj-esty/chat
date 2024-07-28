export interface IMessageRepository {
  create(message: Message): Promise<Message>;
  getSortedMessagesByRoom(message: MessageGet): Promise<Message[]>;
}
