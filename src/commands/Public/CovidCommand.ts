import { Command } from "discord-akairo";
import { Message } from "discord.js";
import fetch from "node-fetch";
import moment from "moment";
import { MessageEmbed } from "discord.js";

export default class CovidCommand extends Command {
  public constructor() {
    super("covid", {
      aliases: ["covid"],
      category: "Public Commands",
      channel: "guild",
      description: {
        content: "Look for some covid action and clean up",
        usage: "covid",
        examples: ["covid"]
      },
      cooldown: 3000
    });
  }

  public async exec(message: Message): Promise<Message> {
    const data: any[] = await fetch('https://corona.lmao.ninja/v2/countries').then(res => res.json())

    return message.util!.send(new MessageEmbed()
            // Cases
        .addField("Cases:",data.map(x => x.cases).reduce((a, b) => a + b).toLocaleString(),true)
        .addField("Today Cases:",data.map(x => x.todayCases).reduce((a, b) => a + b).toLocaleString(),true)
        .addField("Active Cases:",data.map(x => x.active).reduce((a,b) => a + b).toLocaleString(),true)
            // Deaths or Critical Cases
        .addField("Deaths:",data.map(x => x.deaths).reduce((a,b) => a + b).toLocaleString(),true)
        .addField("Today Deaths:",data.map(x => x.todayDeaths).reduce((a,b) => a + b).toLocaleString(),true)
        .addField("Critical Cases:",data.map(x => x.critical).reduce((a,b) => a + b).toLocaleString(),true)
        //     // Extra Info
        .addField("Recovered:",data.map(x => x.recovered).reduce((a,b) => a + b).toLocaleString(),true)
        .addField("Tests:", data.map(x => x.tests).reduce((a,b) => a + b).toLocaleString(),true)
        .addField("Cases Per Million:",data.map(x => x.casesPerOneMillion).reduce((a,b) => a + b).toLocaleString(),true)
        .addField("Deaths Per Million:",data.map(x => x.deathsPerOneMillion).reduce((a,b) => a + b).toLocaleString(),true)
        .addField("Tests Per Million:",data.map(x => x.testsPerOneMillion).reduce((a,b) => a + b).toLocaleString(),true)
        .setFooter(`Last Updated:${moment(data[0].updated).format("DD/MMM/YYYY hh:mm")}`)
    )
  }
}