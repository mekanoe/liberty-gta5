module.exports = R => {
  R.post('/api/rpc/login', async (ctx, next) => {
    await ctx.rpc.callRpc(null, 'SUserManager', 'charSelectSetup', ctx.session.token, JSON.stringify(await ctx.state.user.getCharacters()))
    let rsp = await ctx.rpc.callRpc(null, 'SUserManager', 'onLogin', ctx.session.token, ctx.state.user.id)
    ctx.body = rsp.text
  })

  R.post('/api/rpc/char-select', async (ctx, next) => {
    let rsp = await ctx.rpc.callRpc(null, 'SUserManager', 'onCharSelect', ctx.session.token, ctx.state.user.id)
    ctx.body = rsp.text
  })

  R.post('/api/rpc/char-select-move', async (ctx, next) => {
    let rsp = await ctx.rpc.callRpc(null, 'SUserManager', 'charSelectMove', ctx.session.token, ctx.request.body.idx)
    ctx.body = rsp.text
  })
}
