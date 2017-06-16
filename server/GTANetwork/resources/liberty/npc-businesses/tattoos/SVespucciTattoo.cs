using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SVespucciTattoo : Tattoo {
        public SVespucciTattoo() : base() {
            //debug = true;

            shopName = "Vespucci Tattoo Studio";

            artistPos = new Vector3(-1153.589f, -1427.321f, 4.954463f); 
            artistRot = 21.1131f;
            artistModel = "Tattoo01AMO";
            artistAnimDict = "";
            artistAnimName = "";

            shopBoxStart = new Vector3(-1157.112f, -1427.461f, 5f);
            shopBoxEnd = new Vector3(-1148.745f, -1428.004f, 5f);

            shopTriggerPos = new Vector3(-1153.487f, -1426.418f, 3.954463f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            var doorHash = API.getHashKey("v_ilev_ta_door");
            int d1 = API.exported.doormanager.registerDoor(doorHash, new Vector3(-1155.4541015625, -1424.0079345703125, 5.0461));

            API.exported.doormanager.refreshDoorState(d1);

        }
    }
}