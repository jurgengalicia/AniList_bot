const fetch = require('node-fetch');

module.exports = {
	name: 'cat',
	aliases: ['c', 'kitty'],
	description:'gives you a cat!',
	usage: '',
	async execute(msg) {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
		msg.channel.send(file);
	},
};
