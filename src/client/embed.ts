import { Message, MessageEmbed } from "discord.js";

export default class Embed extends MessageEmbed {
  public msg: Message;

  public constructor(msg: Message, colour?: string) {
    super();
    this.setColor(colour ? colour : "0491e2")
    this.msg = msg;
  }

  public promptEmbed(string?: string, colour?: string): this {
    return this
      .setColor(colour ? colour : "0491e2")
      .setDescription(string || "Unknown Prompt")
  }

  public addBlankField(inline: boolean): this {
    if (!inline) inline = true
    return this.addFields({
      name: "\u200B",
      value: "\u200B",
      inline: inline
    });
  }
}