module.exports = {
	name: 'roll',
	description:'Rolls a die',
	execute(msg) {
		msg.channel.send(`${Math.floor((Math.random() * 6) + 1)}`);
	},
};
