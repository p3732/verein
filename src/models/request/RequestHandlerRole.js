module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * The role a person takes in handling a request.
   */
  var RequestHandlerRole = sequelize.define("RequestHandler", {
    role: {type: DataTypes.TEXT, unique: true}
    // (<-> used for mapping from request to request manager)
  });

  return RequestHandlerRole;
}
