const fetch = require('node-fetch');
//const querystring = require('querystring');
const Discord = require('discord.js');
const { IMDB_tok } = require('../../config.json');

module.exports = {
	name: 'movie',
	aliases: ['m'],
	args: true,
	cooldown: 5,
	description:'searches IMDB for a movie',
	usage: '<movie>',
	async execute(msg, args) {

		const query = args.join('%20');
		const { results } = await fetch(`https://imdb-api.com/en/API/SearchMovie/${IMDB_tok}/${query}`).then(response => response.json());
		if(!results.length) return msg.channel.send(`No results found for the movie **${args.join(' ')}**`);
		const { id } = results[0];
		const { title, stars, image, year, tagline, companies } = await fetch(`https://imdb-api.com/en/API/Title/${IMDB_tok}/${id}`).then(response => response.json());
		const studio = (companies.split(',')[0]) ? `${companies.split(',')[0]}` : '---';
		const queryInfo = new Discord.MessageEmbed()
			.setColor('#DE9C38')
			.setTitle(title)
			.setURL(`https://www.imdb.com/title/${id}/`)
			.setFooter('https://www.imdb.com/', 'https://static.wikia.nocookie.net/logopedia/images/8/83/IMDb_Logo.svg/revision/latest/scale-to-width-down/1000?cb=20200925193230');
		if(tagline) queryInfo.setDescription(tagline);
		if(!image.includes('nopicture')) queryInfo.setImage(image);
		queryInfo.addFields(
			{ name: 'Starring', value: stars },
			{ name: 'Studio', value: studio, inline: true },
			{ name: 'Release', value: year, inline: true },
		);
		msg.channel.send(queryInfo);
	},
};
