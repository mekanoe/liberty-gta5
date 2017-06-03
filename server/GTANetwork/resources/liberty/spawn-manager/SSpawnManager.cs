using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.SpawnManager
{
    class SSpawnManager : Script
    {
        private static readonly Random random = new Random((int)DateTimeOffset.Now.ToUnixTimeSeconds());
        private readonly Vector3 _defaultSpawnLoc = new Vector3(-1314.202f, -936.27f, 9.73f);
        private readonly Vector3 _defaultSpawnRot = new Vector3(0f, 0f, 30f);
        private ColShape _defaultSpawnCol;

        private List<LoginCameraBackdrop> backdrops = new List<LoginCameraBackdrop>{
            new LoginCameraBackdrop(new Vector3(-140.693f, -853.6935f, 299.662f), new Vector3(-10f, 0f, 0f)),
            new LoginCameraBackdrop(new Vector3(-1744.68f, -1072f, 40f), new Vector3(10f, 0f, -128f)),
            new LoginCameraBackdrop(new Vector3(-3139.136f, 1546.344f, 30f), new Vector3(-10f, 0f, -105f)),
            new LoginCameraBackdrop(new Vector3(-2411.382f, 2386.854f, 100f), new Vector3(3f, 0f, -81f)),
        };

        private readonly Vector3 charSelectPedPos = new Vector3(402.8972f, -996.8927f, -99f);
        private readonly Vector3 charSelectCamPos = new Vector3(402.8972f, -999.8927f, -99f);

        public SSpawnManager()
        {
            API.onPlayerFinishedDownload += onPlayerDownload;
            API.onPlayerConnected += onPlayerConnected;
            API.onResourceStart += onResourceStart;
            API.onPlayerDeath += onPlayerDeath;
        }


        /////////////
        // Events //
        ///////////

        private void onPlayerDownload(Client player)
        {
            if (API.getEntityData(player, "VPlayerSpawned") == false)
            {
                API.sendChatMessageToPlayer(player, "~b~Welcome!~w~");
                showLoginCamera(player);
            }

            API.triggerClientEvent(player, "cef:baseUrl", API.getSetting<string>("world_ui_url"));
        }

        private void onPlayerConnected(Client player)
        {
            player.dimension = 1;
            API.setEntityData(player, "VPlayerSpawned", false);

            if (API.getEntityData(player, "VPlayerLoggedIn") != true)
            {
                API.setEntityData(player, "VPlayerLoggedIn", false);
            }
        }

        private void onPlayerDeath(Client player, NetHandle killer, int something)
        {
            API.sendNativeToPlayer(player, Hash._RESET_LOCALPLAYER_STATE, player);
            API.sendNativeToPlayer(player, Hash.RESET_PLAYER_ARREST_STATE, player);

            API.sendNativeToPlayer(player, Hash.IGNORE_NEXT_RESTART, true);
            API.sendNativeToPlayer(player, Hash._DISABLE_AUTOMATIC_RESPAWN, true);

            API.sendNativeToPlayer(player, Hash.SET_FADE_IN_AFTER_DEATH_ARREST, true);
            API.sendNativeToPlayer(player, Hash.SET_FADE_OUT_AFTER_DEATH, false);
            API.sendNativeToPlayer(player, Hash.NETWORK_REQUEST_CONTROL_OF_ENTITY, player);

            API.sendNativeToPlayer(player, Hash.FREEZE_ENTITY_POSITION, player, false);
            API.sendNativeToPlayer(player, Hash.NETWORK_RESURRECT_LOCAL_PLAYER, player.position.X, player.position.Y, player.position.Z, player.rotation.Z, false, false);
            API.sendNativeToPlayer(player, Hash.RESURRECT_PED, player);

            API.sleep(250);
            API.setPlayerHealth(player, 0);
            API.setEntityInvincible(player, true);
            // API.setEntityPositionFrozen(player, true);
        }

        private void onResourceStart()
        {
            API.createMarker(1, _defaultSpawnLoc, new Vector3(), new Vector3(),
                new Vector3(1f, 1f, 1f), 255, 0, 0, 255);
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
        public void spawnPlayer(Client player)
        {
            player.dimension = 1;
            API.setEntityTransparency(player, 255);
            API.setEntityCollisionless(player, false);
            API.setEntityData(player, "VPlayerServerCam", false);
            API.setEntityPosition(player, _defaultSpawnLoc);
            API.setEntityRotation(player, _defaultSpawnRot);
            API.setEntityPositionFrozen(player, false);
            API.setEntityData(player, "VPlayerSpawned", true);
            API.setPlayerSkin(player, PedHash.Skater01AFY);
            API.setPlayerNametagVisible(player, false);
            API.setEntityInvincible(player, false);
            API.setPlayerHealth(player, 100);
            API.triggerClientEvent(player, "spawn:camend", false);
            API.triggerClientEvent(player, "user:charselectEnd", false);
        }

        [Command("ssc")]
        public void showLoginCamera(Client player)
        {
            LoginCameraBackdrop backdrop = backdrops[random.Next(backdrops.Count)];
            player.dimension = player.getData("VOwnDimension");
            API.setPlayerNametagVisible(player, false);
            API.setEntityPosition(player, backdrop.Position);
            API.setEntityTransparency(player, 0);
            API.setEntityCollisionless(player, true);
            API.setEntityPositionFrozen(player, true);
            API.triggerClientEvent(player, "spawn:camstart", backdrop.Position, backdrop.Rotation);
            API.setEntityData(player, "VPlayerServerCam", true);
        }

        [Command("scs")]
        public void showCharSelect(Client player)
        {
            player.dimension = player.getData("VOwnDimension");
            player.position = charSelectCamPos;
            API.triggerClientEvent(player, "spawn:camstart", charSelectCamPos, new Vector3(0f, 0f, 0f));
            API.sleep(1);
            API.triggerClientEvent(player, "spawn:charselect", charSelectPedPos);
            API.setEntityData(player, "VPlayerServerCam", true);

            // NetHandle ped = API.createPed();
        }
    }

    class LoginCameraBackdrop
    {
        public Vector3 Position;
        public Vector3 Rotation;
        public LoginCameraBackdrop(Vector3 pos, Vector3 rot)
        {
            Position = pos;
            Rotation = rot;
        }
    }
}