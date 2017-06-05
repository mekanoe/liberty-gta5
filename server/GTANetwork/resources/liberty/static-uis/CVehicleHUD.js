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

let localPlayer = null

const anchor = {
  x: 400,
  y: screenY - 160
}

const turnSignals = {
  left: false,
  right: false
}

API.onUpdate.connect(() => {
  if (API.isControlPressed(23) || API.isControlPressed(177)) {
    localPlayer = API.getLocalPlayer()
  }

  if (localPlayer === null) {
    localPlayer = API.getLocalPlayer()
  }

  if (API.isPlayerInAnyVehicle(localPlayer) && API.getPlayerVehicleSeat(localPlayer) === -1) {
    drawSpeedo()
  }
})

API.onKeyDown.connect((sender, e) => {
  if (localPlayer === null) {
    return
  }

  if (!API.isPlayerInAnyVehicle(localPlayer)) {
    return
  }

  if (API.getPlayerVehicleSeat(localPlayer) !== -1) {
    return null
  }
})

API.onPlayerEnterVehicle.connect(() => {
  localPlayer = API.getLocalPlayer()
})

// API.onResourceStart.connect(() => {
//   localPlayer = API.getLocalPlayer()
//   // API.sendChatMessage(`SMR: X: ${screenX}, Y: ${screenY}, ORIGX: ${API.getScreenResolutionMantainRatio().Width}, OFF: ${offsetX}`)
//   // API.sendChatMessage(`SCR: X: ${API.getScreenResolution().Width}, Y: ${API.getScreenResolution().Height}`)
// })

function drawSpeedo () {
  let veh = API.getPlayerVehicle(localPlayer)
  let vel = API.getEntityVelocity(veh)
  let vclass = API.getVehicleClass(API.getEntityModel(veh))
  let isAirV = [15, 16].indexOf(vclass) !== -1
  let isKnots = [14, 15, 16].indexOf(vclass) !== -1

  // Meters per Second
  const speedMpS = Math.sqrt(
    vel.X * vel.X +
    vel.Y * vel.Y +
    vel.Z * vel.Z
  )
  // const speedKPH = speedMpS * 3.6

  if (!isKnots) {
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
  } else {
    let pos = API.getEntityPosition(veh)
    const normalHdgVector = {
      x: API.returnNative('0x8BB4EF4214E0E6D5', 7, veh),
      y: API.returnNative('0x866A4A5FAE349510', 7, veh)
    }

    let hdg = Math.round(Math.atan2(normalHdgVector.x, normalHdgVector.y) * 57.2957795)
    // let hdg = '???'
    if (hdg < 0) {
      hdg = Math.abs(hdg)
    } else if (hdg > 0) {
      hdg = 360 - hdg
    }

    hdg = 360 - hdg

    // API.displaySubtitle(`ATAN2: ${hdg2ish}`)

    const radAltRaycast = API.createRaycast(pos, new Vector3(pos.X, pos.Y, 0), -1, veh)

    // Altitude: Above Sea Level (a.k.a Z 0)
    const ASL = Math.floor(pos.Z * 3.28084)
    // Raycasted Radar Altitude
    const radAlt = Math.floor(Math.max(0, pos.Z - radAltRaycast.hitCoords.Z) * 3.28084)

    const speedNMh = Math.floor(speedMpS * 1.94384)

    API.drawText(
      `${speedNMh}`,
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
      (isAirV) ? 'KTAS' : 'Knots',
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

    // direction
    API.drawText(
      `HDG`,
      offsetX + anchor.x,
      anchor.y - 45,
      0.30,
      200,
      200,
      200,
      255,
      0,
      1,
      false,
      true,
      1000
    )

    API.drawText(
      `${('00' + hdg).slice(-3)}`,
      offsetX + anchor.x,
      anchor.y - 25,
      0.35,
      255,
      255,
      255,
      255,
      0,
      1,
      false,
      true,
      1000
    )

    if (isAirV) {
      API.drawText(
        `${ASL}`,
        offsetX + anchor.x - 30,
        anchor.y + 65 + 35,
        0.35,
        255,
        255,
        255,
        255,
        0,
        1,
        false,
        true,
        1000
      )

      API.drawText(
        `ASL`,
        offsetX + anchor.x - 30,
        anchor.y + 65 + 35 + 20,
        0.30,
        200,
        200,
        200,
        255,
        0,
        1,
        false,
        true,
        1000
      )

      API.drawText(
        `${radAlt}`,
        offsetX + anchor.x + 30,
        anchor.y + 65 + 35,
        0.35,
        255,
        255,
        255,
        255,
        0,
        1,
        false,
        true,
        1000
      )

      API.drawText(
        `AGL`,
        offsetX + anchor.x + 30,
        anchor.y + 65 + 35 + 20,
        0.30,
        (radAlt === ASL) ? 255 : 200,
        200,
        (radAlt === ASL) ? 0 : 200,
        255,
        0,
        1,
        false,
        true,
        1000
      )
    }
  }
}
