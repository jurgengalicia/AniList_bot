const fetch = require('node-fetch');
const querystring = require('querystring');
const Discord = require('discord.js');
/* eslint-disable no-useless-escape */

const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
	name: 'urban',
	aliases: ['ud'],
	args: true,
	cooldown: 5,
	description:'searches a slang (WARNING: NSFW)',
	usage: '<slang term>',
	async execute(msg, args) {
		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if(!list.length) return msg.channel.send(`No results found for ${args.join(' ')}`);

		const [answer] = list;

		const queryInfo = new Discord.MessageEmbed()
			.setColor('#EFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.setFooter('https://www.urbandictionary.com/')
			.addFields(
				{ name: 'Definition', value: trim(answer.definition.replaceAll(/[\[\]]/g, '**'), 1024) },
				{ name: 'Example', value: trim(answer.example.replaceAll(/[\[\]]/g, '**'), 1024) },
				{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },

			);
		msg.channel.send(queryInfo);
	},
};
