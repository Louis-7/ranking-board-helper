import { Context, Probot } from "probot";
import { Issue } from "./issues/issues";

export = (app: Probot) => {
  app.on("issues.opened", async (context:Context) => {
    const issue = new Issue(context);
    await issue.comment("Thanks for opening this issue! An admin will response to this request later.");
  });

  app.on('issue_comment.created',async (context:Context) => {
    console.log(context);
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
