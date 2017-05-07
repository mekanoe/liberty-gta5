using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.SpawnManager {
    class SSpawnManager : Script {
        private readonly Vector3 _defaultSpawnLoc = new Vector3(434.0596f, -629.2777f, 28.71821); 
        private readonly Vector3 _defaultSpawnRot = new Vector3(0f, 0f, -75.29266f);
        private ColShape _defaultSpawnCol;

        public SSpawnManager() {
            API.onPlayerFinishedDownload += onPlayerDownload;
            API.onPlayerConnected += onPlayerConnected;
            API.onResourceStart += onResourceStart;
        }


        /////////////
        // Events //
        ///////////

        private void onPlayerDownload(Client player) {
            API.sendChatMessageToPlayer(player, "~b~Welcome!~w~");
            spawnPlayer(player);
        }

        private void onPlayerConnected(Client player) {
            API.setEntityData(player, "v_player_spawned", false);
            API.setEntityData(player, "v_player_logged_in", false);
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
            API.setEntityPosition(player, _defaultSpawnLoc);
            API.setEntityRotation(player, _defaultSpawnRot);
            API.setEntityData(player, "v_player_spawned", true);
        }


    }
}