using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class GunShop : Script {
        private Random randomCls = new Random();
        private List<string> buddyPal = new List<string>{
            "buddy",
            "pal",
            "friend",
            "guy",
            "girl",
        };

        public bool debug = false;

        public string shopName;
        public string chatName;

        public NetHandle cashierNpc;
        public Vector3 cashierPos; 
        public float cashierRot;
        public string cashierModel;

        public Vector3 shopBoxStart;
        public Vector3 shopBoxEnd;

        public ColShape shopTrigger;
        public Vector3 shopTriggerPos;

        public GunShop() {
            
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
                    API.triggerClientEvent(player, "npcbiz:enter", "guns", shopName);
                }
            };

            shopInteriorCol.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:exit", "guns", shopName);
                }
            };
        }

        private void createTrigger() {
            ColShape shopTrigger = API.createCylinderColShape(shopTriggerPos, 1f, 3f);
            API.createMarker(1, shopTriggerPos, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 100, 133, 0, 0);

            var blip = API.createBlip(shopTriggerPos);
            blip.name = shopName;
            blip.sprite = 110;
            blip.shortRange = true;

            shopTrigger.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~o~Cashier~g~]:~w~ Hey, "+getBuddyPal()+". Keep your nose clean.");
                    API.sendNotificationToPlayer(player, "Press ~b~F~w~ to use the shop.");
                    API.triggerClientEvent(player, "npcbiz:triggerEnter", "guns", shopName);
                }
            };

            shopTrigger.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:triggerExit", "guns", shopName);
                }
            };
        }

        private string getBuddyPal() {
            return buddyPal[randomCls.Next(buddyPal.Count)];
        }

        private void createMarkers() {
            API.createMarker(28, shopBoxStart, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 255, 0, 0);

            API.createMarker(28, shopBoxEnd, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 0, 255, 0);
        }
    }
}