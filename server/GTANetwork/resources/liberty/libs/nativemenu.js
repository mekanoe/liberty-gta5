const Enums = {
    Controls: {
        NextCamera: 0,
        LookLeftRight: 1,
        LookUpDown: 2,
        LookUpOnly: 3,
        LookDownOnly: 4,
        LookLeftOnly: 5,
        LookRightOnly: 6,
        CinematicSlowMo: 7,
        FlyUpDown: 8,
        FlyLeftRight: 9,
        ScriptedFlyZUp: 10,
        ScriptedFlyZDown: 11,
        WeaponWheelUpDown: 12,
        WeaponWheelLeftRight: 13,
        WeaponWheelNext: 14,
        WeaponWheelPrev: 15,
        SelectNextWeapon: 16,
        SelectPrevWeapon: 17,
        SkipCutscene: 18,
        CharacterWheel: 19,
        MultiplayerInfo: 20,
        Sprint: 21,
        Jump: 22,
        Enter: 23,
        Attack: 24,
        Aim: 25,
        LookBehind: 26,
        Phone: 27,
        SpecialAbility: 28,
        SpecialAbilitySecondary: 29,
        MoveLeftRight: 30,
        MoveUpDown: 31,
        MoveUpOnly: 32,
        MoveDownOnly: 33,
        MoveLeftOnly: 34,
        MoveRightOnly: 35,
        Duck: 36,
        SelectWeapon: 37,
        Pickup: 38,
        SniperZoom: 39,
        SniperZoomInOnly: 40,
        SniperZoomOutOnly: 41,
        SniperZoomInSecondary: 42,
        SniperZoomOutSecondary: 43,
        Cover: 44,
        Reload: 45,
        Talk: 46,
        Detonate: 47,
        HUDSpecial: 48,
        Arrest: 49,
        AccurateAim: 50,
        Context: 51,
        ContextSecondary: 52,
        WeaponSpecial: 53,
        WeaponSpecial2: 54,
        Dive: 55,
        DropWeapon: 56,
        DropAmmo: 57,
        ThrowGrenade: 58,
        VehicleMoveLeftRight: 59,
        VehicleMoveUpDown: 60,
        VehicleMoveUpOnly: 61,
        VehicleMoveDownOnly: 62,
        VehicleMoveLeftOnly: 63,
        VehicleMoveRightOnly: 64,
        VehicleSpecial: 65,
        VehicleGunLeftRight: 66,
        VehicleGunUpDown: 67,
        VehicleAim: 68,
        VehicleAttack: 69,
        VehicleAttack2: 70,
        VehicleAccelerate: 71,
        VehicleBrake: 72,
        VehicleDuck: 73,
        VehicleHeadlight: 74,
        VehicleExit: 75,
        VehicleHandbrake: 76,
        VehicleHotwireLeft: 77,
        VehicleHotwireRight: 78,
        VehicleLookBehind: 79,
        VehicleCinCam: 80,
        VehicleNextRadio: 81,
        VehiclePrevRadio: 82,
        VehicleNextRadioTrack: 83,
        VehiclePrevRadioTrack: 84,
        VehicleRadioWheel: 85,
        VehicleHorn: 86,
        VehicleFlyThrottleUp: 87,
        VehicleFlyThrottleDown: 88,
        VehicleFlyYawLeft: 89,
        VehicleFlyYawRight: 90,
        VehiclePassengerAim: 91,
        VehiclePassengerAttack: 92,
        VehicleSpecialAbilityFranklin: 93,
        VehicleStuntUpDown: 94,
        VehicleCinematicUpDown: 95,
        VehicleCinematicUpOnly: 96,
        VehicleCinematicDownOnly: 97,
        VehicleCinematicLeftRight: 98,
        VehicleSelectNextWeapon: 99,
        VehicleSelectPrevWeapon: 100,
        VehicleRoof: 101,
        VehicleJump: 102,
        VehicleGrapplingHook: 103,
        VehicleShuffle: 104,
        VehicleDropProjectile: 105,
        VehicleMouseControlOverride: 106,
        VehicleFlyRollLeftRight: 107,
        VehicleFlyRollLeftOnly: 108,
        VehicleFlyRollRightOnly: 109,
        VehicleFlyPitchUpDown: 110,
        VehicleFlyPitchUpOnly: 111,
        VehicleFlyPitchDownOnly: 112,
        VehicleFlyUnderCarriage: 113,
        VehicleFlyAttack: 114,
        VehicleFlySelectNextWeapon: 115,
        VehicleFlySelectPrevWeapon: 116,
        VehicleFlySelectTargetLeft: 117,
        VehicleFlySelectTargetRight: 118,
        VehicleFlyVerticalFlightMode: 119,
        VehicleFlyDuck: 120,
        VehicleFlyAttackCamera: 121,
        VehicleFlyMouseControlOverride: 122,
        VehicleSubTurnLeftRight: 123,
        VehicleSubTurnLeftOnly: 124,
        VehicleSubTurnRightOnly: 125,
        VehicleSubPitchUpDown: 126,
        VehicleSubPitchUpOnly: 127,
        VehicleSubPitchDownOnly: 128,
        VehicleSubThrottleUp: 129,
        VehicleSubThrottleDown: 130,
        VehicleSubAscend: 131,
        VehicleSubDescend: 132,
        VehicleSubTurnHardLeft: 133,
        VehicleSubTurnHardRight: 134,
        VehicleSubMouseControlOverride: 135,
        VehiclePushbikePedal: 136,
        VehiclePushbikeSprint: 137,
        VehiclePushbikeFrontBrake: 138,
        VehiclePushbikeRearBrake: 139,
        MeleeAttackLight: 140,
        MeleeAttackHeavy: 141,
        MeleeAttackAlternate: 142,
        MeleeBlock: 143,
        ParachuteDeploy: 144,
        ParachuteDetach: 145,
        ParachuteTurnLeftRight: 146,
        ParachuteTurnLeftOnly: 147,
        ParachuteTurnRightOnly: 148,
        ParachutePitchUpDown: 149,
        ParachutePitchUpOnly: 150,
        ParachutePitchDownOnly: 151,
        ParachuteBrakeLeft: 152,
        ParachuteBrakeRight: 153,
        ParachuteSmoke: 154,
        ParachutePrecisionLanding: 155,
        Map: 156,
        SelectWeaponUnarmed: 157,
        SelectWeaponMelee: 158,
        SelectWeaponHandgun: 159,
        SelectWeaponShotgun: 160,
        SelectWeaponSmg: 161,
        SelectWeaponAutoRifle: 162,
        SelectWeaponSniper: 163,
        SelectWeaponHeavy: 164,
        SelectWeaponSpecial: 165,
        SelectCharacterMichael: 166,
        SelectCharacterFranklin: 167,
        SelectCharacterTrevor: 168,
        SelectCharacterMultiplayer: 169,
        SaveReplayClip: 170,
        SpecialAbilityPC: 171,
        PhoneUp: 172,
        PhoneDown: 173,
        PhoneLeft: 174,
        PhoneRight: 175,
        PhoneSelect: 176,
        PhoneCancel: 177,
        PhoneOption: 178,
        PhoneExtraOption: 179,
        PhoneScrollForward: 180,
        PhoneScrollBackward: 181,
        PhoneCameraFocusLock: 182,
        PhoneCameraGrid: 183,
        PhoneCameraSelfie: 184,
        PhoneCameraDOF: 185,
        PhoneCameraExpression: 186,
        FrontendDown: 187,
        FrontendUp: 188,
        FrontendLeft: 189,
        FrontendRight: 190,
        FrontendRdown: 191,
        FrontendRup: 192,
        FrontendRleft: 193,
        FrontendRright: 194,
        FrontendAxisX: 195,
        FrontendAxisY: 196,
        FrontendRightAxisX: 197,
        FrontendRightAxisY: 198,
        FrontendPause: 199,
        FrontendPauseAlternate: 200,
        FrontendAccept: 201,
        FrontendCancel: 202,
        FrontendX: 203,
        FrontendY: 204,
        FrontendLb: 205,
        FrontendRb: 206,
        FrontendLt: 207,
        FrontendRt: 208,
        FrontendLs: 209,
        FrontendRs: 210,
        FrontendLeaderboard: 211,
        FrontendSocialClub: 212,
        FrontendSocialClubSecondary: 213,
        FrontendDelete: 214,
        FrontendEndscreenAccept: 215,
        FrontendEndscreenExpand: 216,
        FrontendSelect: 217,
        ScriptLeftAxisX: 218,
        ScriptLeftAxisY: 219,
        ScriptRightAxisX: 220,
        ScriptRightAxisY: 221,
        ScriptRUp: 222,
        ScriptRDown: 223,
        ScriptRLeft: 224,
        ScriptRRight: 225,
        ScriptLB: 226,
        ScriptRB: 227,
        ScriptLT: 228,
        ScriptRT: 229,
        ScriptLS: 230,
        ScriptRS: 231,
        ScriptPadUp: 232,
        ScriptPadDown: 233,
        ScriptPadLeft: 234,
        ScriptPadRight: 235,
        ScriptSelect: 236,
        CursorAccept: 237,
        CursorCancel: 238,
        CursorX: 239,
        CursorY: 240,
        CursorScrollUp: 241,
        CursorScrollDown: 242,
        EnterCheatCode: 243,
        InteractionMenu: 244,
        MpTextChatAll: 245,
        MpTextChatTeam: 246,
        MpTextChatFriends: 247,
        MpTextChatCrew: 248,
        PushToTalk: 249,
        CreatorLS: 250,
        CreatorRS: 251,
        CreatorLT: 252,
        CreatorRT: 253,
        CreatorMenuToggle: 254,
        CreatorAccept: 255,
        CreatorDelete: 256,
        Attack2: 257,
        RappelJump: 258,
        RappelLongJump: 259,
        RappelSmashWindow: 260,
        PrevWeapon: 261,
        NextWeapon: 262,
        MeleeAttack1: 263,
        MeleeAttack2: 264,
        Whistle: 265,
        MoveLeft: 266,
        MoveRight: 267,
        MoveUp: 268,
        MoveDown: 269,
        LookLeft: 270,
        LookRight: 271,
        LookUp: 272,
        LookDown: 273,
        SniperZoomIn: 274,
        SniperZoomOut: 275,
        SniperZoomInAlternate: 276,
        SniperZoomOutAlternate: 277,
        VehicleMoveLeft: 278,
        VehicleMoveRight: 279,
        VehicleMoveUp: 280,
        VehicleMoveDown: 281,
        VehicleGunLeft: 282,
        VehicleGunRight: 283,
        VehicleGunUp: 284,
        VehicleGunDown: 285,
        VehicleLookLeft: 286,
        VehicleLookRight: 287,
        ReplayStartStopRecording: 288,
        ReplayStartStopRecordingSecondary: 289,
        ScaledLookLeftRight: 290,
        ScaledLookUpDown: 291,
        ScaledLookUpOnly: 292,
        ScaledLookDownOnly: 293,
        ScaledLookLeftOnly: 294,
        ScaledLookRightOnly: 295,
        ReplayMarkerDelete: 296,
        ReplayClipDelete: 297,
        ReplayPause: 298,
        ReplayRewind: 299,
        ReplayFfwd: 300,
        ReplayNewmarker: 301,
        ReplayRecord: 302,
        ReplayScreenshot: 303,
        ReplayHidehud: 304,
        ReplayStartpoint: 305,
        ReplayEndpoint: 306,
        ReplayAdvance: 307,
        ReplayBack: 308,
        ReplayTools: 309,
        ReplayRestart: 310,
        ReplayShowhotkey: 311,
        ReplayCycleMarkerLeft: 312,
        ReplayCycleMarkerRight: 313,
        ReplayFOVIncrease: 314,
        ReplayFOVDecrease: 315,
        ReplayCameraUp: 316,
        ReplayCameraDown: 317,
        ReplaySave: 318,
        ReplayToggletime: 319,
        ReplayToggletips: 320,
        ReplayPreview: 321,
        ReplayToggleTimeline: 322,
        ReplayTimelinePickupClip: 323,
        ReplayTimelineDuplicateClip: 324,
        ReplayTimelinePlaceClip: 325,
        ReplayCtrl: 326,
        ReplayTimelineSave: 327,
        ReplayPreviewAudio: 328,
        VehicleDriveLook: 329,
        VehicleDriveLook2: 330,
        VehicleFlyAttack2: 331,
        RadioWheelUpDown: 332,
        RadioWheelLeftRight: 333,
        VehicleSlowMoUpDown: 334,
        VehicleSlowMoUpOnly: 335,
        VehicleSlowMoDownOnly: 336,
        MapPointOfInterest: 337
    },

    IntersectOptions: {
        Everything: -1,
        Map: 1,
        Mission_Entities: 2,
        Peds1: 12,//4 and 8 both seem to be peds
        Objects: 16,
        Unk1: 32,
        Unk2: 64,
        Unk3: 128,
        Vegetation: 256,
        Unk4: 512
    },

    NativeReturnTypes: {
        Int: 0,
        UInt: 1,
        Long: 2,
        ULong: 3,
        String: 4,
        Vector3: 5,
        Vector2: 6,
        Float: 7,
        Bool: 8,
        Handle: 9
    },

    WeaponComponent: {
        RailgunClip01: 59044840,
        CombatPistolClip01: 119648377,
        KnuckleVarmodPlayer: 146278587,
        AtArAfGrip: 202788691,
        HeavyPistolClip01: 222992026,
        MicroSMGClip02: 283556395,
        GrenadeLauncherClip01: 296639639,
        RevolverVarmodBoss: 384708672,
        AtScopeLargeFixedZoom: 471997210,
        GusenbergClip01: 484812453,
        Pistol50Clip01: 580369945,
        APPistolClip02: 614078421,
        SMGClip01: 643254679,
        SMGVarmodLuxe: 663170192,
        AssaultSMGVarmodLowrider: 663517359,
        DBShotgunClip01: 703231006,
        APPistolClip01: 834974250,
        HeavyShotgunClip01: 844049759,
        CombatPDWClip02: 860508675,
        VintagePistolClip02: 867832552,
        SMGClip02: 889808635,
        AtPiFlsh: 899381934,
        AdvancedRifleVarmodLuxe: 930927479,
        AtScopeSmall02: 1006677997,
        AtScopeMacro02: 1019656791,
        KnuckleVarmodLove: 1062111910,
        SniperRifleVarmodLuxe: 1077065191,
        CombatPDWClip01: 1125642654,
        VintagePistolClip01: 1168357051,
        MachinePistolClip01: 1198425599,
        HeavySniperClip01: 1198478068,
        MicroSMGVarmodLuxe: 1215999497,
        RPGClip01: 1319465907,
        AssaultRifleVarmodLuxe: 1319990579,
        MusketClip01: 1322387263,
        KnuckleVarmodDollar: 1351683121,
        CompactRifleClip01: 1363085923,
        CompactRifleClip02: 1509923832,
        SwitchbladeVarmodVar1: 1530822070,
        HeavyPistolClip02: 1694090795,
        AtPiSupp02: 1709866683,
        SpecialCarbineClip03: 1801039530,
        CombatPDWClip03: 1857603803,
        SpecialCarbineVarmodLowrider: 1929467122,
        AtRailCover01: 1967214384,
        Pistol50VarmodLuxe: 2008591151,
        SMGClip03: 2043113590,
        HeavyPistolVarmodLuxe: 2053798779,
        KnuckleVarmodVagos: 2062808965,
        SNSPistolClip02: 2063610803,
        AtArFlsh: 2076495324,
        SpecialCarbineClip02: 2089537806,
        KnuckleVarmodHate: 2112683568,
        SNSPistolVarmodLowrider: 2150886575,
        MGClip02: 2182449991,
        AtArSupp: 2205435306,
        SawnoffShotgunVarmodLuxe: 2242268665,
        AssaultShotgunClip02: 2260565874,
        HeavyShotgunClip03: 2294798931,
        AssaultSMGClip01: 2366834608,
        AdvancedRifleClip02: 2395064697,
        CarbineRifleClip02: 2433783441,
        SwitchbladeVarmodBase: 2436343040,
        CombatMGVarmodLowrider: 2466172125,
        FlareGunClip01: 2481569177,
        RevolverVarmodGoon: 2492708877,
        AssaultShotgunClip01: 2498239431,
        HeavyShotgunClip02: 2535257853,
        KnuckleVarmodDiamond: 2539772380,
        APPistolVarmodLuxe: 2608252716,
        SniperRifleClip01: 2613461129,
        AtScopeMacro: 2637152041,
        CarbineRifleClip01: 2680042476,
        AtScopeMedium: 2698550338,
        PumpShotgunVarmodLowrider: 2732039643,
        AtArSupp02: 2805810788,
        BullpupRifleVarmodLow: 2824322168,
        MachinePistolClip03: 2850671348,
        AtScopeSmall: 2855028148,
        AssaultRifleClip02: 2971750299,
        BullpupRifleClip02: 3009973007,
        MachinePistolClip02: 3106695545,
        CarbineRifleClip03: 3127044405,
        AssaultSMGClip02: 3141985303,
        AtScopeMax: 3159677559,
        AssaultRifleClip01: 3193891350,
        AtPiSupp: 3271853210,
        BullpupRifleClip01: 3315675008,
        PoliceTorchFlashlight: 3315797997,
        CompactRifleClip03: 3322377230,
        KnuckleVarmodPimp: 3323197061,
        CombatPistolVarmodLowrider: 3328527730,
        SpecialCarbineClip01: 3334989185,
        SawnoffShotgunClip01: 3352699429,
        MinigunClip01: 3370020614,
        BullpupShotgunClip01: 3377353998,
        MicroSMGClip01: 3410538224,
        MarksmanPistolClip01: 3416146413,
        MarksmanRifleClip02: 3439143621,
        PumpShotgunClip01: 3513717816,
        AtScopeLarge: 3527687644,
        CombatPistolClip02: 3598405421,
        CombatMGClip02: 3603274966,
        MGVarmodLowrider: 3604658878,
        PistolVarmodLuxe: 3610841222,
        MarksmanRifleClip01: 3627761985,
        CarbineRifleVarmodLuxe: 3634075224,
        Pistol50Clip02: 3654528146,
        AssaultRifleClip03: 3689981245,
        FlashlightLight: 3719772431,
        CombatMGClip01: 3791631178,
        KnuckleVarmodKing: 3800804335,
        FireworkClip01: 3840197261,
        AtSrSupp: 3859329886,
        SwitchbladeVarmodVar2: 3885209186,
        RevolverClip01: 3917905123,
        GusenbergClip02: 3939025520,
        PistolClip02: 3978713628,
        KnuckleVarmodBallas: 4007263587,
        KnuckleVarmodBase: 4081463091,
        MGClip01: 4097109892,
        HomingLauncherClip01: 4162006335,
        SNSPistolClip01: 4169150169,
        AdvancedRifleClip01: 4203716879,
        PistolClip01: 4275109233,
        Invalid: 4294967295
    },

    WeaponHash: {
        SniperRifle: 100416529,
        FireExtinguisher: 101631238,
        Snowball: 126349499,
        VintagePistol: 137902532,
        CombatPDW: 171789620,
        HeavySniper: 205991906,
        MicroSMG: 324215364,
        Pistol: 453432689,
        PumpShotgun: 487013001,
        APPistol: 584646201,
        Ball: 600439132,
        Molotov: 615608432,
        SMG: 736523883,
        StickyBomb: 741814745,
        PetrolCan: 883325847,
        StunGun: 911657153,
        HeavyShotgun: 984333226,
        Minigun: 1119849093,
        GolfClub: 1141786504,
        FlareGun: 1198879012,
        Flare: 1233104067,
        GrenadeLauncherSmoke: 1305664598,
        Hammer: 1317494643,
        CombatPistol: 1593441988,
        Gusenberg: 1627465347,
        CompactRifle: 1649403952,
        HomingLauncher: 1672152130,
        Nightstick: 1737195953,
        Railgun: 1834241177,
        SawnOffShotgun: 2017895192,
        BullpupRifle: 2132975508,
        Firework: 2138347493,
        CombatMG: 2144741730,
        CarbineRifle: 2210333304,
        Crowbar: 2227010557,
        Flashlight: 2343591895,
        Dagger: 2460120199,
        Grenade: 2481070269,
        Bat: 2508868239,
        Pistol50: 2578377531,
        Knife: 2578778090,
        MG: 2634544996,
        BullpupShotgun: 2640438543,
        BZGas: 2694266206,
        Unarmed: 2725352035,
        GrenadeLauncher: 2726580491,
        NightVision: 2803906140,
        Musket: 2828843422,
        ProximityMine: 2874559379,
        AdvancedRifle: 2937143193,
        RPG: 2982836145,
        SNSPistol: 3218215474,
        AssaultRifle: 3220176749,
        SpecialCarbine: 3231910285,
        Revolver: 3249783761,
        MarksmanRifle: 3342088282,
        HeavyPistol: 3523564046,
        KnuckleDuster: 3638508604,
        MachinePistol: 3675956304,
        MarksmanPistol: 3696079510,
        Machete: 3713923289,
        SwitchBlade: 3756226112,
        AssaultShotgun: 3800352039,
        DoubleBarrelShotgun: 4019527611,
        AssaultSMG: 4024951519,
        Hatchet: 4191993645,
        Bottle: 4192643659,
        Parachute: 4222310262,
        SmokeGrenade: 4256991824
    },

    WeaponTint: {
        Normal: 0,
        Green: 1,
        Gold: 2,
        Pink: 3,
        Army: 4,
        LSPD: 5,
        Orange: 6,
        Platinum: 7
    },

    Weather: {
        Unknown: -1,
        ExtraSunny: 0,
        Clear: 1,
        Clouds: 2,
        Smog: 3,
        Foggy: 4,
        Overcast: 5,
        Raining: 6,
        ThunderStorm: 7,
        Clearing: 8,
        Neutral: 9,
        Snowing: 10,
        Blizzard: 11,
        Snowlight: 12,
        Christmas: 13
    },

    MenuAnchor: {
        TopLeft: 0,
        TopMiddle: 1,
        TopRight: 2,
        MiddleLeft: 3,
        Middle: 4,
        // Wut?
        TopLeft2: 5,
        MiddleRight: 6,
        BottomLeft: 7,
        BottomMiddle: 8,
        BottomRight: 9
    },

    ExplosionType: {
        Grenade: 0,
        GrenadeL: 1,
        StickyBomb: 2,
        Molotov1: 3,
        Rocket: 4,
        TankShell: 5,
        HiOctane: 6,
        Car: 7,
        Plane: 8,
        PetrolPump: 9,
        Bike: 10,
        Steam: 11,
        Flame: 12,
        WaterHydrant: 13,
        GasCanister: 14,
        Boat: 15,
        ShipDestroy: 16,
        Truck: 17,
        Bullet: 18,
        SmokeGL: 19,
        SmokeG: 20,
        BZGas: 21,
        Flare: 22,
        GasCanister2: 23,
        Extinguisher: 24,
        ProgramAR: 25,
        Train: 26,
        Barrel: 27,
        Propane: 28,
        Blimp: 29,
        FlameExplode: 30,
        Tanker: 31,
        PlaneRocket: 32,
        VehicleBullet: 33,
        GasTank: 34,
        FireWork: 35,
        SnowBall: 36,
        ProxMine: 37,
        Valkyrie: 38
    },

    EntityType: {
        Vehicle: 1,
        Prop: 2,
        Blip: 3,
        Marker: 4,
        Pickup: 5,
        Player: 6,
        TextLabel: 7,
        Ped: 8,
        Particle: 9,
        World: 255
    },

    MarkerType: {
        UpsideDownCone: 0,
        VerticalCylinder: 1,
        ThickCevronUp: 2,
        ThinCevronUp: 3,
        CheckeredFlagRect: 4,
        CheckeredFlagCircle: 5,
        VerticalCircle: 6,
        PlaneModel: 7,
        LostMCDark: 8,
        LostMCLight: 9,
        Number0: 10,
        Number1: 11,
        Number2: 12,
        Number3: 13,
        Number4: 14,
        Number5: 15,
        Number6: 16,
        Number7: 17,
        Number8: 18,
        Number9: 19,
        ChevronUpX1: 20,
        ChevronUpX2: 21,
        ChevronUpX3: 22,
        HorizontalCircleFlat: 23,
        ReplayIcon: 24,
        HorizontalCircleSkinny: 25,
        HorizontalCircleArrow: 26,
        HorizontalSplitArrowCircle: 27,
        DebugSphere: 28,
    }
}

