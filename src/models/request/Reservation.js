module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * A Reservation for a request. Holds a start and an end date. Serves as a
   * reference for entries in a reservation list. Gets confirmed along with its
   * request.
   */
  var Reservation = sequelize.define('Reservation', {
    handoutDate: { type: DataTypes.DATE, allowNull: false },
    redeemingDate: { type: DataTypes.DATE, allowNull: false },

    // if not confirmed, another request within the same time can be made
    confirmed: {
      type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false
    }

    // out request
    // # resources
  })

  Reservation.associate = function (models) {
    Reservation.belongsTo(models.Request, { as: 'request' })
    Reservation.belongsToMany(models.Resource, {
      through: 'ReservationList', as: 'resources'
    })
  }

  return Reservation
}
