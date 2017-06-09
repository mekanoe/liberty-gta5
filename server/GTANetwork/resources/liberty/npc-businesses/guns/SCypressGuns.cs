using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SCypressGuns : GunShop {
        public SCypressGuns() : base() {
            // debug = true;

            shopName = "Cypress Ammunition";

            cashierPos = new Vector3(810.0264f, -2159.082f, 29.61902f); 
            cashierRot = -6.187465f;
            cashierModel = "AmmuCountrySMM";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(809.6104f, -2148.831f, 30f);
            shopBoxEnd = new Vector3(827.1306f, -2163.782f, 30f);

            shopTriggerPos = new Vector3(810.0432f, -2157.338f, 28.61902f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors; // Shooting range door
            // The doors for this ammunition are openable by default
        }

        private void doors() {
            int shootingRange = API.exported.doormanager.registerDoor(-8873588, new Vector3(6.81789, -1098.209, 29.94685));
            API.exported.doormanager.refreshDoorState(shootingRange);
            // Doors are opening by default

        }
    }

}