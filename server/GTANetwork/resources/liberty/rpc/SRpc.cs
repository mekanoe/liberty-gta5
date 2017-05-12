using System;
using System.IO;
using System.Net;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.rpc {
    class SRpc : Script {
        private WebServer ws; 

        public SRpc() {
            API.onResourceStart += startServer;
            API.onResourceStop += endServer;
        }

        private void startServer() {
            ws = new WebServer(handleReq);
            ws.Run();
        }

        private void endServer() {
            ws.Stop();
        }

        private string handleReq(HttpListenerRequest request) {
            if (request.HttpMethod == "POST") {
                try {
                    System.IO.Stream body = request.InputStream;
                    System.IO.StreamReader reader = new System.IO.StreamReader(body);
                    string json = reader.ReadToEnd();
                    API.consoleOutput(json);

                    var call = API.fromJson(json);
                    var args = call.args.ToObject<object[]>();
                    API.call((string)call.c, (string)call.m, args);
                    // API.call("SAdminCommands", "RCarSpawn", "kayteh");
                } catch(Exception e) {
                    API.consoleOutput("an error: "+e);
                    return "{\"status\": \"err\"}";
                }

                return "{\"status\": \"ok\"}";
            } else {
                return "{\"status\": \"err\"}";
            }
        }
    }

    class RpcRequest {
        public string c;
        public string m;
        public object[] args;
    }
}