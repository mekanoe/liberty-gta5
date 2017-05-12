using System;
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

        public void RCarSpawn(string playerName, string modelName) {
            VehicleHash model = API.vehicleNameToModel(modelName);
            Client target = API.getPlayerFromName(playerName);
            if (target != null) {
                MCarSpawn(target, model);
                API.consoleOutput("car "+modelName+" spawned for "+ playerName);
            }
        }
    }
}