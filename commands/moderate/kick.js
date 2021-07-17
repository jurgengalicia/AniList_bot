module.exports = {
	name: 'kick',
	description:'Command for kicking users',
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	execute(msg) {
		if(!msg.mentions.users.size) {
			return msg.reply('Please provide a user to kick!');
		}
		const taggedUser = msg.mentions.users.first();
		msg.channel.send(`you wanted to kick: ${taggedUser.username}`);
	},
};
