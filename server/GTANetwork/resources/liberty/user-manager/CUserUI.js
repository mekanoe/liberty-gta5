let CEFKit
let UIKit
let safe
let cefRect = null

/*
# Already made characters
189.9721, -964.1245, 30, 132
[ new Vector3(187.5, -961.4, 30), 134 ],
[ new Vector3(184.4894, -959.4532, 30), 156 ],
[ new Vector3(180, -958.3737, 30). -175 ],
[ new Vector3(191.1744, -968.01, 30), 86 ],

# New character
150.35, -975.4669, 30, -75
156.35, -976.4669, 30, 105
*/

let pedPositions
let managedPeds = new Set()

API.setCefDrawState(true)

API.onResourceStart.connect(() => {
  // let require = exported.require.require.require
  CEFKit = resource.cefkit
  UIKit = resource.uikit.__requireModuleClasses()
  safe = resource.uikit.getSafeResolution()
  try {
    pedPositions = {
      created: [
        [ new Vector3(189.9721, -964.1245, 30), 132.0 ],
        [ new Vector3(187.5, -961.4, 30), 134.0 ],
        [ new Vector3(184.4894, -959.4532, 30), 156.0 ],
        [ new Vector3(180, -958.3737, 30), -175.0 ],
        [ new Vector3(191.1744, -968.01, 30), 86.0 ]
      ],

      new: [ new Vector3(150.35, -975.4669, 30), -75 ]
    }

  } catch (e) {
    API.sendChatMessage(e.stack || e.trace)
  }
})

API.onResourceStop.connect(() => {
  // if (c)
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
  cefRect.getCef().destroy()
  cefRect = null
}

function testPed () {
  try {
    for (let p of pedPositions.created) {
      const [ pos, rot ] = p
      const ped = API.createPed(API.pedNameToModel('Skater01AFY'), pos, new Vector3(0.0, 0.0, rot + 0.0))

      managedPeds = managedPeds.add(ped)
    }
  } catch (e) {
    API.sendChatMessage(e.stack || e.trace)
  }
}
