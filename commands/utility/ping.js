module.exports = {
	name: 'ping',
	description:'Pokes AniList',
	cooldown: 5,
	execute(msg) {
		msg.channel.send('pong');
	},
};
