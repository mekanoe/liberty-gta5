using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SBeachStandClothes : ClothingShop {
        public SBeachStandClothes() : base() {
            // debug = false;

            shopName = "Movie Masks"; 
            cashierPos = new Vector3(-1336.827f, -1276.544f, 4.889314f); 
            cashierRot = 150.4317f;
            cashierModel = "Beach02AMM";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(-1338.579f, -1275.753f, 5f); // Box is around the front of the store
                                                                    // since it is out in the open. We can
                                                                    // make it bigger if necessary.
            shopBoxEnd = new Vector3(-1334.79f, -1280.196f, 5f);

            shopTriggerPos = new Vector3(-1337.016f, -1279.257f, 3.889314f);

            API.onResourceStart += onStart;
        }
    }
}