using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SVinewoodHair : BarberShop {
        public SVinewoodHair() : base() {
            // debug = true;

            shopName = "Hair on Hawick";

            barberPos = new Vector3(-35.08761f, -152.3524f, 57.08652f); 
            barberRot = -63.31284f;
            barberModel = "DownTown01AMY";
            chatName = "Barber";
            barberAnimDict = "";
            barberAnimName = "";


            shopBoxStart = new Vector3(-29.64401f, -148.738f, 57f);
            shopBoxEnd = new Vector3(-37f, -155.55f, 57f);

            shopTriggerPos = new Vector3(-33.17f, -151.7346f, 56.08652f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(-1844444717, new Vector3(-29.86917, -148.1571, 57.22648));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }

}