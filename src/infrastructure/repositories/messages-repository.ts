import { IMessageRepository } from "@/src/application/i-repositories/i-messages";
import axios, { AxiosInstance } from "axios";

export class MessageRepository implements IMessageRepository {
  private _client: AxiosInstance;
  constructor() {
    this._client = axios.create({
      baseURL: process.env.API_URL,
      timeout: 1000,
    });
  }
  async create(message: Message): Promise<Message> {
    const newMessage = await this._client.post("/chat-messages", {
      data: message,
    });
    console.log("created message : ", newMessage.data.data);
    return newMessage.data.data.attributes as Message;
  }

  async getSortedMessagesByRoom(message: MessageGet): Promise<Message[]> {
    const newMessages = await this._client.get(
      `/chat-messages?sort[0]=timestamp:asc&filters[room][$eq]=${message.room}&filters[type][$eq]=message&populate=*`
    );
    const formattedMessages: Message[] = newMessages.data.data.map(
      (message: any) => message.attributes
    );
    return formattedMessages;
  }
}
