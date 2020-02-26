module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * A ReservationList for a request. Merely holds a start and an end date. Serves
   * as a reference for entries in a ReservationList list.
   */
  var ReservationList = sequelize.define('ReservationList', {
    // whether exactly this resource is wanted. If not, some other resource from
    // the same resource group can be used to replace it.
    picky: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    amount: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } }

    // used as #
    //   out reservation
    //   out resource
  })

  return ReservationList
}
