using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SPaletoBayClothes : ClothingShop {
        public SPaletoBayClothes() : base() {
            // debug = false;

            shopName = "Discount Store";

            cashierPos = new Vector3(5.406301f, 6510.937f, 31.87783f); 
            cashierRot = 43.9467f;
            cashierModel = "GenHot01AFY";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(-3.232693f, 6513.215f, 32f);
            shopBoxEnd = new Vector3(13.97336f, 6513.496f, 32f);

            shopTriggerPos = new Vector3(4.340195f, 6512.064f, 32f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(868499217, new Vector3(-0.0564, 6517.4609375, 32.027801513671875));
            int d2 = API.exported.doormanager.registerDoor(-1148826190, new Vector3(-1.7253, 6515.91357421875, 32.027801513671875));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}