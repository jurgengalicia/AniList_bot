const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
	name: 'qanime',
	aliases: ['QueryAnime', 'qa'],
	args: true,
	cooldown: 3,
	description:'checks myanimelist.com for the queried anime',
	usage: '<anime name>',
	async execute(msg, args) {
		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
		if(!list.length) return msg.channel.send(`No results found for ${args.join(' ')}`);
		msg.channel.send(list[0].definition);

	},
};
