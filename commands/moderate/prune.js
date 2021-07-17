module.exports = {
	name: 'prune',
	description:'deletes previous n messages',
	usage:'<number of messages to delete>...',
	permissions: 'KICK_MEMBERS',
	args: true,
	execute(msg, args) {
		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {return msg.reply('that doesn\'t seem to be a valid number');}
		else if (amount < 2 || amount > 21) { return msg.reply('you need to input a number between 2 and 20');}
		msg.channel.bulkDelete(amount, true).catch(err =>{
			console.error(err);
			msg.channel.send('there was an error with pruning messages.');
		});
	},
};
