module.exports = R => {
  R.post('/api/rpc/login', async (ctx, next) => {
    let rsp = await ctx.rpc.callRpc(null, 'SUserManager', 'onLogin', ctx.session.token, ctx.state.user.id)
    ctx.body = rsp.text
  })

  R.post('/api/rpc/char-select', async (ctx, next) => {
    let rsp = await ctx.rpc.callRpc(null, 'SUserManager', 'onCharSelect', ctx.session.token, ctx.state.user.id)
    ctx.body = rsp.text
  })
}
