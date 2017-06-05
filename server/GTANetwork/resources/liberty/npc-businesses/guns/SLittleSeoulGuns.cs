using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SLittleSeoulGuns : GunShop {
        public SLittleSeoulGuns() : base() {
            debug = true;

            shopName = "Little Seoul Gun Club";

            cashierPos = new Vector3(-662.6229f, -933.516f, 21.82924f); 
            cashierRot = 179.4833f;
            cashierModel = "AmmuCity01SMY";

            shopBoxStart = new Vector3(-659.849f, -943.2538f, 22f);
            shopBoxEnd = new Vector3(-666.4834f, -932.9359f, 22f);

            shopTriggerPos = new Vector3(-662.7239f, -934.9276f, 22f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(-8873588, new Vector3(-662.6415, -944.3256, 21.97915));
            // int d2 = API.exported.doormanager.registerDoor(97297972, new Vector3(-665.2424, -944.3256, 21.97915));
            // Left door opens by default, the right doesn't. If that ever change, just need to 
            // Uncomment those 2 lines and make sure that the model still is the same
            API.exported.doormanager.refreshDoorState(d1);
            // API.exported.doormanager.refreshDoorState(d2);
        }
    }

}