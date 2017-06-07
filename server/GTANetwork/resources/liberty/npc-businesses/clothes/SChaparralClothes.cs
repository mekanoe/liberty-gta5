using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SChaparralClothes : ClothingShop {
        public SChaparralClothes() : base() {
            // debug = false;

            shopName = "Discount Store";

            cashierPos = new Vector3(-1102.005f, 2712.014f, 19.10787f); 
            cashierRot = -134.7596f;
            cashierModel = "GenHot01AFY";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(-1093.394f, 2709.815f, 20f);
            shopBoxEnd = new Vector3(-1110.616f, 2709.7596f, 20f);

            shopTriggerPos = new Vector3(-1101.395f, 2710.526f, 20f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(868499217, new Vector3(-1096.6612548828125, 2705.4458, 19.25779914855957));
            int d2 = API.exported.doormanager.registerDoor(-1148826190, new Vector3(-1094.9652099609375, 2706.963623046875, 19.2577991485595));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}