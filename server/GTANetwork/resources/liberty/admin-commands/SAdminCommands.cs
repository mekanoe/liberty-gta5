using System;
using System.Threading;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.AdminCommands {

    class SAdminCommands : Script {
        public SAdminCommands() {

        }

        [Command("car")]
        public void MCarSpawn(Client sender, VehicleHash model) {
            var rot = API.getEntityRotation(sender.handle);
            var veh = API.createVehicle(model, sender.position, new Vector3(0, 0, rot.Z), 0, 0);
            API.setPlayerIntoVehicle(sender, veh, -1);  
        }

        [Command("skin")]
        public void MSkinChange(Client sender, string skin) {
            API.setPlayerSkin(sender, API.pedNameToModel(skin));
        }

        [Command("delveh")]
        public void MCarDel(Client sender) {
            var veh = API.getPlayerVehicle(sender);
            if (API.getVehicleOccupants(veh).Length == 0) { // this will never pass but...
                API.deleteEntity(veh);
            } else {
                API.sendChatMessageToPlayer(sender, "Vehicle isn't empty.");
            }
        }

        [Command("tp")]
        public void MTp(Client player, float x, float y, float z) {
            API.setEntityPosition(player, new Vector3(x, y, z));
        }

        [Command("mc-cc")]
        public async void GetClientCounter(Client player) {
            API.consoleOutput("pre-await");
            var task = API.exported.messagechannel.SendRequest(player, "client-counter" , null);
            API.consoleOutput("task created");
            task.Wait();
            API.consoleOutput("post-await");
            API.sendChatMessageToPlayer(player, "~b~client counter:~w~ " + (string)task.Result.args.counter);
            API.consoleOutput("end");
        }

        [Command("loc", Alias="pos,l,p")]
        public void MDebugPos(Client player) {
            Vector3 pos = API.getEntityPosition(player);
            Vector3 rot = API.getEntityRotation(player);
            API.sendChatMessageToPlayer(player, "~b~Position:~w~ ~g~X:~w~ "+pos.X+" ~g~Y:~w~ "+pos.Y+" ~g~Z:~w~ "+pos.Z+" ~g~A:~w~ "+rot.Z);
        }
        [Command("rot", Alias="r")]
        public void MDebugRot(Client player) {
            Vector3 pos = API.getEntityRotation(player);
            API.sendChatMessageToPlayer(player, "~b~Rotation:~w~ ~g~X:~w~ "+pos.X+" ~g~Y:~w~ "+pos.Y+" ~g~Z:~w~ "+pos.Z);
        }

        [Command("sl", GreedyArg = true)]
        public void PrintLoc(Client sender, string desc = "sl")
        {
            Vector3 pos = sender.position;
            float rot = sender.rotation.Z;
            sender.sendChatMessage($"~g~Location: ~b~X:~w~ {pos.X} ~b~Y:~w~ {pos.Y} ~b~X:~w~ {pos.Z} ~b~A:~w~ {rot}");
            API.consoleOutput($"POSITION HELPER:\n=> {desc}\n===> Position: new Vector3({pos.X}f, {pos.Y}f, {pos.Z}f)\n===> Rotation: new Vector3(0f, 0f, {rot}f)");
        }

        [Command("f")]
        public void FreezeVehicle(Client player, bool val) {
            var v = API.getPlayerVehicle(player);
            API.setEntityPositionFrozen(v, val);
        }

        [Command("sr")]
        public void SetRotation(Client player, float x, float y, float z) {
            var v = API.getPlayerVehicle(player);
            API.setEntityRotation(v, new Vector3(x, y, z));
        }

        [Command("announce", GreedyArg=true)]
        public void Announce(Client player, string text) {
            API.sendChatMessageToAll("~#FF0088~", "~h~[GM MESSAGE]~h~ "+text);
        }

        [Command("gmdirect", GreedyArg=true)]
        public void GMDirect(Client gm, string playerName, string text) {
            var player = API.getPlayerFromName(playerName);
            if (player != null) {
                API.sendChatMessageToPlayer(player, "~#FFC0CB~", "~h~[GM DIRECT] "+API.getPlayerName(gm)+":~h~ "+text);
                API.sendChatMessageToPlayer(gm, "~#FFC0CB~", "~h~[GM DIRECT to "+playerName+"]~h~ "+text);
            } else {
                API.sendChatMessageToPlayer(gm, "~r~ERROR:~w~ Player name '"+playerName+"' not found.");
            }
        }

        public void RCarSpawn(string playerName, string modelName) {
            VehicleHash model = API.vehicleNameToModel(modelName);
            Client target = API.getPlayerFromName(playerName);
            if (target != null) {
                MCarSpawn(target, model);
                API.consoleOutput("car "+modelName+" spawned for "+ playerName);
            }
        }

        public void RReloadLiberty() {
            API.startThread(new ThreadStart(_reload));
        }

        private void _reload() {
            API.stopResource("liberty");
            API.startResource("liberty");
        }

        [Command("gtao-update")]
        public void MGTAOUpdate(Client sender) {
            API.exported.gtaocharacter.updatePlayerFace(sender);
        }

        [Command("gtao-init")]
        public void MGTAOInit(Client sender) {
            API.exported.gtaocharacter.initializePedFace(sender);
        }
    }
}