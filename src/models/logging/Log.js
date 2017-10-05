module.exports = function(sequelize, DataTypes) {
  /**
   * Table to bundle all logged changes. Serves as a log by being
   * referenced by any object that needs logging.
   */
  var Log = sequelize.define("Log", {
    model: DataTypes.TEXT
    // -> 1 logged object
    // -> n changes
  });

  Log.associate = function(models) {
    Log.hasMany(models.LogChange);
  }

  return Log;
};
