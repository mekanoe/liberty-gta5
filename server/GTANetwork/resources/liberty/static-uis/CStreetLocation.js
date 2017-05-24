const localPlayer = API.getLocalPlayer()

const screenX = API.getScreenResolutionMantainRatio().Width
const screenY = API.getScreenResolutionMantainRatio().Height

const anchor = {
  x: 400,
  y: screenY - 175
}

API.onUpdate.connect(() => {
  const pos = API.getEntityPosition(localPlayer)

  API.displaySubtitle(API.getStreetName(pos))
})
