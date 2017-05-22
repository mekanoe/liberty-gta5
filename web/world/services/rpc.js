const log = new (require('../logger'))('services/rpc')
const superagent = require('superagent')

class RPC {
  constructor (ctx, doCheck = true) {
    this.gameservers = process.env.GAME_SERVERS.split(',') || ['localhost:9000']
    this.ctx = ctx
    this.clusterName = process.env.CLUSTER_NAME || 'unset'
    this.peers = {}

    this.__heartbeatsWithoutPeers = 0

    if (doCheck) {
      this.checkGameServers()
    }
  }

  async checkGameServers (heartbeat = true) {
    log.debug(`Checking cluster.`)
    this.gameservers.forEach((server) => {
      this._checkGameServer(server)
    })

    if (heartbeat) this._doHeartbeat()
  }

  _doHeartbeat (delay = 10000) {
    setTimeout(() => {
      if (Object.keys(this.peers).length === 0) {
        log.debug('I have no peers. Making an attempt to find one...')
        this.__heartbeatsWithoutPeers += 1

        if (this.__heartbeatsWithoutPeers < 10) {
          this._doHeartbeat()
        } else {
          log.warn("I've given up on the search for game servers.")
          return
        }

        this.checkGameServers(false)
      } else {
        if (this.__heartbeatsWithoutPeers !== 0) {
          this.__heartbeatsWithoutPeers = 0
        }

        this._doHeartbeat(1000 * 300)
        this.checkGameServers(false)
      }
    }, delay)
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
        this._removePeer(addr)
        return
      }
    }

    rsp.body = JSON.parse(rsp.text)

    if (rsp.body.status === 'bad_cluster') {
      this._removePeer(addr)
      log.warn(`Game server \`${addr}' rejected \`${this.clusterName}'`)
      return
    }

    if (rsp.body.status === 'ok') {
      if (this.peers[rsp.body.identifier] === addr) {
        log.debug(`${rsp.body.identifier} is still alive.`)
        return
      }
      this.peers[rsp.body.identifier] = addr
      log.info(`Added \`${addr}' as \`${rsp.body.identifier}' to game server peers`)
      return
    }

    log.error('Unsure of check response', rsp)
    this._removePeer(addr)
  }

  _removePeer (addr) {
    let peer = Object.keys(this.peers).filter(x => this.peers[x] === addr)[0]
    if (peer === undefined) {
      return
    }

    delete this.peers[peer]
    log.warn(`Peer \`${peer}' removed`)
  }

  callRpc (peer, c, m, ...args) {
    if (peer === null) {
      if (Object.keys(this.peers).length !== 1) {
        throw new TypeError('invariant: automatic selection of peering unavailable without only a single peer')
      }

      peer = Object.keys(this.peers)[0]
    }

    log.debug(`RPC -> ${peer}: ${c}->${m}(${args.join(', ')})`)
    return superagent
      .post('http://' + this.peers[peer])
      .send({ c, m, args })
      .accept('json')
  }
}

module.exports = RPC
