import { OctokitResponse } from "@octokit/types";
import { Context } from "probot";
import { Repo } from "../repos/repo";
import { EventDB, EventObject } from "../types/ranking-board"

export class EventData {
  context: Context;
  db: EventDB;

  constructor(context: Context) {
    this.context = context;
    this.db = { ranking: [] };
  }

  async load(context?: Context) {
    if (context == null) {
      context = this.context
    }

    const repo = new Repo(context as any);
    const dataFilePath = 'data/ranking.json';

    let contentResponse: OctokitResponse<any, number> = await repo.getContent(dataFilePath)
    let buffer = Buffer.from(contentResponse.data.content, 'base64');
    let data = buffer.toString('ascii');

    this.db = JSON.parse(data);

    console.log('db loaded', this.db);
  }

  async save(eo: EventObject, context?: Context) {
    if (context == null) {
      context = this.context
    }

    this.add(eo);

    // save event object to json data.
    console.log('time: ', eo.time);
    console.log('sender: ', eo.sender);
    console.log('receiver: ', eo.receiver);
    console.log('points: ', eo.points);
    console.log('comment: ', eo.comment);
    console.log('type: ', eo.type);
    console.log('will save eo to data.json');
    console.log('>>>>> db is looks like:', this.db);
  }

  private add(eo: EventObject) {
    this.db.ranking.push(eo);
  }
}