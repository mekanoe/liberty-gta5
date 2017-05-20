// const { debug } = require('yargs').argv
// process.env.DEBUG = process.env.DEBUG || debug
// logger template//
// const log = new (require('../logger'))('server/thing')

class Logger {
  constructor (name, debugOverride = false) {
    this.name = name
    this.debugOn = (process.env.DEBUG === 'true') || debugOverride
  }

  fatal (text, ...data) {
    this.error(text, data)

    if (typeof data[data.length - 1] === 'number') {
      process.exit(data[data.length - 1])
    }

    throw text
  }

  error (text, ...data) {
    console.error(`ERR    ${this.name}:\n    ${text}`, data)
  }

  warn (text, ...data) {
    console.warn(`WARN   ${this.name}:\n    ${text}`, data)
  }

  notice (text, ...data) {
    console.log(`NOTICE ${this.name}:\n    ${text}`, data)
  }

  info (text, ...data) {
    console.info(`INFO   ${this.name}:\n    ${text}`, data)
  }

  request (text, ...data) {
    console.info(`HTTP   ${this.name}:\n    ${text}`)
  }

  debug (text, ...data) {
    if (this.debugOn) {
      console.log(`DEBUG  ${this.name}:\n    ${text}`, data)
    }
  }

  sql (logger, ...data) {
    if (logger.debugOn) {
      console.log('DEBUG SQL:\n    ', data)
    }
  }
}

module.exports = Logger
