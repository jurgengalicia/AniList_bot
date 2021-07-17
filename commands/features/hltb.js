const hltb = require('howlongtobeat');
const hltbService = new hltb.HowLongToBeatService();
const Discord = require('discord.js');

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
			const currentResult = result[0];
			const gameInfo = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${currentResult.name}`)
				.setURL(`https://howlongtobeat.com/game.php?id=${currentResult.id}`)
				.addFields(
					{ name: 'Average completion', value: `${currentResult.gameplayMain} hours` },
					{ name: 'Main game and side quests', value: `${currentResult.gameplayMain} hours` },
					{ name: 'Completionist', value: `${currentResult.gameplayCompletionist} hours` },
				)
				.setImage(`https://howlongtobeat.com${currentResult.imageUrl}`)
				.setFooter('https://howlongtobeat.com/');
			msg.channel.send(gameInfo);
		},

		).catch(err => {msg.channel.send('There was an error with that query'); console.error(err);});

	},
};
