using System;
using System.IO;
using System.Text;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.Loader {
    class SAutoloader : Script {
        public SAutoloader() {
            API.onResourceStart += autoload;
            API.onResourceStop += autoUnload;
        }

        private void autoload() {
            string manifestText = File.ReadAllText(API.getResourceFolder()+"/../manifest.json", Encoding.UTF8);
            var manifest = API.fromJson(manifestText);

            foreach (string module in manifest.modules) {
                API.consoleOutput("LIBERTYRP AUTOLOADER: loading liberty/"+module);
                API.startResource("liberty/"+module);
            }
        }

        private void autoUnload() {
            string manifestText = File.ReadAllText(API.getResourceFolder()+"/../manifest.json", Encoding.UTF8);
            var manifest = API.fromJson(manifestText);

            foreach (string module in manifest.modules) {
                API.consoleOutput("LIBERTYRP AUTOLOADER: unloading liberty/"+module);
                API.stopResource("liberty/"+module);
            }
        }
    }
}