module.exports = function (sequelize, DataTypes) {
  /**
   * An event, usually belongign to a request. It can include multiple dates.
   */
  var Event = sequelize.define('Event', {
    title: { type: DataTypes.TEXT, allowNull: false },
    description: DataTypes.TEXT,

    // whether this should be published on the website calendar
    publish: { type: DataTypes.BOOLEAN, allowNull: false }

    // (in n event dates)
    // TODO (in 1 promotion)
    // out type
    // out request
  })

  Event.associate = function (models) {
    Event.belongsTo(models.EventType, { as: 'type' })
    Event.belongsTo(models.Request, { as: 'request' })
  }

  return Event
}
