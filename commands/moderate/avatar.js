module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	description:'Shows avatar of mentioned users',
	execute(msg) {
		if(!msg.mentions.users.size) {
			return msg.channel.send(`${msg.author.username}'s avatar: '${msg.author.displayAvatarURL()}`);
		}
		const avatarList = msg.mentions.users.map(user => {
			return `${user.username}'s avatar: '${user.displayAvatarURL()}`;
		});
		msg.channel.send(avatarList);
	},
};
