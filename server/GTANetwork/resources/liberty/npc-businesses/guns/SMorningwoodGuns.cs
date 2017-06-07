using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SMorningwoodGuns : GunShop {
        public SMorningwoodGuns() : base() {
            //debug = true;

            shopName = "Morningwood Gun Club";

            cashierPos = new Vector3(-1304.343f, -397.1494f, 36.69577f); 
            cashierRot = 37.97071f;
            cashierModel = "CntryBar01SMM";
            cashierAnimDict = "amb@world_human_leaning@male@wall@back@hands_together@base";
            cashierAnimName = "base";

            shopBoxStart = new Vector3(-1314.107f, -394.6176f, 37f);
            shopBoxEnd = new Vector3(-1302.479f, -390.722f, 37f);

            shopTriggerPos = new Vector3(-1306.143f, -394.121f , 37f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(97297972, new Vector3(-1313.825927734375, -389.125885, 36.845699310302734));
            int d2 = API.exported.doormanager.registerDoor(-8873588, new Vector3(-1314.4649658203125, -391.6471862792969, 36.845699310302734));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}