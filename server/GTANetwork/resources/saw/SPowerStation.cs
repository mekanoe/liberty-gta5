using System;
using GTANetworkServer;
using GTANetworkShared;

class SPowerStation : Script {
	public SPowerStation() {
		API.onResourceStart += onResourceStart;
		API.onClientEventTrigger += onClientEvent;
	}

	public readonly Vector3 PowerStationSwitchPos = new Vector3(2463.044f, 1481.583f, 35.20328f);
	public ColShape SwitchColBox;

	private void onResourceStart() {
		SwitchColBox = API.createCylinderColShape(PowerStationSwitchPos, 1f, 1f);
		API.createMarker(1, PowerStationSwitchPos, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 255, 0, 0);

		SwitchColBox.onEntityEnterColShape += (shape, entity) => {
			Client player;
			if ((player = API.getPlayerFromHandle(entity)) != null) {
                API.sendNotificationToPlayer(player, "Press ~b~F~w~ to toggle state power.");
                API.triggerClientEvent(player, "triggerableEvent:enter", "powerstation");
            }
		};

		SwitchColBox.onEntityExitColShape += (shape, entity) => {
			Client player;
			if ((player = API.getPlayerFromHandle(entity)) != null) {
                API.triggerClientEvent(player, "triggerableEvent:exit", "powerstation");
            }
		};

	}

	private void onClientEvent(Client player, string eventName, params object[] args) {
		switch (eventName) {
			case "triggerableEvent:trigger":
				onEventTrigger(player, (string)args[0]);
				break;
		}
	}

	private void onEventTrigger(Client player, string type) {
		if (type == "powerstation") {
			if (SwitchColBox.containsEntity(player)) {
				API.call("SSawWorld", "ToggleWorldBlackoutState");
			}
		}
	}
}