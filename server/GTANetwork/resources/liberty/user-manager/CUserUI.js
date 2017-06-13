let CEFKit
let UIKit
let safe
let cefRect = null
let CamRig

/*
# Already made characters
189.9721, -964.1245, 30, 132
[ new Vector3(187.5, -961.4, 30), 134 ],
[ new Vector3(184.4894, -959.4532, 30), 156 ],
[ new Vector3(180, -958.3737, 30). -175 ],
[ new Vector3(191.1744, -968.01, 30), 86 ],

# New character
150.35, -975.4669, 30, -75
156.35, -976.4669, 30, 105 //cam
*/

let pedPositions
let managedPeds = []
let ccPedMale
let ccPedFemale
let activeCCPed = 'female'

API.setCefDrawState(true)

API.onResourceStart.connect(() => {
  // let require = exported.require.require.require
  CEFKit = resource.cefkit
  UIKit = resource.uikit.__requireModuleClasses()
  safe = resource.uikit.getSafeResolution()
  CamRig = resource.camrig.__requireModuleClasses().CamRig

  try {
    pedPositions = {
      created: [
        [ new Vector3(191.1744, -968.01, 30), 120 ],
        [ new Vector3(189.9721, -964.1245, 30), 125 ],
        [ new Vector3(187.5, -961.4, 30), 145 ],
        [ new Vector3(184.4894, -959.4532, 30), 160 ],
        [ new Vector3(180, -958.3737, 30), 210 ],
        [ new Vector3(150.2903, -977.0628, 30.09193), -60 ]
      ]
    }

    let cameras = pedPositions.created.map(x => {
      let hdg = x[1]

      if (hdg < 0) {
        hdg = Math.abs(hdg)
      } else if (hdg > 0) {
        hdg = 360 - hdg
      }

      hdg = 360 - hdg

      return { pos: polarToCartesianDistance(x[0], hdg, 2.5), rot: new Vector3(0, 0, (x[1] + 180) % 360) }
    })

    pedPositions.cameras = cameras
  } catch (e) {
    API.sendChatMessage(e.stack || e.trace)
  }
})

API.onResourceStop.connect(() => {
  testPedKill()
})

API.onServerEventTrigger.connect((name, args) => {
  switch (name) {
    case 'user:loginStart':
      createLogin()
      break
    // case 'user:charselectEnd':
    case 'user:loginEnd':
      freeCEF()
      break
    case 'user:charselectStart':
      createCharSelect()
      break
    case 'user:charselectEnd':
      endCharSelect()
      break

    case 'charSelectSetup':
      setupCharSelect(args[0])
      break
    case 'charSelectMove':
      moveCharSelect(args[0])
      break

    case 'charCreationPreset':
      updateCCPed(args[0])
      break

    case 'test:pedcharselect':
      testPed()
      break
    case 'test:pedcharselectEnd':
      testPedKill()
      break
    case 'test:pedcharselectTurn':
      testPedTurn(args)
      break
    case 'test:pedcharselectCam':
      testPedCamera()
      break
  }
})

function createLogin () {
  API.showCursor(true)
  API.setChatVisible(false)
  let userToken = API.getEntitySyncedData(API.getLocalPlayer(), 'VToken')
  CEFKit.loadGlobal(`/auth/login?token=${userToken}`)
}

function freeCEF () {
  API.showCursor(false)
  API.setChatVisible(true)
  CEFKit.destroyGlobal(true)
}

function createCharSelect () {
  API.showCursor(true)
  API.setChatVisible(false)
  cefRect = new UIKit.Rect({ x: safe.offsetX + 200 + 25, y: (safe.screenY * 0.5) + 100, w: 400, h: 600, fromCenter: true, color: '#f00', opacity: 100 })
  const cef = cefRect.cef({ url: '/me/char-select' }).getCef()
  cef.activate()
  moveCharSelect(0)
}

function endCharSelect () {
  API.showCursor(false)
  API.setChatVisible(true)
  testPedKill()
  cefRect.getCef().destroy(true)
  cefRect = null
}

