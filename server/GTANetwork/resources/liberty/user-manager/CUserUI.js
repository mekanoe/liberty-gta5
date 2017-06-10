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
        [ new Vector3(180, -958.3737, 30), 210 ]
      ],

      new: [ new Vector3(150.35, -975.4669, 30), -75 ]
    }

    let cameras = pedPositions.created.map(x => {
      let hdg = x[1]

      if (hdg < 0) {
        hdg = Math.abs(hdg)
      } else if (hdg > 0) {
        hdg = 360 - hdg
      }

      hdg = 360 - hdg

      return { pos: polarToCartesianDistance(x[0], hdg, 2), rot: new Vector3(0, 0, (x[1] + 180) % 360) }

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
    case 'spawn:charselect':
      // createCharSelect()
      break
    case 'user:charselectEnd':
      endCharSelect()
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
  API.setChatVisible(true)
  cefRect = new UIKit.Rect({ x: safe.offsetX + 200 + 25, y: (safe.screenY * 0.5) + 100, w: 400, h: 600, fromCenter: true, color: '#f00', opacity: 100 })
  const cef = cefRect.cef({ url: '/me/char-select' }).getCef()
  cef.activate()
}

function endCharSelect () {
  API.showCursor(false)
  cefRect.getCef().destroy()
  cefRect = null
}

function testPed () {
  try {
    for (let p of pedPositions.created) {
      const [ pos, rot ] = p
      const ped = API.createPed(API.pedNameToModel('Skater01AFY'), pos, new Vector3(0.0, 0.0, rot + 0.0))

      managedPeds.push(ped)
    }
  } catch (e) {
    API.sendChatMessage(e.stack || e.trace)
  }
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
    API.setActiveCamera(origCam)
  } catch (e) {
    API.sendChatMessage('~r~ERR~w~: ' + (e.stack || e.trace))
  }
}

function polarToCartesianDistance (inVec, inAng, distance) {
  inAng = inAng - 90
  const x = inVec.X - (Math.cos(inAng * (Math.PI / 180)) * distance)
  const y = inVec.Y - (Math.sin(inAng * (Math.PI / 180)) * distance)
  API.sendChatMessage('angulo: ' + inAng)

  return new Vector3(x, y, inVec.Z)
}
