module.exports = R => {
  R.post('/api/auth/login', (ctx, next) => {
    return ctx.passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/error/failed_login'
    })(ctx, next)
  })

  R.get('/api/auth', (ctx, next) => {
    if (ctx.isAuthenticated()) {
      console.log('authed')
      ctx.body = { status: 'ok', user: ctx.state.user }
    } else {
      console.log('not authed')
      ctx.status = 404
      ctx.body = { status: 'err', user: null }
    }

    return null
  })
}
