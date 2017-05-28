module.exports = R => {
  R.post('/api/rpc/login', async (ctx, next) => {
    let rsp = await ctx.rpc.callRpc(null, 'SUserManager', 'onLogin', ctx.session.token)
    ctx.body = rsp.text
  })
}
