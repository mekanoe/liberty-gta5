# LibertyGaming GTA5

Hello developer! These directions for specifically for LibertyRP. If you're here doing other projects for Liberty, see it's respective repo elsewhere.

**Clone this repo with `--recursive`!**

## Things you need

- docker & docker-compose
  + if for some reason this is impossible, you just need a postgres install for now.

- node 8 & yarn

- (if not on windows:) mono 5.x (not 6.0!!!)

- (optional but semi-preferred:) Visual Studio 2017 or anything that can easily deal with C#. 

## Things you want

- eslint OR standardjs linter in your JS editor
  + don't commit code without running it through either.

- editorconfig in your JS editor

- GTA: Network obviously.

## Places to see

- GTA: Network Discord: https://discord.gg/CbvNFAz

- Katalina's Discord: https://discord.gg/NGaUj7X

- GTA:N Wiki: https://wiki.gtanet.work/

*For any other help, don't be afraid to ask Katalina directly.*

## Things to do

these are in bash, so.. possibly correct them for me for windows! 

- Node Dependencies:
  + ```bash
    cd web/world && yarn
    cd frontend && yarn
    ```

- Setting up:
  + if you used a different postgres install, see `web/world/.env` and set it up
  + look in `server/GTANetwork/acl.xml`, add your Social Club name like line 14. Commit this if you want. We set explicit acls/settings for prod.
  + look in `server/GTANetwork/liberty/meta.xml`, change your server identifier to something unique.

- Starting up: (this doesn't have to be in order, just preferrably in this)
  + ```bash
    (cd web/world && npm run dev)
    (cd server/GTANetwork && mono --runtime=4.6 GTANetworkServer.exe) # don't use mono for windows, obviously.
    ```

## Where to begin

- Create an account with `(node web/world/util/create.js user)`, set yourself to `superuser`.

- Start game, login.

- Restart liberty with `/restart liberty`. This prevents the need to restart the game/server.

- Spawn a car with `/car <name>`

- Other interesting commands:
  + Spawn player `/spawn`
  + Get location `/loc` (A is for Z rotation/angle)
  + Get rotation `/rot` 
  + Set location `/tp 0 0 0`
  + Set rotation `/sr 0 0 0`
  + freeze vehicle `/f <true|false>`
  + set skin `/skin` 
    - setting this wrong will crash your game. if nothing happens when you call this, **change your skin to a known working.one.** GTA5 crashes eventually if not.
  + Startup Camera `/ssc`
  + Char Select Camera `/scs`
  + Get Time, Weather, and Forecast `/weather`


## Contributing

Make sure all of your I's are dotted and your T's are crossed. Test everything. Tell QA/testers what to look for when you've been developing and seeing bugs. Run your code through the linter. Run it through the linter again.

We do branches in the format of `feature/feature-name` (e.g. feature/login-screen), `fix/fix-name` (e.g. fix/exploding-car-spawns), `release/version` (e.g. release/0.1.0), `misc/something-else` (e.g. misc/ci-fixes). 

Release branches are the sole responsibility of Katalina and/or future lead devs.

All others can be created at your leisure.