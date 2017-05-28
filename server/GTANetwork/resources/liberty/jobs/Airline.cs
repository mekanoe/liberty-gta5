using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.jobs {
    class AirlineJob {
        private readonly AirlineJobTrigger[] startTriggers = {
            new AirlineJobTrigger("passenger", new Vector3(-1157.074f, -2928.672f, 10.54f), -29.55f),
            new AirlineJobTrigger("passenger", new Vector3(-1229.566f, -2877.472f, 10.54f), -29.55f),
            new AirlineJobTrigger("cargo", new Vector3(-1229.566f, -2877.472f, 10.54f), -29.55f),
        };

        public AirlineJob() {
            API.onResourceStart += onStart;
            API.onClientEventTrigger += clientEvent;
        } 

        private void clientEvent(Player sender, string name, params object[] args) {
            // switch(name) {
            //     case "jobs:airline:triggerStart":
            //         onJobStart(sender, args);
            //         break;
                
            //     case "jobs:airline:triggerLoaded":
            //         onLoaded(sender, args);
            //         break;
                
            //     case "jobs:airline:triggerUnload":
            //         onUnload(sender, args);
            //         break;

            //     case "jobs:airline:triggerFinish":
            //         onFinish(sender, args);
            //         break;
            // }
        }

        private void onStart() {

        }

        private int getAircraftType(VehicleHash model) {
            switch(model) {
                // Corporate Passenger Jet == 1
                case VehicleHash.Shamal:
                    return 1;
                case VehicleHash.Luxor:
                    return 1;
                case VehicleHash.Luxor2:
                    return 1;
                case VehicleHash.Nimbus:
                    return 1;

                // Private Cargo Plane
                case VehicleHash.Cuban800:
                    return 2;
                case VehicleHash.Vestra:
                    return 2;

                // Private Passenger Plane
                case VehicleHash.Dodo:
                    return 3;
                case VehicleHash.Velum:
                    return 3;
                case VehicleHash.Mammatus:
                    return 3;

                // Military
                case VehicleHash.MilJet:
                    return 4;
                case VehicleHash.Titan:
                    return 4;

                // All other planes ineligible
                default:
                    return 0;
            }

        }

        [Command("airlinehud")]
        public void airlineHud(Client sender, bool state) {
        }
    }

    class AirlineJobTrigger {
        public Vector3 pos;
        public float rot;
        public string type;
        public AirlineJobTrigger(string load, Vector3 pos, float rot) {
            this.pos = pos;
            this.rot = rot;
            this.load = load;
        }
    }
}