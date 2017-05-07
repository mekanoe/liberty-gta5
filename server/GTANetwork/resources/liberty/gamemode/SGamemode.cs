using System;
using System.IO;
using System.Text;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.Gamemode {
    class SGamemode : Script {
        public SGamemode() {
            API.onResourceStart += onResourceStart;
        }

        private void onResourceStart() {
            string version = File.ReadAllText(API.getResourceFolder()+"/../VERSION", Encoding.UTF8);
            API.setGamemodeName("~g~LibertyRP~w~/"+version);
            API.sendChatMessageToAll("LibertyRP version "+version+" loaded.");
        }
    }
}