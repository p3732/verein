module.exports = function (sequelize, DataTypes) {
  /**
   * A contact that can basically be anything as long as there is a way to
   * contact it.
   */
  var ContactLogin = sequelize.define('ContactLogin', {
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: { isAlpha: true },
      primaryKey: true
    },
    ldap: { type: DataTypes.BOOLEAN, allowNull: false },
    passwordHash: DataTypes.TEXT

    // out contact
  })

  ContactLogin.associate = function (models) {
    ContactLogin.belongsTo(models.Contact, { as: 'contact', allowNull: false })
  }

  return ContactLogin
}