const screenX = API.getScreenResolutionMantainRatio().Width
const screenY = API.getScreenResolutionMantainRatio().Height
const panelMinX = (screenX / 32)
const panelMinY = (screenY / 18)
let button = null
let panel = null
let image = null
let notification = null
let notifications = []
let textnotification = null
let textnotifications = []
let padding = 10
let selectedInput = null
let tabIndex = []
let tab = 0
let menuElements = []
let isReady = false
let currentPage = 0
let clickDelay = new Date().getTime()

API.onUpdate.connect(() => {
    // Notifications can be global.
    drawNotification()
    drawTextNotification()
    if (!isReady) {
        return
    }
    if (menuElements.length < 1) {
        return
    }
    if (currentPage === null) {
        return
    }
    if (!Array.isArray(menuElements[currentPage])) {
        return
    }
    if (menuElements[currentPage].length < 1) {
        return
    }
    for (var i = 0; i < menuElements[currentPage].length; i++) {
        menuElements[currentPage][i].draw()
        menuElements[currentPage][i].isHovered()
        menuElements[currentPage][i].isClicked()
    }
    // 0 - 1
    // Page - Page
    // Panel - Panel
    // Panel - Panel
    // Panel - Panel
})

function createMenu(pages) {
    var menu = new Menu(pages)
    return menu
}

