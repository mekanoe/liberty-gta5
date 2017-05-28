let globalCefWindow = null
let screenSize
let config = {
  baseUrl: undefined
}
let setupResolve
let setupPromise

let cefWindows = new Set()

API.onResourceStart.connect(() => {
  setupPromise = new Promise((resolve, reject) => {
    setupResolve = resolve
  })
})

API.onResourceStop.connect(() => {
  for (let w of cefWindows) {
    try {
      API.destroyCefBrowser(w)
    } catch (e) {
      // silent
    }
  }
})

API.onServerEventTrigger.connect((name, args) => {
  if (name === 'cef:baseUrl') {
    config.baseUrl = args[0]
    setupResolve(true)
  }
})

function awaitSetup () {
  return setupPromise
}

function loadGlobal (url, useBase = true) {
  if (globalCefWindow === null) {
    screenSize = API.getScreenResolution()
    globalCefWindow = API.createCefBrowser(0, 0, false)
    API.waitUntilCefBrowserInit(globalCefWindow)
    API.setCefBrowserSize(globalCefWindow, screenSize.Width, screenSize.Height)
    cefWindows.add(globalCefWindow)
    // headlessGlobal(true)

    // API.setCefBrowserSize(globalCefWindow, 0, 0)
  }

  if (useBase) {
    url = config.baseUrl + url
  }

  API.sendNotification(`opening ${url}`)

  API.loadPageCefBrowser(globalCefWindow, url)
  API.waitUntilCefBrowserLoaded(globalCefWindow)
  headlessGlobal(false)
}

function headlessGlobal (state = true) {
  if (globalCefWindow === null) {
    return
  }

  API.setCefBrowserHeadless(globalCefWindow, state)
}

function unloadGlobal () {
  if (globalCefWindow === null) {
    return
  }

  API.destroyCefBrowser(globalCefWindow)
  cefWindows.delete(globalCefWindow)
  globalCefWindow = null
}

// Exclusive mode gives a private window, and is destroyable
class ExclusiveWindow {
  constructor ({ x, y, w, h, url, local = false }) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.local = local
    this.url = url

    this.active = false
    this.destroyed = false
    this.enabled = false
    this._cefWindow = null
    this._cursor = false
  }

  activate (enableOpts) {
    if (this.destroyed) {
      throw new TypeError('Cannot activate a destroyed ExclusiveWindow')
    }

    if (this.active) {
      return
    }

    this._cefWindow = API.createCefBrowser(this.x, this.y, this.local)
    API.waitUntilCefBrowserInit(this._cefWindow)

    API.setCefBrowserSize(this._cefWindow, this.w, this.h)
    API.loadPageCefBrowser(this._cefWindow, this.url)

    this.enable(enableOpts)
    this.active = true
    cefWindows.add(this._cefWindow)
  }

  enable ({cursor = true}) {
    if (!this.active) {
      throw new TypeError('Cannot enable an unactivated ExclusiveWindow')
    }

    API.setCefBrowserHeadless(this._cefWindow, false)
    this.enabled = true

    if (cursor) {
      API.showCursor(true)
      this._cursor = true
    }
  }

  disable () {
    API.setCefBrowserHeadless(this._cefWindow, true)
    this.enabled = false

    if (this._cursor) {
      API.showCursor(false)
    }
  }

  destroy () {
    this.disable()
    this.active = false

    cefWindows.delete(this._cefWindow)
    API.destroyCefBrowser(this._cefWindow)
    this._cefWindow = null

    this.disabled = true
  }
}

function __requireModuleClasses () { // eslint-disable-line no-unused-vars
  return {
    ExclusiveWindow
  }
}
