module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * A bundle of resources commonly used together.
   */
  var ResourcePackage = sequelize.define('ResourcePackage', {
    title: { type: DataTypes.TEXT, unique: true, primaryKey: true },
    description: DataTypes.TEXT

    // # resource groups
  })

  ResourcePackage.associate = function (models) {
    ResourcePackage.belongsToMany(models.ResourceGroup, {
      through: 'ResourcePackageToGroup', as: 'groups'
    })
  }

  return ResourcePackage
}
