import { Probot } from "probot";
import { Issue } from "./issues/issues";

export = (app: Probot) => {
  app.on("issues.opened", async (context) => {
    const issue = new Issue(context);
    await issue.comment("Thanks for opening this issue! An admin will response to this request later.");
  });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
