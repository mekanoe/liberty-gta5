using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.AdminCommands {

    class SAdminCommands {
        public SAdminCommands() {

        }

        [Command("car")]
        public void MCarSpawn(Client sender, VehicleHash model) {
            var rot = API.shared.getEntityRotation(sender.handle);
            var veh = API.shared.createVehicle(model, sender.position, new Vector3(0, 0, rot.Z), 0, 0);
            API.shared.setPlayerIntoVehicle(sender, veh, -1);  
        }
    }
}