const apps = [
  'Home',
  'Test'
]

const appMap = {}

for (let app of apps) {
  console.log('injecting', app)
  appMap[app] = require(`@/components/Phone/Apps/${app}.vue`)
}

export default appMap