class Menu {
    constructor(pages) {
        if (Array.isArray(menuElements[0])) {
            return
        }
        for (var i = 0; i < pages; i++) {
            var emptyArray = []
            menuElements.push(emptyArray)
        }
        this._blur = false

        Object.defineProperty(this, "Ready", {
            get: function () {
                return isReady
            },
            /** Start drawing our menu. */
            set: function (value) {
                isReady = value
            },
            enumerable: true,
            configurable: true
        })

        Object.defineProperty(this, "Blur", {
            get: function () {
                return this._blur
            },
            /** Used to blur the background behind the menu. */
            set: function (value) {
                this._blur = value
                if (value) {
                    API.callNative("_TRANSITION_TO_BLURRED", 3000)
                }
                else {
                    API.callNative("_TRANSITION_FROM_BLURRED", 3000)
                }
            },
            enumerable: true,
            configurable: true
        })

        Object.defineProperty(this, "DisableOverlays", {
            set: function (value) {
                this._overlays = value
                if (value) {
                    API.setHudVisible(false)
                    API.setChatVisible(false)
                    API.setCanOpenChat(false)
                }
                else {
                    API.setHudVisible(true)
                    API.setChatVisible(true)
                    API.setCanOpenChat(true)
                }
            },
            enumerable: true,
            configurable: true
        })

    }

