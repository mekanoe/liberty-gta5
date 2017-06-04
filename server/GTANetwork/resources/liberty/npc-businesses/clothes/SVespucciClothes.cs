using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SVespucciClothes : ClothingShop {
        public SVespucciClothes() : base() {
            // debug = false;

            shopName = "Binco";

            cashierPos = new Vector3(-823.1474f, -1072.263f, 11.32811f); 
            cashierRot = -143.5652f;
            cashierModel = "GenHot01AFY";

            shopBoxStart = new Vector3(-814.6008f, -1075.257f, 12f);
            shopBoxEnd = new Vector3(-832.5409f, -1072.464f, 12f);

            shopTriggerPos = new Vector3(-822.0684f, -1073.426f, 11.3281f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(868499217, new Vector3(-818.7642211914062f, -1079.54443359375f, 11.478099822998047f));
            int d2 = API.exported.doormanager.registerDoor(-1148826190, new Vector3(-816.793212890625f, -1078.406494140625f, 11.478099822998047f));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }
}