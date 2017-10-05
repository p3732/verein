module.exports = function(sequelize, DataTypes) {
  /**
   * Simple combination of old and new value.
   */
  var LogChangeEntry = sequelize.define("LogChangeEntry", {
    oldValue: DataTypes.TEXT,
    newValue: DataTypes.TEXT,
    field: DataTypes.TEXT
    // (<- 1 bundle of changes)
  });

  return LogChangeEntry;
}
