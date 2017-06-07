using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SGrapeseedClothes : ClothingShop {
        public SGrapeseedClothes() : base() {
            // debug = false;

            shopName = "Discount Store";

            cashierPos = new Vector3(1695.484f, 4822.281f, 42.06308f); 
            cashierRot = 91.30035f;
            cashierModel = "GenHot01AFY";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(1688.552f, 4816.735f, 43f);
            shopBoxEnd = new Vector3(1698.405f, 4830.845f, 43f);

            shopTriggerPos = new Vector3(1693.941f, 4822.119f, 43f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(868499217, new Vector3(1686.983154296875, 4821.74072265625, 42.2131));
            int d2 = API.exported.doormanager.registerDoor(-1148826190, new Vector3(1687.28173828125, 4819.484375, 42.2131));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}