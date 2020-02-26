module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * The role a person takes in handling a request. Used for mapping from
   * request to request manager
   */
  var RequestManagerRole = sequelize.define('RequestManagerRole', {
    title: { type: DataTypes.TEXT, unique: true, primaryKey: true }

    // (in n request managers)
  }, {
    timestamps: false
  })

  return RequestManagerRole
}
