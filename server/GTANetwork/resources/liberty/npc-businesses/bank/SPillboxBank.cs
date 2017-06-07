using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SPillboxBank : Bank {

        public SPillboxBank() : base() {
            bankName = "Pillbox Hill Bank of Liberty";

            tellerPos = new Vector3(149.4395f, -1042.0f, 29.3741f); 
            tellerRot = -17f;
            tellerModel = "Business01AMY";
            tellerAnimDict = "";
            tellerAnimName = "";

            bankBoxStart = new Vector3(154f, -1037.92f, 30f);
            bankBoxEnd = new Vector3(140.069f, -1045.307f, 26f);

            bankTriggerPos = new Vector3(149.9416f, -1040.5f, 28.37409f);

            API.onResourceStart += onStart;
        }
    }

}