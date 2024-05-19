export interface Event {
  type: string;
  payload?: any;
}
export type EventCallback = (payload: any) => void;
