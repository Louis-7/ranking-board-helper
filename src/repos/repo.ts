import { OctokitResponse } from "@octokit/types";
import { Context } from "probot";

export type RepoContext = Context<'issues.opened' | 'issue_comment.created'>;

export class Repo {
  context: RepoContext;

  constructor(context: RepoContext) {
    this.context = context;
  }

  async getContent(filepath: string, context?: RepoContext):Promise<OctokitResponse<Object, number>> {
    if (context == null) {
      context = this.context;
    }

    return await context.octokit.repos
      .getContent({
        owner: process.env.DATA_REPO_OWNER || '',
        repo: process.env.DATA_REPO || '',
        path: filepath,
      })
  }
}