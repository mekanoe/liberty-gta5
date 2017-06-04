using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SRockfordClothes : ClothingShop {
        public SRockfordClothes() : base() {
            shopName = "Ponsonby's";

            cashierPos = new Vector3(-164.9668f, -302.9901f, 39.73329f); 
            cashierRot = -104.5f;
            cashierModel = "Business01AMY";

            shopBoxStart = new Vector3(-160.3646f, -314.1752f, 38.5f);
            shopBoxEnd = new Vector3(-162.4195f, -293.5072f, 43f);

            shopTriggerPos = new Vector3(-163.2722f, -303.363f, 38.73329f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(-1922281023, new Vector3(-156.439, -304.4294, 39.99308));
            int d2 = API.exported.doormanager.registerDoor(-1922281023, new Vector3(-157.1293, -306.4341, 39.99308));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }

}