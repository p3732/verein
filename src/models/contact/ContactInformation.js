module.exports = function(sequelize, DataTypes) {
  /**
   * A postal address.
   */
  var ContactAddress = sequelize.define("ContactAddress", {
    street: DataTypes.TEXT,
    addition: DataTypes.TEXT,
    zip: DataTypes.TEXT,
    city: DataTypes.TEXT
  });

  return ContactAddress;
}
