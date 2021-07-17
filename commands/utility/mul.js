module.exports = {
	name: 'mul',
	description:'Multiplies provided arguments',
	usage:'<number> <number>...',
	args: true,
	execute(msg, args) {
		const nums = args.map(num => {return parseInt(`${num}`);});
		const result = nums.reduce((num, curr) =>{
			return num * curr;
		});
		if(isNaN(result)) { return msg.channel.send('Please only input numerical values.');}
		msg.channel.send(`${result}`);
	},
};
