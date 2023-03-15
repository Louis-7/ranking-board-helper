export type EventDB = {
  ranking: EventObject[];
}

export type EventObject = {
  time: Date;
  sender: string;
  receiver: string;
  points: number;
  comment: string;
  type: EventType
}

export enum EventType {
  innovation,
  thanks,
  other = 1000,
}