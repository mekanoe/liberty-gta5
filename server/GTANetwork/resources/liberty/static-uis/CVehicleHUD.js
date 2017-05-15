let offsetX = 0
let screenX = API.getScreenResolutionMantainRatio().Width
const screenY = API.getScreenResolutionMantainRatio().Height

if (screenX / screenY > 1.7777) {
  // aspect ratio is larger than 16:9
  const idealBox = Math.ceil(screenY * 1.7777)
  // ex: 2850 - 1920 == 660 / 2 == 330
  offsetX = (screenX - idealBox) / 2
  // and gotta set the ideal box to make it work
  screenX = idealBox
}

let localPlayer

const anchor = {
  x: 400,
  y: screenY - 160
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
  // API.sendChatMessage(`SMR: X: ${screenX}, Y: ${screenY}, ORIGX: ${API.getScreenResolutionMantainRatio().Width}, OFF: ${offsetX}`)
  // API.sendChatMessage(`SCR: X: ${API.getScreenResolution().Width}, Y: ${API.getScreenResolution().Height}`)
})

function drawSpeedo () {
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
    offsetX + anchor.x,
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
    offsetX + anchor.x,
    anchor.y + 65,
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