function setupCharSelect (data) {
  // API.sendChatMessage(data)
  data = JSON.parse(data)

  data.forEach((char, k) => {
    let pedModel
    if (char.useSkin) {
      pedModel = char.skinName
    } else {
      pedModel = (char.gender === 'male') ? 'FreeModeMale01' : 'FreemodeFemale01'
    }

    pedModel = API.pedNameToModel(pedModel)

    const [ pos, rot ] = pedPositions.created[k]
    const ped = API.createPed(pedModel, pos, new Vector3(0, 0, rot))
    managedPeds.push(ped)

    for (let { slot, drawable, texture } of char.freemodeFeatures) {
      setPedComponent(ped, slot, drawable, texture)
    }
  })

  ccPedMale = API.createPed(API.pedNameToModel('FreeModeMale01'), pedPositions.created[5][0], new Vector3(0, 0, pedPositions.created[5][1]))
  managedPeds.push(ccPedMale)

  ccPedFemale = API.createPed(API.pedNameToModel('FreeModeFemale01'), pedPositions.created[5][0], new Vector3(0, 0, pedPositions.created[5][1]))
  managedPeds.push(ccPedFemale)
  updateCCPed(0, true)
}

function moveCharSelect (idx) {
  API.sendChatMessage('moving to ' + idx)

  const { pos, rot } = pedPositions.cameras[idx]
  const cam = API.createCamera(pos, rot)
  API.interpolateCameras(API.getActiveCamera(), cam, 500, true, true)
}

function setPedComponent (ped, slot, drawable, texture) {
  API.callNative('SET_PED_COMPONENT_VARIATION', ped, slot, drawable, texture, 0)
}

function updateCCPed (idx, init = false) {
  API.sendChatMessage('cc ped index '+idx)
  let preset = defaultCreationPeds[idx].slice()
  let { skin } = preset.shift()

  if (skin.toLowerCase() !== `freemode${activeCCPed}01` || init) {
    activeCCPed = (activeCCPed === 'male') ? 'female' : 'male'
    API.setEntityTransparency(ccPedFemale, (activeCCPed === 'female') ? 255 : 0)
    API.sleep(100)
    API.setEntityTransparency(ccPedMale, (activeCCPed === 'male') ? 255 : 0)
  }

  let ped = (activeCCPed === 'male') ? ccPedMale : ccPedFemale

  for (let { slot, drawable, texture } of preset) {
    setPedComponent(ped, slot, drawable, texture)
  }
}

//
// TEST FUNCS
//
function testPed () {
  testPedKill()
  setupCharSelect(JSON.stringify([
    {
      gender: 'female',
      useSkin: false,
      freemodeFeatures: {

      }
    },
    {
      gender: 'female',
      useSkin: false,
      freemodeFeatures: {

      }
    },
    {
      gender: 'female',
      useSkin: false,
      freemodeFeatures: {

      }
    },
    {
      gender: 'female',
      useSkin: false,
      freemodeFeatures: {

      }
    },
    {
      gender: 'female',
      useSkin: false,
      freemodeFeatures: {

      }
    }
  ]))
}

function testPedTurn ([which, angle]) {
  API.sendChatMessage('~~~~~~' + JSON.stringify(managedPeds))
  API.setEntityRotation(managedPeds[which], new Vector3(0, 0, angle))
}
function testPedKill () {
  for (let ped of managedPeds) {
    API.deleteEntity(ped)
    managedPeds = managedPeds.filter(x => x !== ped)
  }
}

async function testPedCamera () {
  try {
    let origCam = API.getActiveCamera()
    if (origCam === null) {
      origCam = API.createCamera(API.getGameplayCamPos(), API.getGameplayCamRot())
    }

    const rig = new CamRig()

    for (let move of pedPositions.cameras) {
      rig.add({
        pos: move.pos,
        rot: move.rot,
        duration: 500,
        pauseDelta: +1500
      })
    }

    await rig.run(origCam)
    API.setActiveCamera(null)
  } catch (e) {
    API.sendChatMessage('~r~ERR~w~: ' + (e.stack || e.trace))
  }
}

//
// Utils
//

function polarToCartesianDistance (inVec, inAng, distance) {
  inAng = (inAng - 90) * 0.017453292519943295 // shift phase + degrees to radians
  const x = inVec.X - (Math.cos(inAng) * distance)
  const y = inVec.Y - (Math.sin(inAng) * distance)

  return new Vector3(x, y, inVec.Z)
}

