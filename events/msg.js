const config = require('../config.json');
const { prefix } = config;
const Discord = require('discord.js');

module.exports = {
	name: 'message',
	execute(msg, client) {
		//prefix check
		if (!msg.content.startsWith(prefix) || msg.author.bot) {return;}
		const args = msg.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		//command check
		if (!command) return;

		//cooldown check
		const { cooldowns } = client;
		if(!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown) * 1000;
		if(timestamps.has(msg.author.id)) {
			const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
			if(now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the ${command.name} command`);
			}
		}
		timestamps.set(msg.author.id, now);
		setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

		//check for server only commands
		if(command.guildOnly && msg.channel.type === 'dm') {return msg.reply('command unavailable in DMs'); }

		//permission check
		if (command.permissions) {
			const authorPerm = msg.channel.permissionsFor(msg.author);
			if(!authorPerm || !authorPerm.has(command.permission)) {
				return msg.reply('you dont have permission to do this!');
			}
		}
		//if command requires arguments but are missing
		if(command.args && !args.length) {
			let reply = 'You didn\'t provide any arguments';
			if(command.usage) {
				reply += `\n the proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}
			return msg.channel.send(`${reply}`);
		}

		//run command
		try{
			command.execute(msg, args, commandName);
		}
		catch(err) {
			console.error(err);
			msg.reply('there was an error trying to execute your command');
		}
	},
};
