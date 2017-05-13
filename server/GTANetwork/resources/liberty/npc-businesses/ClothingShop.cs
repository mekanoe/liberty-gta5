using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class ClothingShop : Script {
        public bool debug = false;

        public string shopName;

        public NetHandle cashierNpc;
        public Vector3 cashierPos; 
        public float cashierRot;
        public string cashierModel;

        public Vector3 shopBoxStart;
        public Vector3 shopBoxEnd;

        public ColShape shopTrigger;
        public Vector3 shopTriggerPos;

        public ClothingShop() {
            
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
            cashierNpc = API.createPed(API.pedNameToModel(cashierModel), cashierPos, cashierRot);
        }

        private void createInteriorBox() {
            ColShape shopInteriorCol = API.create3DColShape(shopBoxEnd, shopBoxStart);
            shopInteriorCol.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:enter", "clothing", shopName);
                }
            };

            shopInteriorCol.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:exit", "clothing", shopName);
                }
            };
        }

        private void createTrigger() {
            ColShape shopTrigger = API.createCylinderColShape(shopTriggerPos, 1f, 3f);
            API.createMarker(1, shopTriggerPos, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 100, 108, 24);

            var blip = API.createBlip(shopTriggerPos);
            blip.name = shopName;
            blip.sprite = 73;
            blip.shortRange = true;

            shopTrigger.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~o~Cashier~g~]:~w~ Hello! Welcome to "+shopName+"! Tell me if you need anything.");
                    API.sendNotificationToPlayer(player, "Press ~b~F~w~ to use the shop.");
                    API.triggerClientEvent(player, "npcbiz:triggerEnter", "clothing", shopName);
                }
            };

            shopTrigger.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:triggerExit", "clothing", shopName);
                }
            };
        }

        private void createMarkers() {
            API.createMarker(28, shopBoxStart, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 255, 0, 0);

            API.createMarker(28, shopBoxEnd, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 0, 255, 0);
        }
    }
}