using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SHawickGuns : GunShop {
        public SHawickGuns() : base() {
            debug = true;

            shopName = "Hawick Gun Club";

            cashierPos = new Vector3(253.7385f, -50.92331f, 69.94112f); 
            cashierRot = 70.00214f;
            cashierModel = "CntryBar01SMM";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(243.8938f, -49.51519f, 70f);
            shopBoxEnd = new Vector3(255.9551f, -46.80859f, 70f);

            shopTriggerPos = new Vector3(251.7012f, -50.04094f, 70f);

            API.onResourceStart += onStart;
        }
    }
}