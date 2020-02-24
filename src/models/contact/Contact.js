module.exports = function (sequelize, DataTypes) {
  /**
   * A contact that can basically be anything as long as there is a way to
   * contact it.
   */
  var Contact = sequelize.define('Contact', {
    // recognizable name, displayed e.g. when taking care of a request
    name: { type: DataTypes.TEXT, allowNull: false },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: { isAlpha: true }
    },
    ldap: DataTypes.BOOLEAN

    //  out 1 information
    // #out n groups
  })

  Contact.associate = function (models) {
    Contact.belongsTo(models.ContactInformation, { as: 'information' })
    Contact.belongsToMany(models.ContactGroup, {
      through: 'ContactToGroup', as: 'group'
    })
  }

  return Contact
}
