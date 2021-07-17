const fs = require('fs');

module.exports = {
	name: 'reload',
	aliases: ['rl'],
	description: 'Reloads a command',
	args: true,
	execute(msg, args) {
		const commandName = args[0].toLowerCase();
		const command = msg.client.commands.get(commandName)
            || msg.client.command.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if(!command) return msg.channel.send(`Missing command name or alias ${commandName}`);

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));
		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];
		try{
			const newCommand = require(`../${folderName}/${command.name}.js`);
			msg.client.commands.set(newCommand.name, newCommand);
			msg.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
		}
		catch(err) {
			console.error(err);
			msg.channel.send(`There was an error reloading the command \`${command.name}\`:\n\`${err.message}\``);
		}
	},
};
