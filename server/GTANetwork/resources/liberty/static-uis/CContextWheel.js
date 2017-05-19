let UIKit
const screenSize = API.getScreenResolutionMantainRatio()
const centerAnchor = {
  x: screenSize.Width / 2,
  y: screenSize.Height / 2
}
const sideBox = {
  w: 250,
  h: 75
}
let boxOffsets = {
  x: 240,
  y: 45
}
const quadOpacity = 75
let boxCoords = {}
let ready = false

API.onResourceStart.connect(() => {
  UIKit = resource.uikit

  boxCoords.center = UIKit.rectCoordsFromCenter({ x: centerAnchor.x, y: centerAnchor.y, w: 200, h: 200 })

  boxCoords.top = UIKit.rectCoordsFromCenter({ x: centerAnchor.x, y: centerAnchor.y - 150, w: sideBox.w, h: sideBox.h })
  boxCoords.bottom = UIKit.rectCoordsFromCenter({ x: centerAnchor.x, y: centerAnchor.y + 150, w: sideBox.w, h: sideBox.h })

  boxCoords.upperLeft = UIKit.rectCoordsFromCenter({ x: centerAnchor.x - boxOffsets.x, y: centerAnchor.y - boxOffsets.y, w: sideBox.w, h: sideBox.h })
  boxCoords.upperRight = UIKit.rectCoordsFromCenter({ x: centerAnchor.x + boxOffsets.x, y: centerAnchor.y - boxOffsets.y, w: sideBox.w, h: sideBox.h })

  boxCoords.lowerLeft = UIKit.rectCoordsFromCenter({ x: centerAnchor.x - boxOffsets.x, y: centerAnchor.y + boxOffsets.y, w: sideBox.w, h: sideBox.h })
  boxCoords.lowerRight = UIKit.rectCoordsFromCenter({ x: centerAnchor.x + boxOffsets.x, y: centerAnchor.y + boxOffsets.y, w: sideBox.w, h: sideBox.h })

  ready = true
})

API.onUpdate.connect(() => {
  if (!ready) {
    return
  }

  drawBoxes()
  drawVehicleText()
})

function drawVehicleText () {
  let textQuadrants = {
    upperLeft: 'Open/Close Hood',
    upperRight: 'Open/Close Trunk',
    lowerLeft: 'Lock/Unlock Doors',
    lowerRight: 'Inventory'
  }

  Object.keys(textQuadrants).forEach((k) => {
    let pos = boxCoords[k]
    API.drawText(textQuadrants[k], pos._ox, pos._oy - (pos.h * 0.2), 0.35, 255, 255, 255, 255, 0, 1, false, true, 1000)
  })
}

function drawBoxes ({ color = '#fff', top = false, bottom = false } = {}) {
  UIKit.rectWithBorder(Object.assign({}, {
    color: '#000',
    opacity: 170,
    borderColor: color,
    borderWidth: 2
  }, boxCoords.center))

  UIKit.rectWithBorder(Object.assign({}, {
    color: '#000',
    opacity: quadOpacity,
    borderColor: '#aaa',
    borderWidth: 2
  }, boxCoords.upperRight))
  UIKit.rectWithBorder(Object.assign({}, {
    color: '#000',
    opacity: quadOpacity,
    borderColor: '#aaa',
    borderWidth: 2
  }, boxCoords.upperLeft))
  UIKit.rectWithBorder(Object.assign({}, {
    color: '#000',
    opacity: quadOpacity,
    borderColor: '#aaa',
    borderWidth: 2
  }, boxCoords.lowerRight))
  UIKit.rectWithBorder(Object.assign({}, {
    color: '#000',
    opacity: quadOpacity,
    borderColor: '#aaa',
    borderWidth: 2
  }, boxCoords.lowerLeft))

  if (top) {
    UIKit.rectWithBorder(Object.assign({}, {
      color: '#000',
      opacity: quadOpacity,
      borderColor: '#aaa',
      borderWidth: 2
    }, boxCoords.top))
  }

  if (bottom) {
    UIKit.rectWithBorder(Object.assign({}, {
      color: '#000',
      opacity: quadOpacity,
      borderColor: '#aaa',
      borderWidth: 2
    }, boxCoords.bottom))
  }
}
