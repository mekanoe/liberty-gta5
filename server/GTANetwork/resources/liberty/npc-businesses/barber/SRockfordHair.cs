using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SRockfordHair : BarberShop {
        public SRockfordHair() : base() {
            // debug = true;

            shopName = "Mirror Park Hot Shave";

            barberPos = new Vector3(-821.8907f, -183.3038f, 37.56893f); 
            barberRot = -155.1204f;
            barberModel = "Business01AFY";
            chatName = "Barber";
            barberAnimDict = "facials@gen_female@variations@happy";
            barberAnimName = "mood_happy_2";


            shopBoxStart = new Vector3(-825.0645f, -182.6724f, 38f);
            shopBoxEnd = new Vector3(-808.5528f, -184.9723f, 38f);

            shopTriggerPos = new Vector3(-821.2595f, -184.8116f, 36.56893f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            int doorHash1 = API.getHashKey("v_ilev_hd_door_l");
            int doorHash2 = API.getHashKey("v_ilev_hd_door_r");
            int d1 = API.exported.doormanager.registerDoor(doorHash1, new Vector3(-823.2, -187.08309936523438, 37.819));
            int d2 = API.exported.doormanager.registerDoor(doorHash2, new Vector3(-822.4442138671875, -188.39239501953125, 37.819));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }

}