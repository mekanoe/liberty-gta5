require('dotenv').config({silent: true})
const log = new (require('./logger'))('index')

const http = require('http')
const Koa = require('koa')
const app = new Koa()
const _io = require('socket.io')
const router = require('koa-better-router')().loadMethods()
const World = require('./World')

// Create the server and socket.io server
const server = http.createServer(app.callback())
const io = _io(server, { transports: ['websocket'], wsEngine: 'uws' })

const W = new World(router, io, app) // eslint-disable-line no-unused-vars

async function start () {
  // body parser
  const bodyParser = require('koa-bodyparser')
  app.use(bodyParser({ types: ['json'] }))

  // Sessions
  const session = require('koa-session')
  app.keys = ['7d91MFztQrxYWqwLHEN5bNjjbOqSb8fS']
  app.use(session({ store: W.sessionStore() }, app))
  // app.use(session({}, app))

  const passport = require('koa-passport')
  app.use(passport.initialize())
  app.use(passport.session())

  // Request logger
  app.use(async (ctx, next) => {
    let timeStart = new Date()
    await next()
    let timeElapsed = new Date() - timeStart

    log.request(`${ctx.status} ${ctx.method} ${ctx.url} - ${ctx.ip} - took ${timeElapsed}ms`)
    return null
  })

  // app.use(async (ctx, next) => {
  //   if (ctx.isAuthenticated() || ctx.url.startsWith('/api/auth')) {
  //     await next()
  //   } else {
  //     ctx.redirect('/login')
  //   }

  //   return null
  // })

  // Construct the World!
  await W.mountRoutes()

  // Start it!
  await W.awaitServices()
  log.info(`starting HTTP server on ${process.env.APP_PORT || 6769}`)
  server.listen(process.env.APP_PORT || 6769)
}

start()
