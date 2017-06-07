using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SVinewoodClothes : ClothingShop {
        public SVinewoodClothes() : base() {
            // debug = true;

            shopName = "Suburban Outfitters";

            cashierPos = new Vector3(127.0111f, -224.5004f, 54.55782f); 
            cashierRot = 86.89491f;
            cashierModel = "ShopMidSFY";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(133.6455f, -210.2006f, 53.7f);
            shopBoxEnd = new Vector3(116.4259f, -228.0651f, 56f);

            shopTriggerPos = new Vector3(125.3296f, -224.1839f, 53.55783f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(1780022985, new Vector3(127.8201, -211.8274, 55.22751));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }

}