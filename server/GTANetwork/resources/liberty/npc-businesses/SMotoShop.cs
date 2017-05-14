using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SMotoShop : Script {
        private static Random randomCls = new Random((int)DateTimeOffset.Now.ToUnixTimeSeconds());
        public SMotoShop() {
            API.onResourceStart += onStart;
            // API.onResourceStart += decorations;
        }

        private void onStart() {
            decorations();
            npcTriggers();
        }

        private List<MotoShopDecoration> decorVehicles = new List<MotoShopDecoration> {
            new MotoShopDecoration(VehicleHash.Faggio2, new Vector3(266.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Bagger, new Vector3(265.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Bagger, new Vector3(264.2754f, -1163.034f, 28.79933f), -2.308442f),

            new MotoShopDecoration(VehicleHash.Vader, new Vector3(263.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Vader, new Vector3(262.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Vader, new Vector3(261.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Vader, new Vector3(260.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Vader, new Vector3(259.2754f, -1163.034f, 28.79933f), -2.308442f),
            
            new MotoShopDecoration(VehicleHash.Lectro, new Vector3(258.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Lectro, new Vector3(257.2754f, -1163.034f, 28.79933f), -2.308442f),

            new MotoShopDecoration(VehicleHash.Sovereign, new Vector3(256.2754f, -1163.034f, 28.79933f), -2.308442f, 0, 0),
            new MotoShopDecoration(VehicleHash.Sovereign, new Vector3(255.2754f, -1163.034f, 28.79933f), -2.308442f, 134, 134),

            new MotoShopDecoration(VehicleHash.Nemesis, new Vector3(254.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Nemesis, new Vector3(253.2754f, -1163.034f, 28.79933f), -2.308442f, 134, 43),
            new MotoShopDecoration(VehicleHash.Nemesis, new Vector3(252.2754f, -1163.034f, 28.79933f), -2.308442f),

            new MotoShopDecoration(VehicleHash.Hexer, new Vector3(251.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Hexer, new Vector3(250.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Hexer, new Vector3(249.2754f, -1163.034f, 28.79933f), -2.308442f),

            new MotoShopDecoration(VehicleHash.Hexer, new Vector3(248.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Hexer, new Vector3(247.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Hexer, new Vector3(246.2754f, -1163.034f, 28.79933f), -2.308442f),

            new MotoShopDecoration(VehicleHash.CarbonRS, new Vector3(245.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Faggio, new Vector3(244.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Sanctus, new Vector3(243.2754f, -1163.034f, 28.79933f), -2.308442f),
            new MotoShopDecoration(VehicleHash.Chimera, new Vector3(241.754f, -1163.034f, 28.79933f), -2.308442f),
        };

        private void decorations() {
            foreach(MotoShopDecoration d in decorVehicles) {
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

                // API.sleep(2);
                API.setEntityPositionFrozen(v, true);
                API.setEntityInvincible(v, true);
                API.setVehicleLocked(v, true);
                API.setVehicleEngineStatus(v, false);
                API.setVehicleNumberPlate(v, "4SANDERS");
                API.setVehicleNumberPlateStyle(v, 5);
            }
        }

        private Vector3 npcPos = new Vector3(263.675f, -1156.891f, 29.26243f);

        private void npcTriggers() {
            var ped = API.createPed(API.pedNameToModel("SBikeAMO"), npcPos, 97f);
            API.playPedScenario(ped, "WORLD_HUMAN_CHEERING");

            var blip = API.createBlip(npcPos);
            blip.name = "Sanders Motorcycles";
            blip.sprite = 226;
            blip.shortRange = true;

            ColShape chatBubble = API.createSphereColShape(npcPos, 40f);
            chatBubble.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~r~Sanders~g~]:~w~ "+getPitch());
                }
            };



            ColShape shopBubble = API.createSphereColShape(npcPos, 3f);
            shopBubble.onEntityEnterColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.sendChatMessageToPlayer(player, "~g~[~r~Sanders~g~]:~w~ What can I do ya for?");
                    API.triggerClientEvent(player, "npcbiz:enterTrigger", "moto", "Sanders Motorcycles");
                    API.sendNotificationToPlayer(player, "Press ~b~F~w~ to buy a motorcycle.");
                }
            };
            shopBubble.onEntityExitColShape += (shape, entity) => {
                Client player;
                if ((player = API.getPlayerFromHandle(entity)) != null) {
                    API.triggerClientEvent(player, "npcbiz:exitTrigger", "moto", "Sanders Motorcycles");
                }
            };
        }

        private List<string> pitches = new List<string>{
            "Motorcycles, Scooters, Cruisers, and more! I got it!",
            "Two wheels are better than four, come get bike or scooter today!",
            "Get a ~b~Hexer~w~ today, free user manual!",
            "We have the lowest prices in the city! Come see why!",
            "Who needs power when you can paint it ~r~red~w~! It adds 10 horsepower! Stop by today!",
            "You don't have any credit, so we don't check for it! Get a motorcycle today!",
        };

        private string getPitch() {
            return pitches[randomCls.Next(pitches.Count)];
        }
    }

    class MotoShopDecoration {
        public VehicleHash VehicleModel;
        public Vector3 Position;
        public Vector3 Rotation;
        public int ColorName;
        public int Color2Name;
        public bool RandomColor = false;

        public MotoShopDecoration(VehicleHash vn, Vector3 pos, float rot, int col, int col2) {
            VehicleModel = vn;
            Position = pos;
            Rotation = new Vector3(3f, 0f, rot);
            ColorName = col;
            Color2Name = col2;
        }

        public MotoShopDecoration(VehicleHash vn, Vector3 pos, float rot) {
            VehicleModel = vn;
            Position = pos;
            Rotation = new Vector3(3f, 0f, rot);
            RandomColor = true;
        }
    }
}