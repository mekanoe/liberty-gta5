using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class STataviamGuns : GunShop {
        public STataviamGuns() : base() {
            //debug = true;

            shopName = "Tataviam Gun Club";

            cashierPos = new Vector3(2565.443f, 292.1537f, 108.7349f); 
            cashierRot = -38.93276f;
            cashierModel = "Vagos01GFY";
            cashierAnimDict = "amb@world_human_leaning@female@wall@back@holding_elbow@base";
            cashierAnimName = "base";

            shopBoxStart = new Vector3(2565.511f, 302.2808f, 109f);
            shopBoxEnd = new Vector3(2572.166f, 291.9569f, 109f);

            shopTriggerPos = new Vector3(2567.534f, 293.9543f, 109f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int d1 = API.exported.doormanager.registerDoor(97297972, new Vector3(2570.904541015625, 303.3555908203125, 108.88480377197266));
            int d2 = API.exported.doormanager.registerDoor(-8873588, new Vector3(2568.3037109375, 303.3555908203125, 108.88480377197266));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }
}