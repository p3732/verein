module.exports = function(sequelize, DataTypes) {
  /**
   * An event usually belongs to a request.
   * It can summarize multiple event dates.
   */
  var Event = sequelize.define("Event", {
    publish: {type: DataTypes.BOOLEAN, allowNull: false},
    title: {type: DataTypes.TEXT, allowNull: false},
    description: DataTypes.TEXT
    // (-> n event dates)
    // (-> n resource rental dates)
    // <- 1 type
    // <- 1 request
    // <- 1 TODO advertising
  });

  Event.associate = function(models) {
    Event.belongsTo(models.EventType, {as: "type"});
    Event.belongsTo(models.Request, {as: "request"});
  }

  return Event;
}
