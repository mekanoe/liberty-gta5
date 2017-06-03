let triggerActive = false
let allowTrigger = true
let shopName = 'Liberty Threads'
let menuOpen = false
let menuRects = []
let screenX
let screenY
let offsetX
let centerAnchor
let test
let Rect

API.onResourceStart.connect(() => {
  let UIKit = Object.assign(resource.uikit, resource.uikit.__requireModuleClasses())
  Rect = UIKit.Rect
  test = new Rect({ x: 0, y: 0, w: 100, h: 100 })
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
  // test.draw()
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
  const width = 640
  let rootRect = new Rect({ fromCenter: false, x: ((offsetX * 2) + screenX) - width - 20, y: 173, h: 840, w: width, opacity: 100 })
  menuRects.push(rootRect)

  let gridWidths = {
    wide: 410,
    normal: 200 // 230
  }

  menuRects.push(
    rootRect.getInsetRect({ x: 0, y: 0, w: width, h: 200 }).image({ path: 'img/ponsonbys.png' }),

    // tops
    rootRect.getInsetRect({ x: 10, y: 200 + 10, w: gridWidths.wide, h: 200, color: '#f00' }).image({ path: 'img/Tops-Dark.png' })
      .onHover((rect) => {
        rect
          .image({ path: 'img/Tops.png' })
          .border({ width: 5, opacity: 255, color: '#fff' })
      }, null, { reset: true }),

    // bottoms
    rootRect.getInsetRect({ x: 10, y: 200 + 10 + 200 + 10, w: gridWidths.normal, h: 410, opacity: 0 }).image({ path: 'img/Bottoms-Dark.png' })
      .onHover((rect) => {
        rect
          .image({ path: 'img/Bottoms.png' })
          .border({ width: 5, opacity: 255, color: '#fff' })
      }, null, { reset: true }),

    // hats
    rootRect.getInsetRect({ x: gridWidths.wide + 20, y: 200 + 10, w: gridWidths.normal, h: 200, color: '#f00' }).image({ path: 'img/Hats-Dark.png' })
      .onHover((rect) => {
        rect
          .image({ path: 'img/Hats.png' })
          .border({ width: 5, opacity: 255, color: '#fff' })
      }, null, { reset: true }),

    // Jackets
    rootRect.getInsetRect({ x: gridWidths.normal + 20, y: 200 + gridWidths.normal + 20, w: gridWidths.wide, h: 200, color: '#f00' }).image({ path: 'img/Jackets-Dark.png' })
      .onHover((rect) => {
        rect
          .image({ path: 'img/Jackets.png' })
          .border({ width: 5, opacity: 255, color: '#fff' })
      }, null, { reset: true }),

    // shoes
    rootRect.getInsetRect({ x: gridWidths.normal + 20, y: 630, w: gridWidths.normal, h: 200, color: '#f00' }).image({ path: 'img/Shoes-Dark.png' })
      .onHover((rect) => {
        rect
          .image({ path: 'img/Shoes.png' })
          .border({ width: 5, opacity: 255, color: '#fff' })
      }, null, { reset: true }),

    // bags
    rootRect.getInsetRect({ x: gridWidths.wide + 20, y: 630, w: gridWidths.normal, h: 200, color: '#f00' }).image({ path: 'img/Bags-Dark.png' })
      .onHover((rect) => {
        rect
          .image({ path: 'img/Bags.png' })
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
