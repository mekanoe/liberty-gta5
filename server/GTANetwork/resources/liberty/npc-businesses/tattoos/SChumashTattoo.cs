using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SChumashTattoo : Tattoo {
        public SChumashTattoo() : base() {
            //debug = true;

            shopName = "Chumash Tattoo Studio";

            artistPos = new Vector3(-3169.392f, 1078.552f, 20.45745f); 
            artistRot = 160.1245f;
            artistModel = "Tattoo01AMO";
            artistAnimDict = "amb@code_human_in_bus_passenger_idles@male@sit@base";
            artistAnimName = "base";

            shopBoxStart = new Vector3(-3168.178f, 1078.677f, 21f);
            shopBoxEnd = new Vector3(-3175.604f, 1074.769f, 21f);

            shopTriggerPos = new Vector3(-3169.673f, 1077.3f, 19.82916f);

            API.onResourceStart += onStart;
            API.onResourceStart += doors;
        }

        private void doors() {
            var doorHash = API.getHashKey("v_ilev_ta_door");
            int d1 = API.exported.doormanager.registerDoor(doorHash, new Vector3(-3167.788818359375, 1074.766845703125, 20.9209));

            API.exported.doormanager.refreshDoorState(d1);

        }
    }
}