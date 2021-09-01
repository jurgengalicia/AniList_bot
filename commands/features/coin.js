const fetch = require('node-fetch');
const Discord = require('discord.js');
const { avantage_tok } = require('../../config.json');

module.exports = {
	name: 'coin',
	aliases: ['c'],
	args: true,
	cooldown: 5,
	description:'checks the price of your favorite cryptocurrency',
	usage: '<coin_name>',
	async execute(msg, args) {
		const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${args[0]}&to_currency=USD&apikey=${avantage_tok}`;
		const results = await fetch(url).then(response => response.json());
		if('Error Message' in results) {
			msg.channel.send('There was an issue with your symbol, please only use cryptocurrency symbols, ie. BTC, ETH, DOGE');
			return;
		}
		const metaData = results['Realtime Currency Exchange Rate'];
		let cname = metaData['2. From_Currency Name'];
		const exchangeRatestr = metaData['5. Exchange Rate'];
		let change_24h = 0;
		if (cname) {
			const cnameFormat = cname.replace(' ', '-').toLowerCase();
			const geckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${cnameFormat}&vs_currencies=usd&include_24hr_change=true`;
			const geckoR = await fetch(geckoUrl).then(response => response.json());
			change_24h = geckoR[cnameFormat]['usd_24h_change'];
		}
		else {
			cname = metaData['1. From_Currency Code'];
		}
		change_24h = change_24h ? (change_24h).toFixed(2) : 'N/A';

		const queryInfo = new Discord.MessageEmbed()
			.setColor('#6AB43F')
			.setTitle(`usd - ${cname}`)
			.setFooter('https://www.alphavantage.co/ & https://api.coingecko.com/api/v3/');
		const exchangeRate = parseFloat(exchangeRatestr);
		const curr1 = exchangeRate >= 1000 ? exchangeRate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : exchangeRate;
		queryInfo.addFields(
			{ name: 'usd', value: curr1, inline: true },
			{ name: cname, value: 1, inline: true },
			{ name: '24h change', value: change_24h },
		);
		msg.channel.send(queryInfo);
	},
};

//using coingecko
// const fetch = require('node-fetch');
// const Discord = require('discord.js');
//
// module.exports = {
// 	name: 'coin',
// 	aliases: ['c'],
// 	args: true,
// 	cooldown: 5,
// 	description:'checks the price of your favorite cryptocurrency',
// 	usage: '<coin_name>',
// 	async execute(msg, args) {
// 		const query = args.join('-');
// 		const querys = args.join(' ');
// 		const results = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${query}&vs_currencies=usd&include_24hr_change=true`).then(response => response.json());
// 		if(!Object.keys(results).length) return msg.channel.send(`Could not find the coin **${querys}**`);
// 		const { usd, usd_24h_change } = results[`${query}`];
// 		const queryInfo = new Discord.MessageEmbed()
// 			.setColor('#6AB43F')
// 			.setTitle(`usd - ${querys}`)
// 			.setFooter('https://www.coingecko.com/');
// 		const curr1 = usd >= 1 ? usd : 1;
// 		const curr2 = usd < 1 ? usd : 1;
// 		queryInfo.addFields(
// 			{ name: 'usd', value: curr1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), inline: true },
// 			{ name: `${querys}`, value: curr2, inline: true },
// 			{ name: '24h change', value: (usd_24h_change).toFixed(2) },
// 		);
// 		msg.channel.send(queryInfo);
// 	},
// };
