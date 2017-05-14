using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SPillboxGuns : GunShop {
        public SPillboxGuns() : base() {
            // debug = true;

            shopName = "Pillbox Hill Gun Club";

            cashierPos = new Vector3(22.19322f, -1105.376f, 29.79703f); 
            cashierRot = 152.25f;
            cashierModel = "CntryBar01SMM";

            shopBoxStart = new Vector3(20.79087f, -1117.061f, 28f);
            shopBoxEnd = new Vector3(7.653549f, -1095.901f, 32f);

            shopTriggerPos = new Vector3(21.65991f, -1106.775f, 28.79702f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(97297972, new Vector3(16.127899169921875, -1114.60546875, 29.9468994140625));
            int d2 = API.exported.doormanager.registerDoor(-8873588, new Vector3(18.57200050354, -1115.4951171875, 29.9468994140625));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }

}