let cameraActive = false

// API.onResourceStart.connect(() => {
//   freeCamera()
// })

API.onServerEventTrigger.connect((name, args) => {
  switch (name) {
    case 'spawn:camstart':
      createCamera(args)
      cameraActive = true
      break
    case 'spawn:camend':
      freeCamera()
      break
  }
})

API.onUpdate.connect(() => {
  if (cameraActive) {
    API.disableAllControlsThisFrame()
  }
})

function createCamera (args) {
  const cam = API.createCamera(args[0], args[1])
  API.setActiveCamera(cam)
  API.setHudVisible(false)
}

function freeCamera () {
  cameraActive = false
  API.setActiveCamera(null)
  API.setHudVisible(true)
}
