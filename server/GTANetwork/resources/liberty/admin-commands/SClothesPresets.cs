using System;
using GTANetworkServer;
using GTANetworkShared;

namespace Liberty.presets
{
    class SClothesPresets : Script
    {

        public SClothesPresets()
        {

        }

        [Command("player1")] // MALE
        public void playerPreset1(Client sender)
        {
            var skin = API.pedNameToModel("FreeModeMale01");
            API.setPlayerSkin(sender, skin);
            // CLIENT, SLOT, #, TEXTURE
            API.setPlayerClothes(sender, 0, 0, 0); // Face
            API.setPlayerClothes(sender, 2, 11, 4); // HAIR 4 = BLACK
            API.setPlayerClothes(sender, 3, 0, 0); // Make arm invisible for certain clothes
            API.setPlayerClothes(sender, 4, 4, 0); // Legs
            API.setPlayerClothes(sender, 6, 42, 2); // Shoes
            API.setPlayerClothes(sender, 8, 15, 0); // Undershirt ?
            API.setPlayerClothes(sender, 11, 22, 1); // Tops (Jackets)
        }

        [Command("player2")] // MALE
        public void playerPreset2(Client sender)
        {
            var skin = API.pedNameToModel("FreeModeMale01");
            API.setPlayerSkin(sender, skin);
            // CLIENT, SLOT, #, TEXTURE
            API.setPlayerClothes(sender, 0, 4, 0); // Face
            API.setPlayerClothes(sender, 2, 14, 4); // HAIR TEXTURE 4 = BLACK
            API.setPlayerClothes(sender, 3, 0, 0); // Make arm invisible for certain clothes
            API.setPlayerClothes(sender, 4, 5, 2); // Legs
            API.setPlayerClothes(sender, 6, 1, 0); // Shoes
            API.setPlayerClothes(sender, 8, 15, 0); // Undershirt ?
            API.setPlayerClothes(sender, 11, 81, 1); // Tops (Jackets)
        }

        [Command("player3")] // MALE
        public void playerPreset3(Client sender)
        {
            var skin = API.pedNameToModel("FreeModeMale01");
            API.setPlayerSkin(sender, skin);
            // CLIENT, SLOT, #, TEXTURE
            API.setPlayerClothes(sender, 0, 44, 0); // Face
            API.setPlayerClothes(sender, 2, 22, 1); // HAIR TEXTURE 4 = BLACK
            API.setPlayerClothes(sender, 3, 0, 0); // Make arm invisible for certain clothes
            API.setPlayerClothes(sender, 4, 47, 0); // Legs
            API.setPlayerClothes(sender, 6, 1, 0); // Shoes
            API.setPlayerClothes(sender, 8, 15, 0); // Undershirt ?
            API.setPlayerClothes(sender, 11, 89, 0); // Tops (Jackets)
        }

        [Command("player4")] // MALE
        public void playerPreset4(Client sender)
        {
            var skin = API.pedNameToModel("FreeModeMale01");
            API.setPlayerSkin(sender, skin);
            // CLIENT, SLOT, #, TEXTURE
            API.setPlayerClothes(sender, 0, 44, 0); // Face
            API.setPlayerClothes(sender, 2, 17, 3); // HAIR TEXTURE 4 = BLACK
            API.setPlayerClothes(sender, 3, 5, 0); // Make arm invisible for certain clothes
            API.setPlayerClothes(sender, 4, 16, 2); // Legs
            API.setPlayerClothes(sender, 6, 16, 0); // Shoes
            API.setPlayerClothes(sender, 8, 15, 0); // Undershirt ?
            API.setPlayerClothes(sender, 11, 36, 0); // Tops (Jackets)
        }

        [Command("player5")] // MALE
        public void playerPreset5(Client sender)
        {
            var skin = API.pedNameToModel("FreeModeMale01");
            API.setPlayerSkin(sender, skin);
            // CLIENT, SLOT, #, TEXTURE
            API.setPlayerClothes(sender, 0, 24, 0); // Face
            API.setPlayerClothes(sender, 2, 28, 4); // HAIR TEXTURE 4 = BLACK
            API.setPlayerClothes(sender, 3, 4, 0); // Make arm invisible for certain clothes
            API.setPlayerClothes(sender, 4, 64, 10); // Legs
            API.setPlayerClothes(sender, 6, 6, 0); // Shoes
            API.setPlayerClothes(sender, 8, 15, 0); // Undershirt ?
            API.setPlayerClothes(sender, 11, 57, 0); // Tops (Jackets)
        }

