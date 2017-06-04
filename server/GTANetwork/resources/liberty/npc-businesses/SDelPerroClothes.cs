using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SDelPerroClothes : ClothingShop {
        public SDelPerroClothes() : base() {
            // debug = false;

            shopName = "Suburban Outfitters";

            cashierPos = new Vector3(-1193.882f, -766.8334f, 17.31606f); 
            cashierRot = -147.7782f;
            cashierModel = "ShopLowSFY";

            shopBoxStart = new Vector3(-1206.704f, -775.3963f, 18f);
            shopBoxEnd = new Vector3(-1182.983f, -769.5685f, 18f);

            shopTriggerPos = new Vector3(-1193.087f, -768.0074f, 17.31864f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(1780022985, new Vector3(-1201.435, -776.8566, 17.99184));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }
}