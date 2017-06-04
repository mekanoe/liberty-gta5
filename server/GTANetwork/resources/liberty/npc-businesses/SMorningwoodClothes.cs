using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SMorningwoodClothes : ClothingShop {
        public SMorningwoodClothes() : base() {
            // debug = false;

            shopName = "Ponsonby's";

            cashierPos = new Vector3(-1448.626f, -237.7738f, 49.81348f); 
            cashierRot = 50.01127f;
            cashierModel = "BevHills02AFM";

            shopBoxStart = new Vector3(-1448.777f, -225.9322f, 50f);
            shopBoxEnd = new Vector3(-1454.965f, -245.7586f, 50f);

            shopTriggerPos = new Vector3(-1449.7f, -237.0195f, 50f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(-1922281023, new Vector3(-1456.201, -233.3682, 50.05648));
            int d2 = API.exported.doormanager.registerDoor(-1922281023, new Vector3(-1454.782, -231.7927, 50.05649));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}