        [Command("player6")] // FEMALE
        public void playerPreset6(Client sender)
        {
            var skin = API.pedNameToModel("FreeModeFemale01");
            API.setPlayerSkin(sender, skin);
            // CLIENT, SLOT, #, TEXTURE
            API.setPlayerClothes(sender, 0, 21, 0); // Face
            API.setPlayerClothes(sender, 2, 4, 4); // HAIR TEXTURE 4 = BLACK
            API.setPlayerClothes(sender, 3, 3, 0); // Make arm invisible for certain clothes
            API.setPlayerClothes(sender, 4, 10, 0); // Legs
            API.setPlayerClothes(sender, 6, 10, 1); // Shoes
            API.setPlayerClothes(sender, 8, 8, 0); // Undershirt ?
            API.setPlayerClothes(sender, 11, 3, 2); // Tops (Jackets)
        }

        [Command("player7")] // FEMALE
        public void playerPreset7(Client sender)
        {
            var skin = API.pedNameToModel("FreeModeFemale01");
            API.setPlayerSkin(sender, skin);
            // CLIENT, SLOT, #, TEXTURE
            API.setPlayerClothes(sender, 0, 33, 0); // Face
            API.setPlayerClothes(sender, 2, 1, 1); // HAIR TEXTURE 4 = BLACK
            API.setPlayerClothes(sender, 3, 0, 0); // Make arm invisible for certain clothes
            API.setPlayerClothes(sender, 4, 31, 0); // Legs
            API.setPlayerClothes(sender, 6, 13, 5); // Shoes
            API.setPlayerClothes(sender, 8, 8, 0); // Undershirt ?
            API.setPlayerClothes(sender, 11, 9, 1); // Tops (Jackets)
        }

        [Command("player8")] // FEMALE
        public void playerPreset8(Client sender)
        {
            var skin = API.pedNameToModel("FreeModeFemale01");
            API.setPlayerSkin(sender, skin);
            // CLIENT, SLOT, #, TEXTURE
            API.setPlayerClothes(sender, 0, 40, 0); // Face
            API.setPlayerClothes(sender, 2, 10, 3); // HAIR TEXTURE 4 = BLACK
            API.setPlayerClothes(sender, 3, 7, 0); // Make arm invisible for certain clothes
            API.setPlayerClothes(sender, 4, 7, 0); // Legs
            API.setPlayerClothes(sender, 6, 0, 0); // Shoes
            API.setPlayerClothes(sender, 8, 39, 0); // Undershirt ?
            API.setPlayerClothes(sender, 11, 57, 0); // Tops (Jackets)
        }

        [Command("player9")] // FEMALE
        public void playerPreset9(Client sender)
        {
            var skin = API.pedNameToModel("FreeModeFemale01");
            API.setPlayerSkin(sender, skin);
            // CLIENT, SLOT, #, TEXTURE
            API.setPlayerClothes(sender, 0, 29, 0); // Face
            API.setPlayerClothes(sender, 2, 14, 4); // HAIR TEXTURE 4 = BLACK
            API.setPlayerClothes(sender, 3, 1, 0); // Make arm invisible for certain clothes
            API.setPlayerClothes(sender, 4, 66, 10); // Legs
            API.setPlayerClothes(sender, 6, 49, 0); // Shoes
            API.setPlayerClothes(sender, 8, 2, 0); // Undershirt ?
            API.setPlayerClothes(sender, 11, 125, 9); // Tops (Jackets)
        }

        [Command("player10")] // FEMALE
        public void playerPreset10(Client sender)
        {
            var skin = API.pedNameToModel("FreeModeFemale01");
            API.setPlayerSkin(sender, skin);
            // CLIENT, SLOT, #, TEXTURE
            API.setPlayerClothes(sender, 0, 45, 0); // Face
            API.setPlayerClothes(sender, 2, 5, 3); // HAIR TEXTURE 4 = BLACK
            API.setPlayerClothes(sender, 3, 2, 0); // Make arm invisible for certain clothes
            API.setPlayerClothes(sender, 4, 16, 4); // Legs
            API.setPlayerClothes(sender, 6, 15, 1); // Shoes
            API.setPlayerClothes(sender, 8, 2, 0); // Undershirt ?
            API.setPlayerClothes(sender, 11, 2, 0); // Tops (Jackets)
        }
    }
}