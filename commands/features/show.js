const fetch = require('node-fetch');
//const querystring = require('querystring');
const Discord = require('discord.js');
const { IMDB_tok } = require('../../config.json');

module.exports = {
	name: 'show',
	aliases: ['s', 'm', 'movie'],
	args: true,
	cooldown: 5,
	description:'searches IMDB for a TV show or movie',
	usage: '<show>',
	async execute(msg, args, cmd) {
		const query = args.join('%20');
		const query_type = { 'show':'SearchSeries', 's':'SearchSeries', 'm':'SearchMovie', 'movie':'SearchMovie' };
		const lit_type = { 'show':'series', 's':'series', 'm':'movie', 'movie':'movie' };
		const { results } = await fetch(`https://imdb-api.com/en/API/${query_type[cmd]}/${IMDB_tok}/${query}`).then(response => response.json());
		if(!results.length) return msg.channel.send(`No results found for the ${lit_type[cmd]} **${args.join(' ')}**`);
		const { id } = results[0];
		const { title, stars, image, year, tagline, companies, genres } = await fetch(`https://imdb-api.com/en/API/Title/${IMDB_tok}/${id}`).then(response => response.json());
		const [studio, starring, genre] = [companies, stars, genres].map(field => field ? field : '---');
		const queryInfo = new Discord.MessageEmbed()
			.setColor('#DE9C38')
			.setTitle(title)
			.setURL(`https://www.imdb.com/title/${id}/`)
			.setFooter('https://www.imdb.com/', 'https://static.wikia.nocookie.net/logopedia/images/8/83/IMDb_Logo.svg/revision/latest/scale-to-width-down/1000?cb=20200925193230');
		if(tagline) queryInfo.setDescription(tagline);
		if(!image.includes('nopicture')) queryInfo.setImage(image);
		queryInfo.addFields(
			{ name: 'Starring', value: starring },
			{ name: 'Genres', value: genre },
			{ name: 'Studio', value: studio, inline: true },
			{ name: 'Release', value: year, inline: true },
		);
		msg.channel.send(queryInfo);
	},
};
