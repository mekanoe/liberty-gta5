let CEFKit
let UIKit
let safe
let cefRect = null
API.setCefDrawState(true)

API.onResourceStart.connect(() => {
  // let require = exported.require.require.require
  CEFKit = resource.cefkit
  UIKit = resource.uikit.__requireModuleClasses()
  safe = resource.uikit.getSafeResolution()
})

API.onResourceStop.connect(() => {
  // if (c)
})

API.onServerEventTrigger.connect((name, args) => {
  switch (name) {
    case 'user:loginStart':
      createLogin()
      break
    case 'user:loginEnd':
    case 'user:charselectEnd':
      freeCEF()
      break
    case 'user:charselectStart':
    case 'spawn:charselect':
      createCharSelect()
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
  cefRect = new UIKit.Rect({ x: 200, y: 100, w: 700, h: 600, color: '#f00' })
  const cef = cefRect.cef({ url: '/auth/login' }).getCef()
  cef.activate()
}

API.onUpdate.connect(() => {
  if (cefRect !== null) {
    cefRect.draw()
  }
})
