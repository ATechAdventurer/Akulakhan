import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

import '@sapphire/plugin-pattern-commands/register';

import { env } from './env';

const client = new SapphireClient({
	intents: [
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
	],
	loadMessageCommandListeners: true,
});

client.login(env.DISCORD_BOT_TOKEN);
