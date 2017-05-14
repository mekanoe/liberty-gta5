using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SMissionRowClothes : ClothingShop {
        public SMissionRowClothes() : base() {
            // debug = true;

            shopName = "Binco";

            cashierPos = new Vector3(427.099f, -806.6669f, 29.49113f); 
            cashierRot = 96.2f;
            cashierModel = "SouCent02AFO";

            shopBoxStart = new Vector3(419.2198f, -798.361f, 28f);
            shopBoxEnd = new Vector3(430.2198f, -812.09f, 32f);

            shopTriggerPos = new Vector3(425.2978f, -806.987f, 28.49113f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(868499217, new Vector3(418.6369934082031, -806.4569702148438, 29.6396));
            int d2 = API.exported.doormanager.registerDoor(-1148826190, new Vector3(418.6369934082031, -808.7329711914062, 29.6396));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }

}