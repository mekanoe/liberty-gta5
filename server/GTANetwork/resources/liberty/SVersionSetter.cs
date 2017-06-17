using System;
using System.IO;
using System.Text;
using System.Net.Http;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty
{
    class SGamemode : Script
    {
        private static readonly HttpClient client = new HttpClient();
        private string worldUiUrl;
        public SGamemode()
        {
            API.onResourceStart += onResourceStart;
            API.onResourceStop += onResourceEnd;
        }

        private void onResourceStart()
        {
            string version = Environment.GetEnvironmentVariable("RELEASE_NAME");
            if (version == "") 
            {
                version = File.ReadAllText(API.getResourceFolder() + "/VERSION", Encoding.UTF8);
            }
            // API.sendChatMessageToAll("LibertyRP version "+version+" loaded.");
            API.sendChatMessageToAll("~p~~h~[SERVER]~h~ LibertyRP was restarted.~w~");

            API.setServerName(Environment.GetEnvironmentVariable("SERVER_NAME"));
            API.setServerPassword(Environment.GetEnvironmentVariable("SERVER_PASSWORD"));
            API.setGamemodeName("LibertyRP~w~/~g~" + version + "~w~");
        }

        private void onResourceEnd()
        {
            API.shared.sendChatMessageToAll("~p~~h~[SERVER]~h~ LibertyRP is being restarted. Big hitch incoming.~w~");
            worldUiUrl = Environment.GetEnvironmentVariable("WORLD_UI_URL");
            client.PostAsync(worldUiUrl + "/api/internals/restart", new StringContent("", Encoding.UTF8));
            API.shared.exported.doormanager.removeAllDoors();
        }
    }
}
