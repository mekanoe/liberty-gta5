using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SHarmonyClothes : ClothingShop {
        public SHarmonyClothes() : base() {
            // debug = true;

            shopName = "Suburban Outfitters";

            cashierPos = new Vector3(612.9198f, 2762.789f, 42.08814f); 
            cashierRot = -90.45712f;
            cashierModel = "ShopLowSFY";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(613.2281f, 2747.207f, 43f);
            shopBoxEnd = new Vector3(621.0297f, 2770.496f, 43f);

            shopTriggerPos = new Vector3(614.2259f, 2762.507f, 43f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(1780022985, new Vector3(617.2457885742188, 2751.022216796875, 42.757801055908));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }

}