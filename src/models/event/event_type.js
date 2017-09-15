module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * Possible types of events.
   */
  var EventType = sequelize.define("EventType", {
    title: {type: DataTypes.TEXT, allowNull: false, unique: true}
    // (-> n event dates)
  }, {
    timestamps: false,
  });

  return EventType;
}
