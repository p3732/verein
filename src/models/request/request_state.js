module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * All possible states a request can have.
   */
  var RequestState = sequelize.define("RequestState", {
    title: {type: DataTypes.TEXT, allowNull: false, unique: true},
    needsResourceReservation: DataTypes.BOOLEAN,
    needsConfirmation: DataTypes.BOOLEAN
  }, {timestamps: false});

  return RequestState;
}
