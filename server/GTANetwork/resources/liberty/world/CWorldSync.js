// API.onResourceStart.connect(() => {
// 	if (API.hasWorldSyncedData("VWeather")) {
// 		const weather = API.getWorldSyncedData("VWeather")
// 		API.setWeather(weather)
// 	}

// 	if (API.hasWorldSyncedData("VTime")) {
// 		const time = API.getWorldSyncedData("VTime")
// 		const hour = time / 100 % 24
// 		const minute = time % 100 % 60
// 		API.setTime(hour, minute)
// 	}
// })