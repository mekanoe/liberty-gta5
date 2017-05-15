using System;
using System.IO;
using System.Text;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty {
    class SGamemode : Script {
        public SGamemode() {
            API.onResourceStart += onResourceStart;
            API.onResourceStop += onResourceEnd;
        }

        private void onResourceStart() {
            string version = File.ReadAllText(API.getResourceFolder()+"/VERSION", Encoding.UTF8);
            API.setGamemodeName("~g~LibertyRP~w~/"+version);
            // API.sendChatMessageToAll("LibertyRP version "+version+" loaded.");
        }

        private void onResourceEnd() {
            API.exported.doormanager.removeAllDoors();
        }
    }
}
