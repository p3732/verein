module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * A bundle of resources commonly used together.
   */
  var ResourcePackage = sequelize.define("ResourcePackage", {
    title: {type: DataTypes.TEXT, unique: true},
    description: DataTypes.TEXT
    // -> n resource package amount
  });

  ResourcePackage.associate = function(models) {
    ResourcePackage.belongsToMany(models.ResourceGroup, {through: "ResourceGroupPackage"});
  };

  return ResourcePackage;
}
