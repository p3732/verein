module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * A type of request. Can be used to more easily distinguish between different
   * types of request, that commonly also come with different requirements.
   */
  var RequestType = sequelize.define('RequestType', {
    title: {
      type: DataTypes.TEXT, allowNull: false, unique: true, primaryKey: true
    }
  }, {
    timestamps: false
  })

  return RequestType
}
