const log = new (require('../logger'))('services/rpc')
const superagent = require('superagent')

class RPC {
  constructor (ctx) {
    this.gameservers = (process.env.GAME_SERVERS || 'localhost:9000').split(',')
    this.ctx = ctx
    this.clusterName = process.env.CLUSTER_NAME || 'unset'
    this.peers = {}
  }

  _checkGameServers () {
    log.debug(`Checking cluster.`)
    this.gameservers.forEach((server) => {
      this._checkGameServer(server)
    })
  }

  async _checkGameServer (addr) {
    log.debug(`Checking ${addr} with cluster ${this.clusterName}...`)
    let rsp
    try {
      rsp = await superagent
        .get(`http://${addr}/~check`)
        .set({
          'Cluster-Name': this.clusterName
        })
        .accept('json')
    } catch (e) {
      if (!e.status) {
        log.warn(`Game server \`${addr}' didn't respond`)
        return
      }
    }

    if (rsp.body.status === 'bad_cluster') {
      log.warn(`Game server \`${addr}' rejected \`${this.clusterName}'`)
      return
    }

    if (rsp.body.status === 'ok') {
      this.peers[rsp.body.identifier] = addr
      log.info(`Added \`${addr}' as \`${rsp.body.identifier}' to game server peers`)
      return
    }

    log.error('Unsure of check response', rsp.body)
  }

  callRpc (peer, c, m, ...args) {
    log.debug(`RPC -> ${peer}: ${c}->${m}(${args.join(', ')})`)
    return superagent
      .post(this.peers[peer])
      .send({ c, m, args })
      .accept('json')
  }
}

module.exports = RPC
