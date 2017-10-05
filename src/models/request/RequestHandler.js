module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * Person who's taking care of a request. Needs confirmation.
   */
  var RequestHandler = sequelize.define("RequestHandler", {
    confirmed: DataTypes.BOOLEAN
    // (<- 1 request through role)
    // <- 1 person
  });

  RequestHandler.associate = function(models) {
    RequestHandler.belongsTo(models.Contact);
    RequestHandler.belongsToMany(models.Request, {as: "handler", through: models.RequestHandlerRole})
  };

  return RequestHandler;
}
