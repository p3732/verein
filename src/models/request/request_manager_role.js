module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * The role a person takes by managing a request.
   */
  var RequestManagerRole = sequelize.define("RequestManagerRole", {
    role: {type: DataTypes.TEXT, unique: true}
    // (<-> used for mapping from request to request manager)
  });

  return RequestManagerRole;
}
