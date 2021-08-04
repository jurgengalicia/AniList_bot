module.exports = {
	name: 'ping',
	description:'Pokes Shiina',
	aliases: ['p'],
	cooldown: 1,
	execute(msg) {
		msg.channel.send('I\'m working!');
	},
};
