require('dotenv').config({silent: true})
const log = new (require('./logger'))('index')

const http = require('http')
const koa = require('koa')
const app = koa()
const _io = require('socket.io')
const router = require('koa-router')()
const World = require('./World')

// Create the server and socket.io server
const server = http.createServer(app.callback())
const io = _io(server, { transports: ['websocket'], wsEngine: 'uws' })

const D = new World(router, io, app.context) // eslint-disable-line no-unused-vars

// body parser
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// Sessions
const session = require('koa-session')
app.keys = ['7d91MFztQrxYWqwLHEN5bNjjbOqSb8fS']
app.use(session({ store: D.sessionStore() }, app))

const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

// Construct the World!
D.mountRoutes()

// Request logger
app.use(async (next) => {
  let timeStart = new Date()
  await next
  let timeElapsed = new Date() - timeStart

  log.request(`${this.status} ${this.method} ${this.url} - ${this.ip} - took ${timeElapsed}ms`)
})

// Mount the router last
app.use(router.routes()).use(router.allowedMethods())

// Start it!
// TODO: configurate!
log.info(`starting HTTP server on ${process.env.APP_PORT || 6769}`)
server.listen(process.env.APP_PORT || 6769)
