module.exports = function(sequelize, DataTypes) {
  /**
   * Bundles contact groups that belong together.
   */
  var ContactDepartment = sequelize.define("ContactDepartment", {
    name: {type: DataTypes.TEXT, allowNull: false, unique: true},
    description: DataTypes.TEXT
    // -> n groups
  });

  ContactDepartment.associate = function(models) {
    ContactDepartment.hasMany(models.ContactGroup);
  }

  return ContactDepartment;
}
