using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.userManager {
    class SUserManager : Script {
        private Dictionary<string, Client> userHash = new Dictionary<string, Client>(){};
        private static readonly CRC32Managed crc32 = new CRC32Managed();

        public SUserManager() {
            API.onPlayerConnected += assignCRC32;
            API.onPlayerFinishedDownload += onPlayerDownload;
        }

        public void assignCRC32(Client player) {
            byte[] playerinfo = Encoding.UTF8.GetBytes(player.address+player.name);
            crc32.ComputeHash(playerinfo);
            int dimension = (int)crc32.CRC32Hash;

            if (dimension == 0) {
                dimension -= 15;
            } else if (dimension == 1) {
                dimension += 15;
            }

            player.setData("VOwnDimension", dimension);
        }

        [Command("tlogin")]
        public void onPlayerDownload(Client player) {     
            string userToken = Guid.NewGuid().ToString();
            userHash.Add(userToken, player);

            player.setSyncedData("VToken", userToken);
            API.triggerClientEvent(player, "user:init", userToken);

            if (player.getData("VPlayerLoggedIn") == false) {
                API.triggerClientEvent(player, "user:loginStart", false);
            }

            if (player.getData("VPlayerLoggedIn") == true && player.getData("VPlayerSpawned") == false) {
                // API.call("SSpawnManager", "showCharSelect", player);
            }
        } 

        public void onLogin(string userToken, string userId) {
            Client player = userHash[userToken];
            player.setData("VUser", userId);
            player.setData("VPlayerLoggedIn", true);
            API.triggerClientEvent(player, "user:loginEnd", false);
            API.call("SSpawnManager", "showCharSelect", player);
        }

    }
}