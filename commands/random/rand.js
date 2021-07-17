module.exports = {
	name: 'rand',
	description:'provides a random number between 1 and n',
	usage:'<n>',
	args: true,
	execute(msg, args) {
		msg.channel.send(`${Math.floor((Math.random() * args[0]) + 1)}`);
	},
};
