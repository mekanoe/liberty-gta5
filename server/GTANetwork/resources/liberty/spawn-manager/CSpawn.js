let cameraActive = false
let cam = null
let presetSimpleSkyZoom

API.onResourceStart.connect(() => {
  presetSimpleSkyZoom = resource.camrig.presetSimpleSkyZoom
})

API.onUpdate.connect(() => {
  if (cameraActive) {
    API.disableAllControlsThisFrame()
  }
})

let createCamera = function ([ pos, rot, terp = false ]) {
  const newCam = API.createCamera(pos, rot)

  if (cameraActive && !terp) {
    freeCamera()
  }

  if (terp) {
    // API.sendChatMessage('terping')
    switchCamera(cam, newCam, rot)
  } else {
    // API.sendChatMessage('not terping')
    API.setActiveCamera(newCam)
  }
  cam = newCam
  API.setHudVisible(false)
}

function freeCamera () {
  cameraActive = false
  API.setActiveCamera(null)
  API.setHudVisible(true)
}

async function switchCamera (oldCam, newCam, finalRot) {
  try {
    await presetSimpleSkyZoom(oldCam, newCam)
    resource.CUserUI.createCharSelect()
  } catch (e) {
    API.sendChatMessage(`ERR: ${e.trace || e.stack}`)
  }
}

API.onServerEventTrigger.connect((name, args) => {
  switch (name) {
    case 'spawn:camstart':
      cameraActive = true
      createCamera(args)
      break
    case 'spawn:camend':
      freeCamera()
      break
  }
})

API.onResourceStop.connect(() => {
  createCamera = () => {}
})