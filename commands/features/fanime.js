const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'fanime',
	aliases: ['fa', 'fc', 'fm'],
	args: true,
	cooldown: 7,
	description:'searches myanimelist for an anime, character or manga',
	usage: '<anime title>',
	async execute(msg, args, cmd) {
		const query = args.join('%20');
		const [animeL, characterL, mangaL] = [['fa', 'fanime'], ['fc'], ['fm']];
		const query_type = { 'fanime':'anime', 'fa':'anime', 'fc':'character', 'fm':'manga' };

		const { results } = await fetch(`https://api.jikan.moe/v3/search/${query_type[cmd]}?q=${query}&page=1&limit=5`)
			.then(response => response.json()).catch(err => console.log(err));

		if(!results || !results.length) return msg.channel.send(`No results found for the ${query_type[cmd]} **${args.join(' ')}**`);

		const { mal_id } = results[0];
		const query_result = await fetch(`https://api.jikan.moe/v3/${query_type[cmd]}/${mal_id}`)
			.then(response => response.json());

		const queryInfo = new Discord.MessageEmbed();

		if(animeL.includes(cmd)) {
			const { title, title_japanese, title_english, url, image_url, premiered, genres } = query_result;
			const genreStr = genres.map(genre => genre.name).join(', ');
			queryInfo.setColor('#DF1019')
				.setTitle(title)
				.setURL(url)
				.setImage(image_url)
				.setDescription(title_japanese)
				.addField('English', title_english)
				.addFields(
					{ name: 'Premiered', value: premiered },
					{ name: 'Genres', value: genreStr },
				);
		}
		else if(characterL.includes(cmd)) {
			const { name, name_kanji, url, image_url, nicknames, animeography } = query_result;
			const anime = animeography.length ? animeography[0].name : 0;
			queryInfo.setColor('#9932CC')
				.setTitle(name)
				.setDescription(name_kanji)
				.setURL(url)
				.setImage(image_url);
			if(anime) queryInfo.addField('Anime', anime);
			if(nicknames.length) queryInfo.addField('Alias', nicknames.reduce((acc, curr) => `${acc}, ${curr}`));
		}
		else if(mangaL.includes(cmd)) {
			const { title_japanese, title, url, image_url, premiered } = query_result;
			queryInfo.setColor('#DF1019')
				.setTitle(title)
				.setDescription(title_japanese)
				.setURL(url)
				.setImage(image_url)
				.addFields(
					{ name: 'Premiered', value: premiered },
				);
		}
		queryInfo.setFooter('https://myanimelist.net/', '');
		msg.channel.send(queryInfo);

	},
};
