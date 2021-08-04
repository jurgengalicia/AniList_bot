const hltb = require('howlongtobeat');
const hltbService = new hltb.HowLongToBeatService();
const Discord = require('discord.js');
//const { RAWG_tok } = require('../../config.json');

module.exports = {
	name: 'hltb',
	aliases: ['hl'],
	args: true,
	cooldown: 2,
	description:'checks HLTB.com how long to beat a given game',
	usage: '<game name>',
	execute(msg, args) {
		const query = args.join(' ');
		hltbService.search(`${query}`).then(result => {
			if (!result.length) {
				msg.channel.send(`No results found for *${query}*`);
				return;
			}
			console.log(result[0]);
			const { name, id, gameplayMain, gameplayMainExtra, gameplayCompletionist, imageUrl } = result[0];
			const gameInfo = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${name}`)
				.setURL(`https://howlongtobeat.com/game.php?id=${id}`)
				.addFields(
					{ name: 'Average completion', value: `${gameplayMain} hours` },
					{ name: 'Main game and extras', value: `${gameplayMainExtra} hours` },
					{ name: 'Completionist', value: `${gameplayCompletionist} hours` },
				)
				.setImage(`https://howlongtobeat.com${imageUrl}`)
				.setFooter('https://howlongtobeat.com/');
			msg.channel.send(gameInfo);
		},

		).catch(err => {msg.channel.send('There was an error with that query'); console.error(err);});
		// const { rawgResults } = await fetch(`https://api.rawg.io/api/games?key=${RAWG_tok}&search=${nameSlug}&search_exact=true`)
		// 	.then(response => response.json()).catch(err => console.log(err));
		// const { released } = rawgResults[0];
	},
};