let defaultCreationPeds = [
  [
    { skin: 'FreemodeMale01' },
    { slot: 0, drawable: 0, texture: 0 },
    { slot: 2, drawable: 11, texture: 4 },
    { slot: 3, drawable: 0, texture: 0 },
    { slot: 4, drawable: 4, texture: 0 },
    { slot: 6, drawable: 42, texture: 2 },
    { slot: 8, drawable: 15, texture: 0 },
    { slot: 11, drawable: 22, texture: 1 }
  ],
  [
    { skin: 'FreemodeMale01' },
    { slot: 0, drawable: 4, texture: 0 },
    { slot: 2, drawable: 14, texture: 4 },
    { slot: 3, drawable: 0, texture: 0 },
    { slot: 4, drawable: 5, texture: 2 },
    { slot: 6, drawable: 1, texture: 0 },
    { slot: 8, drawable: 15, texture: 0 },
    { slot: 11, drawable: 81, texture: 1 }

  ],
  [
    { skin: 'FreemodeMale01' },
    { slot: 0, drawable: 44, texture: 0 },
    { slot: 2, drawable: 22, texture: 1 },
    { slot: 3, drawable: 0, texture: 0 },
    { slot: 4, drawable: 47, texture: 0 },
    { slot: 6, drawable: 1, texture: 0 },
    { slot: 8, drawable: 15, texture: 0 },
    { slot: 11, drawable: 89, texture: 0 }
  ],
  [
    { skin: 'FreemodeMale01' },
    { slot: 0, drawable: 44, texture: 0 },
    { slot: 2, drawable: 17, texture: 3 },
    { slot: 3, drawable: 5, texture: 0 },
    { slot: 4, drawable: 16, texture: 2 },
    { slot: 6, drawable: 16, texture: 0 },
    { slot: 8, drawable: 15, texture: 0 },
    { slot: 11, drawable: 36, texture: 0 }

  ],
  [
    { skin: 'FreemodeMale01' },
    { slot: 0, drawable: 24, texture: 0 },
    { slot: 2, drawable: 28, texture: 4 },
    { slot: 3, drawable: 4, texture: 0 },
    { slot: 4, drawable: 64, texture: 10 },
    { slot: 6, drawable: 6, texture: 0 },
    { slot: 8, drawable: 15, texture: 0 },
    { slot: 11, drawable: 57, texture: 0 }
  ],
  [
    { skin: 'FreemodeFemale01' },
    { slot: 0, drawable: 21, texture: 0 },
    { slot: 2, drawable: 4, texture: 4 },
    { slot: 3, drawable: 3, texture: 0 },
    { slot: 4, drawable: 10, texture: 0 },
    { slot: 6, drawable: 10, texture: 1 },
    { slot: 8, drawable: 8, texture: 0 },
    { slot: 11, drawable: 3, texture: 2 }
  ],
  [
    { skin: 'FreemodeFemale01' },
    { slot: 0, drawable: 33, texture: 0 },
    { slot: 2, drawable: 1, texture: 1 },
    { slot: 3, drawable: 0, texture: 0 },
    { slot: 4, drawable: 31, texture: 0 },
    { slot: 6, drawable: 13, texture: 5 },
    { slot: 8, drawable: 8, texture: 0 },
    { slot: 11, drawable: 9, texture: 1 }
  ],
  [
    { skin: 'FreemodeFemale01' },
    { slot: 0, drawable: 40, texture: 0 },
    { slot: 2, drawable: 10, texture: 3 },
    { slot: 3, drawable: 7, texture: 0 },
    { slot: 4, drawable: 7, texture: 0 },
    { slot: 6, drawable: 0, texture: 0 },
    { slot: 8, drawable: 39, texture: 0 },
    { slot: 11, drawable: 57, texture: 0 }
  ],
  [
    { skin: 'FreemodeFemale01' },
    { slot: 0, drawable: 29, texture: 0 },
    { slot: 2, drawable: 14, texture: 4 },
    { slot: 3, drawable: 1, texture: 0 },
    { slot: 4, drawable: 66, texture: 10 },
    { slot: 6, drawable: 49, texture: 0 },
    { slot: 8, drawable: 2, texture: 0 },
    { slot: 11, drawable: 125, texture: 9 }
  ],
  [
    { skin: 'FreemodeFemale01' },
    { slot: 0, drawable: 45, texture: 0 },
    { slot: 2, drawable: 5, texture: 3 },
    { slot: 3, drawable: 2, texture: 0 },
    { slot: 4, drawable: 16, texture: 4 },
    { slot: 6, drawable: 15, texture: 1 },
    { slot: 8, drawable: 2, texture: 0 },
    { slot: 11, drawable: 2, texture: 0 }
  ]
]
