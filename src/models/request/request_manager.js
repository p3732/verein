module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * Person who's taking care of a request. Needs confirmation.
   */
  var RequestManager = sequelize.define("RequestManager", {
    confirmed: DataTypes.BOOLEAN
    // (<- 1 request through role)
    // <- 1 person
  });

  RequestManager.associate = function(models) {
    RequestManager.belongsTo(models.Contact);
    RequestManager.belongsToMany(models.Request, {as: "manager", through: models.RequestManagerRole})
  };

  return RequestManager;
}
