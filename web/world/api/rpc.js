module.exports = R => {
  R.post('/api/rpc/login', async (ctx, next) => {
    const chars = await ctx.M.Character.findAll({ userId: ctx.state.user.id }, { plain: true })
    await ctx.rpc.callRpc(null, 'SUserManager', 'charSelectSetup', ctx.session.token, JSON.stringify(chars))
    let rsp = await ctx.rpc.callRpc(null, 'SUserManager', 'onLogin', ctx.session.token, ctx.state.user.id)
    ctx.body = rsp.text
  })

  R.post('/api/rpc/char-select', async (ctx, next) => {
    const character = await ctx.M.Character.findOne({ where: { id: ctx.request.body.id } })
    if (character === null) {
      ctx.body = { status: 'err' }
      return
    }

    let rsp = await ctx.rpc.callRpc(null, 'SUserManager', 'onCharSelect', ctx.session.token, ctx.state.user.id, JSON.stringify(character))
    ctx.body = rsp.text
    ctx.session.character = character.id
  })

  R.post('/api/rpc/char-select-move', async (ctx, next) => {
    let rsp = await ctx.rpc.callRpc(null, 'SUserManager', 'charSelectMove', ctx.session.token, ctx.request.body.idx)
    ctx.body = rsp.text
  })

  R.post('/api/rpc/char-creation-preset', async (ctx, next) => {
    let rsp = await ctx.rpc.callRpc(null, 'SUserManager', 'charCreationPreset', ctx.session.token, ctx.request.body.idx)
    ctx.body = rsp.text
  })

  R.get('/api/rpc/world-data', async (ctx, next) => {
    let rsp = await ctx.rpc.callRpc(null, 'SWorldController', 'RGetWorldData')
    ctx.body = rsp.text
    ctx.type = 'application/json'
  })
}
