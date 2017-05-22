const log = new (require('../logger'))('services/auth')
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

class Auth {
  constructor (ctx) {
    this.ctx = ctx
    this.User = ctx.M.User
    this.ctx.passport = passport

    passport.use(new LocalStrategy({}, this.strategy.bind(this)))

    passport.serializeUser(async (user, done) => {
      done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
      try {
        let user = await this.User.findById(id)
        user.presentable(true)
        done(null, user)
      } catch (e) {
        done(e)
      }
    })
  }

  async strategy (username, password, done) {
    log.debug('strategizing...', username)
    this.User.getByUsername(username).then(user => {
      if (user === null) {
        return done(null, false)
      }

      if (!user.validateSecret(password)) {
        return done(null, false)
      }

      done(null, user)
    })
    .catch((e) => {
      log.error('error doing local strategy', e)
      done(e)
    })
  }
}

module.exports = Auth
