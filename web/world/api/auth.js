module.exports = R => {
  R.post('/api/auth/login', (ctx, next) => {
    return ctx.passport.authenticate('local', async (err, user, info, status) => {
      if (err) {
        ctx.body = { status: 'err', err }
        ctx.throw(500)
        return
      }

      if (user === false) {
        ctx.body = { status: 'err', user: null }
        ctx.throw(403)
      } else {
        ctx.body = { status: 'ok', user: user.presentable(true) }
        await ctx.login(user)
        ctx.session.token = ctx.request.body.token
      }
    })(ctx, next)
  })

  R.get('/api/auth', (ctx, next) => {
    if (ctx.isAuthenticated()) {
      console.log('authed')
      ctx.body = { status: 'ok', user: ctx.state.user.presentable() }
    } else {
      console.log('not authed')
      ctx.status = 404
      ctx.body = { status: 'err', user: null }
    }

    return null
  })
}
