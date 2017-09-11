module.exports = function(sequelize, DataTypes) {
  /**
   * Table to bundle multiple field changes.
   */
  var LogChange = sequelize.define("LogChange", {
    comment: DataTypes.TEXT
    // -> n changed fields
    // <- 1 editor
    // (<- 1 log)
  });

  LogChange.associate = function(models) {
    LogChange.hasMany(models.LogChangeEntry);
    //TODO LogChange.belongsTo(models.Contact, {as: "editor"});
  }

  return LogChange;
};
