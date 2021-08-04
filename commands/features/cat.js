const fetch = require('node-fetch');

module.exports = {
	name: 'cat',
	aliases: ['c', 'kitty'],
	description:'gives you a cat!',
	usage: '',
	cooldown: 5,
	async execute(msg) {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json(), err => console.log(err));
		msg.channel.send(file);
	},
};
