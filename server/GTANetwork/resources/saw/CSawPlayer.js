class PlayerEntity {
    constructor () {
        this.disabled = false
    }

    disablePlayer (state = true) {
        this.disabled = state
    }

    disableTick() {
        if (this.disabled) {
            API.disableAllControlsThisFrame()
        }
    }
}

const Player = new PlayerEntity()

API.onChatCommand.connect((msg) => {
    if (msg === 'get pos') {
        const pos = API.getGameplayCamPos()
        API.sendChatMessage(`~b~Position:~w~ ~g~X:~w~ ${pos.X} ~g~Y:~w~ ${pos.Y} ~g~Z:~w~ ${pos.Z}`)
    }  
})

API.onServerEventTrigger.connect(function (name, args) {
    switch (name) {
        case 'createCamera':
            const pos = args[0]
            const target = args[1]

            const newCam = API.createCamera(pos, new Vector3())
            API.pointCameraAtPosition(newCam, target)
            API.setActiveCamera(newCam)
            break

        case 'endCamera':
            API.setActiveCamera(null)
            break

        case 'disablePlayer':
            Player.disablePlayer(true)
            break

        case 'enablePlayer':
            Player.disablePlayer(false)
            break
    }
});

API.onUpdate.connect(() => {
    Player.disableTick()
})