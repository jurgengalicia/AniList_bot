module.exports = {
	name: 'toss',
	description:'Toss a coin flip',
	execute(msg) {
		msg.channel.send(`${Math.floor((Math.random() * 2) + 1)}`);
	},
};
