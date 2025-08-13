import { Listener } from '@sapphire/framework';
import { Message } from 'discord.js';

const deleteMessage = false;
export class UTMTrackingListener extends Listener {
	constructor(context: Listener.LoaderContext, options: Listener.Options) {
		super(context, {
			...options,
			event: 'messageCreate',
		});
	}

	public async run(message: Message) {
		if (message.author.bot) return;
		const urlRegex =
			/(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/g;

		const matches = Array.from(message.content.matchAll(urlRegex)).map(m => m[0]);
		if (!matches || matches.length === 0) return;

		let modifiedMessage = message.content;
		for (const url of matches) {
			const urlWithoutQueryParams = url.split('?')[0];
			modifiedMessage = modifiedMessage.replace(url, urlWithoutQueryParams);
		}

		if (modifiedMessage === message.content) return;

		if (deleteMessage) {
			await Promise.allSettled([
				message.delete(),
				message.author.createDM(true).then(dmChannel => {
					dmChannel.send(
						`Your message has been modified to remove UTM parameters: \`\`\`${modifiedMessage}\`\`\``
					);
				}),
			]);
		} else {
			await message.reply(
				`Your message has been modified to remove UTM parameters: \n> ${modifiedMessage.replaceAll('\n', '\n> ')}`
			);
		}
	}
}
