using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SChumashClothes : ClothingShop {
        public SChumashClothes() : base() {
            // debug = false;

            shopName = "Suburban Outfitters";

            cashierPos = new Vector3(-3169.405f, 1043.098f, 20.86324f); 
            cashierRot = 63.2403f;
            cashierModel = "Korean01GMY";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(-3162.415f, 1057.036f, 21f);
            shopBoxEnd = new Vector3(-3180.18f, 1040.075f, 21);

            shopTriggerPos = new Vector3(-3170.523f, 1043.985f, 19.86324f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(1780022985, new Vector3(-3167.75, 1055.536, 21.53288));

            API.exported.doormanager.refreshDoorState(d1);
        }
    }
}