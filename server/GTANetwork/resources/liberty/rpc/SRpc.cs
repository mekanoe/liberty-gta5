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
                    var returnVal = API.call((string)call.c, (string)call.m, args);
                    return "{\"status\": \"ok\", \"return\": "+API.toJson(returnVal)+"}";
                } catch(Exception e) {
                    API.consoleOutput("rpc error: "+e);
                    return "{\"status\": \"rpc_error\"}";
                }
            } 

            if (request.RawUrl == "/~check") {
                string clusterName = API.getSetting<string>("cluster_name");
                string ident = API.getSetting<string>("server_identifier");
                if (request.Headers.Get("Cluster-Name") == clusterName) {
                    return "{\"status\": \"ok\", \"identifier\": \""+ident+"\"}";
                } else {
                    return "{\"status\": \"bad_cluster\"}";
                }
            }

            return "{\"status\": \"not_implemented\"}";
        }
    }

    class RpcRequest {
        public string c;
        public string m;
        public object[] args;
    }
}