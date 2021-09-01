const fetch = require('node-fetch');
const Discord = require('discord.js');
const { avantage_tok } = require('../../config.json');
const dateformat = require('dateformat');

module.exports = {
	name: 'stocks',
	aliases: ['stock', 'st'],
	args: true,
	cooldown: 5,
	description:'checks the price of your favorite Stock',
	usage: '<stock name>',
	async execute(msg, args) {
		// const query = args.join('-');
		// const querys = args.join(' ');
		const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${args[0]}&outputsize=compact&interval=1min&apikey=${avantage_tok}`;
		const results = await fetch(url).then(response => response.json());
		if('Error Message' in results) {
			msg.channel.send('There was an issue with your symbol, please only use equity symbols, ie. MSFT, TSLA, AMZN');
			return;
		}
		const [timeZone, timeTable] = [results['Meta Data']['6. Time Zone'], results['Time Series (1min)']];
		console.log(timeTable);
		const latestTime = Object.keys(timeTable)[0];
		const currPrice = timeTable[latestTime]['4. close'];
		const now = new Date();
		const queryInfo = new Discord.MessageEmbed()
			.setColor('#DFB647')
			.setTitle(`current price of ${args[0]}`)
			.setFooter('https://www.alphavantage.co/');
		queryInfo.addFields(
			{ name: 'TimeZone', value: timeZone, inline: true },
			{ name: 'Last refresh', value: dateformat(latestTime, 'mmmm dS, h:MM TT'), inline: true },
			{ name: 'Current time', value: `${dateformat(now, 'mmmm dS, h:MM TT')} (local)` },
			{ name: 'Price in USD', value: currPrice.split('.')[0] },
		);
		msg.channel.send(queryInfo);
	},
};
