const bcrypt = require('bcryptjs-then')
const uuid = require('uuid/v4')

// CHANGE THIS AT RISK OF LOSS OF LIFE
const BCRYPT_DIFF = 14

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
      defaultValue: false
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    characterLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    }
  }, {
    timestamps: true,
    paranoid: true,
    version: true
  })

  User.__associations = function (models) {
    User.hasMany(models.Character)
  }

  User.prototype.createSecret = async function (password) {
    this.secret = await bcrypt.hash(password, BCRYPT_DIFF)
    return this
  }

  User.prototype.validateSecret = async function (password) {
    return bcrypt.compare(password, this.secret)
  }

  User.prototype.presentable = function (ownUser = false) {
    this.secret = undefined
    if (!ownUser) {
      this.email = undefined
      this.characterLimit = undefined
      this.isBanned = undefined
      this.permissions = undefined
    }
    return this
  }

  User.getNewId = async function () {
    const id = uuid()
    // let check = await User.findOne({ where: { id } })
    // if (check !== null) {
    //   return User.getNewId
    // }

    return id
  }

  User.getByUsername = function (username) {
    return User.findOne({ where: { username } })
  }

  return User
}
