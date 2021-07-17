const fetch = require('node-fetch');

module.exports = {
	name: 'qanime',
	aliases: ['QueryAnime', 'qa'],
	//args: true,
	cooldown: 3,
	description:'checks myanimelist.com for the queried anime',
	usage: '<anime name>',
	async execute(msg, args) {
		console.log(args);
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
		msg.channel.send(file);

	},
};
