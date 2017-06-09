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
            decorations();
            npcTriggers();
        }

        private List<CarShopDecoration> decorVehicles = new List<CarShopDecoration> {
            new CarShopDecoration(VehicleHash.Sandking, new Vector3(-134.3106f, -1163.626f, 28.80176f), 0f, new Vector3(27.31451f, -11.07546f, -36.60968f), 134, 134),
            
            new CarShopDecoration(VehicleHash.Sadler,     new Vector3(-132.2322f, -1183.902f, 24.76421f), -24.88f, 134, 0),
            new CarShopDecoration(VehicleHash.Granger,    new Vector3(-135.2322f, -1183.902f, 24.76421f), -24.88f),
            new CarShopDecoration(VehicleHash.Stanier,    new Vector3(-138.2322f, -1183.902f, 24.76421f), -24.88f),
            new CarShopDecoration(VehicleHash.Ingot,      new Vector3(-141.2322f, -1183.902f, 24.76421f), -24.88f),
            new CarShopDecoration(VehicleHash.Tailgater,  new Vector3(-144.2322f, -1183.902f, 24.76421f), -24.88f),
            new CarShopDecoration(VehicleHash.Sentinel,  new Vector3(-147.2322f, -1183.902f, 24.76421f), -24.88f),
            new CarShopDecoration(VehicleHash.Mesa,  new Vector3(-150.2322f, -1183.902f, 24.76421f), -24.88f),

            new CarShopDecoration(VehicleHash.Patriot,  new Vector3(-142.6135f, -1161.958f, 25.30718f), -179f),
            new CarShopDecoration(VehicleHash.Dubsta,  new Vector3(-145.6135f, -1161.958f, 25.30718f), -179f),
            new CarShopDecoration(VehicleHash.Asea,  new Vector3(-148.6135f, -1161.958f, 25.30718f), -179f),
            new CarShopDecoration(VehicleHash.Surge,  new Vector3(-151.6135f, -1161.958f, 25.30718f), -179f),
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

        private Vector3 npcPos = new Vector3(-142.2012f, -1171.385f, 25.22697f);

        private void npcTriggers() {
            var ped = API.createPed(API.pedNameToModel("CarBuyerCutscene"), npcPos, 113f);
            API.playPedScenario(ped, "WORLD_HUMAN_SMOKING");

            var blip = API.createBlip(npcPos);
            blip.name = "Vapid Lot (Mid-level Cars)";
            blip.sprite = 225;
            blip.color = 5;
            blip.shortRange = true;

            var shopTriggerPos = new Vector3(-143.4823f, -1172.609f, 24.20414f);
            ColShape shopBubble = API.createSphereColShape(npcPos, 3f);
            API.createMarker(1, shopTriggerPos, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 100, 108, 24);
            shopBubble.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~r~Simeon~g~]:~w~ Hey! What can I get you?");
                    API.triggerClientEvent(player, "npcbiz:enterTrigger", "midcar", "Vapid Lot");
                    API.sendNotificationToPlayer(player, "Press ~b~F~w~ to buy a high end car.");
                }
            };
            shopBubble.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:exitTrigger", "midcar", "Vapid Lot");
                }
            };
        }
    }
}