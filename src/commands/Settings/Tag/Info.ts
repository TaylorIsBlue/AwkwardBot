import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class TagCommand extends Command {
	public constructor() {
		super('tag-info', {
			args:
				[
					{
						id: 'tag',
						type: 'tag',
						prompt:
						{
							start: 'What tag do you want to know info about',
							retry:
								(msg: Message, { failure }: { failure: { value: string } }) =>
									`That tag doesn't exist. Please try again.`,
						},
					},
				],
			category: 'flag',
		});
	}

	public async exec(message: Message, { tag }: { tag: string }) {
		let guild = await this.client.findOrCreateGuild({ id: message.guild!.id });

		let command = guild.customCommands.find((c) => c.name === tag.toLowerCase());

		message.util!.send(
			new this.client.embed(
				message,
				await this.client.findOrCreateGuild({ id: message.guild!.id }).then((guild) => guild.colour),
			)
				.addField(`Command Name:`, command.name)
				.addField(`Reply:`, command.answer.substr(0, 1000))
				.addField(`Created:`, new Date(command.created).toLocaleString('en-GB', { timeZone: 'UTC' }) + ' UTC')
				.addField(
					`Last Modified:`,
					new Date(command.modified).toLocaleString('en-GB', { timeZone: 'UTC' }) + ' UTC',
				)
				.addField(`Creator:`, this.client.users.cache.get(command.creater)!.tag)
				.addField(`Edited By:`, this.client.users.cache.get(command.editor)!.tag),
		);
	}
}
