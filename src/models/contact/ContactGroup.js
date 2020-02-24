module.exports = function (sequelize, DataTypes) {
  /**
   * A group of contacts that somehow belong together.
   */
  var ContactGroup = sequelize.define('ContactGroup', {
    name: { type: DataTypes.TEXT, allowNull: false, unique: true }

    //  out 1 information
    // (#in n members)
    // #out n supergroups
    // (#in n subgroups)
    // (out 1 department)
  })

  ContactGroup.associate = function (models) {
    ContactGroup.belongsTo(models.ContactInformation, { as: 'information' })
    ContactGroup.belongsToMany(models.ContactGroup, {
      through: 'ContactGroupLayering', as: 'supergroup'
    })
  }

  return ContactGroup
}
