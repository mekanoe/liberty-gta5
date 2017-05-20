const uuid = require('uuid/v4')

module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('character', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cash: {
      type: DataTypes.INTEGER,
      default: 0
    },
    bank: {
      type: DataTypes.INTEGER,
      default: 500
    },
    isJailed: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    jailTimeRemaining: {
      type: DataTypes.INTEGER,
      default: 0
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
    gang: {
      type: DataTypes.ENUM('none', 'families', 'ballas', 'triad', 'lost', 'mexican')
    },
    freemodeFeatures: {
      type: DataTypes.JSONB
    },
    useSkin: {
      type: DataTypes.BOOLEAN,
      default: true
    },
    skinName: {
      type: DataTypes.STRING,
      default: 'Skater01AFY'
    },
    isDead: {
      type: DataTypes.BOOLEAN,
      default: false
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

  Character.generatePhone = async function () {
    let num = `${('000' + (Math.random() * 899) + 100).slice(-3)}-${('0000' + (Math.random() * 9999)).slice(-4)}`
    // let check = await Character.findOne({where: { phoneNumber: num }})
    // if (check !== null) {
    //   return this.generatePhone()
    // }

    return num
  }

  return Character
}
