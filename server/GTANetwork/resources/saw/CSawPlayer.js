function debounce(func, wait, immediate) {
    let timeout
    return function() {
        let context = this, args = arguments
        let later = function() {
            timeout = null
            if (!immediate) {
                func.apply(context, args)
            }
        }
        let callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) {
            func.apply(context, args)
        }
    }
}

class PlayerEntity {
    constructor () {
        this.disabled = false
        this.nearbyEvent = null
        this.triggeredNearbyEvent = false
        this.entity = API.getLocalPlayer()
    }

    disablePlayer (state = true) {
        this.disabled = state
    }

    onTick() {
        if (this.disabled) {
            API.disableAllControlsThisFrame()
        }

        if (this.nearbyEvent !== null && this.triggeredNearbyEvent === false) {
            if (API.isControlPressed(23)) {
                API.triggerServerEvent('triggerableEvent:trigger', this.nearbyEvent)
                // API.sendChatMessage('pressed trigger for '+ this.nearbyEvent)
                this.triggeredNearbyEvent = true
            }
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

        case 'teleport':
            if (API.isWaypointSet()) {
                API.triggerServerEvent("player-tp", API.getWaypointPosition())
            }

        case 'worldEv:blackout:on':
            API.playSoundFrontEnd('Power_Down', 'DLC_HEIST_HACKING_SNAKE_SOUNDS')
            break

        case 'worldEv:blackout:off':
            API.playSoundFrontEnd('Drill_Pin_Break', 'DLC_HEIST_FLEECA_SOUNDSET')
            break     

        case 'triggerableEvent:enter':
            Player.nearbyEvent = args[0]
            // API.sendNotification(`Entered trigger for ~b~${args[0]}.`)
            break

        case 'triggerableEvent:exit':
            Player.nearbyEvent = null
            Player.triggeredNearbyEvent = false
            // API.sendNotification(`Exited trigger for ~b~${args[0]}.`)
            break

    }
});

API.onUpdate.connect(() => {
    Player.onTick()
})