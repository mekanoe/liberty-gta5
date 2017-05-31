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

  R.post('/api/auth/register', async (ctx, next) => {
    try {
      ctx.auth.validateUser(ctx.request.body)
    } catch (e) {
      this.body = { status: 'err', user: null, err: e }
      ctx.status = 500
    }

    const { User } = ctx.M
    let user = User.build(ctx.request.body, {fields: [ 'username', 'email' ]})
    user.id = await User.getNewId()
    await user.createSecret(ctx.request.body.password)

    try {
      await user.save()
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        ctx.body = { status: 'err', user: null, err: 'username_taken' }
        ctx.throw(409)
      } else {
        ctx.body = { status: 'err', user: null, err: e.name }
      }

      return
    }

    ctx.body = { status: 'ok', user: user.presentable(true) }
    await ctx.login(user)
    ctx.session.token = ctx.request.body.token
  })
}
