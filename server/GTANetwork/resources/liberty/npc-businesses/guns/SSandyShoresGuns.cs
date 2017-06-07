using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SSandyShoresGuns : GunShop {
        public SSandyShoresGuns() : base() {
            //debug = true;

            shopName = "Sandy Shores Gun Club";

            cashierPos = new Vector3(1692.063f, 3760.825f, 34.70536f); 
            cashierRot = -133.2583f;
            cashierModel = "ExArmy01";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(1700.971f, 3756.153f, 35f);
            shopBoxEnd = new Vector3(1688.947f, 3758.28f, 35f);

            shopTriggerPos = new Vector3(1693.186f, 3759.967f, 35f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(97297972, new Vector3(1698.17626953125, 3751.505615234375, 34.8553));
            int d2 = API.exported.doormanager.registerDoor(-8873588, new Vector3(1699.9371337890625, 3753.420166015625, 34.8553));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}