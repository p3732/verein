module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * Bundles resources that can be replaced by each other.
   */
  var ResourceGroup = sequelize.define("ResourceGroup", {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT
    // <- 1 resource category
    // <- 1 alternative resource group, that can be used instead of this one
  });

  ResourceGroup.associate = function(models) {
    ResourceGroup.belongsTo(models.ResourceCategory, {allowNull: false});
//TODO ResourceGroupAlternatives    ResourceGroup.hasMany(models.ResourceGroup, {as: "alternative_group"});
    ResourceGroup.belongsToMany(models.ResourcePackage, {through: "ResourceGroupPackage"});
  };

  return ResourceGroup;
}
