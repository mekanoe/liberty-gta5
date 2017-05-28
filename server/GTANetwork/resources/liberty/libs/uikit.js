let CEFKit

API.onResourceStart.connect(() => {
  try {
    CEFKit = exported.require.require.require('@/liberty/cefkit')
  } catch (e) {
    API.sendNotification('~r~~h~Caught require failure. lol.')
  }
})

function getSafeResolution () {
  let offsetX = 0
  let screenX = API.getScreenResolutionMantainRatio().Width
  const screenY = API.getScreenResolutionMantainRatio().Height
  if (screenX / screenY > 1.7777) {
      // aspect ratio is larger than 16:9
    const idealBox = Math.ceil(screenY * 1.7777)
      // ex: 2850 - 1920 == 660 / 2 == 330
    offsetX = (screenX - idealBox) / 2
      // and gotta set the ideal box to make it work
    screenX = idealBox
  }

  return { offsetX, screenX, screenY }
}

function hexToRgb (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

class Rect {
  constructor ({x, y, w, h, color = '#000', opacity = 255, fromCenter = false}) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.opacity = opacity
    this._border = null
    this._image = null
    this._cef = null
    this._renderMainRect = true
    this._onHover = null
    this._onHoverEnd = null
    this._onClick = null
    this.__drawn = false
    this.__hovered = false
    this.__lastDrawHovered = false
    this.color(color)
    this.__debug = false
    let center = rectCoordsFromCenter({x, y, w, h})

    if (fromCenter) {
      this.Xc = x
      this.Yc = y
      this.x = center.x
      this.y = center.y
    } else {
      this.Xc = center.x
      this.Yc = center.y
    }
  }

  __getOriginals () {
    API.sendChatMessage('get originals')
    return Object.assign(Object.create(this), this)
  }

  border ({color = '#fff', width = 10, opacity, opacityDelta = 50} = {}) {
    color = typeof color === 'string' ? hexToRgb(color) : color
    opacity = opacity || Math.min(255, this.opacity + opacityDelta)
    this._border = { color, width, opacity }
    return this
  }

  image ({path, padding = 0, rot = 0.0}) {
    this._image = {
      pos: new Point(this.x + padding, this.y + padding),
      size: new Size(this.w - padding, this.h - padding),
      rot,
      path
    }
    return this
  }

  color (color) {
    this._color = typeof color === 'string' ? hexToRgb(color) : color
    return this
  }

  renderBackground (state) {
    this._renderMainRect = state
    return this
  }

  cef (obj) {
    this._cef = new CEFKit.ExclusiveWindow(Object.assign({}, { x: this.x, y: this.y, w: this.w, h: this.h }, obj))
    return this
  }

  getCef () {
    return this._cef
  }

  __checkHover (point) {
    return point.X > this.x && point.X < (this.x + this.w) && point.Y > this.y && point.Y < (this.y + this.h)
  }

  __checkClick (point) {
    return API.isCursorShown() && this.__hovered && API.isControlJustPressed(237)
  }

  // example fn: function(rect) {  }
  onHover (fn, thisArg = null, { once = false, reset = false } = {}) {
    if (fn === null || fn === undefined) {
      return this.removeHoverEvent()
    }
    this._onHover = fn.bind(thisArg, this)
    if (once) {
      this._onHover = (rect) => {
        this.removeHoverEvent()
        fn.call(thisArg, this)
      }
    }

    if (reset) {
      this.resetOnHoverEnd()
    }
    return this
  }

  onHoverEnd (fn, thisArg = null) {
    if (fn === null || fn === undefined) {
      return this.removeHoverEndEvent()
    }
    this._onHoverEnd = fn.bind(thisArg, this)
    return this
  }

  onClick (fn, thisArg = null) {
    if (fn === null || fn === undefined) {
      return this.removeClickEvent()
    }
    this._onClick = fn.bind(thisArg, this)
    return this
  }

  removeClickEvent () {
    this._onClick = null
    return this
  }

  removeHoverEvent () {
    this._onHover = null
    return this
  }

  removeHoverEndEvent () {
    this._onHoverEnd = null
    return this
  }

  resetEvents () {
    this.__hovered = false
    this.__lastDrawHovered = false
    return this
  }

  resetOnHoverEnd () {
    const origKeys = [ 'x', 'y', 'w', 'h', 'opacity', '_border', '_image', '_onHover', '_color' ]
    const orig = {}
    for (let key of origKeys) {
      orig[key] = this[key]
    }

    this._onHoverEnd = (rect) => {
      for (let key of origKeys) {
        this[key] = orig[key]
      }

      this.resetOnHoverEnd()
    }
  }

  getInsetRect (obj) {
    // API.sendChatMessage('inset rect')
    obj.x = this.x + (obj.x || 0)
    obj.y = this.y + (obj.y || 0)
    return new Rect(obj)
  }

  debug () {
    this.__debug = true
    return this
  }

  draw () {
    const cursor = API.getCursorPositionMantainRatio()

    // if (this.__debug) debugSubtitle({ Cx: cursor.x, Cy: cursor.y })

    this.__lastDrawHovered = this.__hovered

    if (this._onHover !== null && this.__checkHover(cursor)) {
      this.__hovered = true
      this._onHover()
    } else {
      this.__hovered = false
    }

    if (this._onHoverEnd !== null && this.__lastDrawHovered && !this.__hovered) {
      try {
        this._onHoverEnd()
      } catch (e) {
        API.sendChatMessage(e.stack)
      }
    }

    if (this._onClick !== null && this.__checkClick(cursor)) {
      this._onClick()
    }

    if (this._renderMainRect) {
      API.drawRectangle(this.x, this.y, this.w, this.h, this._color.r, this._color.g, this._color.b, this.opacity)
    }

    if (this._border !== null) {
      const bw = this._border.width
      const bc = this._border.color
      // top
      API.drawRectangle(this.x - bw, this.y - bw, this.w + (bw * 2), bw, bc.r, bc.g, bc.b, this._border.opacity)
      // bottom
      API.drawRectangle(this.x - bw, this.y + this.h, this.w + (bw * 2), bw, bc.r, bc.g, bc.b, this._border.opacity)
      // left
      API.drawRectangle(this.x - bw, this.y, bw, this.h, bc.r, bc.g, bc.b, this._border.opacity)
      // right
      API.drawRectangle(this.x + this.w, this.y, bw, this.h, bc.r, bc.g, bc.b, this._border.opacity)
    }

    if (this._image !== null) {
      API.dxDrawTexture(this._image.path, this._image.pos, this._image.size, this._image.rot)
    }

    if (this._cef !== null && !this._cef.active) {
      this._cef.activate()
    }
  }
}

function rectCoordsFromCenter ({x, y, w, h}) {
  return {
    x: Math.round(x - (w * 0.5)),
    y: Math.round(y - (h * 0.5)),
    w,
    h,
    _ox: x,
    _oy: y
  }
}

function __requireModuleClasses () {
  return {
    Rect
  }
}

const ___exported = { rectCoordsFromCenter, hexToRgb, Rect, getSafeResolution, __requireModuleClasses } // eslint-disable-line no-unused-vars
