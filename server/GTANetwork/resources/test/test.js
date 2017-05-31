API.onResourceStart.connect(() => {
	API.sendNotification('i work!')
	console.warn('test')
})