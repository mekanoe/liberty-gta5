using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class Tattoo : Script {
        private Random randomCls = new Random();
        private List<string> buddyPal = new List<string> {
            "buddy",
            "pal",
            "friend",
            "guy",
            "girl",
        };

        public bool debug = false;

        public string shopName;
        public string chatName;

        public NetHandle artistNpc;
        public Vector3 artistPos;
        public float artistRot;
        public string artistModel;
        public string artistAnimDict;
        public string artistAnimName;

        public Vector3 shopBoxStart;
        public Vector3 shopBoxEnd;

        public ColShape shopTrigger;
        public Vector3 shopTriggerPos;

        public Tattoo() {

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
            artistNpc = API.createPed(API.pedNameToModel(artistModel), artistPos, artistRot);
            if (artistAnimDict != "") {
                API.playPedAnimation(artistNpc, true, artistAnimDict, artistAnimName);
            }
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
            blip.sprite = 75;
            blip.shortRange = true;

            shopTrigger.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~o~Artist~g~]:~w~ Hey, "+getBuddyPal()+". Ready for new ink?");
                    API.sendNotificationToPlayer(player, "Press ~b~F~w~ to use the shop.");
                    API.triggerClientEvent(player, "npcbiz:triggerEnter", "tattoos", shopName);
                }
            };

            shopTrigger.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:exit", "tattoos", shopName);
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