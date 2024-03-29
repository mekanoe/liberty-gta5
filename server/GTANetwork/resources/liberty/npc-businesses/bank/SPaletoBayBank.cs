using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SPaletoBayBank : Bank {
        public SPaletoBayBank() : base() {
            bankName = "Paleto Bay Savings & Trust";

            tellerPos = new Vector3(-112.2346f, 6471.284f, 31.62673f); 
            tellerRot = 148f;
            tellerModel = "Business01AFY";
            tellerAnimDict = "";
            tellerAnimName = "";
            tellerAnimDict = "";
            tellerAnimName = "";


            bankBoxStart = new Vector3(-118.8712f, 6469.483f, 30.75f);
            bankBoxEnd = new Vector3(-87.83f, 6466.21f, 35f);

            bankTriggerPos = new Vector3(-113.4346f, 6469.984f, 30.62673f);


            API.onResourceStart += onStart;
            API.onResourceStart += triggerDoors;
        }

        private void triggerDoors() {    
            int d1 = API.exported.doormanager.registerDoor(-353187150, new Vector3(-111.0, 6464.0, 32.0));
            int d2 = API.exported.doormanager.registerDoor(-1666470363, new Vector3(-110.0, 6462.0, 32.0));

            API.exported.doormanager.refreshDoorState(d1);
            API.exported.doormanager.refreshDoorState(d2);
        }
    }

}