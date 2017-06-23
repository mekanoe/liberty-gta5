using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class Bank : Script {
        public bool debug = false;

        public string bankName;

        public NetHandle tellerNpc;
        public Vector3 tellerPos; 
        public float tellerRot;
        public string tellerModel;

        public string tellerAnimDict;
        public string tellerAnimName;

        // public ColShape bankInteriorCol;
        public Vector3 bankBoxStart;
        public Vector3 bankBoxEnd;

        public ColShape bankTrigger;
        public Vector3 bankTriggerPos;

        public Bank() {
            
        }

        public void onStart() {
            createNpcs();
            createInteriorBox();
            createTrigger();

            if (debug) {
                createMarkers();
            }
        }

        private void createNpcs() {
            tellerNpc = API.createPed(API.pedNameToModel(tellerModel), tellerPos, tellerRot);
        }

        private void createInteriorBox() {
            ColShape bankInteriorCol = API.create3DColShape(bankBoxEnd, bankBoxStart);
            bankInteriorCol.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:enter", "bank", bankName);
                }
            };

            bankInteriorCol.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:exit", "bank", bankName);
                }
            };
        }

        private void createTrigger() {
            bankTrigger = API.createCylinderColShape(bankTriggerPos, 1f, 3f);
            API.createMarker(1, bankTriggerPos, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 33, 108, 24);

            var blip = API.createBlip(bankTriggerPos);
            blip.name = bankName;
            blip.sprite = 108;
            blip.shortRange = true;

            bankTrigger.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~o~Teller~g~]:~w~ Hello! How can I help you?");
                    API.sendNotificationToPlayer(player, "Press ~b~F~w~ to use the bank.");
                    API.triggerClientEvent(player, "npcbiz:triggerEnter", "bank", bankName);
                }
            };

            bankTrigger.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:triggerExit", "bank", bankName);
                }
            };
        }

        private void createMarkers() {
            API.createMarker(28, bankBoxStart, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 255, 0, 0);

            API.createMarker(28, bankBoxEnd, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 0, 255, 0);
        }

        public void updateChatCursor(string userToken) {
            Client player = (Client) API.call("SUserManager", "GetByToken", userToken);
            API.triggerClientEvent(player, "updateChatCursor", "bank", bankName);
        }
    }
}