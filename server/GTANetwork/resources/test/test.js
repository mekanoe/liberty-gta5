API.onResourceStart.connect(() => {
	API.sendNotification('i work!')
	// console.warn('test')
})

API.onServerEventTrigger.connect((name, args) => {
	if (name === 'test') API.sendChatMessage('test '+args[0])
})