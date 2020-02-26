module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * Maps a certain amount of a resource to a resource package.
   */
  var ResourcePackageToGroup = sequelize.define('ResourcePackageToGroup', {
    amount: { type: DataTypes.INTEGER, allowNull: false } // of group

    // used as #
    // out resource package
    // out resource group
  })

  return ResourcePackageToGroup
}
