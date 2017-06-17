const uuid = require('uuid/v4')

const defaultCreationPeds = [
  [
    { slot: 0, drawable: 0, texture: 0 },
    { slot: 2, drawable: 11, texture: 4 },
    { slot: 3, drawable: 0, texture: 0 },
    { slot: 4, drawable: 4, texture: 0 },
    { slot: 6, drawable: 42, texture: 2 },
    { slot: 8, drawable: 15, texture: 0 },
    { slot: 11, drawable: 22, texture: 1 }
  ],
  [
    { slot: 0, drawable: 4, texture: 0 },
    { slot: 2, drawable: 14, texture: 4 },
    { slot: 3, drawable: 0, texture: 0 },
    { slot: 4, drawable: 5, texture: 2 },
    { slot: 6, drawable: 1, texture: 0 },
    { slot: 8, drawable: 15, texture: 0 },
    { slot: 11, drawable: 81, texture: 1 }

  ],
  [
    { slot: 0, drawable: 44, texture: 0 },
    { slot: 2, drawable: 22, texture: 1 },
    { slot: 3, drawable: 0, texture: 0 },
    { slot: 4, drawable: 47, texture: 0 },
    { slot: 6, drawable: 1, texture: 0 },
    { slot: 8, drawable: 15, texture: 0 },
    { slot: 11, drawable: 89, texture: 0 }
  ],
  [
    { slot: 0, drawable: 44, texture: 0 },
    { slot: 2, drawable: 17, texture: 3 },
    { slot: 3, drawable: 5, texture: 0 },
    { slot: 4, drawable: 16, texture: 2 },
    { slot: 6, drawable: 16, texture: 0 },
    { slot: 8, drawable: 15, texture: 0 },
    { slot: 11, drawable: 36, texture: 0 }

  ],
  [
    { slot: 0, drawable: 24, texture: 0 },
    { slot: 2, drawable: 28, texture: 4 },
    { slot: 3, drawable: 4, texture: 0 },
    { slot: 4, drawable: 64, texture: 10 },
    { slot: 6, drawable: 6, texture: 0 },
    { slot: 8, drawable: 15, texture: 0 },
    { slot: 11, drawable: 57, texture: 0 }
  ],
  [
    { slot: 0, drawable: 21, texture: 0 },
    { slot: 2, drawable: 4, texture: 4 },
    { slot: 3, drawable: 3, texture: 0 },
    { slot: 4, drawable: 10, texture: 0 },
    { slot: 6, drawable: 10, texture: 1 },
    { slot: 8, drawable: 8, texture: 0 },
    { slot: 11, drawable: 3, texture: 2 }
  ],
  [
    { slot: 0, drawable: 33, texture: 0 },
    { slot: 2, drawable: 1, texture: 1 },
    { slot: 3, drawable: 0, texture: 0 },
    { slot: 4, drawable: 31, texture: 0 },
    { slot: 6, drawable: 13, texture: 5 },
    { slot: 8, drawable: 8, texture: 0 },
    { slot: 11, drawable: 9, texture: 1 }
  ],
  [
    { slot: 0, drawable: 40, texture: 0 },
    { slot: 2, drawable: 10, texture: 3 },
    { slot: 3, drawable: 7, texture: 0 },
    { slot: 4, drawable: 7, texture: 0 },
    { slot: 6, drawable: 0, texture: 0 },
    { slot: 8, drawable: 39, texture: 0 },
    { slot: 11, drawable: 57, texture: 0 }
  ],
  [
    { slot: 0, drawable: 29, texture: 0 },
    { slot: 2, drawable: 14, texture: 4 },
    { slot: 3, drawable: 1, texture: 0 },
    { slot: 4, drawable: 66, texture: 10 },
    { slot: 6, drawable: 49, texture: 0 },
    { slot: 8, drawable: 2, texture: 0 },
    { slot: 11, drawable: 125, texture: 9 }
  ],
  [
    { slot: 0, drawable: 45, texture: 0 },
    { slot: 2, drawable: 5, texture: 3 },
    { slot: 3, drawable: 2, texture: 0 },
    { slot: 4, drawable: 16, texture: 4 },
    { slot: 6, drawable: 15, texture: 1 },
    { slot: 8, drawable: 2, texture: 0 },
    { slot: 11, drawable: 2, texture: 0 }
  ]
]

module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('character', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cash: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    bank: {
      type: DataTypes.INTEGER,
      defaultValue: 500
    },
    isJailed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    jailTimeRemaining: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    cautionCodes: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    licenses: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    phoneNumber: {
      type: DataTypes.TEXT,
      unique: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female')
    },
    race: {
      type: DataTypes.ENUM('asian', 'caucasian', 'black', 'latino', 'apac')
    },
    faction: {
      type: DataTypes.ENUM('none', 'bcsd', 'lspd', 'sasp', 'military', 'families', 'ballas', 'triad', 'lost', 'mexican'),
      defaultValue: 'none'
    },
    spawnName: {
      type: DataTypes.TEXT
    },
    freemodeFeatures: {
      type: DataTypes.JSONB
    },
    useSkin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    skinName: {
      type: DataTypes.STRING,
      defaultValue: 'Skater01AFY'
    },
    isDead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true,
    paranoid: true,
    version: true
  })

  Character.__associations = function (models) {
    Character.belongsTo(models.User)
    // Character.hasMany(
    //   // 'arrests',
    //   // 'tickets',
    //   // 'jobs',
    //   // 'workorders',
    //   // 'vehicles'
    // )
    // Characters.hasOne(
    //   'residence',
    // )
  }

  Character.getNewId = async function () {
    const id = uuid()
    // let check = await Character.findOne({ where: { id } })
    // if (check !== null) {
    //   return Character.getNewId()
    // }

    return id
  }

  Character.prototype.setClothesPreset = function (idx) {
    this.freemodeFeatures = defaultCreationPeds[idx]
    return this
  }

  Character.generatePhone = async function () {
    let num = `${('000' + ((Math.random() * 799) + 200)).slice(-3)}-${('0000' + (Math.random() * 9999)).slice(-4)}`
    // let check = await Character.findOne({where: { phoneNumber: num }})
    // if (check !== null) {
    //   return this.generatePhone()
    // }

    return num
  }

  return Character
}
