module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * Concrete date at which an event takes places.
   */
  var EventDate = sequelize.define('EventDate', {
    start: { type: DataTypes.DATE, allowNull: false },
    end: { type: DataTypes.DATE, allowNull: false }

    // out event
  }, {
    timestamps: false,
    validate: {
      keepingTrackOfSpaceAndTime: function () {
        if (this.end < this.start) {
          throw new Error('End date needs to be after the start date!')
        }
      }
    }
  })

  EventDate.associate = function (models) {
    EventDate.belongsTo(models.Event)
  }

  return EventDate
}
