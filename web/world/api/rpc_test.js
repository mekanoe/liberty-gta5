module.exports = router => {
  router.get('/test/rpc/car/:name/:car', async (ctx, next) => {
    let rsp = await ctx.rpc.callRpc(null, 'SAdminCommands', 'RCarSpawn', ctx.params.name, ctx.params.car)
    ctx.body = rsp.text
  })
}
