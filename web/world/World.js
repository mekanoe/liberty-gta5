const log = new (require('./logger'))('World')
const Sequelize = require('sequelize')
const fetchModels = require('./models')
const fetchApis = require('./api')

class World {
  constructor (router, io, app, serverless = false) {
    this.router = router
    this.io = io
    this.ctx = app.context || {}

    this.ctx.io = io
    this.__app = app

    if (log.debugOn) log.warn('debug mode is on')

    this.__initialized = this._mountServices(serverless)
  }

  async awaitServices () {
    await this.__initialized
  }

  async _mountServices (serverless) {
    const sequelize = new Sequelize(process.env.DB_URL, { logging: log.sql.bind(log, log) })
    this.ctx.sql = sequelize
    this.M = fetchModels(sequelize)
    this.ctx.M = this.M
    await sequelize.sync()

    this.ctx.rpc = new (require('./services/rpc'))(this.ctx, !serverless)
    this.ctx.auth = new (require('./services/auth'))(this.ctx)
  }

  async mountRoutes () {
    fetchApis(this.router)
    this.__app.use(this.router.middleware())
  }

  sessionStore () {
    const { Session } = this.M
    return {
      async get (id) {
        const user = await Session.findOne({ where: { id } })

        if (user === null) {
          return null
        }

        return user.data
      },
      async set (id, data, maxAge) {
        let session = await Session.findOne({ where: { id } })
        if (session === null) {
          session = Session.build({ id })
        }

        session.data = data
        session.maxAge = maxAge

        return session.save()
      },
      async destroy (id) {
        return (await Session.findOne({ where: { id } })).destroy()
      }
    }
  }
}

module.exports = World
