const log = new (require('../logger'))('api/me')

module.exports = R => {
  R.get('/api/me/chars', async (ctx, next) => {
    // let characters = await ctx.state.user.getCharacters({ plain: true })
    let characters = await ctx.M.Character.findAll({ userId: ctx.state.user.id }, { plain: true })

    log.debug('chars', characters)

    ctx.body = { status: 'ok', characters }
  })
}
