module.exports = function (sequelize, DataTypes) {
  /**
   * Bundles contact groups that belong together.
   */
  var ContactDepartment = sequelize.define('ContactDepartment', {
    name: {
      type: DataTypes.TEXT, allowNull: false, unique: true, primaryKey: true
    },
    description: DataTypes.TEXT

    // (in n groups)
  })

  return ContactDepartment
}
