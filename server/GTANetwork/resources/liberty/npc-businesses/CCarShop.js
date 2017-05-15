let triggerShop = null
let triggerAllowed = true
let menuOpen = false
let menuCloser = null

API.onResourceStart.connect(() => {

})

API.onUpdate.connect(() => {
  if (triggerShop !== null && triggerAllowed) {
    if (API.isControlPressed(23)) {
      openShopMenu()
    }
  }

  if (menuOpen && API.isControlPressed(177)) {
    menuCloser()
  }
})

API.onServerEventTrigger.connect((name, args) => {
  if (['moto', 'supercar', 'midcar', 'lowcar', 'offroadcar'].indexOf(args[0]) !== -1) {
    switch (name) {
      case 'npcbiz:enterTrigger':
        triggerAllowed = true
        triggerShop = {
          type: args[0],
          name: args[1]
        }
        break
      case 'npcbiz:exitTrigger':
        triggerShop = null
        break
    }
  }
})

function openShopMenu () {
  menuOpen = true
  triggerAllowed = false

  const menu = resource.nativemenu.createMenu(1)
  menu.Blur = true

  let panel
  let text

  const anchor = {
    x: 14,
    y: 4
  }

  panel = menu.createPanel(0, anchor.x, anchor.y, 8, 1)
  panel.MainBackgroundColor(0, 0, 100, 255)
  panel.Header = true
  text = panel.addText(triggerShop.name)
  text.Centered = true
  text.VericalCentered = true
  text.Font = 1
  text.Color(255, 255, 255, 255)

  menu.Ready = true

  menuCloser = () => {
    menuOpen = false
    menu.Ready = false
    menu.Blur = false
    API.showCursor(false)
    triggerAllowed = true
    resource.nativemenu.reset()
  }
}
