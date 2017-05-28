let CEFKit

API.onResourceStart.connect(() => {
  CEFKit = resource.cefkit
})

API.onServerEventTrigger.connect((name, args) => {
  switch (name) {
    case 'user:loginStart':
      createLogin(args[0])
      break
    case 'user:loginEnd':
      endLogin()
      break
  }
})

function createLogin (userToken) {
  CEFKit.awaitSetup().then(() => {
    CEFKit.loadGlobal(`/auth/login?token=${userToken}`)
    API.showCursor(true)
    // API.setChatVisible(false)
  })
}

function endLogin () {
  CEFKit.headlessGlobal(true)
  API.showCursor(false)
  API.setChatVisible(true)
}
