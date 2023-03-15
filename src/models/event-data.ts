import { EventObject, EventType } from "../types/ranking-board"

export class EventData {
  time: Date;
  sender: string;
  receiver: string;
  points: number;
  comment: string;
  type: EventType;

  constructor(eo: EventObject) {
    this.time = eo.time;
    this.sender = eo.sender;
    this.receiver = eo.receiver;
    this.points = eo.points;
    this.comment = eo.comment;
    this.type = eo.type;
  }

  save() {
    // save event object to json data.
    console.log('time: ', this.time);
    console.log('sender: ', this.sender);
    console.log('receiver: ', this.receiver);
    console.log('points: ', this.points);
    console.log('comment: ', this.comment);
    console.log('type: ', this.type);
    console.log('will save eo to data.json');
  }
}