using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SDavisHair : BarberShop {
        public SDavisHair() : base() {
            // debug = true;

            shopName = "Davis Hot Shave";

            barberPos = new Vector3(136.8403f, -1712.227f, 28.76799f); 
            barberRot = 51.87371f;
            barberModel = "FemBarberSFM";
            chatName = "Barber";
            barberAnimDict = "amb@prop_human_seat_chair@female@legs_crossed@base";
            barberAnimName = "base";


            shopBoxStart = new Vector3(135.2206f, -1714.036f, 30f);
            shopBoxEnd = new Vector3(138.1985f, -1703.821f, 30f);

            shopTriggerPos = new Vector3(135.3546f, -1711.069f, 30f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(-1844444717, new Vector3(133.0, -1711.0, 29.0));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }

}