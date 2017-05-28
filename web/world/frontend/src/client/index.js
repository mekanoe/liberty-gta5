const superagent = require('superagent')

export default {
  loginPost (data) {
    const url = '/api/auth/login'

    return superagent.post(url).send(data)
  },

  rpcAfterLogin () {
    const url = '/api/rpc/login'
    return superagent.post(url)
  }
}
