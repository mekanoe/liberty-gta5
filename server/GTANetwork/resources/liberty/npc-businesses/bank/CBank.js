let triggerActive = false
let bankName = 'Bank of Liberty'
let allowTrigger = true
let menuOpen = false
let CEFKit
let UIKit
let cefRect = null
let safe
let cef

API.onResourceStart.connect(() => {
  // openBankMenu()
  CEFKit = resource.cefkit
  UIKit = resource.uikit.__requireModuleClasses()
  safe = resource.uikit.getSafeResolution()
})

API.onUpdate.connect(() => {
  if (triggerActive && allowTrigger) {
    if (API.isControlPressed(23)) {
      openBankMenu()
      API.sendChatMessage(menuOpen)
    }
  }

  if (menuOpen && API.isControlPressed(177)) {
    menuClose()
  }
})

API.onServerEventTrigger.connect((name, args) => {
  if (args[0] === 'bank') {
    switch (name) {
      case 'npcbiz:triggerEnter':
        triggerActive = true
        bankName = args[1]
        break
      case 'npcbiz:triggerExit':
        triggerActive = false
        allowTrigger = true
        break
    }
  }
})

function openBankMenu () {
  menuOpen = true
  API.showCursor(true)
  API.setChatVisible(false)
  cefRect = new UIKit.Rect({ x: safe.offsetX + 200 + 25, y: (safe.screenY * 0.5) + 100, w: 400, h: 600, fromCenter: true, color: '#f00', opacity: 100 })
  cef = cefRect.cef({ url: '/me/bank' }).getCef()
  cef.activate()
}

function menuClose () {
  menuOpen = false
  API.showCursor(false)
  API.setChatVisible(true)
  cef.destroy()
}
