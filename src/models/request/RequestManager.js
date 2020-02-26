module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * Person who's taking care of a request. Needs confirmation.
   */
  var RequestManager = sequelize.define('RequestManager', {
    confirmed: DataTypes.BOOLEAN

    // out 1 role
    // used as #
    //   out 1 request
    //   out 1 person
  })

  RequestManager.associate = function (models) {
    RequestManager.belongsTo(models.RequestManagerRole, {as: 'role'})
  }

  return RequestManager
}
