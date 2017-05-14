const screenX = API.getScreenResolutionMantainRatio().Width
const screenY = API.getScreenResolutionMantainRatio().Height
let localPlayer

const anchor = {
	x: 400,
	y: screenY-160
}

API.onUpdate.connect(() => {
	if (API.isControlPressed(23)) {
		localPlayer = API.getLocalPlayer()
	}

	if (API.isPlayerInAnyVehicle(localPlayer) && API.getPlayerVehicleSeat(localPlayer) === -1) {
		drawSpeedo()
	}
})

API.onResourceStart.connect(() => {
	localPlayer = API.getLocalPlayer()
})

function drawSpeedo() {
	let veh = API.getPlayerVehicle(localPlayer)
	let vel = API.getEntityVelocity(veh)

	// Meters per Second
	const speedMpS = Math.sqrt(
		vel.X * vel.X +
		vel.Y * vel.Y +
		vel.Z * vel.Z
	)

	// const speedKPH = speedMpS * 3.6
	const speedMPH = Math.floor(speedMpS * 2.23694)

	// Speed
	API.drawText(
		`${speedMPH}`,
		anchor.x,
		anchor.y,
		1,
		200,
		200,
		0,
		255,
		0,
		1,
		false,
		true,
		1000
	)

	API.drawText(
		`MPH`,
		anchor.x,
		anchor.y+65,
		0.45,
		100,
		150,
		255,
		255,
		0,
		1,
		false,
		true,
		1000
	)
}