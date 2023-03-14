import { Context } from "probot";
export class Issue {
  context: Context

  constructor(context: Context) {
    this.context = context;
  }

  async comment(comment:string, context?:Context) {
    if (context == null) {
      context = this.context
    }

    const issueComment = context.issue({
      body: comment,
    });

    await context.octokit.issues.createComment(issueComment);
  }
}