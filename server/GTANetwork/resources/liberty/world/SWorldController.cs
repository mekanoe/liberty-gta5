using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.world
{
    class SWorldController : Script
    {

        private Random randomCls = new Random();

        // How often, in seconds, the server runs world updates.
        private readonly int tickRate = 10;

        // 6 hours = one in-game day.
        // This is how we interpolate EVERYTHING.
        private readonly int gameDayToRealSeconds = 60 * 60 * 6;

        private readonly int timeStep = 1;

        // This translates directly into zulu time.
        // How to use this:
        // Get hours: gameTime / 100 % 24
        // Get minutes: gameTime % 100 % 60
        // -- This time is used for any other world-ticks.
        // If you need something (like weather) that happens regularly,
        // modulo-ing this will do the job.
        public int gameTime = 0800;

        private dynamic weatherCycles;
        private dynamic currentWeatherCycle;
        private int currentWeather = 0;
        private int currentWeatherIndex = 0;
        private int weatherRate = 600;
        private int lastWeatherStep = 0;

        private DateTime lastSync;

        public SWorldController()
        {
            API.onUpdate += doTick;
            API.onResourceStart += onStart;
        }

        private void onStart()
        {
            if (API.hasWorldSyncedData("VTime"))
            {
                gameTime = API.getWorldSyncedData("VTime");
            }

            if (API.hasWorldData("VWxLastStep"))
            {
                lastWeatherStep = API.getWorldData("VWxLastStep");
            }
            else
            {
                lastWeatherStep = gameTime;
            }

            fetchWeather();

            if (API.hasWorldData("VWxCycle"))
            {
                currentWeatherCycle = weatherCycles[API.getWorldData("VWxCycle")];
            }
            else
            {
                setRandomCycle();
            }

            if (API.hasWorldData("VWxIndex"))
            {
                currentWeatherIndex = (int)API.getWorldData("VWxIndex");
            }

            timeSync();
            weatherSync();
            lastSync = DateTime.Now;
        }

        private void doTick()
        {
            TimeSpan sinceSync = DateTime.Now.Subtract(lastSync);
            if (sinceSync.TotalSeconds > tickRate)
            {
                timeTick();
                timeSync();

                weatherTick();
                weatherSync();

                lastSync = DateTime.Now;
            }
        }

        public Dictionary<string, object> RGetWorldData()
        {
            return new Dictionary<string, object>() {
                { "time", gameTime },
                { "weather", weatherToHuman() },
            };
        }

        private void timeTick()
        {
            int hours = gameTime / 100 % 24;
            int minutes = gameTime % 100 % 60;

            int newHours = hours;
            int newMinutes = (minutes + timeStep) % 60;
            if (newMinutes < minutes)
            {
                newHours = hours + 1 % 24;
            }

            gameTime = (newHours * 100) + newMinutes;
        }

        private void timeSync()
        {
            int hours = gameTime / 100 % 24;
            int minutes = gameTime % 100 % 60;
            API.setTime(hours, minutes);
            API.setWorldData("VTime", gameTime);
        }

        private void fetchWeather()
        {
            string weatherText = File.ReadAllText(API.getResourceFolder() + "/world/weather.json", Encoding.UTF8);
            weatherCycles = API.fromJson(weatherText).weather.ToObject<object>();
        }

        private void setRandomCycle()
        {
            int patternIdx = randomCls.Next(weatherCycles.Count);
            currentWeatherCycle = weatherCycles[patternIdx];
            API.setWorldData("VWxCycle", patternIdx);
            API.sendChatMessageToAll("wx cycle changed to " + currentWeatherCycle.report);
        }

        private void weatherTick()
        {
            if (gameTime % weatherRate == 0)
            {
                if (currentWeatherIndex >= currentWeatherCycle.cycle.Count - 1)
                {
                    setRandomCycle();
                    currentWeatherIndex = 0;
                }
                else
                {
                    currentWeatherIndex += 1;
                    // API.sendChatMessageToAll("wx state changed to "+currentWeatherCycle.cycle[currentWeatherIndex]);
                }

                API.setWorldData("VWxIndex", currentWeatherIndex);
                lastWeatherStep = gameTime;
                API.setWorldData("VWxLastStep", lastWeatherStep);

            }

        }

        [Command("weather")]
        public void MWeather(Client sender)
        {
            sender.sendChatMessage("~g~-- Weather report for " + gameTimeToHuman() + "~w~\nForecast: ~b~" + currentWeatherCycle.report + "~w~\nCurrently ~g~" + weatherToHuman());
        }

        private void weatherSync()
        {
            if (currentWeatherCycle == null)
            {
                return;
            }

            currentWeather = currentWeatherCycle.cycle[currentWeatherIndex];
            API.setWorldData("VWeather", currentWeather);
            API.setWeather(currentWeather);
        }

        private string gameTimeToHuman()
        {
            int hours = gameTime / 100 % 24;
            int minutes = gameTime % 100 % 60;
            string ampm = (hours < 12) ? "AM" : "PM";

            if (hours == 0)
            {
                hours = 12;
            }

            if (hours > 12)
            {
                hours = hours - 12;
            }

            return "" + hours + ":" + minutes.ToString("D2") + " " + ampm;
        }

        private string weatherToHuman()
        {
            switch (currentWeather)
            {
                case 0:
                    return "sunny";
                case 1:
                    return "clear skies";
                case 2:
                    return "partly cloudy";
                case 3:
                    return "smoggy";
                case 4:
                    return "foggy";
                case 5:
                    return "cloudy skies";
                case 6:
                    return "rain showers";
                case 7:
                    return "thunderstorms";
                case 8:
                    return "light showers";
                case 10:
                    return "light snow";
                case 11:
                    return "snow";
                case 12:
                    return "snowstorms";
                default:
                    return "unknown";
            }
        }

    }
}