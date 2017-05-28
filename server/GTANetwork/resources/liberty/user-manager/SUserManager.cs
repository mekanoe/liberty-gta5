using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.userManager {
    class SUserManager : Script {
        private Dictionary<string, Client> userHash = new Dictionary<string, Client>(){};

        public SUserManager() {
            API.onPlayerFinishedDownload += onPlayerDownload;
        }

        [Command("tlogin")]
        public void onPlayerDownload(Client player) {     
            string userToken = Guid.NewGuid().ToString();
            userHash.Add(userToken, player);

            API.triggerClientEvent(player, "user:loginStart", userToken);
        } 

        public void onLogin(string userToken) {
            Client player = userHash[userToken];
            API.triggerClientEvent(player, "user:loginEnd", false);
        }

    }
}