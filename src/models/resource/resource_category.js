module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * A category to sort resource groups.
   */
  var ResourceCategory = sequelize.define("ResourceCategory", {
    title: {type: DataTypes.TEXT, allowNull: false, unique: true}
    // <- parent category
  }, {
    timestamps: false,
  });

  ResourceCategory.associate = function(models) {
    ResourceCategory.belongsTo(models.ResourceCategory, {as: "parentCategory"});
  };

  return ResourceCategory;
}
