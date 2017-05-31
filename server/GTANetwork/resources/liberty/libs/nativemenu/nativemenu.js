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

const panelMinX = (screenX / 32)
const panelMinY = (screenY / 18)
let notification = null
let notifications = []
let textnotification = null
let textnotifications = []
let padding = 10
let selectedInput = null
let tabIndex = []
let menuElements = []
let isReady = false
let currentPage = 0
let clickDelay = new Date().getTime()

API.onUpdate.connect(() => {
    // Notifications can be global.
  drawNotification()
  drawTextNotification()
  if (!isReady) {
    return
  }
  if (menuElements.length < 1) {
    return
  }
  if (currentPage === null) {
    return
  }
  if (!Array.isArray(menuElements[currentPage])) {
    return
  }
  if (menuElements[currentPage].length < 1) {
    return
  }
  for (var i = 0; i < menuElements[currentPage].length; i++) {
    menuElements[currentPage][i].draw()
    menuElements[currentPage][i].isHovered()
    menuElements[currentPage][i].isClicked()
  }
    // 0 - 1
    // Page - Page
    // Panel - Panel
    // Panel - Panel
    // Panel - Panel
})

function createMenu (pages) {
  var menu = new Menu(pages)
  return menu
}

class Menu {
  constructor (pages) {
    if (Array.isArray(menuElements[0])) {
      return
    }
    for (var i = 0; i < pages; i++) {
      var emptyArray = []
      menuElements.push(emptyArray)
    }
    this._blur = false

    Object.defineProperty(this, 'Ready', {
      get: function () {
        return isReady
      },
            /** Start drawing our menu. */
      set: function (value) {
        isReady = value
      },
      enumerable: true,
      configurable: true
    })

    Object.defineProperty(this, 'Blur', {
      get: function () {
        return this._blur
      },
            /** Used to blur the background behind the menu. */
      set: function (value) {
        this._blur = value
        if (value) {
          API.callNative('_TRANSITION_TO_BLURRED', 3000)
        } else {
          API.callNative('_TRANSITION_FROM_BLURRED', 3000)
        }
      },
      enumerable: true,
      configurable: true
    })

    Object.defineProperty(this, 'DisableOverlays', {
      get: function () {
        return this._overlays
      },
      set: function (value) {
        this._overlays = value
        if (value) {
          API.setHudVisible(false)
          API.setChatVisible(false)
          API.setCanOpenChat(false)
        } else {
          API.setHudVisible(true)
          API.setChatVisible(true)
          API.setCanOpenChat(true)
        }
      },
      enumerable: true,
      configurable: true
    })
  }

  nextPage () {
    if (currentPage + 1 > menuElements.length - 1) {
      currentPage = 0
      return
    }
    currentPage++
  }

  prevPage () {
    if (currentPage - 1 < 0) {
      currentPage = menuElements.length - 1
      return
    }
    currentPage--
  }

  createPanel (page, xStart, yStart, xGridWidth, yGridHeight) {
    var newPanel = new Panel(page, xStart, yStart, xGridWidth, yGridHeight)
    menuElements[page].push(newPanel)
    return newPanel
  }
}

class PlayerTextNotification {
  constructor (text) {
    var playerPos = API.getEntityPosition(API.getLocalPlayer()).Add(new Vector3(0, 0, 1))
    var point = API.worldToScreenMantainRatio(playerPos)
    this._xPos = (Point.Round(point).X) + offsetX
    this._yPos = Point.Round(point).Y
    this._drawing = true
    this._alpha = 255
    this._text = text
    this._increment = -1
    this._lastUpdateAlpha = new Date().getTime()
    this._lastUpdateTextPosition = new Date().getTime()
    this._r = 0
    this._g = 0
    this._b = 0
  }

  draw () {
    if (!this._drawing) {
      return
    }
    if (new Date().getTime() > this._lastUpdateAlpha + 35) {
      this._lastUpdateAlpha = new Date().getTime()
      this._alpha -= 5
    }
    if (new Date().getTime() > this._lastUpdateTextPosition + 100) {
      this._yPos -= 0.3
    }
    API.drawText(this._text, this._xPos, this._yPos, 0.4, this._r, this._g, this._b, this._alpha, 4, 1, true, true, 500)
    if (this._alpha <= 0) {
      this.cleanUpNotification()
    }
  }

  setColor (r, g, b) {
    this._r = r
    this._g = g
    this._b = b
  }

  cleanUpNotification () {
    this._drawing = false
    textnotification = null
  }

  returnType () {
    return 'PlayerTextNotification'
  }
}

class ProgressBar {
  constructor (x, y, width, height, currentProgress) {
    this._xPos = (x * panelMinX) + offsetX
    this._yPos = y * panelMinY
    this._width = (width * panelMinX - 10) - offsetX
    this._height = height * panelMinY - 10
    this._currentProgress = currentProgress
    this._r = 0
    this._g = 0
    this._b = 0
  }

  draw () {
    API.drawRectangle(this._xPos + 5, this._yPos + 5, ((this._width / 100) * this._currentProgress), this._height, this._r, this._g, this._b, 225)
    API.drawText('' + Math.round(this._currentProgress), this._xPos + (((this._width / 100) * this._currentProgress) / 2), this._yPos, 0.5, 255, 255, 255, 255, 4, 1, false, true, 100)
  }

