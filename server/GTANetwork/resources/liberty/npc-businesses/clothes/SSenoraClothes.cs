using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SSenoraClothes : ClothingShop {
        public SSenoraClothes() : base() {
            // debug = false;

            shopName = "Discount Store";

            cashierPos = new Vector3(1202.056f, 2707.514f, 38.226f); 
            cashierRot = 87.74557f;
            cashierModel = "GenHot01AFY";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(1202.336f, 2704.46f, 39f);
            shopBoxEnd = new Vector3(1189.302f, 2715.744f, 39f);

            shopTriggerPos = new Vector3(1200.208f, 2707.512f, 39f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(868499217, new Vector3(1196.824951171875, 2703.220947265625, 38.3726));
            int d2 = API.exported.doormanager.registerDoor(-1148826190, new Vector3(1199.1, 2703.220947265625, 38.3726));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}