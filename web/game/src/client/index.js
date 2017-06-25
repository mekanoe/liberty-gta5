const superagent = require('superagent')

export default {
  async isLoggedIn () {
    const url = '/api/auth'
    let { body: { user } } = await superagent.get(url)
    return user !== null
  },

  getCurrentChar () {
    const url = '/api/me/current-char'
    return superagent.get(url)
  },

  loginPost (data) {
    const url = '/api/auth/login'

    return superagent.post(url).send(data)
  },

  registerPost (data) {
    const url = '/api/auth/register'

    return superagent.post(url).send(data)
  },

  postToken (token) {
    const url = '/api/auth/token'
    return superagent.post(url).send({token})
  },

  charCreationPost (data) {
    const url = '/api/me/chars'
    return superagent.post(url).send(data)
  },

  rpcAfterLogin () {
    const url = '/api/rpc/login'
    return superagent.post(url)
  },

  rpcAfterCharSelect (id) {
    const url = '/api/rpc/char-select'
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

  rpcUpdateChatCursor () {
    const url = '/api/rpc/update-chat-cursor'
    return superagent.post(url)
  },

  getCharacters () {
    const url = '/api/me/chars'
    return superagent.get(url)
  },

  postBank (data) {
    const url = '/api/me/bank'
    return superagent.post(url).send(data)
  }
}