    nextPage () {
        if (currentPage + 1 > menuElements.length - 1) {
            currentPage = 0
            return
        }
        currentPage++
    }
    
    prevPage () {
        if (currentPage - 1 < 0) {
            currentPage = menuElements.length - 1
            return
        }
        currentPage--
    }

    createPanel (page, xStart, yStart, xGridWidth, yGridHeight) {
        var newPanel = new Panel(page, xStart, yStart, xGridWidth, yGridHeight)
        menuElements[page].push(newPanel)
        return newPanel
    }
}

class PlayerTextNotification {
    constructor(text) {
        var playerPos = API.getEntityPosition(API.getLocalPlayer()).Add(new Vector3(0, 0, 1))
        var point = API.worldToScreenMantainRatio(playerPos)
        this._xPos = Point.Round(point).X
        this._yPos = Point.Round(point).Y
        this._drawing = true
        this._alpha = 255
        this._text = text
        this._increment = -1
        this._lastUpdateAlpha = new Date().getTime()
        this._lastUpdateTextPosition = new Date().getTime()
        this._r = 0
        this._g = 0
        this._b = 0
    }

    draw() {
        if (!this._drawing) {
            return
        }
        if (new Date().getTime() > this._lastUpdateAlpha + 35) {
            this._lastUpdateAlpha = new Date().getTime()
            this._alpha -= 5
        }
        if (new Date().getTime() > this._lastUpdateTextPosition + 100) {
            this._yPos -= 0.3
        }
        API.drawText(this._text, this._xPos, this._yPos, 0.4, this._r, this._g, this._b, this._alpha, 4, 1, true, true, 500)
        if (this._alpha <= 0) {
            this.cleanUpNotification()
        }
    }

    setColor() {
        this._r = r
        this._g = g
        this._b = b
    }

    cleanUpNotification() {
        this._drawing = false
        textnotification = null
    }

    returnType() {
        return "PlayerTextNotification"
    }
}

class ProgressBar {
    constructor(x, y, width, height, currentProgress) {
        this._xPos = x * panelMinX
        this._yPos = y * panelMinY
        this._width = width * panelMinX - 10
        this._height = height * panelMinY - 10
        this._currentProgress = currentProgress
        this._r = 0
        this._g = 0
        this._b = 0
    }

    draw() {
        API.drawRectangle(this._xPos + 5, this._yPos + 5, ((this._width / 100) * this._currentProgress), this._height, this._r, this._g, this._b, 225)
        API.drawText("" + Math.round(this._currentProgress), this._xPos + (((this._width / 100) * this._currentProgress) / 2), this._yPos, 0.5, 255, 255, 255, 255, 4, 1, false, true, 100)
    }

    setColor(r, g, b) {
        this._r = r
        this._g = g
        this._b = b
    }

    addProgress(value) {
        if (this._currentProgress + value > 100) {
            this._currentProgress = 100
            return
        }
        this._currentProgress += value
    }

    subtractProgress(value) {
        if (this._currentProgress - value < 0) {
            this._currentProgress = 0
            return
        }
        this._currentProgress -= value
    }

    setProgressAmount(value) {
        if (value >= 100) {
            this._currentProgress = 100
            return
        }
        if (value <= 0) {
            this._currentProgress = 0
            return
        }
        this._currentProgress = value
        return
    }

    returnProgressAmount() {
        return this._currentProgress
    }

    returnType() {
        return "ProgressBar"
    }

}

class Notification {
    constructor(text, displayTime) {
        this._currentPosX = 26 * panelMinX // Starting Position
        this._currentPosY = screenY // Starting Position Y
        this._targetX = 26 * panelMinX // Ending Position
        this._targetY = 15 * panelMinY // Ending Position Y
        this._width = panelMinX * 5
        this._height = panelMinY * 3
        // Text Settings
        this._text = text
        this._r = 255
        this._g = 165
        this._b = 0
        this._offset = 0
        this._textScale = 0.5
        // Animation Settings
        this._lastUpdateTime = new Date().getTime() //ms
        this._alpha = 255
        this._displayTime = displayTime
        this._incrementer = 0
        // Sound Settings
        this._sound = true
    }

    draw() {
        if (notification !== this) {
            return
        }
        if (this._sound) {
            this._sound = false
            API.playSoundFrontEnd("GOLF_NEW_RECORD", "HUD_AWARDS")
        }
        // Starts below max screen.
        API.drawRectangle(this._currentPosX, this._currentPosY - 5, this._width, 5, this._r, this._g, this._b, this._alpha - 30)
        API.drawRectangle(this._currentPosX, this._currentPosY, this._width, this._height, 0, 0, 0, this._alpha - 30)
        API.drawText(this._text, this._offset + this._currentPosX + (this._width / 2), this._currentPosY + (this._height / 4), this._textScale, 255, 255, 255, this._alpha, 4, 1, false, false, this._width - padding)
        this.animate()
    }

    animate() {
        // Did we reach our goal?
        if (this._currentPosY <= this._targetY) {
            this._currentPosY = this._targetY
            // Ready to fade?
            if (new Date().getTime() > this._lastUpdateTime + this._displayTime) {
                this.fade()
                return
            }
            return
        }
        this._lastUpdateTime = new Date().getTime()
        // If not let's reach our goal.
        if (this._currentPosY <= this._targetY + (this._height / 6)) {
            this._currentPosY -= 3
            return
        }
        else {
            this._currentPosY -= 5
            return
        }
    }

    fade() {
        if (this._alpha <= 0) {
            this.cleanUpNotification()
            return
        }
        this._alpha -= 5
        return
    }

