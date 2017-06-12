const superagent = require('superagent')

export default {
  loginPost (data) {
    const url = '/api/auth/login'

    return superagent.post(url).send(data)
  },

  registerPost (data) {
    const url = '/api/auth/register'

    return superagent.post(url).send(data)
  },

  charCreationPost (data) {
    const url = '/api/me/chars'
    return superagent.post(url).send(data)
  },

  rpcAfterLogin () {
    const url = '/api/rpc/login'
    return superagent.post(url)
  },

  rpcAfterCharSelect () {
    const url = '/api/rpc/char-select'
    return superagent.post(url)
  },

  rpcAfterCharCreation (id) {
    const url = '/api/rpc/char-created'
    return superagent.post(url).send({id})
  },

  rpcMoveCharSelect (idx) {
    const url = '/api/rpc/char-select-move'
    return superagent.post(url).send({idx})
  },

  rpcSwitchPreset (idx) {
    const url = '/api/rpc/char-creation-preset'
    return superagent.post(url).send({idx})
  },

  getCharacters () {
    const url = '/api/me/chars'
    return superagent.get(url)
  }
}
