module.exports = function (sequelize, DataTypes) {
  /**
   * A group of contacts that somehow belong together.
   */
  var ContactGroup = sequelize.define('ContactGroup', {
    name: {
      type: DataTypes.TEXT, allowNull: false, unique: true, primaryKey: true
    },
    selectable: {
      type: DataTypes.BOOLEAN, allowNull: false
    }

    // out 1 groupInformation
    // out 1 department
    // # members
    // # supergroups
    // # subgroups
  })

  ContactGroup.associate = function (models) {
    ContactGroup.belongsTo(models.Contact, { as: 'groupInformation' })
    ContactGroup.belongsToMany(models.Contact, {
      through: 'ContactToGroup', as: 'contact', allowNull: false
    })
    ContactGroup.belongsToMany(models.ContactGroup, {
      through: 'ContactGroupLayering', as: 'supergroup'
    })
    ContactGroup.belongsTo(models.ContactDepartment, { as: 'department' })
  }

  return ContactGroup
}