    cleanUpNotification() {
        notification = null
    }
    setText(value) {
        this._text = value
    }
    setColor(r, g, b) {
        this._r = r
        this._g = g
        this._b = b
    }
    setTextScale(value) {
        this._textScale = value
    }
    isHovered() {
        return
    }
    isClicked() {
        return
    }
    returnType() {
        return "Notification"
    }
}

class TextElement {
    constructor(text, x, y, width, height, line) {
        this._xPos = x
        this._yPos = y + (panelMinY * line)
        this._width = width
        this._height = height
        this._text = text
        this._fontScale = 0.6
        this._centered = false
        this._centeredVertically = false
        this._font = 4
        this._fontR = 255
        this._fontG = 255
        this._fontB = 255
        this._fontAlpha = 255
        this._hoverTextAlpha = 255
        this._hoverTextR = 255
        this._hoverTextG = 255
        this._hoverTextB = 255
        this._offset = 0
        this._padding = 10
        this._hovered = false
        this._shadow = false
        this._outline = false

        Object.defineProperty(this, "Hovered", {
            get: function () {
                return this._hovered
            },
            //** Is this text element in a hover state? */
            set: function (value) {
                this._hovered = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "R", {
            /** Gets the color for RGB of R type. */
            get: function () {
                return this._fontR
            },
            /** Sets the color for RGB of R type. Max of 255 */
            set: function (value) {
                this._fontR = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "G", {
            /** Gets the color for RGB of G type. */
            get: function () {
                return this._fontG
            },
            /** Sets the color for RGB of G type. Max of 255 */
            set: function (value) {
                this._fontG = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "B", {
            /** Gets the color for RGB of B type. */
            get: function () {
                return this._fontB
            },
            /** Sets the color for RGB of B type. Max of 255 */
            set: function (value) {
                this._fontB = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "Alpha", {
            get: function () {
                return this._fontAlpha
            },
            /** Sets the font Alpha property */
            set: function (value) {
                this._fontAlpha = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "HoverAlpha", {
            get: function () {
                return this._hoverTextAlpha
            },
            /** Sets the font Alpha property */
            set: function (value) {
                this._hoverTextAlpha = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "HoverR", {
            get: function () {
                return this._hoverTextR
            },
            /** Sets the hover color for the text RGB of R type. */
            set: function (value) {
                this._hoverTextR = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "HoverG", {
            get: function () {
                return this._hoverTextG
            },
            /** Sets the hover color for the text RGB of G type. */
            set: function (value) {
                this._hoverTextG = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "HoverB", {
            get: function () {
                return this._hoverTextB
            },
            /** Sets the hover color for the text RGB of B type. */
            set: function (value) {
                this._hoverTextB = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "Font", {
            get: function () {
                return this._font
            },
            /** Set your font type. 0 - 7
            * 0 Normal
            * 1 Cursive
            * 2 All Caps
            * 3 Squares / Arrows / Etc.
            * 4 Condensed Normal
            * 5 Garbage
            * 6 Condensed Normal
            * 7 Bold GTA Style
            */
            set: function (value) {
                this._font = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "FontScale", {
            get: function () {
                return this._fontScale
            },
            /** Sets the size of the text. 0.6 is pretty normal. 1 is quite large. */
            set: function (value) {
                this._fontScale = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "VerticalCentered", {
            get: function () {
                return this._centeredVertically
            },
            /** Centers the content vertically. Do not use if your box is not very high to begin with */
            set: function (value) {
                this._centeredVertically = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "Centered", {
            get: function () {
                return this._centered
            },
            /** Use this if you want centered content. */
            set: function (value) {
                this._centered = value
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(this, "Offset", {
            /**
             *  Set Offset
             */
            set: function (value) {
                this._offset = value
            },
            enumerable: true,
            configurable: true
        })
    }

    draw() {
        if (this._centered && this._centeredVertically) {
            this.drawAsCenteredAll()
            return
        }
        if (this._centered) {
            this.drawAsCentered()
            return
        }
        if (this._centeredVertically) {
            this.drawAsCenteredVertically()
            return
        }
        this.drawAsNormal()
    }

    //** Sets the color of the main text. A = Alpha */
     Color(r, g, b, a) {
        this._fontR = r
        this._fontG = g
        this._fontB = b
        this._fontAlpha = a
    }

    drawAsCenteredAll() {
        if (this._hovered) {
            API.drawText(this._text, this._offset + this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 20, this._fontScale, this._hoverTextR, this._hoverTextG, this._hoverTextB, this._hoverTextAlpha, this._font, 1, this._shadow, this._outline, this._width)
            return
        }
        API.drawText(this._text, this._offset + this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 20, this._fontScale, this._fontR, this._fontG, this._fontB, this._fontAlpha, this._font, 1, this._shadow, this._outline, this._width)
    }
    drawAsCenteredVertically() {
        if (this._hovered) {
            API.drawText(this._text, this._offset + this._xPos, this._yPos + (this._height / 2) - 20, this._fontScale, this._hoverTextR, this._hoverTextG, this._hoverTextB, this._hoverTextAlpha, this._font, 0, this._shadow, this._outline, this._width)
            return
        }
        API.drawText(this._text, this._offset + this._xPos, this._yPos + (this._height / 2) - 20, this._fontScale, this._fontR, this._fontG, this._fontB, this._fontAlpha, this._font, 0, this._shadow, this._outline, this._width)
    }
    drawAsCentered() {
        if (this._hovered) {
            API.drawText(this._text, this._offset + this._xPos + (this._width / 2), this._padding + this._yPos, this._fontScale, this._hoverTextR, this._hoverTextG, this._hoverTextB, this._hoverTextAlpha, this._font, 1, this._shadow, this._outline, this._width)
            return
        }
        API.drawText(this._text, this._offset + this._xPos + (this._width / 2), this._padding + this._yPos, this._fontScale, this._fontR, this._fontG, this._fontB, this._fontAlpha, this._font, 1, this._shadow, this._outline, this._width)
    }
    drawAsNormal() {
        if (this._hovered) {
            API.drawText(this._text, this._offset + this._xPos + this._padding, this._yPos + this._padding, this._fontScale, this._hoverTextR, this._hoverTextG, this._hoverTextB, this._hoverTextAlpha, this._font, 0, this._shadow, this._outline, this._width - this._padding)
            return
        }
        API.drawText(this._text, this._offset + this._xPos + this._padding, this._yPos + this._padding, this._fontScale, this._fontR, this._fontG, this._fontB, this._fontAlpha, this._font, 0, this._shadow, this._outline, this._width - this._padding)
    }
}

class Panel {
    constructor(page, x, y, width, height) {
        this._page = page;
        this._padding = 10;
        this._xPos = x * panelMinX;
        this._yPos = y * panelMinY;
        this._width = width * panelMinX;
        this._height = height * panelMinY;
        this._alpha = 225;
        this._header = false;
        this._offset = 0;
        this._r = 0;
        this._g = 0;
        this._b = 0;
        this._textLines = [];
        this._inputPanels = [];
        this._currentLine = 0;
        this._shadow = false;
        this._outline = false;
        this._tooltip = null;
        this._hovered = false;
        this._hoverTime = 0;
        this._hoverR = 0;
        this._hoverG = 0;
        this._hoverB = 0;
        this._hoverAlpha = 200;
        this._backgroundImage = null;
        this._backgroundImagePadding = 0;
        this._function = null;
        this._functionArgs = [];
        this._functionAudioLib = "Click";
        this._functionAudioName = "DLC_HEIST_HACKING_SNAKE_SOUNDS";
        this._hoverAudioLib = "Cycle_Item";
        this._hoverAudioName = "DLC_Dmod_Prop_Editor_Sounds";
        this._hoverAudio = true;
        this._functionClickAudio = true;
        this._hoverable = false;
        this._line = 0;

        Object.defineProperty(this, "Function", {
            // Function Settings
            set: function (value) {
                this._function = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "HoverAudioLib", {
            get: function () {
                return this._hoverAudioLib;
            },
            // HOVER AUDIO
            /** Sets the hover audio library. Ex: "Cycle_Item" */
            set: function (value) {
                this._hoverAudioLib = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "HoverAudioName", {
            get: function () {
                return this._hoverAudioName;
            },
            /** Sets the hover audio name. Ex: "DLC_Dmod_Prop_Editor_Sounds" */
            set: function (value) {
                this._hoverAudioName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "FunctionAudioLib", {
            get: function () {
                return this._functionAudioLib;
            },
            // FUNCTION AUDIO
            /** Sets the function audio library. Ex: "Cycle_Item" */
            set: function (value) {
                this._functionAudioLib = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "FunctionAudioName", {
            get: function () {
                return this._functionAudioName;
            },
            /** Sets the function audio name. Ex: "DLC_Dmod_Prop_Editor_Sounds" */
            set: function (value) {
                this._functionAudioName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "FunctionAudio", {
            get: function () {
                return this._functionClickAudio;
            },
            /** Sets if the function audio plays. */
            set: function (value) {
                this._functionClickAudio = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "MainAlpha", {
            get: function () {
                return this._alpha;
            },
            // Background Alpha
            /** Sets the background alpha property */
            set: function (value) {
                this._alpha = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "MainBackgroundImagePadding", {
            get: function () {
                return this._backgroundImagePadding;
            },
            /** Sets the background image padding property */
            set: function (value) {
                this._backgroundImagePadding = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "MainBackgroundImage", {
            get: function () {
                return this._backgroundImage;
            },
            /** Uses a custom image for your panel background. Must include extension. EX. 'clientside/image.jpg' */
            set: function (value) {
                this._backgroundImage = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "MainColorR", {
            /** Gets the color for RGB of R type. */
            get: function () {
                return this._r;
            },
            /** Sets the color for RGB of R type. Max of 255 */
            set: function (value) {
                this._r = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "MainColorG", {
            /** Gets the color for RGB of G type. */
            get: function () {
                return this._g;
            },
            /** Sets the color for RGB of G type. Max of 255 */
            set: function (value) {
                this._g = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "MainColorB", {
            /** Gets the color for RGB of B type. */
            get: function () {
                return this._b;
            },
            /** Sets the color for RGB of B type. Max of 255 */
            set: function (value) {
                this._b = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "Hoverable", {
            get: function () {
                return this._hoverable;
            },
            /** Is there a hover state? */
            set: function (value) {
                this._hoverable = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "HoverAlpha", {
            get: function () {
                return this._hoverAlpha;
            },
            /** Sets the hover alpha */
            set: function (value) {
                this._hoverAlpha = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "HoverR", {
            get: function () {
                return this._hoverR;
            },
            /** Sets the hover color for RGB of R type. */
            set: function (value) {
                this._hoverR = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "HoverG", {
            get: function () {
                return this._hoverG;
            },
            /** Sets the hover color for RGB of G type. */
            set: function (value) {
                this._hoverG = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "HoverB", {
            get: function () {
                return this._hoverB;
            },
            /** Sets the hover color for RGB of B type. */
            set: function (value) {
                this._hoverB = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "FontOutline", {
            get: function () {
                return this._outline;
            },
            /** Sets the font Outline property */
            set: function (value) {
                this._outline = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "FontShadow", {
            get: function () {
                return this._shadow;
            },
            /** Sets the font Shadow property */
            set: function (value) {
                this._shadow = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "Tooltip", {
            get: function () {
                return this._tooltip;
            },
            /** Sets the Tooltip text for your element. */
            set: function (value) {
                this._tooltip = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "Header", {
            get: function () {
                return this._header;
            },
            /** Adds a stylized line under your your box. */
            set: function (value) {
                this._header = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "Offset", {
            get: function () {
                return this._offset;
            },
            /** If your text needs to be pushed in a certain direction either add or remove pixels here. */
            set: function (value) {
                this._offset = value;
            },
            enumerable: true,
            configurable: true
        });
    }

    draw() {
        if (this._page !== currentPage) {
            return;
        }
        this.drawRectangles();
        // Only used if using text lines.
        if (this._textLines.length > 0) {
            for (var i = 0; i < this._textLines.length; i++) {
                this._textLines[i].draw();
            }
        }
        // Only used if using input panels.
        if (this._inputPanels.length > 0) {
            for (var i = 0; i < this._inputPanels.length; i++) {
                this._inputPanels[i].draw();
            }
        }
    }
    // Normal Versions
    drawRectangles() {
        if (this._backgroundImage !== null) {
            this.drawBackgroundImage();
            return;
        }
        if (this._hovered) {
            API.drawRectangle(this._xPos, this._yPos, this._width, this._height, this._hoverR, this._hoverG, this._hoverB, this._hoverAlpha);
            if (this._header) {
                API.drawRectangle(this._xPos, this._yPos + this._height - 5, this._width, 5, 255, 255, 255, 50);
            }
            return;
        }
        API.drawRectangle(this._xPos, this._yPos, this._width, this._height, this._r, this._g, this._b, this._alpha);
        if (this._header) {
            API.drawRectangle(this._xPos, this._yPos + this._height - 5, this._width, 5, 255, 255, 255, 50);
        }
    }
    drawBackgroundImage() {
        if (this._backgroundImagePadding > 1) {
            API.dxDrawTexture(this._backgroundImage, new Point(this._xPos + this._backgroundImagePadding, this._yPos + this._backgroundImagePadding), new Size(this._width - (this._backgroundImagePadding * 2), this._height - (this._backgroundImagePadding * 2)), 0);
            API.drawRectangle(this._xPos, this._yPos, this._width, this._height, this._r, this._g, this._b, this._alpha);
            return;
        }
        API.dxDrawTexture(this._backgroundImage, new Point(this._xPos, this._yPos), new Size(this._width, this._height), 0);
    }

    addFunctionArgs(value) {
        this._functionArgs = value;
    }


    MainBackgroundColor(r, g, b, alpha) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._alpha = alpha;
    }
    /** Sets the RGB Color of Hover */
    HoverBackgroundColor(r, g, b, alpha) {
        this._hoverR = r;
        this._hoverG = g;
        this._hoverB = b;
        this._hoverAlpha = alpha;
    }

    addText(value) {
        var textElement = new TextElement(value, this._xPos, this._yPos, this._width, this._height, this._line);
        this._textLines.push(textElement);
        this._line += 1;
        return textElement;
    }
    /**
     *
     * @param x - Start position of X inside the panel.
     * @param y - Start Position of Y inside the panel.
     * @param width - How wide. Generally the width of your panel.
     * @param height - How tall. 1 or 2 is pretty normal.
     */
    addInput(x, y, width, height) {
        var inputPanel = new InputPanel(this._page, (x * panelMinX) + this._xPos, (y * panelMinY) + this._yPos, width, height);
        this._inputPanels.push(inputPanel);
        return inputPanel;
    }
    // Hover Action
    isHovered() {
        if (!API.isCursorShown()) {
            return;
        }
        if (!this._hoverable) {
            return;
        }
        var cursorPos = API.getCursorPositionMantainRatio();
        if (cursorPos.X > this._xPos && cursorPos.X < (this._xPos + this._width) && cursorPos.Y > this._yPos && cursorPos.Y < this._yPos + this._height) {
            if (!this._hovered) {
                this._hovered = true;
                this.setTextHoverState(true);
                if (this._hoverAudio) {
                    API.playSoundFrontEnd(this._hoverAudioLib, this._hoverAudioName);
                }
            }
            this._hoverTime += 1;
            if (this._hoverTime > 50) {
                if (this._tooltip === null) {
                    return;
                }
                if (this._tooltip.length > 1) {
                    API.drawText(this._tooltip, cursorPos.X + 25, cursorPos.Y, 0.4, 255, 255, 255, 255, 4, 0, true, true, 200);
                }
            }
            return;
        }
        this._hovered = false;
        this._hoverTime = 0;
        this.setTextHoverState(false);
    }
    // Click Action
    isClicked() {
        // Is there even a cursor?
        if (!API.isCursorShown()) {
            return;
        }
        // Is there a function if they click it?
        if (this._function === null) {
            return;
        }
        // Are they even left clicking?
        if (API.isControlJustPressed(Enums.Controls.CursorAccept)) {
            var cursorPos = API.getCursorPositionMantainRatio();
            if (cursorPos.X > this._xPos && cursorPos.X < (this._xPos + this._width) && cursorPos.Y > this._yPos && cursorPos.Y < this._yPos + this._height) {
                if (new Date().getTime() < clickDelay + 200) {
                    return;
                }
                clickDelay = new Date().getTime();
                if (this._functionClickAudio) {
                    API.playSoundFrontEnd(this._functionAudioLib, this._functionAudioName);
                }
                if (this._functionArgs !== null || this._functionArgs.length > 1) {
                    this._function(this._functionArgs);
                }
                else {
                    this._function();
                }
                return;
            }
        }
    }
    setTextHoverState(value) {
        for (var i = 0; i < this._textLines.length; i++) {
            this._textLines[i].Hovered = value;
        }
    }
    // Type
    returnType() {
        return "Panel";
    }
}

class InputPanel {
    constructor(page, x, y, width, height) {
        this._xPos = x;
        this._yPos = y;
        this._width = width * panelMinX;
        this._height = height * panelMinY;
        this._protected = false;
        this._input = "";
        this._hovered = false;
        this._selected = false;
        this._numeric = false;
        this._isError = false;
        this._isTransparent = false;
        this._r = 255;
        this._g = 255;
        this._b = 255;
        this._alpha = 100;
        this._hoverR = 255;
        this._hoverG = 255;
        this._hoverB = 255;
        this._hoverAlpha = 125;
        this._selectR = 255;
        this._selectG = 255;
        this._selectB = 255;
        this._selectAlpha = 125;
        this._inputAudioLib = "Click";
        this._inputAudioName = "DLC_HEIST_HACKING_SNAKE_SOUNDS";
        this._page = page;
        tabIndex.push(this);

        Object.defineProperty(this, "isError", {
            /** Sets whether or not there is an error. */
            set: function (value) {
                this._isError = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "Selected", {
            get: function () {
                return this._selected;
            },
            /** Sets whether or not this input is selected. */
            set: function (value) {
                this._selected = value;
                if (value) {
                    selectedInput = this;
                }
                else {
                    selectedInput = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "HoverR", {
            get: function () {
                return this._hoverR;
            },
            // Hover BACKGROUND PARAMETERS
            /** Set R of RGB on hover background. */
            set: function (value) {
                this._hoverR = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "HoverG", {
            get: function () {
                return this._hoverG;
            },
            /** Set G of RGB on hover background. */
            set: function (value) {
                this._hoverG = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "HoverB", {
            get: function () {
                return this._hoverB;
            },
            /** Set B of RGB on hover background. */
            set: function (value) {
                this._hoverB = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "HoverAlpha", {
            get: function () {
                return this._hoverAlpha;
            },
            /** Set Alpha of RGB on hover background. */
            set: function (value) {
                this._hoverAlpha = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(this, "R", {
            get: function () {
                return this._r;
            },
            /** Set R of RGB on main background. */
            set: function (value) {
                this._r = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "G", {
            get: function () {
                return this._g;
            },
            /** Set G of RGB on main background. */
            set: function (value) {
                this._g = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "B", {
            get: function () {
                return this._b;
            },
            /** Set B of RGB on main background. */
            set: function (value) {
                this._b = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "Alpha", {
            get: function () {
                return this._alpha;
            },
            /** Set Alpha of RGB on main background. */
            set: function (value) {
                this._alpha = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "SelectR", {
            get: function () {
                return this._selectR;
            },
            // SELECTION BACKGROUND PARAMETERS
            /** Set R of RGB on main background. */
            set: function (value) {
                this._selectR = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "SelectG", {
            get: function () {
                return this._selectG;
            },
            /** Set G of RGB on main background. */
            set: function (value) {
                this._selectG = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "SelectB", {
            get: function () {
                return this._selectB;
            },
            /** Set B of RGB on main background. */
            set: function (value) {
                this._selectB = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "SelectAlpha", {
            get: function () {
                return this._selectAlpha;
            },
            /** Set Alpha of RGB on main background. */
            set: function (value) {
                this._selectAlpha = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "Input", {
            /** Returns whatever the current input is. */
            get: function () {
                return this._input;
            },
            /** Sets the input text. */
            set: function (value) {
                this._input = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "NumericOnly", {
            get: function () {
                return this._numeric;
            },
            /** Set whether the input should be numeric only. */
            set: function (value) {
                this._numeric = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "Protected", {
            /**
             *  Sets whether the input should be protected or not. */
            set: function (value) {
                this._protected = value;
            },
            enumerable: true,
            configurable: true
        });
    }

    MainBackgroundColor(r, g, b, alpha) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._alpha = alpha;
    }
    HoverBackgroundColor(r, g, b, alpha) {
        this._hoverR = r;
        this._hoverG = g;
        this._hoverB = b;
        this._hoverAlpha = alpha;
    }
    SelectBackgroundColor(r, g, b, alpha) {
        this._selectR = r;
        this._selectG = g;
        this._selectB = b;
        this._selectAlpha = alpha;
    }
    removeFromInput() {
        this._input = this._input.substring(0, this._input.length - 1);
    }

    draw() {
        if (this._selected) {
            this.selectedDraw();
        }
        if (this._hovered) {
            this.hoveredDraw();
        }
        if (!this._hovered && !this._selected) {
            this.normalDraw();
        }
        this.isHovered();
        this.isClicked();
    };
    normalDraw() {
        if (this._isError) {
            API.drawRectangle(this._xPos + 10, this._yPos + 10, this._width - 20, this._height - 20, 255, 0, 0, 100);
        }
        else {
            API.drawRectangle(this._xPos + 10, this._yPos + 10, this._width - 20, this._height - 20, this._r, this._g, this._b, this._alpha);
        }
        if (this._protected) {
            if (this._input.length < 1) {
                return;
            }
            API.drawText("*".repeat(this._input.length), this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width));
        }
        else {
            API.drawText(this._input, this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width));
        }
    };
    selectedDraw() {
        API.drawRectangle(this._xPos + 10, this._yPos + 10, this._width - 20, this._height - 20, this._selectR, this._selectG, this._selectB, this._selectAlpha);
        if (this._protected) {
            if (this._input.length < 1) {
                return;
            }
            API.drawText("*".repeat(this._input.length), this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width));
        }
        else {
            API.drawText(this._input, this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width));
        }
        return;
    };
    hoveredDraw() {
        if (this._isError) {
            API.drawRectangle(this._xPos + 10, this._yPos + 10, this._width - 20, this._height - 20, 255, 0, 0, 100);
        }
        else {
            API.drawRectangle(this._xPos + 10, this._yPos + 10, this._width - 20, this._height - 20, this._hoverR, this._hoverG, this._hoverB, this._hoverAlpha);
        }
        if (this._protected) {
            if (this._input.length < 1) {
                return;
            }
            API.drawText("*".repeat(this._input.length), this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width));
        }
        else {
            API.drawText(this._input, this._xPos + (this._width / 2), this._yPos + (this._height / 2) - 14, 0.4, 0, 0, 0, 255, 4, 1, false, false, (panelMinX * this._width));
        }
    };
    isHovered() {
        if (!API.isCursorShown()) {
            return;
        }
        var cursorPos = API.getCursorPositionMantainRatio();
        if (cursorPos.X > this._xPos && cursorPos.X < (this._xPos + this._width) && cursorPos.Y > this._yPos && cursorPos.Y < (this._yPos + this._height)) {
            if (this._selected) {
                this._hovered = false;
                return;
            }
            this._hovered = true;
        }
        else {
            this._hovered = false;
        }
    };
    isClicked() {
        if (API.isControlJustPressed(Enums.Controls.CursorAccept)) {
            if (new Date().getTime() < clickDelay + 200) {
                return;
            }
            var cursorPos = API.getCursorPositionMantainRatio();
            if (cursorPos.X > this._xPos && cursorPos.X < (this._xPos + this._width) && cursorPos.Y > this._yPos && cursorPos.Y < (this._yPos + this._height)) {
                if (!this._selected) {
                    API.playSoundFrontEnd(this._inputAudioLib, this._inputAudioName);
                    this._selected = true;
                }
                selectedInput = this;
            }
            else {
                this._selected = false;
            }
        }
    };
    addToInput(text) {
        if (this._input.length > 2147483647) {
            return;
        }
        if (!this._numeric) {
            this._input += text;
            return this._input;
        }
        else {
            if (Number.isInteger(+text)) {
                this._input += text;
                return this._input;
            }
        }
    };
    returnType() {
        return "InputPanel";
    }
}

function drawTextNotification() {
    if (textnotification !== null) {
        textnotification.draw();
        return;
    }
    if (textnotifications.length <= 0) {
        return;
    }
    textnotification = textnotifications.shift();
    return;
}
function drawNotification() {
    if (notification !== null) {
        notification.draw();
        return;
    }
    if (notifications.length <= 0) {
        return;
    }
    notification = notifications.shift();
    return;
}
function createNotification(page, text, displayTime) {
    // Add to queue.
    var notify = new Notification(text, displayTime);
    notifications.push(notify);
    return notify;
}
function createPlayerTextNotification(text) {
    var notify = new PlayerTextNotification(text);
    textnotifications.push(notify);
    return notify;
}
function createProgressBar(page, x, y, width, height, currentProgress) {
    var bar = new ProgressBar(x, y, width, height, currentProgress);
    menuElements[page].push(bar);
    return bar;
}
function killMenu() {
    isReady = false;
    selectedInput = null;
    API.showCursor(false);
    API.setHudVisible(true);
    API.setChatVisible(true);
    API.setCanOpenChat(true);
    API.callNative("_TRANSITION_FROM_BLURRED", 3000);
    menuElements = [[]];
    currentPage = 0;
}

function reset() {
    killMenu()
    button = null
    panel = null
    image = null
    notification = null
    notifications = []
    textnotification = null
    textnotifications = []
    padding = 10
    selectedInput = null
    tabIndex = []
    tab = 0
    menuElements = []
    isReady = false
    currentPage = 0
    clickDelay = new Date().getTime()
}
// On-Keydown Event
API.onKeyDown.connect(function (sender, e) {
    if (!isReady) {
        return;
    }
    // Shift between Input Boxes.
    if (e.KeyCode == Keys.Tab) {
        if (tabIndex[0].Selected) {
            tabIndex[0].Selected = false;
        }
        else {
            tabIndex[0].Selected = true;
            return;
        }
        var removeItem = tabIndex.shift();
        tabIndex.push(removeItem);
        tabIndex[0].Selected = true;
    }
    if (selectedInput === null) {
        return;
    }
    if (e.KeyCode === Keys.Back) {
        selectedInput.removeFromInput();
        return;
    }
    var shiftOn = false;
    if (e.Shift) {
        shiftOn = true;
    }
    var keypress = "";
    switch (e.KeyCode) {
        case Keys.Space:
            keypress = " ";
            break;
        case Keys.A:
            keypress = "a";
            if (shiftOn) {
                keypress = "A";
            }
            break;
        case Keys.B:
            keypress = "b";
            if (shiftOn) {
                keypress = "B";
            }
            break;
        case Keys.C:
            keypress = "c";
            if (shiftOn) {
                keypress = "C";
            }
            break;
        case Keys.D:
            keypress = "d";
            if (shiftOn) {
                keypress = "D";
            }
            break;
        case Keys.E:
            keypress = "e";
            if (shiftOn) {
                keypress = "E";
            }
            break;
        case Keys.F:
            keypress = "f";
            if (shiftOn) {
                keypress = "F";
            }
            break;
        case Keys.G:
            keypress = "g";
            if (shiftOn) {
                keypress = "G";
            }
            break;
        case Keys.H:
            keypress = "h";
            if (shiftOn) {
                keypress = "H";
            }
            break;
        case Keys.I:
            keypress = "i";
            if (shiftOn) {
                keypress = "I";
            }
            break;
        case Keys.J:
            keypress = "j";
            if (shiftOn) {
                keypress = "J";
            }
            break;
        case Keys.K:
            keypress = "k";
            if (shiftOn) {
                keypress = "K";
            }
            break;
        case Keys.L:
            keypress = "l";
            if (shiftOn) {
                keypress = "L";
            }
            break;
        case Keys.M:
            keypress = "m";
            if (shiftOn) {
                keypress = "M";
            }
            break;
        case Keys.N:
            keypress = "n";
            if (shiftOn) {
                keypress = "N";
            }
            break;
        case Keys.O:
            keypress = "o";
            if (shiftOn) {
                keypress = "O";
            }
            break;
        case Keys.P:
            keypress = "p";
            if (shiftOn) {
                keypress = "P";
            }
            break;
        case Keys.Q:
            keypress = "q";
            if (shiftOn) {
                keypress = "Q";
            }
            break;
        case Keys.R:
            keypress = "r";
            if (shiftOn) {
                keypress = "R";
            }
            break;
        case Keys.S:
            keypress = "s";
            if (shiftOn) {
                keypress = "S";
            }
            break;
        case Keys.T:
            keypress = "t";
            if (shiftOn) {
                keypress = "T";
            }
            break;
        case Keys.U:
            keypress = "u";
            if (shiftOn) {
                keypress = "U";
            }
            break;
        case Keys.V:
            keypress = "v";
            if (shiftOn) {
                keypress = "V";
            }
            break;
        case Keys.W:
            keypress = "w";
            if (shiftOn) {
                keypress = "W";
            }
            break;
        case Keys.X:
            keypress = "x";
            if (shiftOn) {
                keypress = "X";
            }
            break;
        case Keys.Y:
            keypress = "y";
            if (shiftOn) {
                keypress = "Y";
            }
            break;
        case Keys.Z:
            keypress = "z";
            if (shiftOn) {
                keypress = "Z";
            }
            break;
        case Keys.D0:
            keypress = "0";
            if (shiftOn) {
                keypress = ")";
            }
            break;
        case Keys.D1:
            keypress = "1";
            if (shiftOn) {
                keypress = "!";
            }
            break;
        case Keys.D2:
            keypress = "2";
            if (shiftOn) {
                keypress = "@";
            }
            break;
        case Keys.D3:
            keypress = "3";
            if (shiftOn) {
                keypress = "#";
            }
            break;
        case Keys.D4:
            keypress = "4";
            if (shiftOn) {
                keypress = "$";
            }
            break;
        case Keys.D5:
            keypress = "5";
            if (shiftOn) {
                keypress = "%";
            }
            break;
        case Keys.D6:
            keypress = "6";
            if (shiftOn) {
                keypress = "^";
            }
            break;
        case Keys.D7:
            keypress = "7";
            if (shiftOn) {
                keypress = "&";
            }
            break;
        case Keys.D8:
            keypress = "8";
            if (shiftOn) {
                keypress = "*";
            }
            break;
        case Keys.D9:
            keypress = "9";
            if (shiftOn) {
                keypress = "(";
            }
            break;
        case Keys.OemMinus:
            keypress = "-";
            if (shiftOn) {
                keypress = "_";
            }
            break;
        case Keys.Oemplus:
            keypress = "=";
            if (shiftOn) {
                keypress = "+";
            }
            break;
        case Keys.OemQuestion:
            keypress = "/";
            if (shiftOn) {
                keypress = "?";
            }
            break;
        case Keys.Oemcomma:
            keypress = ",";
            if (shiftOn) {
                keypress = "<";
            }
            break;
        case Keys.OemPeriod:
            keypress = ".";
            if (shiftOn) {
                keypress = ">";
            }
            break;
        case Keys.OemSemicolon:
            keypress = ";";
            if (shiftOn) {
                keypress = ":";
            }
            break;
        case Keys.OemOpenBrackets:
            keypress = "[";
            if (shiftOn) {
                keypress = "{";
            }
            break;
        case Keys.OemCloseBrackets:
            keypress = "]";
            if (shiftOn) {
                keypress = "}";
            }
            break;
        case Keys.NumPad0:
            keypress = "0";
            break;
        case Keys.NumPad1:
            keypress = "1";
            break;
        case Keys.NumPad2:
            keypress = "2";
            break;
        case Keys.NumPad3:
            keypress = "3";
            break;
        case Keys.NumPad4:
            keypress = "4";
            break;
        case Keys.NumPad5:
            keypress = "5";
            break;
        case Keys.NumPad6:
            keypress = "6";
            break;
        case Keys.NumPad7:
            keypress = "7";
            break;
        case Keys.NumPad8:
            keypress = "8";
            break;
        case Keys.NumPad9:
            keypress = "9";
            break;
    }
    if (keypress === "") {
        return;
    }
    if (keypress.length > 0) {
        if (selectedInput === null) {
            return;
        }
        selectedInput.addToInput(keypress);
    }
    else {
        return;
    }
});