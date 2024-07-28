interface Message {
  type: MessageType;
  content: string;
  username: string;
  room: string;
  timestamp: Date;
}

type MessageType = "join" | "leave" | "message";

type MessageGet = Pick<Message, "room">;
