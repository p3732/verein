module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * Person who's taking care of a request. Needs confirmation.
   */
  var RequestManager = sequelize.define('RequestManager', {
    confirmed: {
      type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false
    }

    // out role
    // used as #
    //   out request
    //   out person
  })

  RequestManager.associate = function (models) {
    RequestManager.belongsTo(models.RequestManagerRole, { as: 'role' })
  }

  return RequestManager
}
