// Stores request keys with promises.
let __requests = new Map()
let __connections = new Map()

function error (...args) {
  API.sendNotification(`~r~MessageChannel Error`)
  API.sendNotification(args.join(' '))
}

API.onServerEventTrigger.connect((name, args) => {
  API.sendChatMessage(name)
  if (name === 'messagechannel/server/response') {
    args = JSON.parse(args[0])
    const token = args.token
    const cr = __requests.get(token)

    if (cr === undefined) {
      error("got server response that i don't know about:", token, args.event)
    }

    const mcr = new MessageChannelResponse(args)
    cr.resolve(mcr)
    __requests.delete(token)
  }

  if (name === 'messagechannel/server/request') {
    args = JSON.parse(args[0])

    const evtName = args.event
    const sr = __connections.get(evtName)

    if (sr === undefined) {
      error("got server request that doesn't have a connection:", evtName)
      return
    }

    const mcr = new MessageChannelRequest(args)
    sr(mcr)
  }
})

function __generateToken () {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let text = ''

  for (let i = 0; i < 32; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

  return text
}

function SendRequest (evtName, ...args) {
  // This is the token we identify this request with
  const token = __generateToken()

  // The promise so this is written async
  const p = new Promise((resolve, reject) => {
    API.triggerServerEvent('messagechannel/client/request', JSON.stringify({
      event: evtName,
      token,
      args
    }))
  })

  // Save the promise so we can resolve it later
  __requests.set(token, p)

  return p
}

function Connect (evtName, fn, thisArg = null) {
  API.sendNotification('connected ' + evtName)
  __connections.set(evtName, fn.bind(thisArg))
}

class MessageChannelRequest {
  constructor ({token, event, args}) {
    this._token = token
    this._event = event
    this.player = API.getLocalPlayer()
    try {
      this.args = JSON.parse(args)
    } catch (e) {
      this.args = API.fromJson(args)
    }
  }

  Reply (args) {
    API.triggerServerEvent('messagechannel/client/response', API.toJson({
      token: this._token,
      event: this._event,
      args: args
    }))
  }
}

class MessageChannelResponse {
  constructor ({token, event, args}) {
    this._token = token
    this._event = event
    this.player = API.getLocalPlayer()
    try {
      this.args = JSON.parse(args)
    } catch (e) {
      this.args = API.fromJson(args)
    }
  }
}

const exported = { SendRequest, Connect } // eslint-disable-line no-unused-vars
