const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'coin',
	aliases: ['c'],
	args: true,
	cooldown: 5,
	description:'checks the price of your favorite cryptocurrency',
	usage: '<coin_name>',
	async execute(msg, args) {
		const query = args.join('-');
		const querys = args.join(' ');
		const results = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${query}&vs_currencies=usd&include_24hr_change=true`).then(response => response.json());
		if(!Object.keys(results).length) return msg.channel.send(`Could not find the coin **${args}**`);
		const { usd, usd_24h_change } = results[`${query}`];
		const queryInfo = new Discord.MessageEmbed()
			.setColor('#6AB43F')
			.setTitle(`usd - ${querys}`)
			.setFooter('https://www.coingecko.com/');
		const curr1 = usd >= 1 ? usd : 1;
		const curr2 = usd < 1 ? usd : 1;
		queryInfo.addFields(
			{ name: 'usd', value: curr1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), inline: true },
			{ name: `${querys}`, value: curr2, inline: true },
			{ name: '24h change', value: (usd_24h_change).toFixed(2) },
		);
		msg.channel.send(queryInfo);
	},
};
