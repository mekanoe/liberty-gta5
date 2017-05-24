using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace kayteh.MessageChannel {
    class MessageChannel : Script {
        public delegate void MessageChannelRequestHandler(MessageChannelRequest req);
        
        private Dictionary<string, TaskCompletionSource<MessageChannelResponse>> requests = new Dictionary<string, TaskCompletionSource<MessageChannelResponse>>();
        private Dictionary<string, MessageChannelRequestHandler> connections = new Dictionary<string, MessageChannelRequestHandler>();
        
        public MessageChannel () {
            API.onClientEventTrigger += handleEvent;
        }

        static string getToken() {
            return Guid.NewGuid().ToString();
        }

        private void handleEvent(Client player, string name, params object[] args) {
            if (name == "messagechannel/client/response") {
                API.consoleOutput("top of resp");
                var payload = API.fromJson((string)args[0]);
                string token = (string)payload.token;
                if (!requests.ContainsKey(token)) {
                    API.consoleOutput("got client response that i don't know about: "+token+" "+(string)args[1]);
                    return;
                }

                API.consoleOutput("after token check");
                MessageChannelResponse mcr = new MessageChannelResponse(player, token, (string)payload["event"], payload.args.ToObject<Dictionary<string, object>>());
                API.consoleOutput("after mcr");
                requests.Get(token).SetResult(mcr);
                API.consoleOutput("after setresult");
                lock (requests) {
                    requests.Remove(token);
                    API.consoleOutput("in lock, after remove");
                }
                API.consoleOutput("end");
            }

            if (name == "messagechannel/client/request") {
                var payload = API.fromJson((string)args[0]);
                string evtName = (string)payload["event"];
                if (!connections.ContainsKey(evtName)) {
                    API.consoleOutput("got client request that doesn't have a connection: "+evtName);
                    return;
                }

                MessageChannelRequest mcr = new MessageChannelRequest(player, (string)payload.token, evtName, payload.args.ToObject<Dictionary<string, object>>());
                connections[evtName](mcr);
            }
        }

        public void Connect (string evtName, MessageChannelRequestHandler fn) {
            lock (connections) {
                connections.Add(evtName, fn);
            }
        }

        public Task SendRequest(Client player, string evtName, params object[] args) {
            API.consoleOutput("get token");
            string token = getToken();
            API.consoleOutput("get tcs");
            TaskCompletionSource<MessageChannelResponse> tcs = new TaskCompletionSource<MessageChannelResponse>();
            API.consoleOutput("get task");
            Task<MessageChannelResponse> task = tcs.Task;

            API.consoleOutput("pre req lock");
            lock (requests) {
                requests.Add(token, tcs);
            }
            API.consoleOutput("post req lock");

            Task.Factory.StartNew(() => {
                API.consoleOutput("task start");
                API.triggerClientEvent(player, "messagechannel/server/request", API.shared.toJson(new Dictionary<string, object>(){
                    {"token", token},
                    {"event", evtName},
                    {"args", args},
                }));
                API.consoleOutput("task pause");
            });

            API.consoleOutput("end");

            return task;
        }
    }

    class MessageChannelRequest {
        public string _token;
        public string _event;
        public Client player;
        public Dictionary<string, object> args;
        public MessageChannelRequest(Client _player, string token, string evt, Dictionary<string, object> _args) {
            this.player = player;
            this._token = token;
            this._event = evt;
            this.args = args;
        }

        public void Reply(params object[] inargs) {
            API.shared.triggerClientEvent(player, "messagechannel/server/response", API.shared.toJson(new Dictionary<string, object>(){
                {"token", _token},
                {"event", _event},
                {"args", inargs},
            }));
        }
    }

    class MessageChannelResponse {
        public string _token;
        public string _event;
        public Client player;
        public Dictionary<string, object> args;
        public MessageChannelResponse(Client _player, string token, string evt, Dictionary<string, object> _args) {
            this.player = player;
            this._token = token;
            this._event = evt;
            this.args = args;
        }
    }
}