import { Listener } from '@sapphire/framework';
import { ActivitiesOptions } from 'discord.js';

import { statuses } from '../constants/statuses';

export class Status extends Listener {
	constructor(context: Listener.LoaderContext, options: Listener.Options) {
		super(context, {
			...options,
			event: 'ready',
		});
	}
	run() {
		this.setStatus(this.getRandomStatus());
		setInterval(() => {
			this.setStatus(this.getRandomStatus());
		}, 3600000);
	}

	private getRandomStatus(): ActivitiesOptions {
		const randomIndex = Math.floor(Math.random() * statuses.length);
		return statuses[randomIndex];
	}

	private setStatus(status: ActivitiesOptions) {
		console.log(status);
		this.container.client.user.setPresence({
			activities: [status],
		});
	}
}
