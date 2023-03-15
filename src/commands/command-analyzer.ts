import { Context } from 'probot';
import { EventObject, EventType } from '../types/ranking-board';

export class CommandAnalyzer {
  _userCommand: string = '';

  constructor(userCommand: string) {
    this.userCommand = userCommand;
  }

  get userCommand(): string {
    return this._userCommand
  }

  set userCommand(value: string) {
    this._userCommand = value;
  }

  toEvent(context: Context<"issue_comment">): EventObject {
    let commands: string[] = this.userCommand.replace(/\s\s+/g, ' ').split(' ');

    if (commands[0] !== '@ranking-helper,') {
      throw new Error(`Invalid command: command must mention @ranking-helper at the beginning.`)
    }

    let sender: string = context.payload.sender?.login;
    let receiver: string = commands[2].substring(1);
    let points: number = Number(commands[3])
    let typeString: string = commands[6].replace(/.$/g, '');
    let type: EventType;

    switch (typeString) {
      case EventType[EventType.innovation]:
        type = EventType.innovation
        break;
      case EventType[EventType.thanks]:
        type = EventType.thanks;
        break;
      default:
        type = EventType.other;
        break;
    }

    return {
      time: new Date(),
      sender,
      receiver,
      points,
      comment: '',
      type,
    }
  }
}