using System;
using System.Threading;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.AdminCommands {

    class SAdminCommands : Script {
        public SAdminCommands() {

        }

        [Command("car")]
        public void MCarSpawn(Client sender, VehicleHash model) {
            var rot = API.getEntityRotation(sender.handle);
            var veh = API.createVehicle(model, sender.position, new Vector3(0, 0, rot.Z), 0, 0);
            API.setPlayerIntoVehicle(sender, veh, -1);  
        }

        [Command("loc")]
        public void MDebugPos(Client player) {
            Vector3 pos = API.getEntityPosition(player);
            Vector3 rot = API.getEntityRotation(player);
            API.sendChatMessageToPlayer(player, "~b~Position:~w~ ~g~X:~w~ "+pos.X+" ~g~Y:~w~ "+pos.Y+" ~g~Z:~w~ "+pos.Z+" ~g~A:~w~ "+rot.Z);
        }
        [Command("rot")]
        public void MDebugRot(Client player) {
            Vector3 pos = API.getEntityRotation(player);
            API.sendChatMessageToPlayer(player, "~b~Rotation:~w~ ~g~X:~w~ "+pos.X+" ~g~Y:~w~ "+pos.Y+" ~g~Z:~w~ "+pos.Z);
        }

        public void RCarSpawn(string playerName, string modelName) {
            VehicleHash model = API.vehicleNameToModel(modelName);
            Client target = API.getPlayerFromName(playerName);
            if (target != null) {
                MCarSpawn(target, model);
                API.consoleOutput("car "+modelName+" spawned for "+ playerName);
            }
        }

        public void RReloadLiberty() {
            API.startThread(new ThreadStart(_reload));
        }

        private void _reload() {
            API.stopResource("liberty");
            API.startResource("liberty");
        }

        [Command("gtao-update")]
        public void MGTAOUpdate(Client sender) {
            API.exported.gtaocharacter.updatePlayerFace(sender);
        }

        [Command("gtao-init")]
        public void MGTAOInit(Client sender) {
            API.exported.gtaocharacter.initializePedFace(sender);
        }
    }
}