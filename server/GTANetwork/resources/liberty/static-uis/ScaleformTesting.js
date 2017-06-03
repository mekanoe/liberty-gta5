let counter = 0
let MessageChannel

API.onResourceStart.connect(() => {
  const { require } = exported.require.require

  MessageChannel = require('@/messagechannel')

  MessageChannel.Connect('client-counter', (req) => {
    counter += 1
    req.Reply({ counter })
  })

  API.sendChatMessage('Ask for the client counter with /mc-cc')
})
