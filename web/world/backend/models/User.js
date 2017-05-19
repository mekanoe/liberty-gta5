const bcrypt = require('bcryptjs-then')

// CHANGE THIS AT RISK OF LOSS OF LIFE
const BCRYPT_DIFF = 12

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secret: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    characterLimit: {
      type: DataTypes.INTEGER,
      default: 5
    }
  }, {
    timestamps: true,
    paranoid: true,
    version: true
  })

  User.hasMany('characters')

  User.prototype.createSecret = async function (password) {
    this.secret = await bcrypt.hash(password, BCRYPT_DIFF)
    return this
  }

  User.prototype.validateSecret = async function (password) {
    return bcrypt.compare(password, this.secret)
  }

  return User
}
