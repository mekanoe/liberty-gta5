using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.SpawnManager {
    class SSpawnManager : Script {
        private static Random random = new Random((int)DateTimeOffset.Now.ToUnixTimeSeconds());
        private readonly Vector3 _defaultSpawnLoc = new Vector3(434.0596f, -629.2777f, 28.71821); 
        private readonly Vector3 _defaultSpawnRot = new Vector3(0f, 0f, 75.29266f);
        private ColShape _defaultSpawnCol;

        private List<LoginCameraBackdrop> backdrops = new List<LoginCameraBackdrop>{
            new LoginCameraBackdrop(new Vector3(-140.693f, -853.6935f, 299.662f), new Vector3(-10f, 0f, 0f)),
            new LoginCameraBackdrop(new Vector3(-1744.68f, -1072f, 40f), new Vector3(-10f, 0f, -128f)),
            new LoginCameraBackdrop(new Vector3(-3139.136f, 1546.344f, 30f), new Vector3(-10f, 0f, -105f)),
            new LoginCameraBackdrop(new Vector3(-2411.382f, 2386.854f, 100f), new Vector3(3f, 0f, -81f)),
        };

        public SSpawnManager() {
            API.onPlayerFinishedDownload += onPlayerDownload;
            API.onPlayerConnected += onPlayerConnected;
            API.onResourceStart += onResourceStart;
        }


        /////////////
        // Events //
        ///////////

        private void onPlayerDownload(Client player) {
            if (API.getEntityData(player, "VPlayerSpawned") == false) {
                API.sendChatMessageToPlayer(player, "~b~Welcome!~w~");
                showLoginCamera(player);
            } else {
                API.sendChatMessageToPlayer(player, "~p~~h~[SERVER]~h~ LibertyRP was reloaded.~w~");
            }
        }

        private void onPlayerConnected(Client player) {
            API.setEntityData(player, "VPlayerSpawned", false);
            API.setEntityData(player, "VPlayerLoggedIn", false);
        }

        private void onResourceStart() {
            // _defaultSpawnCol = API.createCylinderColShape(_defaultSpawnLoc, 3f, 3f);

            // _defaultSpawnCol.onEntityEnterColShape += (shape, entity) => {
            //     Client player;
            //     if ((player = API.getPlayerFromHandle(entity)) != null) {
            //         API.setEntityCollisionless(player, true);
            //     }
            // };

            // _defaultSpawnCol.onEntityExitColShape += (shape, entity) => {
            //     Client player;
            //     if ((player = API.getPlayerFromHandle(entity)) != null) {
            //         API.setEntityCollisionless(player, false);
            //     }
            // };
        }

        //////////////////////
        // Private Methods //
        ////////////////////

        [Command("spawn")]
        public void spawnPlayer(Client player) {
            API.setEntityTransparency(player, 255);
            API.setEntityCollisionless(player, false);
            API.setEntityData(player, "VPlayerServerCam", false);
            API.setEntityPosition(player, _defaultSpawnLoc);
            API.setEntityRotation(player, _defaultSpawnRot);
            API.setEntityPositionFrozen(player, false);
            API.setEntityData(player, "VPlayerSpawned", true);
            API.setPlayerSkin(player, API.pedNameToModel("Skater01AFY"));
            API.setPlayerNametagVisible(player, false);
            API.triggerClientEvent(player, "spawn:camend", false);
        }

        [Command("ssc")]
        public void showLoginCamera(Client player) {
            LoginCameraBackdrop backdrop = backdrops[random.Next(backdrops.Count)];

            API.setPlayerNametagVisible(player, false);
            API.setEntityPosition(player, backdrop.Position);
            API.setEntityTransparency(player, 0);
            API.setEntityCollisionless(player, true);
            API.setEntityPositionFrozen(player, true);
            API.triggerClientEvent(player, "spawn:camstart", backdrop.Position, backdrop.Rotation);
            API.setEntityData(player, "VPlayerServerCam", true);
        }
    }

    class LoginCameraBackdrop {
        public Vector3 Position;
        public Vector3 Rotation;
        public LoginCameraBackdrop(Vector3 pos, Vector3 rot) {
            Position = pos;
            Rotation = rot;
        }
    }
}