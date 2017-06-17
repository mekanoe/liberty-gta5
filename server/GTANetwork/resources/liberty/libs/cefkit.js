let globalCefWindow = null
let screenSize
const purgeInterval = 30000
let nextPurge = Date.now() + purgeInterval
let config = {
  baseUrl: undefined
}

let setupPromise = new Promise((resolve, reject) => {
  API.onServerEventTrigger.connect((name, args) => {
    if (name === 'cef:baseUrl') {
      config.baseUrl = args[0]
      resolve(true)
      // API.onServerEventTrigger.disconnect(handler)
      setupPromise = true
    }
  })
})

let cefWindows = []

// BUGGY: v8 doesn't like to touch disposed objects
// API.onResourceStop.connect(() => {
//   for (let v of cefWindows) {
//     if (!v.IsDisposed) {
//       API.destroyCefBrowser(v)
//     }
//   }
// })

function awaitSetup () {
  return setupPromise
}

API.onUpdate.connect(() => {
  purge()
})

async function purge () {
  try {
    if (nextPurge > Date.now()) {
      return
    }

    // API.sendChatMessage(`purging: ${JSON.stringify(cefWindows.map(x => '' + x))}`)
    if (cefWindows.length === 0) {
      // API.sendChatMessage('empty purge')
      nextPurge = Date.now() + purgeInterval
      return
    }

    // API.sendChatMessage('good to go')
    const newCefs = []

    for (let cef of cefWindows) {
      if (cef === null) {
        return
      }

      if (cef.GetMainFrame().Url === '/internal/closer') {
        // API.sendChatMessage('purging one')
        API.destroyCefBrowser(cef)
      } else {
        // API.sendChatMessage('not purging')
        // API.sendChatMessage(`at: ${cef.GetMainFrame().Url}`)
        newCefs.push(cef)
      }
    }

    cefWindows = newCefs
    nextPurge = Date.now() + purgeInterval
  } catch (e) {
    API.sendChatMessage(`err! ${e.trace || e.stack}`)
  }
}

async function loadGlobal (url, useBase = true) {
  await awaitSetup()
  if (globalCefWindow === null) {
    screenSize = API.getScreenResolution()
    globalCefWindow = API.createCefBrowser(0, 0, false)
    API.waitUntilCefBrowserInit(globalCefWindow)
    API.setCefFramerate(globalCefWindow, 60)
    API.setCefBrowserSize(globalCefWindow, screenSize.Width, screenSize.Height)
    cefWindows.push(globalCefWindow)
    // headlessGlobal(true)

    // API.setCefBrowserSize(globalCefWindow, 0, 0)
  }

  if (useBase) {
    url = config.baseUrl + url
  }

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

function destroyGlobal () {
  if (globalCefWindow === null) {
    return
  }

  API.destroyCefBrowser(globalCefWindow)
  cefWindows = cefWindows.filter(w => w !== globalCefWindow)
  globalCefWindow = null
}

// Exclusive mode gives a private window, and is destroyable
class ExclusiveWindow {
  constructor ({ x, y, w, h, url, local = false, useBaseUrl = true }) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.local = local
    this.url = (useBaseUrl) ? config.baseUrl + url : url

    this.active = false
    this.destroyed = false
    this.enabled = false
    this._cefWindow = null
    this._cursor = false

    // API.sendChatMessage(`created exclusive window at ${JSON.stringify({ x, y, w, h })}`)
  }

  getBaseUrl () {
    return config.baseUrl
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

    API.setCefFramerate(this._cefWindow, 60)
    API.setCefBrowserSize(this._cefWindow, this.w, this.h)
    API.setCefBrowserPosition(this._cefWindow, this.x, this.y)
    API.loadPageCefBrowser(this._cefWindow, this.url)

    this.active = true
    this.enable(enableOpts)
    this.active = true
    cefWindows.push(this._cefWindow)
  }

  enable ({cursor = true} = {}) {
    API.sendChatMessage('enable')
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
    API.sendChatMessage('disable')    
    API.setCefBrowserHeadless(this._cefWindow, true)
    this.enabled = false

    if (this._cursor) {
      API.showCursor(false)
      this._cursor = false
    }
  }

  destroy (chat = false) {
    this.disable()
    this.active = false

    if (chat) {
      API.setChatVisible(true)
    }

    // cefWindows.delete(this._cefWindow)
    API.destroyCefBrowser(this._cefWindow)
    cefWindows = cefWindows.filter(w => w !== this._cefWindow)
    this._cefWindow = null

    this.disabled = true
  }

  static async waitForReady () {
    await setupPromise
  }
}

function __requireModuleClasses () { // eslint-disable-line no-unused-vars
  return {
    ExclusiveWindow
  }
}