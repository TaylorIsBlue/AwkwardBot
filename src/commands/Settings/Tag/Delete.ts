import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class TagCommand extends Command {
	public constructor() {
		super('tag-delete', {
			userPermissions:
				[
					'MANAGE_GUILD',
				],
			args:
				[
					{
						id: 'tag',
						type: 'tag',
						match: 'content',
						prompt:
						{
							start: 'Please provide a tag to delete',
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

		guild.customCommands = guild.customCommands.filter((c) => c.name !== tag.toLowerCase());
		guild.save();

		return message.util!.send(
			new this.client.embed(
				message,
				await this.client.findOrCreateGuild({ id: message.guild!.id }).then((guild) => guild.colour),
			).setDescription(`Deleted tag: \`${tag.toLowerCase()}\`.`),
		);
	}
}
