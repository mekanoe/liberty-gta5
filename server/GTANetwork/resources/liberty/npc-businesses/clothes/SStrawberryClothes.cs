using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SStrawberryClothes : ClothingShop {
        public SStrawberryClothes() : base() {
            // debug = false;

            shopName = "Discount Store";

            cashierPos = new Vector3(78.09125f, -1387.605f, 29.37615f); 
            cashierRot = 175.3436f;
            cashierModel = "GenHot01AFY";

            shopBoxStart = new Vector3(81.32938f, -1387.422f, 30f);
            shopBoxEnd = new Vector3(69.8758f, -1400.295f, 30f);

            shopTriggerPos = new Vector3(78.19508f, -1389.369f, 30f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(868499217, new Vector3(82.318603515625, -1392.7518310546875, 29.5261));
            int d2 = API.exported.doormanager.registerDoor(-1148826190, new Vector3(82.318603515625, -1390.47583, 29.5261));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}