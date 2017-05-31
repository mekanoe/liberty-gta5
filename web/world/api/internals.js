module.exports = R => {
  R.post('/api/internals/restart', (ctx, next) => {
    ctx.io.emit('SYSTEM_RESTART')
    ctx.body = { status: 'ok' }
  })
}
