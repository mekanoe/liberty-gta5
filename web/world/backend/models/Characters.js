module.exports = (sequelize, DataTypes) => {
  const Characters = sequelize.define('character', {
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
      type: DataTypes.HSTORE
    },
    useSkin: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    skinName: {
      type: DataTypes.STRING
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

  Characters.belongsTo('user')
  Characters.hasMany(
    // 'arrests',
    // 'tickets',
    // 'jobs',
    // 'workorders',
    // 'vehicles'
  )
  // Characters.hasOne(
  //   'residence',
  // )

  return Characters
}
