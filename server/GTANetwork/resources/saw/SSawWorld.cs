using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

/*

World State controller; handles Time, Weather, and Blackout.

*/

public class SSawWorld : Script {

	private bool debug = false;
	private Random randomCls = new Random();

	// We sync world state every 1 minute
	private DateTime lastSync;

	// Time cycle is 6 Earth hours = 24 Game hours.
	// Every sync step (1 minute) will move the clock 4 minutes 
	// This number is in zulu time, the sync system understands up to a 4 digit int.
	private int gameTime = 0800;
	private int timeSpeed = 4;

	// This is in seconds. World will only sync this fast.
	private int worldTickRate = 60;

	// This is IN-GAME TIME ^^^^
	private int lastWeatherStepTime = 0;

	// Blackout is player-controlled. If a player goes to Ron Alt. Wind Farm distribution station, 
	// they can turn off/on power for the entire city.
	// This is OFF by default.
	// Turning on the power is meant to make nights less grueling, and creates a player goal.
	private bool isBlackout = true;


	// private enum Wx {
	// 	ExtraSunny,		0
	// 	Clear,			1
	// 	Clouds,			2
	// 	Smog,			3
	// 	Foggy,			4
	// 	Overcast,		5
	// 	Rain,			6
	// 	Thunder,		7
	// 	LightRain,		8
	// 	DONOTUSE,
	// 	SnowLight,		10		
	// 	Snow,			11
	// 	Blizzard,		12
	// } 

	private int currentWeather = 0;
	private int weatherIndex = 0;
	private List<int> activeWeatherPattern;
	
	// Weather works based on an index, when it runs out, randomly pick another.
	// Change interval is once per game hour.
	private List<List<int>> weatherPatterns = new List<List<int>> {

		// Light Rain to Extra Sunny
		new List<int> {
			8,
			5,
			2,
			1,
			1,
			1,
			0,
			0,
			0,
			0,
		},

		// Clouds to Thunderstorm
		new List<int> {
			2,
			5,
			8,
			6,
			7,
			7,
			7,
		},

		// Light Showers
		new List<int> {
			5,
			4,
			8,
			3,
			2
		},

		// Bad air quality
		new List<int> {
			3,
			3,
			3,
			3,
			3,
			3,
			3,
		},

		// Low visibility
		new List<int> {
			4,
			4,
			4,
			4,
			4,
			4,
			4,
			4,
		},

		// Clear skies and sun all day
		new List<int> {
			0,
			0,
			1,
			0,
			1,
			0,
			0,
			1,
			0,
		},

		// Snow day, strong winds later
		new List<int> {
			10,
			11,
			11,
			10,
			12,
			12,
			11,
			12,
			10,
		},

		// Severe Thunderstorms throughout the day
		new List <int> {
			7,
			7,
			7,
			7,
			7,
			7,
			7,
		}
	};


	public SSawWorld() {
		API.onUpdate += onTick;

		InitializeWorld();
	}

	private void onTick() {
		TimeSpan sinceSync = DateTime.Now.Subtract(lastSync);
		if (sinceSync.TotalSeconds > worldTickRate) {
			WeatherTick();
			GlobalWeatherSync();

			TimeTick();
			GlobalTimeSync();

			GlobalBlackoutSync();

			if (debug) {
				ChatDebugInfo();
			}

			lastSync = DateTime.Now;
		}
	}

	private void InitializeWorld() {
		// pick a random weather
		RandomWeatherPattern();
		lastWeatherStepTime = gameTime;

		GlobalWeatherSync();
		GlobalTimeSync();
		lastSync = DateTime.Now;
	}

	private void PlayerJoinSync() {

	}

	private void TimeTick() {
		int hours = gameTime / 100 % 23;
		int minutes = gameTime % 100 % 60;

		int newHours = hours;
		int newMinutes = (minutes + timeSpeed) % 60;
		if (newMinutes < minutes) {
			newHours = hours + 1 % 23;
		}

		gameTime = (newHours * 100) + newMinutes;
	}

	private void WeatherTick() {
		if (gameTime - lastWeatherStepTime >= 100) {
			WeatherStep();
		}
	}

	[Command("debug-weather-step")]
	private void WeatherStep() {
		if (weatherIndex >= activeWeatherPattern.Count - 1) {
			RandomWeatherPattern();
			weatherIndex = 0;
		} else {
			weatherIndex += 1;
		}
	}

	private void RandomWeatherPattern() {
		int patternIdx = randomCls.Next(weatherPatterns.Count);
		activeWeatherPattern = weatherPatterns[patternIdx];
	}

	private void GlobalWeatherSync() {
		currentWeather = activeWeatherPattern[weatherIndex];
		API.setWeather(currentWeather);
	}

	private void GlobalTimeSync() {
		int hours = gameTime / 100 % 23; // 23 hours on the cycle because 2400 == 0000
		int minutes = gameTime % 100 % 60; // strips the top two digits off. I know it's out of 60.
		API.setTime(hours, minutes);
	}

	private void GlobalBlackoutSync() {
		API.sendNativeToAllPlayers(0x1268615ACE24D504, isBlackout);
	}

	private void ChatDebugInfo() {
		API.sendChatMessageToAll("~p~Synced.~w~\n~b~Current Time: ~w~"+gameTime+"\n~y~Current Weather: ~w~"+currentWeather);
	}

	[Command("debug-world")]
	public void MDebugWorld(Client sender, bool debugState) {
		debug = debugState;
		API.sendChatMessageToPlayer(sender, "Debug messages set to ~r~"+debugState);
	}

	[Command("debug-time")]
	public void MDebugTime(Client sender, string thing, int val) {
		switch (thing) {
			case "speed":
				timeSpeed = val;
				GlobalTimeSync();
				break;
			case "set":
				gameTime = val;
				GlobalTimeSync();
				break;
			case "tickrate":
				worldTickRate = val;
				break;
			default:
				API.sendChatMessageToPlayer(sender, "~r~ERROR: ~w~Dunno what "+thing+"is.");
				break;
		}
	}
}