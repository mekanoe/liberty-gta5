using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SPortolaClothes : ClothingShop {
        public SPortolaClothes() : base() {
            // debug = true;

            shopName = "Ponsonby's";

            cashierPos = new Vector3(-708.9328f, -151.6636f, 37.41513f); 
            cashierRot = 131.1868f;
            cashierModel = "GurkCutscene";

            shopBoxStart = new Vector3(-720.3953f, -147.8994f, 36f);
            shopBoxEnd = new Vector3(-703.4926f, -159.8946f, 39f);

            shopTriggerPos = new Vector3(-710.3745f, -152.6378f, 36.1513f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(-1922281023, new Vector3(-715.6154, -157.2561, 37.67493));
            int d2 = API.exported.doormanager.registerDoor(-1922281023, new Vector3(-716.6755, -155.42, 37.67493));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }

}