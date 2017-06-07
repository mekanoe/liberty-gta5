using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SChumashGuns : GunShop {
        public SChumashGuns() : base() {
            //debug = true;

            shopName = "Chumash Gun Club";

            cashierPos = new Vector3(-3173.52f, 1088.559f, 20.83875f); 
            cashierRot = -112.3534f;
            cashierModel = "CntryBar01SMM";
            cashierAnimDict = "amb@world_human_leaning@male@wall@back@foot_up@base";
            cashierAnimName = "base";

            shopBoxStart = new Vector3(-3163.689f, 1086.768f, 21f);
            shopBoxEnd = new Vector3(-3175.789f, 1084.789f, 21f);

            shopTriggerPos = new Vector3(-3172.302f, 1087.832f, 21f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(97297972, new Vector3(-3164.84521484375, 1081.3917236328125, 20.9887));
            int d2 = API.exported.doormanager.registerDoor(-8873588, new Vector3(-3163.8115234375, 1083.7784423828125, 20.9887));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}