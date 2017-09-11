module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * One concrete thing. Can find out when it''s rented and when not.
   */
  var ResourceInstance = sequelize.define("ResourceInstance", {
    serialNumber: {type: DataTypes.TEXT, unique: true},
    // (-> n rent dates)
    // (-> n issue)
    // (<- 1 resource)
  });

  return ResourceInstance;
}
