using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SVinewoodBank : Bank {
        public SVinewoodBank() : base() {
            // debug = true;

            bankName = "Vinewood Bank of Liberty";

            tellerPos = new Vector3(313.6394f, -280.5628f, 54.1708f); 
            tellerRot = -24f;
            tellerModel = "Business03AFY";
            tellerAnimDict = "";
            tellerAnimName = "";

            bankBoxStart = new Vector3(306.2552f, -282.5347f, 53f);
            bankBoxEnd = new Vector3(318.6682f, -277.6682f, 56f);

            bankTriggerPos = new Vector3(314.4394f, -278.5628f, 53.1708f);

            API.onResourceStart += onStart;
        }
    }

}