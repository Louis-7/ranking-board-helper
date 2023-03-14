import { Event } from 'RankingBoard';

export class CommandAnalyzer {
  _userCommand: string = '';

  constructor(userCommand: string) {
    this.userCommand = userCommand;
  }

  get userCommand(): string {
    return this._userCommand
  }

  set userCommand(value:string) {
    this._userCommand = value;
  }

  toEvent(): Event {
    return {
      time: new Date(),
      from: 'string',
      to: 'string',
      points: 1,
    }
  }
}