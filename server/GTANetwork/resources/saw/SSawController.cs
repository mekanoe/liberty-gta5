using System;
using GTANetworkServer;
using GTANetworkShared;

public class SSawController : Script {
	private readonly Vector3 prespawnCamPos = new Vector3(-65.2965f, -1351.4743f, 30.9254f);
	private readonly Vector3 prespawnCamPointPos = new Vector3(-65.2965f+235.89f, -1351.4743f-235.89f, 30.9254f);
	private readonly Vector3 prespawnCamPlayerPos = new Vector3(-65.2965f, -1351.4743f, 35.9254f);

	public SSawController() {
		API.onPlayerConnected += onPlayerConnected;
		API.onPlayerFinishedDownload += onPlayerDownload;
		API.sendChatMessageToAll("~r~ALERT: ~w~SAW system was restarted.~w~");
		API.sendChatMessageToAll("~p~The world has been reset.\nSorry for the inconvenience.~w~");
	}

	[Command("debug-event-playerconn")]
	public void onPlayerConnected(Client player) {
		API.setEntityData(player, "VPlayerIsSpawned", false);
		API.sendChatMessageToPlayer(player, "~b~See ~g~https://libertyrp.net/saw~b~ for how to play.~w~");
		API.sendChatMessageToPlayer(player, "When you're ready to play, send ~b~/spawn~w~ in chat.");
		ActivateSpawnCamera(player);
	}

	[Command("debug-event-playerdl")]
	public void onPlayerDownload(Client player) {
		if (API.getEntityData(player, "VPlayerIsSpawned") != true) {
			ActivateSpawnCamera(player);
		}
	}

	[Command("debug-getpos")]
	public void MDebugPos(Client player) {
		Vector3 pos = API.getEntityPosition(player);
		API.sendChatMessageToPlayer(player, "~b~Position:~w~ ~g~X:~w~ "+pos.X+" ~g~Y:~w~ "+pos.Y+" ~g~Z:~w~ "+pos.Z);
	}

	[Command("debug-disable-player")]
	public void MDebugDisable(Client sender, bool state) {
		if (state) {
			API.triggerClientEvent(sender, "disablePlayer");
		} else {
			API.triggerClientEvent(sender, "enablePlayer");
		}
	}

	[Command("spawn")]
	public void MSpawn(Client sender) {
		if (API.getEntityData(sender, "VPlayerIsSpawned") == false) {
			API.sendChatMessageToPlayer(sender, "~r~Survive.~w~");
			SpawnPlayerFromCamera(sender);
		} else {
			API.sendChatMessageToPlayer(sender, "This command is unavailable while spawned.");
			API.sendChatMessageToPlayer(sender, "If you'd like to re-roll, use ~b~/suicide~w~");
		}
	}

	[Command("suicide")]
	public void MSuicide(Client sender) {
		if (API.getEntityData(sender, "VPlayerIsSpawned") == true || !API.hasEntityData(sender, "VPlayerIsSpawned")) {
			ResetPlayer(sender);
			ActivateSpawnCamera(sender);
			API.sendChatMessageToPlayer(sender, "~r~~h~You killed yourself.\nSend ~b~/spawn~w~ to play again.");
		}
	}

	private void ResetPlayer(Client player) {
		API.removeAllPlayerWeapons(player);
	}

	private void ActivateSpawnCamera(Client player) {
		API.setEntityTransparency(player, 0);
		API.setEntityCollisionless(player, true);
		API.freezePlayer(player, true);
		API.setEntityData(player, "VPlayerIsSpawned", false);
		API.setEntityPosition(player, prespawnCamPlayerPos);
		API.triggerClientEvent(player, "disablePlayer");
		API.triggerClientEvent(player, "createCamera", prespawnCamPos, prespawnCamPointPos);

	}

	private void SpawnPlayerFromCamera(Client player) {
		API.triggerClientEvent(player, "endCamera");
		API.triggerClientEvent(player, "enablePlayer");
		API.setEntityPosition(player, prespawnCamPos);
		API.setEntityData(player, "VPlayerIsSpawned", true);
		API.freezePlayer(player, false);
		API.setEntityCollisionless(player, false);
		API.setEntityTransparency(player, 255);
	}
}