  setColor (r, g, b) {
    this._r = r
    this._g = g
    this._b = b
  }

  addProgress (value) {
    if (this._currentProgress + value > 100) {
      this._currentProgress = 100
      return
    }
    this._currentProgress += value
  }

  subtractProgress (value) {
    if (this._currentProgress - value < 0) {
      this._currentProgress = 0
      return
    }
    this._currentProgress -= value
  }

  setProgressAmount (value) {
    if (value >= 100) {
      this._currentProgress = 100
      return
    }
    if (value <= 0) {
      this._currentProgress = 0
      return
    }
    this._currentProgress = value
  }

  returnProgressAmount () {
    return this._currentProgress
  }

  returnType () {
    return 'ProgressBar'
  }
}

class Notification {
  constructor (text, displayTime) {
    this._currentPosX = 26 * panelMinX // Starting Position
    this._currentPosY = screenY // Starting Position Y
    this._targetX = 26 * panelMinX // Ending Position
    this._targetY = 15 * panelMinY // Ending Position Y
    this._width = panelMinX * 5
    this._height = panelMinY * 3
        // Text Settings
    this._text = text
    this._r = 255
    this._g = 165
    this._b = 0
    this._offset = 0
    this._textScale = 0.5
        // Animation Settings
    this._lastUpdateTime = new Date().getTime() // ms
    this._alpha = 255
    this._displayTime = displayTime
    this._incrementer = 0
        // Sound Settings
    this._sound = true
  }

  draw () {
    if (notification !== this) {
      return
    }
    if (this._sound) {
      this._sound = false
      API.playSoundFrontEnd('GOLF_NEW_RECORD', 'HUD_AWARDS')
    }
        // Starts below max screen.
    API.drawRectangle(this._currentPosX, this._currentPosY - 5, this._width, 5, this._r, this._g, this._b, this._alpha - 30)
    API.drawRectangle(this._currentPosX, this._currentPosY, this._width, this._height, 0, 0, 0, this._alpha - 30)
    API.drawText(this._text, this._offset + this._currentPosX + (this._width / 2), this._currentPosY + (this._height / 4), this._textScale, 255, 255, 255, this._alpha, 4, 1, false, false, this._width - padding)
    this.animate()
  }

  animate () {
        // Did we reach our goal?
    if (this._currentPosY <= this._targetY) {
      this._currentPosY = this._targetY
            // Ready to fade?
      if (new Date().getTime() > this._lastUpdateTime + this._displayTime) {
        this.fade()
        return
      }
      return
    }
    this._lastUpdateTime = new Date().getTime()
        // If not let's reach our goal.
    if (this._currentPosY <= this._targetY + (this._height / 6)) {
      this._currentPosY -= 3
    } else {
      this._currentPosY -= 5
    }
  }

  fade () {
    if (this._alpha <= 0) {
      this.cleanUpNotification()
      return
    }
    this._alpha -= 5
  }

  cleanUpNotification () {
    notification = null
  }
  setText (value) {
    this._text = value
  }
  setColor (r, g, b) {
    this._r = r
    this._g = g
    this._b = b
  }
  setTextScale (value) {
    this._textScale = value
  }
  isHovered () {

  }
  isClicked () {

  }
  returnType () {
    return 'Notification'
  }
}

