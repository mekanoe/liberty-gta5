using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.world {
    class SWorldCleanup {
        private List<CleanupItem> trashbinItems = new List<CleanupItem>();

        public SWorldCleanup() {
            API.onVehicleDeath += addVehicle;
            API.onUpdate += prune;
        }

        private void addVehicle(NetHandle veh) {
            trashbinItems += new CleanupItem(veh, DateTime.Now.AddMinutes(30));
        }   

        private void prune() {
            
        }
    }

    class CleanupItem {
        public NetHandle entity;
        public DateTime pruneAt;
        public CleanupItem(NetHandle e, DateTime p) {
            pruneAt = p;
            entity = e;
        }
    }
}