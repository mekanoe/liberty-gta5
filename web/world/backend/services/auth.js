const log = new (require('../logger'))('services/auth')
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

class Auth {
  constructor (ctx) {
    this.ctx = ctx
    this.User = ctx.sql.model('user')
    this.ctx.passport = passport

    passport.use(new LocalStrategy(this.strategy))

    passport.serializeUser(async (user, done) => {
      done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
      try {
        done(null, await this.User.findById(id))
      } catch (e) {
        done(e)
      }
    })
  }

  async strategy (username, password, done) {
    try {
      let user = await this.User.findOne({ where: { username } })

      if (user === null) {
        return done(null, false)
      }

      if (!user.validateSecret(password)) {
        return done(null, false)
      }

      done(null, user)
    } catch (e) {
      done(e)
    }
  }
}

module.exports = Auth