class TextElement {
  constructor (text, x, y, width, height, line) {
    this._xPos = (x)
    this._yPos = y + (panelMinY * line)
    this._width = width
    this._height = height
    this._text = text
    this._fontScale = 0.6
    this._centered = false
    this._centeredVertically = false
    this._font = 4
    this._fontR = 255
    this._fontG = 255
    this._fontB = 255
    this._fontAlpha = 255
    this._hoverTextAlpha = 255
    this._hoverTextR = 255
    this._hoverTextG = 255
    this._hoverTextB = 255
    this._offset = 0
    this._padding = 10
    this._hovered = false
    this._shadow = false
    this._outline = false

    Object.defineProperty(this, 'Hovered', {
      get: function () {
        return this._hovered
      },
            //* * Is this text element in a hover state? */
      set: function (value) {
        this._hovered = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'R', {
            /** Gets the color for RGB of R type. */
      get: function () {
        return this._fontR
      },
            /** Sets the color for RGB of R type. Max of 255 */
      set: function (value) {
        this._fontR = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'G', {
            /** Gets the color for RGB of G type. */
      get: function () {
        return this._fontG
      },
            /** Sets the color for RGB of G type. Max of 255 */
      set: function (value) {
        this._fontG = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'B', {
            /** Gets the color for RGB of B type. */
      get: function () {
        return this._fontB
      },
            /** Sets the color for RGB of B type. Max of 255 */
      set: function (value) {
        this._fontB = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Alpha', {
      get: function () {
        return this._fontAlpha
      },
            /** Sets the font Alpha property */
      set: function (value) {
        this._fontAlpha = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverAlpha', {
      get: function () {
        return this._hoverTextAlpha
      },
            /** Sets the font Alpha property */
      set: function (value) {
        this._hoverTextAlpha = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverR', {
      get: function () {
        return this._hoverTextR
      },
            /** Sets the hover color for the text RGB of R type. */
      set: function (value) {
        this._hoverTextR = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverG', {
      get: function () {
        return this._hoverTextG
      },
            /** Sets the hover color for the text RGB of G type. */
      set: function (value) {
        this._hoverTextG = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverB', {
      get: function () {
        return this._hoverTextB
      },
            /** Sets the hover color for the text RGB of B type. */
      set: function (value) {
        this._hoverTextB = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Font', {
      get: function () {
        return this._font
      },
            /** Set your font type. 0 - 7
            * 0 Normal
            * 1 Cursive
            * 2 All Caps
            * 3 Squares / Arrows / Etc.
            * 4 Condensed Normal
            * 5 Garbage
            * 6 Condensed Normal
            * 7 Bold GTA Style
            */
      set: function (value) {
        this._font = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'FontScale', {
      get: function () {
        return this._fontScale
      },
            /** Sets the size of the text. 0.6 is pretty normal. 1 is quite large. */
      set: function (value) {
        this._fontScale = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'VerticalCentered', {
      get: function () {
        return this._centeredVertically
      },
            /** Centers the content vertically. Do not use if your box is not very high to begin with */
      set: function (value) {
        this._centeredVertically = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Centered', {
      get: function () {
        return this._centered
      },
            /** Use this if you want centered content. */
      set: function (value) {
        this._centered = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Offset', {
      get: function () {
        return this._offset
      },
      set: function (value) {
        this._offset = value
      },
      enumerable: true,
      configurable: true
    })
  }

  draw () {
    if (this._centered && this._centeredVertically) {
      this.drawAsCenteredAll()
      return
    }
    if (this._centered) {
      this.drawAsCentered()
      return
    }
    if (this._centeredVertically) {
      this.drawAsCenteredVertically()
      return
    }
    this.drawAsNormal()
  }

    //* * Sets the color of the main text. A = Alpha */
  Color (r, g, b, a) {
    this._fontR = r
    this._fontG = g
    this._fontB = b
    this._fontAlpha = a
  }

  drawAsCenteredAll () {
    if (this._hovered) {
      API.drawText(this._text, this._offset + this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 20, this._fontScale, this._hoverTextR, this._hoverTextG, this._hoverTextB, this._hoverTextAlpha, this._font, 1, this._shadow, this._outline, this._width)
      return
    }
    API.drawText(this._text, this._offset + this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 20, this._fontScale, this._fontR, this._fontG, this._fontB, this._fontAlpha, this._font, 1, this._shadow, this._outline, this._width)
  }
  drawAsCenteredVertically () {
    if (this._hovered) {
      API.drawText(this._text, this._offset + this._xPos, this._yPos + (this._height / 2) - 20, this._fontScale, this._hoverTextR, this._hoverTextG, this._hoverTextB, this._hoverTextAlpha, this._font, 0, this._shadow, this._outline, this._width)
      return
    }
    API.drawText(this._text, this._offset + this._xPos, this._yPos + (this._height / 2) - 20, this._fontScale, this._fontR, this._fontG, this._fontB, this._fontAlpha, this._font, 0, this._shadow, this._outline, this._width)
  }
  drawAsCentered () {
    if (this._hovered) {
      API.drawText(this._text, this._offset + this._xPos + (this._width / 2), this._padding + this._yPos, this._fontScale, this._hoverTextR, this._hoverTextG, this._hoverTextB, this._hoverTextAlpha, this._font, 1, this._shadow, this._outline, this._width)
      return
    }
    API.drawText(this._text, this._offset + this._xPos + (this._width / 2), this._padding + this._yPos, this._fontScale, this._fontR, this._fontG, this._fontB, this._fontAlpha, this._font, 1, this._shadow, this._outline, this._width)
  }
  drawAsNormal () {
    if (this._hovered) {
      API.drawText(this._text, this._offset + this._xPos + this._padding, this._yPos + this._padding, this._fontScale, this._hoverTextR, this._hoverTextG, this._hoverTextB, this._hoverTextAlpha, this._font, 0, this._shadow, this._outline, this._width - this._padding)
      return
    }
    API.drawText(this._text, this._offset + this._xPos + this._padding, this._yPos + this._padding, this._fontScale, this._fontR, this._fontG, this._fontB, this._fontAlpha, this._font, 0, this._shadow, this._outline, this._width - this._padding)
  }
}

class Panel {
  constructor (page, x, y, width, height) {
    this._page = page
    this._padding = 10
    this._xPos = (x * panelMinX) + offsetX
    this._yPos = y * panelMinY
    this._width = width * panelMinX
    this._height = height * panelMinY
    this._alpha = 225
    this._header = false
    this._offset = 0
    this._r = 0
    this._g = 0
    this._b = 0
    this._textLines = []
    this._inputPanels = []
    this._currentLine = 0
    this._shadow = false
    this._outline = false
    this._tooltip = null
    this._hovered = false
    this._hoverTime = 0
    this._hoverR = 0
    this._hoverG = 0
    this._hoverB = 0
    this._hoverAlpha = 200
    this._backgroundImage = null
    this._backgroundImagePadding = 0
    this._function = null
    this._functionArgs = []
    this._functionAudioLib = 'Click'
    this._functionAudioName = 'DLC_HEIST_HACKING_SNAKE_SOUNDS'
    this._hoverAudioLib = 'Cycle_Item'
    this._hoverAudioName = 'DLC_Dmod_Prop_Editor_Sounds'
    this._hoverAudio = true
    this._functionClickAudio = true
    this._hoverable = false
    this._line = 0

    Object.defineProperty(this, 'Function', {
            // Function Settings
      get: function () {
        return this._function
      },
      set: function (value) {
        this._function = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverAudioLib', {
      get: function () {
        return this._hoverAudioLib
      },
            // HOVER AUDIO
            /** Sets the hover audio library. Ex: "Cycle_Item" */
      set: function (value) {
        this._hoverAudioLib = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverAudioName', {
      get: function () {
        return this._hoverAudioName
      },
            /** Sets the hover audio name. Ex: "DLC_Dmod_Prop_Editor_Sounds" */
      set: function (value) {
        this._hoverAudioName = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'FunctionAudioLib', {
      get: function () {
        return this._functionAudioLib
      },
            // FUNCTION AUDIO
            /** Sets the function audio library. Ex: "Cycle_Item" */
      set: function (value) {
        this._functionAudioLib = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'FunctionAudioName', {
      get: function () {
        return this._functionAudioName
      },
            /** Sets the function audio name. Ex: "DLC_Dmod_Prop_Editor_Sounds" */
      set: function (value) {
        this._functionAudioName = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'FunctionAudio', {
      get: function () {
        return this._functionClickAudio
      },
            /** Sets if the function audio plays. */
      set: function (value) {
        this._functionClickAudio = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'MainAlpha', {
      get: function () {
        return this._alpha
      },
            // Background Alpha
            /** Sets the background alpha property */
      set: function (value) {
        this._alpha = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'MainBackgroundImagePadding', {
      get: function () {
        return this._backgroundImagePadding
      },
            /** Sets the background image padding property */
      set: function (value) {
        this._backgroundImagePadding = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'MainBackgroundImage', {
      get: function () {
        return this._backgroundImage
      },
            /** Uses a custom image for your panel background. Must include extension. EX. 'clientside/image.jpg' */
      set: function (value) {
        this._backgroundImage = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'MainColorR', {
            /** Gets the color for RGB of R type. */
      get: function () {
        return this._r
      },
            /** Sets the color for RGB of R type. Max of 255 */
      set: function (value) {
        this._r = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'MainColorG', {
            /** Gets the color for RGB of G type. */
      get: function () {
        return this._g
      },
            /** Sets the color for RGB of G type. Max of 255 */
      set: function (value) {
        this._g = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'MainColorB', {
            /** Gets the color for RGB of B type. */
      get: function () {
        return this._b
      },
            /** Sets the color for RGB of B type. Max of 255 */
      set: function (value) {
        this._b = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Hoverable', {
      get: function () {
        return this._hoverable
      },
            /** Is there a hover state? */
      set: function (value) {
        this._hoverable = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverAlpha', {
      get: function () {
        return this._hoverAlpha
      },
            /** Sets the hover alpha */
      set: function (value) {
        this._hoverAlpha = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverR', {
      get: function () {
        return this._hoverR
      },
            /** Sets the hover color for RGB of R type. */
      set: function (value) {
        this._hoverR = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverG', {
      get: function () {
        return this._hoverG
      },
            /** Sets the hover color for RGB of G type. */
      set: function (value) {
        this._hoverG = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverB', {
      get: function () {
        return this._hoverB
      },
            /** Sets the hover color for RGB of B type. */
      set: function (value) {
        this._hoverB = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'FontOutline', {
      get: function () {
        return this._outline
      },
            /** Sets the font Outline property */
      set: function (value) {
        this._outline = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'FontShadow', {
      get: function () {
        return this._shadow
      },
            /** Sets the font Shadow property */
      set: function (value) {
        this._shadow = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Tooltip', {
      get: function () {
        return this._tooltip
      },
            /** Sets the Tooltip text for your element. */
      set: function (value) {
        this._tooltip = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Header', {
      get: function () {
        return this._header
      },
            /** Adds a stylized line under your your box. */
      set: function (value) {
        this._header = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Offset', {
      get: function () {
        return this._offset
      },
            /** If your text needs to be pushed in a certain direction either add or remove pixels here. */
      set: function (value) {
        this._offset = value
      },
      enumerable: true,
      configurable: true
    })
  }

  draw () {
    if (this._page !== currentPage) {
      return
    }
    this.drawRectangles()
        // Only used if using text lines.
    if (this._textLines.length > 0) {
      for (let i = 0; i < this._textLines.length; i++) {
        this._textLines[i].draw()
      }
    }
        // Only used if using input panels.
    if (this._inputPanels.length > 0) {
      for (let i2 = 0; i2 < this._inputPanels.length; i2++) {
        this._inputPanels[i2].draw()
      }
    }
  }
    // Normal Versions
  drawRectangles () {
    if (this._backgroundImage !== null) {
      this.drawBackgroundImage()
      return
    }
    if (this._hovered) {
      API.drawRectangle(this._xPos, this._yPos, this._width, this._height, this._hoverR, this._hoverG, this._hoverB, this._hoverAlpha)
      if (this._header) {
        API.drawRectangle(this._xPos, this._yPos + this._height - 5, this._width, 5, 255, 255, 255, 50)
      }
      return
    }
    API.drawRectangle(this._xPos, this._yPos, this._width, this._height, this._r, this._g, this._b, this._alpha)
    if (this._header) {
      API.drawRectangle(this._xPos, this._yPos + this._height - 5, this._width, 5, 255, 255, 255, 50)
    }
  }
  drawBackgroundImage () {
    if (this._backgroundImagePadding > 1) {
      API.dxDrawTexture(this._backgroundImage, new Point(this._xPos + this._backgroundImagePadding, this._yPos + this._backgroundImagePadding), new Size(this._width - (this._backgroundImagePadding * 2), this._height - (this._backgroundImagePadding * 2)), 0)
      API.drawRectangle(this._xPos, this._yPos, this._width, this._height, this._r, this._g, this._b, this._alpha)
      return
    }
    API.dxDrawTexture(this._backgroundImage, new Point(this._xPos, this._yPos), new Size(this._width, this._height), 0)
  }

  addFunctionArgs (value) {
    this._functionArgs = value
  }

  MainBackgroundColor (r, g, b, alpha) {
    this._r = r
    this._g = g
    this._b = b
    this._alpha = alpha
  }
    /** Sets the RGB Color of Hover */
  HoverBackgroundColor (r, g, b, alpha) {
    this._hoverR = r
    this._hoverG = g
    this._hoverB = b
    this._hoverAlpha = alpha
  }

  addText (value) {
    var textElement = new TextElement(value, this._xPos, this._yPos, this._width, this._height, this._line)
    this._textLines.push(textElement)
    this._line += 1
    return textElement
  }
    /**
     *
     * @param x - Start position of X inside the panel.
     * @param y - Start Position of Y inside the panel.
     * @param width - How wide. Generally the width of your panel.
     * @param height - How tall. 1 or 2 is pretty normal.
     */
  addInput (x, y, width, height) {
    var inputPanel = new InputPanel(this._page, (x * panelMinX) + this._xPos, (y * panelMinY) + this._yPos, width, height)
    this._inputPanels.push(inputPanel)
    return inputPanel
  }
    // Hover Action
  isHovered () {
    if (!API.isCursorShown()) {
      return
    }
    if (!this._hoverable) {
      return
    }
    var cursorPos = API.getCursorPositionMantainRatio()
    if (cursorPos.X > this._xPos && cursorPos.X < (this._xPos + this._width) && cursorPos.Y > this._yPos && cursorPos.Y < this._yPos + this._height) {
      if (!this._hovered) {
        this._hovered = true
        this.setTextHoverState(true)
        if (this._hoverAudio) {
          API.playSoundFrontEnd(this._hoverAudioLib, this._hoverAudioName)
        }
      }
      this._hoverTime += 1
      if (this._hoverTime > 50) {
        if (this._tooltip === null) {
          return
        }
        if (this._tooltip.length > 1) {
          API.drawText(this._tooltip, cursorPos.X + 25, cursorPos.Y, 0.4, 255, 255, 255, 255, 4, 0, true, true, 200)
        }
      }
      return
    }
    this._hovered = false
    this._hoverTime = 0
    this.setTextHoverState(false)
  }
    // Click Action
  isClicked () {
        // Is there even a cursor?
    if (!API.isCursorShown()) {
      return
    }
        // Is there a function if they click it?
    if (this._function === null) {
      return
    }
        // Are they even left clicking?
    if (API.isControlJustPressed(237)) {
      var cursorPos = API.getCursorPositionMantainRatio()
      if (cursorPos.X > this._xPos && cursorPos.X < (this._xPos + this._width) && cursorPos.Y > this._yPos && cursorPos.Y < this._yPos + this._height) {
        if (new Date().getTime() < clickDelay + 200) {
          return
        }
        clickDelay = new Date().getTime()
        if (this._functionClickAudio) {
          API.playSoundFrontEnd(this._functionAudioLib, this._functionAudioName)
        }
        if (this._functionArgs !== null || this._functionArgs.length > 1) {
          this._function(this._functionArgs)
        } else {
          this._function()
        }
      }
    }
  }
  setTextHoverState (value) {
    for (var i = 0; i < this._textLines.length; i++) {
      this._textLines[i].Hovered = value
    }
  }
    // Type
  returnType () {
    return 'Panel'
  }
}

class InputPanel {
  constructor (page, x, y, width, height) {
    this._xPos = x
    this._yPos = y
    this._width = width * panelMinX
    this._height = height * panelMinY
    this._protected = false
    this._input = ''
    this._hovered = false
    this._selected = false
    this._numeric = false
    this._isError = false
    this._isTransparent = false
    this._r = 255
    this._g = 255
    this._b = 255
    this._alpha = 100
    this._hoverR = 255
    this._hoverG = 255
    this._hoverB = 255
    this._hoverAlpha = 125
    this._selectR = 255
    this._selectG = 255
    this._selectB = 255
    this._selectAlpha = 125
    this._inputAudioLib = 'Click'
    this._inputAudioName = 'DLC_HEIST_HACKING_SNAKE_SOUNDS'
    this._page = page
    tabIndex.push(this)

    Object.defineProperty(this, 'isError', {
      get: function () {
        return this._isError
      },
            /** Sets whether or not there is an error. */
      set: function (value) {
        this._isError = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Selected', {
      get: function () {
        return this._selected
      },
            /** Sets whether or not this input is selected. */
      set: function (value) {
        this._selected = value
        if (value) {
          selectedInput = this
        } else {
          selectedInput = null
        }
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverR', {
      get: function () {
        return this._hoverR
      },
            // Hover BACKGROUND PARAMETERS
            /** Set R of RGB on hover background. */
      set: function (value) {
        this._hoverR = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverG', {
      get: function () {
        return this._hoverG
      },
            /** Set G of RGB on hover background. */
      set: function (value) {
        this._hoverG = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverB', {
      get: function () {
        return this._hoverB
      },
            /** Set B of RGB on hover background. */
      set: function (value) {
        this._hoverB = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'HoverAlpha', {
      get: function () {
        return this._hoverAlpha
      },
            /** Set Alpha of RGB on hover background. */
      set: function (value) {
        this._hoverAlpha = value
      },
      enumerable: true,
      configurable: true
    })

    Object.defineProperty(this, 'R', {
      get: function () {
        return this._r
      },
            /** Set R of RGB on main background. */
      set: function (value) {
        this._r = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'G', {
      get: function () {
        return this._g
      },
            /** Set G of RGB on main background. */
      set: function (value) {
        this._g = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'B', {
      get: function () {
        return this._b
      },
            /** Set B of RGB on main background. */
      set: function (value) {
        this._b = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Alpha', {
      get: function () {
        return this._alpha
      },
            /** Set Alpha of RGB on main background. */
      set: function (value) {
        this._alpha = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'SelectR', {
      get: function () {
        return this._selectR
      },
            // SELECTION BACKGROUND PARAMETERS
            /** Set R of RGB on main background. */
      set: function (value) {
        this._selectR = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'SelectG', {
      get: function () {
        return this._selectG
      },
            /** Set G of RGB on main background. */
      set: function (value) {
        this._selectG = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'SelectB', {
      get: function () {
        return this._selectB
      },
            /** Set B of RGB on main background. */
      set: function (value) {
        this._selectB = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'SelectAlpha', {
      get: function () {
        return this._selectAlpha
      },
            /** Set Alpha of RGB on main background. */
      set: function (value) {
        this._selectAlpha = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Input', {
            /** Returns whatever the current input is. */
      get: function () {
        return this._input
      },
            /** Sets the input text. */
      set: function (value) {
        this._input = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'NumericOnly', {
      get: function () {
        return this._numeric
      },
            /** Set whether the input should be numeric only. */
      set: function (value) {
        this._numeric = value
      },
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(this, 'Protected', {
      get: function () {
        return this._protected
      },
            /**
             *  Sets whether the input should be protected or not. */
      set: function (value) {
        this._protected = value
      },
      enumerable: true,
      configurable: true
    })
  }

  MainBackgroundColor (r, g, b, alpha) {
    this._r = r
    this._g = g
    this._b = b
    this._alpha = alpha
  }
  HoverBackgroundColor (r, g, b, alpha) {
    this._hoverR = r
    this._hoverG = g
    this._hoverB = b
    this._hoverAlpha = alpha
  }
  SelectBackgroundColor (r, g, b, alpha) {
    this._selectR = r
    this._selectG = g
    this._selectB = b
    this._selectAlpha = alpha
  }
  removeFromInput () {
    this._input = this._input.substring(0, this._input.length - 1)
  }

  draw () {
    if (this._selected) {
      this.selectedDraw()
    }
    if (this._hovered) {
      this.hoveredDraw()
    }
    if (!this._hovered && !this._selected) {
      this.normalDraw()
    }
    this.isHovered()
    this.isClicked()
  };
  normalDraw () {
    if (this._isError) {
      API.drawRectangle(this._xPos + 10, this._yPos + 10, this._width - 20, this._height - 20, 255, 0, 0, 100)
    } else {
      API.drawRectangle(this._xPos + 10, this._yPos + 10, this._width - 20, this._height - 20, this._r, this._g, this._b, this._alpha)
    }
    if (this._protected) {
      if (this._input.length < 1) {
        return
      }
      API.drawText('*'.repeat(this._input.length), this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width))
    } else {
      API.drawText(this._input, this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width))
    }
  };
  selectedDraw () {
    API.drawRectangle(this._xPos + 10, this._yPos + 10, this._width - 20, this._height - 20, this._selectR, this._selectG, this._selectB, this._selectAlpha)
    if (this._protected) {
      if (this._input.length < 1) {
        return
      }
      API.drawText('*'.repeat(this._input.length), this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width))
    } else {
      API.drawText(this._input, this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width))
    }
  };
  hoveredDraw () {
    if (this._isError) {
      API.drawRectangle(this._xPos + 10, this._yPos + 10, this._width - 20, this._height - 20, 255, 0, 0, 100)
    } else {
      API.drawRectangle(this._xPos + 10, this._yPos + 10, this._width - 20, this._height - 20, this._hoverR, this._hoverG, this._hoverB, this._hoverAlpha)
    }
    if (this._protected) {
      if (this._input.length < 1) {
        return
      }
      API.drawText('*'.repeat(this._input.length), this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width))
    } else {
      API.drawText(this._input, this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width))
    }
  };
  isHovered () {
    if (!API.isCursorShown()) {
      return
    }
    var cursorPos = API.getCursorPositionMantainRatio()
    if (cursorPos.X > this._xPos && cursorPos.X < (this._xPos + this._width) && cursorPos.Y > this._yPos && cursorPos.Y < (this._yPos + this._height)) {
      if (this._selected) {
        this._hovered = false
        return
      }
      this._hovered = true
    } else {
      this._hovered = false
    }
  };
  isClicked () {
    if (API.isControlJustPressed(237)) {
      if (new Date().getTime() < clickDelay + 200) {
        return
      }
      var cursorPos = API.getCursorPositionMantainRatio()
      if (cursorPos.X > this._xPos && cursorPos.X < (this._xPos + this._width) && cursorPos.Y > this._yPos && cursorPos.Y < (this._yPos + this._height)) {
        if (!this._selected) {
          API.playSoundFrontEnd(this._inputAudioLib, this._inputAudioName)
          this._selected = true
        }
        selectedInput = this
      } else {
        this._selected = false
      }
    }
  };
  addToInput (text) {
    if (this._input.length > 2147483647) {
      return
    }
    if (!this._numeric) {
      this._input += text
      return this._input
    } else {
      if (Number.isInteger(+text)) {
        this._input += text
        return this._input
      }
    }
  };
  returnType () {
    return 'InputPanel'
  }
}

function drawTextNotification () {
  if (textnotification !== null) {
    textnotification.draw()
    return
  }
  if (textnotifications.length <= 0) {
    return
  }
  textnotification = textnotifications.shift()
}
function drawNotification () {
  if (notification !== null) {
    notification.draw()
    return
  }
  if (notifications.length <= 0) {
    return
  }
  notification = notifications.shift()
}
function createNotification (page, text, displayTime) {
    // Add to queue.
  var notify = new Notification(text, displayTime)
  notifications.push(notify)
  return notify
}
function createPlayerTextNotification (text) {
  var notify = new PlayerTextNotification(text)
  textnotifications.push(notify)
  return notify
}
function createProgressBar (page, x, y, width, height, currentProgress) {
  var bar = new ProgressBar(x, y, width, height, currentProgress)
  menuElements[page].push(bar)
  return bar
}
function killMenu () {
  isReady = false
  selectedInput = null
  API.showCursor(false)
  API.setHudVisible(true)
  API.setChatVisible(true)
  API.setCanOpenChat(true)
  API.callNative('_TRANSITION_FROM_BLURRED', 3000)
  menuElements = [[]]
  currentPage = 0
}

function reset () {
  killMenu()
  notification = null
  notifications = []
  textnotification = null
  textnotifications = []
  padding = 10
  selectedInput = null
  tabIndex = []
  menuElements = []
  isReady = false
  currentPage = 0
  clickDelay = new Date().getTime()
}
// On-Keydown Event
API.onKeyDown.connect(function (sender, e) {
  if (!isReady) {
    return
  }
    // Shift between Input Boxes.
  if (e.KeyCode === Keys.Tab) {
    if (tabIndex[0].Selected) {
      tabIndex[0].Selected = false
    } else {
      tabIndex[0].Selected = true
      return
    }
    var removeItem = tabIndex.shift()
    tabIndex.push(removeItem)
    tabIndex[0].Selected = true
  }
  if (selectedInput === null) {
    return
  }
  if (e.KeyCode === Keys.Back) {
    selectedInput.removeFromInput()
    return
  }
  var shiftOn = false
  if (e.Shift) {
    shiftOn = true
  }
  var keypress = ''
  switch (e.KeyCode) {
    case Keys.Space:
      keypress = ' '
      break
    case Keys.A:
      keypress = 'a'
      if (shiftOn) {
        keypress = 'A'
      }
      break
    case Keys.B:
      keypress = 'b'
      if (shiftOn) {
        keypress = 'B'
      }
      break
    case Keys.C:
      keypress = 'c'
      if (shiftOn) {
        keypress = 'C'
      }
      break
    case Keys.D:
      keypress = 'd'
      if (shiftOn) {
        keypress = 'D'
      }
      break
    case Keys.E:
      keypress = 'e'
      if (shiftOn) {
        keypress = 'E'
      }
      break
    case Keys.F:
      keypress = 'f'
      if (shiftOn) {
        keypress = 'F'
      }
      break
    case Keys.G:
      keypress = 'g'
      if (shiftOn) {
        keypress = 'G'
      }
      break
    case Keys.H:
      keypress = 'h'
      if (shiftOn) {
        keypress = 'H'
      }
      break
    case Keys.I:
      keypress = 'i'
      if (shiftOn) {
        keypress = 'I'
      }
      break
    case Keys.J:
      keypress = 'j'
      if (shiftOn) {
        keypress = 'J'
      }
      break
    case Keys.K:
      keypress = 'k'
      if (shiftOn) {
        keypress = 'K'
      }
      break
    case Keys.L:
      keypress = 'l'
      if (shiftOn) {
        keypress = 'L'
      }
      break
    case Keys.M:
      keypress = 'm'
      if (shiftOn) {
        keypress = 'M'
      }
      break
    case Keys.N:
      keypress = 'n'
      if (shiftOn) {
        keypress = 'N'
      }
      break
    case Keys.O:
      keypress = 'o'
      if (shiftOn) {
        keypress = 'O'
      }
      break
    case Keys.P:
      keypress = 'p'
      if (shiftOn) {
        keypress = 'P'
      }
      break
    case Keys.Q:
      keypress = 'q'
      if (shiftOn) {
        keypress = 'Q'
      }
      break
    case Keys.R:
      keypress = 'r'
      if (shiftOn) {
        keypress = 'R'
      }
      break
    case Keys.S:
      keypress = 's'
      if (shiftOn) {
        keypress = 'S'
      }
      break
    case Keys.T:
      keypress = 't'
      if (shiftOn) {
        keypress = 'T'
      }
      break
    case Keys.U:
      keypress = 'u'
      if (shiftOn) {
        keypress = 'U'
      }
      break
    case Keys.V:
      keypress = 'v'
      if (shiftOn) {
        keypress = 'V'
      }
      break
    case Keys.W:
      keypress = 'w'
      if (shiftOn) {
        keypress = 'W'
      }
      break
    case Keys.X:
      keypress = 'x'
      if (shiftOn) {
        keypress = 'X'
      }
      break
    case Keys.Y:
      keypress = 'y'
      if (shiftOn) {
        keypress = 'Y'
      }
      break
    case Keys.Z:
      keypress = 'z'
      if (shiftOn) {
        keypress = 'Z'
      }
      break
    case Keys.D0:
      keypress = '0'
      if (shiftOn) {
        keypress = ')'
      }
      break
    case Keys.D1:
      keypress = '1'
      if (shiftOn) {
        keypress = '!'
      }
      break
    case Keys.D2:
      keypress = '2'
      if (shiftOn) {
        keypress = '@'
      }
      break
    case Keys.D3:
      keypress = '3'
      if (shiftOn) {
        keypress = '#'
      }
      break
    case Keys.D4:
      keypress = '4'
      if (shiftOn) {
        keypress = '$'
      }
      break
    case Keys.D5:
      keypress = '5'
      if (shiftOn) {
        keypress = '%'
      }
      break
    case Keys.D6:
      keypress = '6'
      if (shiftOn) {
        keypress = '^'
      }
      break
    case Keys.D7:
      keypress = '7'
      if (shiftOn) {
        keypress = '&'
      }
      break
    case Keys.D8:
      keypress = '8'
      if (shiftOn) {
        keypress = '*'
      }
      break
    case Keys.D9:
      keypress = '9'
      if (shiftOn) {
        keypress = '('
      }
      break
    case Keys.OemMinus:
      keypress = '-'
      if (shiftOn) {
        keypress = '_'
      }
      break
    case Keys.Oemplus:
      keypress = '='
      if (shiftOn) {
        keypress = '+'
      }
      break
    case Keys.OemQuestion:
      keypress = '/'
      if (shiftOn) {
        keypress = '?'
      }
      break
    case Keys.Oemcomma:
      keypress = ','
      if (shiftOn) {
        keypress = '<'
      }
      break
    case Keys.OemPeriod:
      keypress = '.'
      if (shiftOn) {
        keypress = '>'
      }
      break
    case Keys.OemSemicolon:
      keypress = ';'
      if (shiftOn) {
        keypress = ':'
      }
      break
    case Keys.OemOpenBrackets:
      keypress = '['
      if (shiftOn) {
        keypress = '{'
      }
      break
    case Keys.OemCloseBrackets:
      keypress = ']'
      if (shiftOn) {
        keypress = '}'
      }
      break
    case Keys.NumPad0:
      keypress = '0'
      break
    case Keys.NumPad1:
      keypress = '1'
      break
    case Keys.NumPad2:
      keypress = '2'
      break
    case Keys.NumPad3:
      keypress = '3'
      break
    case Keys.NumPad4:
      keypress = '4'
      break
    case Keys.NumPad5:
      keypress = '5'
      break
    case Keys.NumPad6:
      keypress = '6'
      break
    case Keys.NumPad7:
      keypress = '7'
      break
    case Keys.NumPad8:
      keypress = '8'
      break
    case Keys.NumPad9:
      keypress = '9'
      break
  }
  if (keypress === '') {
    return
  }
  if (keypress.length > 0) {
    if (selectedInput === null) {
      return
    }
    selectedInput.addToInput(keypress)
  } else {

  }
})

const __exported = {createMenu, createNotification, createPlayerTextNotification, createProgressBar, reset} // eslint-disable-line no-unused-vars
