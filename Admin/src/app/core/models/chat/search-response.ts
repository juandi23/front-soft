import { Room } from "./room.model";
export interface searchDetail {
  id: number;
  question: string;
  answer: string;
  media: string;
  room: Room;
  createdAt: string;
  matches: number;
  responsesRoom: any;
  index: number;
  responseValoration: number;
  page:number;
}

export interface SearchResult {
  responses: searchDetail[];
  countMatchs: number;
  rooms: Room[];
}
