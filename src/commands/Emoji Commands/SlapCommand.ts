import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { GuildMember } from 'discord.js';
import fetch from 'node-fetch';
export default class slapCommand extends Command {
	public constructor () {
		super('slap', {
			aliases:
				[
					'slap',
				],
			category: 'Emoji',
			description:
				{
					content: 'slap a friend or let me slap you',
					usage: 'slap <MEMBER>',
					example:
						[
							'slap Taylor#0021',
							'slap Taylor',
							'slap',
						],
				},
			ratelimit: 2515,
			args:
				[
					{
						id: 'member',
						type: 'member',
						prompt:
							{
								start:
									(msg: Message) =>
										`${msg.author}, Please mention, or say the name of the user to slap!`,
								retry:
									(msg: Message) =>
										`${msg.author}, Please mention, or say the name of the user to slap!`,
							},
					},
				],
		});
	}

	public async exec (message: Message, { member }: { member: GuildMember }): Promise<Message> {
		const data = await (await fetch('https://nekos.life/api/v2/img/slap')).json();
		return message.util.send(
			new MessageEmbed()
				.setTitle(`${member.user.username}, has been slapped by ${message.author.username}`)
				.setImage(data.url),
		);
	}
}
