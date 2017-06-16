using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.Compass {

    class SCompass : Script {
        public SCompass() {

        }

        [Command("compass")]
        public void activateCompass(Client sender) {
            var rotVector = API.getEntityRotation(sender.handle);
            var rot = rotVector.Z;
            if (rot < 0) {
                rot = 360 + rot;
            }
            if ((rot >= 0 && rot <= 22.5) || (rot >= 337.5 && rot <= 0)) {
                API.sendChatMessageToPlayer(sender, "North " + rot + ".");
            } else if (rot > 22.5 && rot < 67.5) {
                API.sendChatMessageToPlayer(sender, "Northeast " + rot + ".");
            } else if (rot >= 67.5 && rot <= 112.5) {
                API.sendChatMessageToPlayer(sender, "East " + rot + ".");
            } else if (rot > 112.5 && rot < 157.5) {
                API.sendChatMessageToPlayer(sender, "Southeast " + rot + ".");
            } else if (rot >= 157.5 && rot <= 202.5) {
                API.sendChatMessageToPlayer(sender, "South " + rot + ".");
            } else if (rot > 202.5 && rot < 247.5) {
                API.sendChatMessageToPlayer(sender, "Southwest " + rot + ".");
            } else if (rot >= 247.5 && rot <= 292.5) {
                API.sendChatMessageToPlayer(sender, "West " + rot + ".");
            } else if (rot > 292.5 && rot < 337.5) {
                API.sendChatMessageToPlayer(sender, "Northwest " + rot + ".");
            }
        }
    }
}