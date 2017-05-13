using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SSuburbanProsperity : ClothingShop {
        public SSuburbanProsperity() : base() {
            // debug = true;

            shopName = "Suburban Outfitters";

            cashierPos = new Vector3(127.0111f, -224.5004f, 54.55782f); 
            cashierRot = 86.89491f;
            cashierModel = "ShopMidSFY";

            shopBoxStart = new Vector3(133.6455f, -210.2006f, 53.7f);
            shopBoxEnd = new Vector3(116.4259f, -228.0651f, 56f);

            shopTriggerPos = new Vector3(125.3296f, -224.1839f, 53.55783f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(1780022985, new Vector3(-1201.435f, -776.8566f, 17.99184f));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }

}