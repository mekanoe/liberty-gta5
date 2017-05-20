const log = new (require('./logger'))('World')
const Sequelize = require('sequelize')
const fetchModels = require('./models')

class World {
  constructor (router, io, ctx) {
    this.router = router
    this.io = io
    this.ctx = ctx

    ctx.io = io

    if (process.env.DEBUG) log.warn('debug mode is on')

    this._mountServices()
  }

  async _mountServices () {
    const sequelize = new Sequelize(process.env.DB_URL)
    this.ctx.sql = sequelize
    this.M = fetchModels(sequelize)
    this.ctx.M = this.M
    await sequelize.sync()

    this.ctx.rpc = new (require('./services/rpc'))(this.ctx)
    this.ctx.auth = new (require('./services/auth'))(this.ctx)
  }

  sessionStore () {
    const { Session } = this.M
    return {
      async get (id) {
        return Session.findById(id)
      },
      async set (id, data, maxAge) {
        return Session.create({ id, data, maxAge })
      },
      async destroy (id) {
        return (await Session.findById(id)).destroy()
      }
    }
  }
}

module.exports = World
