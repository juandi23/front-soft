import { ResponseValoration } from "./response-valoration.model";
import { Room } from "./room.model";

export interface BotResponse {
  id: string;
  question: string;
  answer: string;
  room: Room;
  contextData?: string;
  responseValoration?: ResponseValoration;
  createdAt: string
  editing?: boolean;
}
