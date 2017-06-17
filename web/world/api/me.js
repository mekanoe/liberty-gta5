const log = new (require('../logger'))('api/me')

module.exports = R => {
  R.get('/api/me/current-char', async (ctx, next) => {
    let character = await ctx.M.Character.findOne({ where: { id: ctx.session.character } })
    if (character === null) {
      ctx.body = { status: 'err', character: null }
      return
    }

    ctx.body = { status: 'ok', character: character }
  })

  R.get('/api/me/chars', async (ctx, next) => {
    // let characters = await ctx.state.user.getCharacters({ plain: true })
    let characters = await ctx.M.Character.findAll({ userId: ctx.state.user.id }, { plain: true })

    log.debug('chars', characters)

    ctx.body = { status: 'ok', characters }
  })

  R.post('/api/me/chars', async (ctx, next) => {
    try {
      const Character = ctx.M.Character

      const { name, gender, preset, start } = ctx.request.body

      const char = await Character.build({
        id: await Character.getNewId(),
        phoneNumber: await Character.generatePhone(),
        name,
        gender,
        spawnName: start
      })

      char.setClothesPreset(preset)
      await char.save()

      ctx.body = { status: 'ok', character: char }
    } catch (e) {
      log.error(e)
      ctx.body = { status: 'err', err: e }
    }
  })
}
