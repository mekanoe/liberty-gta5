using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SVespucciHair : BarberShop {
        public SVespucciHair() : base() {
            // debug = true;

            shopName = "Vespucci Hot Shave";

            barberPos = new Vector3(-1283.386f, -1118.365f, 7.000126f); 
            barberRot = 57.162f;
            barberModel = "FemBarberSFM";
            chatName = "Barber";
            barberAnimDict = "amb@world_human_leaning@female@smoke@base";
            barberAnimName = "base";


            shopBoxStart = new Vector3(-1288.473f, -1119.739f, 8f);
            shopBoxEnd = new Vector3(-1278.682f, -1115.554f, 8f);

            shopTriggerPos = new Vector3(-1284.023f, -1117.052f, 8f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(-1844444717, new Vector3(-1287.8568115234375, -1115.7415771484375, 7.1401));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }

}