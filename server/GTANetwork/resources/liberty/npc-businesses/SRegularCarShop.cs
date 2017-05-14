using System;
using System.Threading;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SRegularCarShop : Script {
        private static Random randomCls = new Random((int)DateTimeOffset.Now.ToUnixTimeSeconds());
        public SRegularCarShop() {
            API.onResourceStart += onStart;
            // API.onResourceStart += decorations;
        }

        private void onStart() {
            API.startThread(new ThreadStart(decorations));
            // npcTriggers();
        }

        private List<CarShopDecoration> decorVehicles = new List<CarShopDecoration> {
            new CarShopDecoration(VehicleHash.Sandking, new Vector3(-134.3106f, -1163.626f, 28.80176f), 0f, new Vector3(27.31451f, -11.07546f, -36.60968f), 134, 134),

        };

        private void decorations() {
            foreach(CarShopDecoration d in decorVehicles) {
                if (d.RandomColor) {
                    d.ColorName = randomCls.Next(161);
                    d.Color2Name = randomCls.Next(161);
                }

                var v = API.createVehicle(
                    d.VehicleModel,
                    d.Position,
                    d.Rotation,
                    d.ColorName,
                    d.Color2Name
                );

                API.setEntityInvincible(v, true);
                API.setVehicleLocked(v, true);
                API.setVehicleEngineStatus(v, false);
                API.setVehicleNumberPlate(v, "CARSHOP");
                API.setVehicleNumberPlateStyle(v, 5);
                API.sleep(250);
                API.setEntityPositionFrozen(v, true);
            }
        }

        private Vector3 npcPos = new Vector3(-39.38067f, -1111.58f, 26.43742f);

        private void npcTriggers() {
            var ped = API.createPed(API.pedNameToModel("SiemonYetarian"), npcPos, 94f);
            API.playPedScenario(ped, "WORLD_HUMAN_PARTYING");

            var blip = API.createBlip(npcPos);
            blip.name = "Premium Deluxe Motorsports (High End Cars)";
            blip.sprite = 225;
            blip.color = 2;
            blip.shortRange = true;

            ColShape chatBubble = API.createSphereColShape(npcPos, 40f);
            chatBubble.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~r~Simeon~g~]:~w~ "+getPitch());
                }
            };



            ColShape shopBubble = API.createSphereColShape(npcPos, 3f);
            shopBubble.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~r~Simeon~g~]:~w~ You want a car, or what?");
                    API.triggerClientEvent(player, "npcbiz:enterTrigger", "supercar", "Premium Deluxe Motorsports");
                    API.sendNotificationToPlayer(player, "Press ~b~F~w~ to buy a high end car.");
                }
            };
            shopBubble.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:exitTrigger", "supercar", "Premium Deluxe Motorsports");
                }
            };
        }

        private List<string> pitches = new List<string>{
            "Like to go fast? Buy a supercar today! Starting at the low low price of ~g~$100,000~w~!",
            "Get off the bike, get in a luxury automobile!",
            "We sell sports cars too!",
            "Get this ~b~Voltic~w~ off my lot! Extreme fuel effeciency!",
            "Speed! Go fast! VROOOOOM!",
        };

        private string getPitch() {
            return pitches[randomCls.Next(pitches.Count)];
        }
    }
}