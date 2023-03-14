import {EventObject, EventType} from "RankingBoard"

export class EventData {
  time: Date;
  sender: string;
  receiver: string;
  points: number;
  comment: string;
  type: EventType;

  constructor (eo: EventObject) {
    this.time = eo.time;
    this.sender = eo.sender;
    this.receiver = eo.receiver;
    this.points = eo.points;
    this.comment = eo.comment;
    this.type = eo.type;
  }

  save() {
    /// save event object to json data.
    console.log('will save eo to data.json');
  }
}