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

function debugSubtitle (obj) {
  let vals = []

  Object.keys(obj).forEach(v => {
    vals.push(`~b~${v}:~w~ ${obj[v]}`)
  })

  API.displaySubtitle(vals.join(' '))
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

function rectWithBorder ({x, y, w, h, color, opacity, borderWidth = 10, borderColor = '#fff'}) {
  const bw = borderWidth // shortcut
  color = typeof color === 'string' ? hexToRgb(color) : color
  borderColor = typeof borderColor === 'string' ? hexToRgb(borderColor) : borderColor
  // draw main rect
  // debugSubtitle({x, y, w, h})
  API.drawRectangle(x, y, w, h, color.r, color.g, color.b, opacity)

  // top
  API.drawRectangle(x - bw, y - bw, w + (bw * 2), bw, borderColor.r, borderColor.g, borderColor.b, Math.min(255, opacity + 50))
  // bottom
  API.drawRectangle(x - bw, y + h, w + (bw * 2), bw, borderColor.r, borderColor.g, borderColor.b, Math.min(255, opacity + 50))
  // left
  API.drawRectangle(x - bw, y, bw, h, borderColor.r, borderColor.g, borderColor.b, Math.min(255, opacity + 50))
  // right
  API.drawRectangle(x + w, y, bw, h, borderColor.r, borderColor.g, borderColor.b, Math.min(255, opacity + 50))

}

const exported = { rectWithBorder, rectCoordsFromCenter, hexToRgb, debugSubtitle } // eslint-disable-line
