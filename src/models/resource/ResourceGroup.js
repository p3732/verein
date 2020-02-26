module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * Bundles resources that can be replaced by each other.
   */
  var ResourceGroup = sequelize.define('ResourceGroup', {
    title: { type: DataTypes.TEXT, primaryKey: true },
    description: DataTypes.TEXT

    // out resource category
    // # resource packages
  })

  ResourceGroup.associate = function (models) {
    ResourceGroup.belongsTo(models.ResourceCategory, { allowNull: false })
    ResourceGroup.belongsToMany(models.ResourcePackage, {
      through: 'ResourcePackageToGroup', as: 'packages'
    })
  }

  return ResourceGroup
}
