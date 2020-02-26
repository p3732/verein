module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * One concrete thing. Can find out when it''s rented and when not.
   */
  var ResourceInstance = sequelize.define('ResourceInstance', {
    serialNumber: { type: DataTypes.TEXT, unique: true }

    // (in n issues)
    // out 1 resource
  })

  ResourceInstance.associate = function (models) {
    ResourceInstance.belongsTo(models.Resource, { allowNull: false })
  }

  return ResourceInstance
}
