using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SMirrorParkHair : BarberShop {
        public SMirrorParkHair() : base() {
            // debug = true;

            shopName = "Mirror Park Hot Shave";

            barberPos = new Vector3(1211.477f, -470.8336f, 66.20809f); 
            barberRot = 85.56119f;
            barberModel = "FemBarberSFM";
            chatName = "Barber";
            barberAnimDict = "";
            barberAnimName = "";


            shopBoxStart = new Vector3(1206.099f, -473.9077f, 67f);
            shopBoxEnd = new Vector3(1216.765f, -472.1242f, 67f);

            shopTriggerPos = new Vector3(1210.12, -470.3419f, 67f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(-1844444717, new Vector3(1207.8731689453125, -470.06298828125, 66.358));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }

}