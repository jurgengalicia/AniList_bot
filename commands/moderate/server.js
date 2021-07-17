module.exports = {
	name: 'server',
	description:'Provide server information',
	guildOnly: true,
	execute(msg) {
		msg.channel.send(`This server's name is: ${msg.guild.name}\nmembers: ${msg.guild.memberCount}`);
	},
};
