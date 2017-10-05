module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * Maps a certain amount of a resource to a resource package.
   */
  var ResourcePackageAmount = sequelize.define("ResourcePackageAmount", {
    amount: {type: DataTypes.INTEGER, allowNull: false} // of group
    // <- 1 resource package
    // <- 1 resource
  });

  ResourcePackageAmount.associate = function(models) {
    ResourcePackageAmount.belongsTo(models.ResourcePackage);
    ResourcePackageAmount.belongsTo(models.Resource);
  }

  return ResourcePackageAmount;
}
