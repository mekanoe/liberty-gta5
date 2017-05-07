using System;
using System.IO;
using System.Text;
using GTANetworkServer;
using GTANetworkShared;

class SAutoloader : Script {
	public SAutoloader() {
		API.onResourceStart += autoload;	
	}

	private void autoload() {
		string manifestText = File.ReadAllText(API.getResourceFolder()+"/../manifest.json", Encoding.UTF8);
		var manifest = API.fromJson(manifestText);

		foreach (string module in manifest.modules) {
			API.consoleOutput("LIBERTYRP AUTOLOADER: loading liberty/"+module);
			API.startResource("liberty/"+module);
		}
	}
}
