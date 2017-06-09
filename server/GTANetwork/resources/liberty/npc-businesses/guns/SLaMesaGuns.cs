using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SLaMesaGuns : GunShop {
        public SLaMesaGuns() : base() {
            // debug = true;

            shopName = "La mesa Ammunition";

            cashierPos = new Vector3(842.1316f, -1035.65f, 28.19487f); 
            cashierRot = -2.021482f;
            cashierModel = "AmmuCity01SMY";
            cashierAnimDict = "";
            cashierAnimName = "";

            shopBoxStart = new Vector3(839.9761f, -1025.615f, 29f);
            shopBoxEnd = new Vector3(846.6099f, -1035.927f, 29f);

            shopTriggerPos = new Vector3(842.1465f, -1033.942f, 27.19486f);

            API.onResourceStart += onStart;
            // The doors for this ammunition are openable by default
        }
    }

}