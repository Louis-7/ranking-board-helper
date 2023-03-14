import { Context, Probot } from "probot";
import { Issue } from "./issues/issues";
import { EventData } from "./models/event-data";
import { CommandAnalyzer } from "./presistence/command-analyzer";

export = (app: Probot) => {
  app.on("issues.opened", async (context: Context<'issues.opened'>) => {
    const issue = new Issue(context as any);
    await issue.comment("Thanks for opening this issue! An admin will response to this request later.");
  });

  app.on('issue_comment.created',async (context: Context<'issue_comment.created'>) => {
    try {
      let userCommand = context.payload.comment.body;
      const commandAnalyzer = new CommandAnalyzer(userCommand);
      let eventObject = commandAnalyzer.toEvent(context as any);
      let event = new EventData(eventObject);

      event.save();
    } catch (e: any) {
      const issue = new Issue(context as any);
      await issue.comment(e.message);
    }
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
