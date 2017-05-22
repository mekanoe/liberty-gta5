let triggerActive = false
let allowTrigger = false
let shopName = 'Liberty Threads'
let menuOpen = false
let menuRects = []
let screenX
let screenY
let offsetX
let centerAnchor

API.onResourceStart.connect(() => {
  const res = resource.uikit.getSafeResolution()
  screenY = res.screenY
  screenX = res.screenX
  offsetX = res.offsetX
  centerAnchor = {
    x: Math.round(screenX / 2),
    y: Math.round(screenY / 2)
  }

  createRects()
})

API.onResourceStop.connect(() => {
  if (menuOpen) API.showCursor(false)
})

API.onServerEventTrigger.connect((name, args) => {
  if (args[0] === 'clothing') {
    switch (name) {
      case 'npcbiz:triggerEnter':
        triggerActive = true
        shopName = args[1]
        break
      case 'npcbiz:triggerExit':
        triggerActive = false
        allowTrigger = true
        break
    }
  }
})

API.onUpdate.connect(() => {
  if (menuRects.length === 0) {
    return
  }

  if (triggerActive && allowTrigger) {
    if (API.isControlPressed(23)) {
      API.showCursor(true)
      menuOpen = true
    }
  }

  if (menuOpen && API.isControlPressed(177)) {
    API.showCursor(false)
    menuOpen = false
    resetRects()
  }

  if (menuOpen) {
    drawRects()
  }
})

function createRects () {
  const width = 720
  let rootRect = resource.uikit.createRect({ fromCenter: false, x: ((offsetX * 2) + screenX) - width - 20, y: Math.round(345 / 2), h: 690, w: width, opacity: 100 })
  menuRects.push(rootRect)

  let gridWidths = {
    wide: 2 * (width / 3) - 10, // 470
    normal: (width / 3) - 10 // 230
  }

  menuRects.push(
    rootRect.getInsetRect({ x: 0, y: 0, w: width, h: 200 }).image({ path: 'img/ponsonbys.png' }),

    // bottoms
    rootRect.getInsetRect({ x: 10, y: 370, w: gridWidths.normal, h: 310, opacity: 0 }).image({ path: 'img/clothing-bottoms-hover.png' })
      .onHover((rect) => {
        rect
          .image({ path: 'img/clothing-bottoms.png' })
          .border({ width: 5, opacity: 255, color: '#fff' })
      }, null, { reset: true }),

    // rootRect.getInsetRect({ x: 10, y: 200 + 10, w: gridWidths.wide - 10, h: 150, color: '#0f0' })
    //   .onHover((rect) => { rect.color('#afa') }, null, { reset: true })
    //   .onClick((rect) => { API.sendChatMessage('clicked!') }),

    rootRect.getInsetRect({ x: 10, y: 200 + 10, w: gridWidths.normal, h: 150, color: '#f00' }).image({ path: 'img/clothing-hats-hover.png' })
      .onHover((rect) => {
        rect
          .image({ path: 'img/clothing-hats.png' })
          .border({ width: 5, opacity: 255, color: '#fff' })
      }, null, { reset: true })
  )
}

function drawRects () {
  for (let rect of menuRects) {
    rect.draw()
  }
}

function resetRects () {
  for (let rect of menuRects) {
    rect.resetEvents()
  }
}
