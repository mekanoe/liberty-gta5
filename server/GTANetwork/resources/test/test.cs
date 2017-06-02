using System;
using GTANetworkServer;
using GTANetworkShared;


public class Test : Script
{
    [Command]
    public void test(Client sender) {
        for (int i = 0; i <= 10; i++) {
            sender.sendChatMessage("test sent "+i);
            API.triggerClientEventForAll("test", i);
        }
    }

}
