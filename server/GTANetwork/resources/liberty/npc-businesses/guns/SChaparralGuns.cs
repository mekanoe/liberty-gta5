using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SChaparralGuns : GunShop {
        public SChaparralGuns() : base() {
            //debug = true;

            shopName = "Chaparral Gun Club";

            cashierPos = new Vector3(-1118.866f, 2693.896f, 18.55415f); 
            cashierRot = -50.89477f;
            cashierModel = "CntryBar01SMM";
            cashierAnimDict = "amb@world_human_leaning@male@wall@back@foot_up@base";
            cashierAnimName = "base";

            shopBoxStart = new Vector3(-1110.704f, 2694.166f, 19f);
            shopBoxEnd = new Vector3(-1122.515f, 2697.41f, 19f);

            shopTriggerPos = new Vector3(-1117.425f, 2694.844f, 17.55415f);

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