using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SSandyShoresHair : BarberShop {
        public SSandyShoresHair() : base() {
            // debug = true;

            shopName = "Mirror Park Hot Shave";

            barberPos = new Vector3(1932.524f, 3729.942f, 32.84446f); 
            barberRot = -170.6529f;
            barberModel = "FemBarberSFM";
            chatName = "Barber";
            barberAnimDict = "";
            barberAnimName = "";


            shopBoxStart = new Vector3(1936.939f, 3726.637f, 33f);
            shopBoxEnd = new Vector3(1928.115f, 3732.933f, 33f);

            shopTriggerPos = new Vector3(1932.669f, 3729.009f, 33f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(-1844444717, new Vector3(1932.9517822265625, 3725.153564453125, 32.9944));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }

}