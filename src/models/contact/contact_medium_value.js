module.exports = function(sequelize, DataTypes) {
  /**
   * Table to map values to contact media.
   */
  var ContactMediumValue = sequelize.define("ContactMediumValue", {
    // number, username, address, whatever
    value: DataTypes.TEXT
    // (<-> mapping from contact to media)
  });

  return ContactMediumValue;
}
