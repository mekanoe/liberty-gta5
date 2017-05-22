const log = new (require('../logger'))('api/index')
const glob = require('glob')

module.exports = async (router) => {
  const apis = glob.sync('./api/**/!(index).js')
  log.debug('found apis', apis)

  for (let a of apis) {
    if (a.endsWith('_test.js') !== null && process.env.NODE_ENV !== 'development') {
      log.debug(`skipping ${a}`)
      continue
    }
    log.debug(`mounting ${a}`)
    try {
      require(a.replace('api/', ''))(router)
    } catch (e) {
      log.error(`couldn't mount ${a}`, e)
    }
  }
}
