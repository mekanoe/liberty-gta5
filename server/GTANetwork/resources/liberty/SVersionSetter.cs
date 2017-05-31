using System;
using System.IO;
using System.Text;
using System.Net.Http;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty {
    class SGamemode : Script {
        private static readonly HttpClient client = new HttpClient();
        private string worldUiUrl;
        public SGamemode() {
            API.onResourceStart += onResourceStart;
            API.onResourceStop += onResourceEnd;
        }

        private void onResourceStart() {
            worldUiUrl = API.getSetting<string>("world_ui_url");
            string version = File.ReadAllText(API.getResourceFolder()+"/VERSION", Encoding.UTF8);
            API.setGamemodeName("~g~LibertyRP~w~/"+version);
            // API.sendChatMessageToAll("LibertyRP version "+version+" loaded.");
            API.sendChatMessageToAll("~p~~h~[SERVER]~h~ LibertyRP was restarted.~w~");
        }

        private void onResourceEnd() {
            API.shared.exported.doormanager.removeAllDoors();
            API.shared.sendChatMessageToAll("~p~~h~[SERVER]~h~ LibertyRP is being restarted. Big hitch incoming.~w~");
            client.PostAsync(worldUiUrl+"/api/internals/restart", new StringContent("", Encoding.UTF8));
        }
    }
}
