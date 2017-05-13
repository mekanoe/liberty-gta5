using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SChumashBank : Bank {
        public SChumashBank() : base() {
            // debug = true;

            bankName = "Chumash Bank";

            tellerPos = new Vector3(-2960.864f, 482.8853f, 15.70311f); 
            tellerRot = 89.26839f;
            tellerModel = "Business02AFY";

            bankBoxStart = new Vector3(-2957f, 476.39f, 18f);
            bankBoxEnd = new Vector3(-2965.2f, 486.7f, 15f);

            bankTriggerPos = new Vector3(-2962.864f, 482.8853f, 14.70311f);

            API.onResourceStart += onStart;
        }
    }

}