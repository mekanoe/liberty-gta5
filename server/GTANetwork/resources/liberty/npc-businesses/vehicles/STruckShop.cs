using System;
using System.Threading;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class STruckShop : Script {
        private static Random randomCls = new Random((int)DateTimeOffset.Now.ToUnixTimeSeconds());
        public STruckShop() {
            API.onResourceStart += onStart;
            // API.onResourceStart += decorations;
        }

        private void onStart() {
            API.startThread(new ThreadStart(decorations));
            npcTriggers();
        }

        private List<CarShopDecoration> decorVehicles = new List<CarShopDecoration> {
            new CarShopDecoration(VehicleHash.Hauler, new Vector3(811.6851f, -1591.719f, 31.03029f), 94.45427f),

            new CarShopDecoration(VehicleHash.Phantom, new Vector3(805.1669f, -1588.45f, 31.03029f), 159.1196f),
            new CarShopDecoration(VehicleHash.Phantom, new Vector3(799.5325f, -1592.607f, 31.03029f), 159.1196f),
            new CarShopDecoration(VehicleHash.Packer, new Vector3(793.6733f, -1597.932f, 31.03029f), 159.1196f),

            new CarShopDecoration(VehicleHash.Benson, new Vector3(787.6869f, -1606.228f, 31.03029f), -90f),
            new CarShopDecoration(VehicleHash.Mule, new Vector3(785.9075f, -1610.069f, 31.03029f), -90f),
            new CarShopDecoration(VehicleHash.Pounder, new Vector3(784.3495f, -1613.709f, 31.03029f), -90f),
            
            // new CarShopDecoration(VehicleHash.T20, new Vector3(-41.89386f, -1116.338f, 26.43511f), 0f),
            // new CarShopDecoration(VehicleHash.Adder, new Vector3(-44.89386f, -1116.338f, 26.43511f), 0f),
            // new CarShopDecoration(VehicleHash.Voltic, new Vector3(-47.89386f, -1116.338f, 26.43511f), 0f),
            // new CarShopDecoration(VehicleHash.Infernus, new Vector3(-50.89386f, -1116.338f, 26.43511f), 0f),
            // new CarShopDecoration(VehicleHash.Zentorno, new Vector3(-53.89386f, -1116.338f, 26.43511f), 0f),
            // new CarShopDecoration(VehicleHash.Bullet, new Vector3(-56.89386f, -1116.338f, 26.43511f), 0f),
            // new CarShopDecoration(VehicleHash.Tyrus, new Vector3(-59.89386f, -1116.338f, 26.43511f), 0f),
            // new CarShopDecoration(VehicleHash.Reaper, new Vector3(-62.89386f, -1116.338f, 26.43511f), 0f),
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
                API.setVehicleNumberPlate(v, "LAMESATS");
                API.setVehicleNumberPlateStyle(v, 5);
                API.sleep(250);
                API.setEntityPositionFrozen(v, true);

                if (d.VehicleModel == VehicleHash.Benson || d.VehicleModel == VehicleHash.Mule || d.VehicleModel == VehicleHash.Pounder) {
                    for (int i = 7; i >= 0; i-- ) {
                        API.setVehicleExtra(v, i, false);
                    }

                    API.setVehicleExtra(v, 1, true);
                }
            }
        }

        private Vector3 npcPos = new Vector3(808.1229f, -1597.805f, 31.4981f);

        private void npcTriggers() {
            var ped = API.createPed(API.pedNameToModel("Autoshop02SMM"), npcPos, 128f);
            API.playPedScenario(ped, "WORLD_HUMAN_CLIPBOARD");

            var blip = API.createBlip(npcPos);
            blip.name = "La Mesa Trucks";
            blip.sprite = 477;
            blip.shortRange = true;

            ColShape shopBubble = API.createSphereColShape(npcPos, 3f);
            shopBubble.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~r~Dealer~g~]:~w~ I heard you like trucks.");
                    API.triggerClientEvent(player, "npcbiz:enterTrigger", "truck", "La Mesa Trucks");
                    API.sendNotificationToPlayer(player, "Press ~b~F~w~ to buy a truck.");
                }
            };
            shopBubble.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:exitTrigger", "truck", "La Mesa Trucks");
                }
            };
        }
    }
}