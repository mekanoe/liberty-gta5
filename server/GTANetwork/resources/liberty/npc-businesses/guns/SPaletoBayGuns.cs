using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SPaletoBayGuns : GunShop {
        public SPaletoBayGuns() : base() {
            //debug = true;

            shopName = "Paleto Bay Gun Club";

            cashierPos = new Vector3(-331.8073f, 6084.853f, 31.45479f); 
            cashierRot = -135.2606f;
            cashierModel = "HillBilly02AMM";
            cashierAnimDict = "bar_4_rcm-0";
            cashierAnimName = "prop_protest_table_01-0";

            shopBoxStart = new Vector3(-323.0596f, 6079.844f, 32f);
            shopBoxEnd = new Vector3(-335.0438f, 6082.446f, 32f);

            shopTriggerPos = new Vector3(-330.4546f, 6084.225f, 30.45479f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(97297972, new Vector3(-326.1122131347656, 6075.26953125, 31.6047000885));
            int d2 = API.exported.doormanager.registerDoor(-8873588, new Vector3(-324.27301025390625, 6077.10888671875, 31.6047000885));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}