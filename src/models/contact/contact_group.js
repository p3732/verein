module.exports = function(sequelize, DataTypes) {
  /**
   * A group of contacts that somehow belong together.
   */
  var ContactGroup = sequelize.define("ContactGroup", {
    name: {type: DataTypes.TEXT, allowNull: false, unique: true},
    description: DataTypes.TEXT,
    website: DataTypes.TEXT,

    email: DataTypes.TEXT, // e.g. mailing list or standard contact address
    phone: DataTypes.TEXT,
    fax: DataTypes.TEXT,

    comment: DataTypes.TEXT

    // -> m members
    // <- 1 address
    // (<- 1 department)
  });

  ContactGroup.associate = function(models) {
    ContactGroup.belongsTo(models.ContactAddress);
    ContactGroup.belongsToMany(models.Contact, {through: "ContactGroupContact", as: "subgroup"});
    ContactGroup.belongsToMany(models.Contact, {through: "ContactGroupContact", as: "supergroup"});
  }

  return ContactGroup;
}
