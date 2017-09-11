module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * Rent time span of a concrete thing.
   */
  var ResourceInstanceRentDate = sequelize.define("ResourceInstanceRentDate", {
    // whether exactly this resource is wanted. If not some other resource group
    // member can be used instead
    picky: DataTypes.BOOLEAN,

    // if not confirmed, another request within the same time can be made
    confirmed: DataTypes.BOOLEAN,

    // TODO maybe in request is enough?
    // plannedFrom: {type: DataTypes.DATE, allowNull: false},
    // plannedTo: {type: DataTypes.DATE, allowNull: false},

    // the actual date of renting the resource, empty when only used locally
    handoutDate: DataTypes.DATE,
    redeemingDate: DataTypes.DATE
    // <- 1 request
    // <- 1 resource instance
  });

  ResourceInstanceRentDate.associate = function(models) {
    ResourceInstanceRentDate.belongsTo(models.ResourceInstance);
    ResourceInstanceRentDate.belongsTo(models.Event);
  };

  return ResourceInstanceRentDate;
}
