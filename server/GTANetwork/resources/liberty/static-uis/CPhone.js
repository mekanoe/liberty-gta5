let offsetX
let screenX
let screenY

let ready = false
let visible = false
let loggedIn = false
let miniCef
let UIKit
let anchor

API.onServerEventTrigger.connect((name) => {
  if (name === 'user:charselectEnd' || name === 'phone:enable') {
    // API.sendChatMessage(`phone enabled via ${name}`)
    loggedIn = true
    createMiniCef()

    
  }
})

API.onUpdate.connect(() => {
  // if (lazyLoadTime <= Date.now()) {
  //   lazyLoad()
  // }

  if (!ready || !loggedIn) {
    return
  }

  if (API.isControlPressed(19)) {
    if (!visible) {
      visible = true
      miniCef.enable({ cursor: false })
    }
  } else {
    if (visible) {
      visible = false
      miniCef.disable()
    }
  }

  // box.draw()
})

API.onResourceStart.connect(async () => {
  // await new Promise((resolve, reject) => {
  //   lazyLoad = resolve
  // })

  UIKit = Object.assign(resource.uikit, resource.uikit.__requireModuleClasses())
  const res = resource.uikit.getSafeResolution()

  screenY = res.screenY
  screenX = res.screenX
  offsetX = res.offsetX
  anchor = {
    x: screenX - offsetX - 10,
    y: screenY - 300
  }

  // createMiniCef()
  ready = true
})

async function createMiniCef () {
  try {
    let box = new UIKit.Rect({ x: anchor.x, y: anchor.y, w: 305, h: 400, opacity: 100, color: '#f00' })
    await box.cef({ url: '/me/phone/mini' })
    miniCef = box._cef
    miniCef.activate({ cursor: false })
    miniCef.disable()
  } catch (e) {
    API.sendChatMessage('minicef error: ' + (e.stack || e.trace))
  }
}
