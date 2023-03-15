import { OctokitResponse } from "@octokit/types";
import { Context } from "probot";
import { Repo } from "../repos/repo";
import { EventDB, EventObject } from "../types/ranking-board"

export class EventData {
  context: Context;
  db: EventDB;
  dataFilePath: string;

  constructor(context: Context) {
    this.context = context;
    this.db = { ranking: [] };
    this.dataFilePath = process.env.DATA_FILE_PATH || '';

    if (this.dataFilePath == null) {
      throw new Error('DATA_FILE_PATH is missing in the environment variable.')
    }
  }

  async load(context?: Context) {
    if (context == null) {
      context = this.context
    }

    const repo = new Repo(context as any);

    let contentResponse: OctokitResponse<any, number> = await repo.getContent(this.dataFilePath)
    let buffer = Buffer.from(contentResponse.data.content, 'base64');
    let data = buffer.toString('utf-8');

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

    let message = `rank: ${eo.receiver} -> ${eo.points} point(s)`;

    this.sync(message, 'main');
  }

  async sync(message: string, branch: string = 'main', context?: Context) {
    if (context == null) {
      context = this.context
    }

    const content = JSON.stringify(this.db);
    const repo = new Repo(context as any);
    const currentCommit = await repo.getCurrentCommit(branch);
    const fileBlob = await repo.createBlob(content, 'utf-8');
    const pathsForBlobs = [this.dataFilePath];
    const newTree = await repo.createNewTree([fileBlob], pathsForBlobs, currentCommit.treeSha);
    const newCommit = await repo.createCommit(message, newTree.sha, currentCommit.commitSha);

    await repo.updateRef(branch, newCommit.data.sha);

    console.log('database sync done.');
  }

  private add(eo: EventObject) {
    this.db.ranking.push(eo);
  }
}