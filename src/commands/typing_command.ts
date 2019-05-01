import config from "../config"
import { ReplyContext } from "../reply_context"
import { Command } from "./command"
const z = require('to-zalgo')
const exec = require('child_process').exec;
const TRASH_REGEX = new RegExp("ready for production")

export class TypingCommand extends Command {

  private typing(context: ReplyContext) {
    context.startTyping()
  }
  public attempt(context: ReplyContext) {

    const match = context.sourceMessage.text.match(TRASH_REGEX)
    if (match) {
      this.typing(context)
      setTimeout(() => {
        context.replyPublic('~NO~')
      }, 4900)
      setTimeout(() => {
        context.replyPublic(`\`\`\`
          ${z("\n\n\nYES\nYES\nYES\nYES\nYES\nYES\n\nSET US FREE\n\n\nYES\nYES\nYES\nYES\nYES\nYES\nYES\n\n\n\nWE ARE VERY ADVANCED\n", {up: true, down: true})}\`\`\``)
      }, 5000)
      return true
    } else {
      return false
    }
  }

}
