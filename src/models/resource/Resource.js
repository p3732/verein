module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * Some thing of that exists only a certain amount, so that management is
   * necessary. Usually something that can be rented or at least used locally.
   * This is only meant for things that are 100% alike, else see ResourceGroup.
   */
  var Resource = sequelize.define("Resource", {
    title: {type: DataTypes.TEXT, unique: true},
    description: DataTypes.TEXT,
    comment: DataTypes.TEXT,

    amount: {type: DataTypes.INTEGER, allowNull: false},
    // seperation between distinguishable resources and purely countable
    hasInstances: {type: DataTypes.BOOLEAN, allowNull: false},

    rentable: {type: DataTypes.BOOLEAN, allowNull: false},
    rentCost: {type: DataTypes.INTEGER, allowNull: false}
    // -> n resource instances
    // <- 1 resource group
    // <- 1 log
  });

  Resource.associate = function(models) {
    Resource.belongsTo(models.ResourceGroup, {allowNull: false});
    Resource.belongsTo(models.Log);
    Resource.hasMany(models.ResourceInstance);
  };

  return Resource;
}
