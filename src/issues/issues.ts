export class Issue {
  context: any

  constructor(context: any) {
    this.context = context;
  }

  async comment(comment:string, context?:any) {
    if (context == null) {
      context = this.context
    }

    const issueComment = context.issue({
      body: comment,
    });

    await context.octokit.issues.createComment(issueComment);
  }
}