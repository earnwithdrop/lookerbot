import config from "../config"
import { ReplyContext } from "../reply_context"
import { Command } from "./command"

const exec = require('child_process').exec;
const TRASH_REGEX = new RegExp("slam poetry")

export class SlamPoetryCommand extends Command {

  public attempt(context: ReplyContext) {

    const match = context.sourceMessage.text.match(TRASH_REGEX)
    if (match) {
      exec('ruby slam_poetry.rb', (err, stdout, stderr) => {
        context.replyPublic(stdout)
      })
      return true
    } else {
      return false
    }
  }

}
