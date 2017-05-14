using System;
using System.Threading;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.npcBusinesses {
    class SSupercartShop : Script {
        private static Random randomCls = new Random((int)DateTimeOffset.Now.ToUnixTimeSeconds());
        public SSupercartShop() {
            API.onResourceStart += onStart;
            // API.onResourceStart += decorations;
        }

        private void onStart() {
            API.startThread(new ThreadStart(decorations));
            npcTriggers();
        }

        private List<CarShopDecoration> decorVehicles = new List<CarShopDecoration> {
            new CarShopDecoration(VehicleHash.Banshee2, new Vector3(-67.17435f, -1100.892f, 26.22452f), 96.89159f, 29, 0),
            
            new CarShopDecoration(VehicleHash.T20, new Vector3(-41.89386f, -1116.338f, 26.43511f), 0f),
            new CarShopDecoration(VehicleHash.Adder, new Vector3(-44.89386f, -1116.338f, 26.43511f), 0f),
            new CarShopDecoration(VehicleHash.Voltic, new Vector3(-47.89386f, -1116.338f, 26.43511f), 0f),
            new CarShopDecoration(VehicleHash.Infernus, new Vector3(-50.89386f, -1116.338f, 26.43511f), 0f),
            new CarShopDecoration(VehicleHash.Zentorno, new Vector3(-53.89386f, -1116.338f, 26.43511f), 0f),
            new CarShopDecoration(VehicleHash.Bullet, new Vector3(-56.89386f, -1116.338f, 26.43511f), 0f),
            new CarShopDecoration(VehicleHash.Tyrus, new Vector3(-59.89386f, -1116.338f, 26.43511f), 0f),
            new CarShopDecoration(VehicleHash.Reaper, new Vector3(-62.89386f, -1116.338f, 26.43511f), 0f),
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

                API.sleep(175);
                API.setEntityPositionFrozen(v, true);
                API.setEntityInvincible(v, true);
                API.setVehicleLocked(v, true);
                API.setVehicleEngineStatus(v, false);
                API.setVehicleNumberPlate(v, "SUPERCAR");
                API.setVehicleNumberPlateStyle(v, 5);
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

    class CarShopDecoration {
        public VehicleHash VehicleModel;
        public Vector3 Position;
        public Vector3 Rotation;
        public int ColorName;
        public int Color2Name;
        public bool RandomColor = false;

        public CarShopDecoration(VehicleHash vn, Vector3 pos, float rot, int col, int col2) {
            VehicleModel = vn;
            Position = pos;
            Rotation = new Vector3(0f, 0f, rot);
            ColorName = col;
            Color2Name = col2;
        }
        
        public CarShopDecoration(VehicleHash vn, Vector3 pos, float rot, Vector3 rrot, int col, int col2) {
            VehicleModel = vn;
            Position = pos;
            Rotation = rrot;
            ColorName = col;
            Color2Name = col2;
        }

        public CarShopDecoration(VehicleHash vn, Vector3 pos, float rot) {
            VehicleModel = vn;
            Position = pos;
            Rotation = new Vector3(3f, 0f, rot);
            RandomColor = true;
        }

    }
}