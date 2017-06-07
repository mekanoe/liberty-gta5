using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class BarberShop : Script {
        public bool debug = false;

        public string shopName;
        public string chatName;

        public NetHandle barberNpc;
        public Vector3 barberPos; 
        public float barberRot;
        public string barberModel;

        public string barberAnimDict;
        public string barberAnimName;

        public Vector3 shopBoxStart;
        public Vector3 shopBoxEnd;

        public ColShape shopTrigger;
        public Vector3 shopTriggerPos;

        public BarberShop() {
            
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
            barberNpc = API.createPed(API.pedNameToModel(barberModel), barberPos, barberRot);
            if (barberAnimDict != "") {
                API.playPedAnimation(barberNpc, true, barberAnimDict, barberAnimName);
            }
        }

        private void createInteriorBox() {
            ColShape shopInteriorCol = API.create3DColShape(shopBoxEnd, shopBoxStart);
            shopInteriorCol.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:enter", "hair", shopName);
                }
            };

            shopInteriorCol.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:exit", "hair", shopName);
                }
            };
        }

        private void createTrigger() {
            ColShape shopTrigger = API.createCylinderColShape(shopTriggerPos, 1f, 3f);
            API.createMarker(1, shopTriggerPos, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 100, 108, 24);

            var blip = API.createBlip(shopTriggerPos);
            blip.name = shopName;
            blip.sprite = 71;
            blip.shortRange = true;

            shopTrigger.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~o~"+chatName+"~g~]:~w~ Hey! Let's clean up that head.");
                    API.sendNotificationToPlayer(player, "Press ~b~F~w~ to use the shop.");
                    API.triggerClientEvent(player, "npcbiz:triggerEnter", "hair", shopName);
                }
            };

            shopTrigger.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:triggerExit", "hair", shopName);
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