module.exports = function(sequelize, DataTypes) {
  /**
   * A certain medium via which someone can be contacted.
   * Can be anything from FAX to Telegram to banana peel.
   * Bundled here to easily see via what media a contact can be reached.
   */
  var ContactMedium = sequelize.define("ContactMedium", {
    type: {type: DataTypes.TEXT, unique: true}
    // (<- n contacts which are reachable via this media; through contact_media_value)
  });

  return ContactMedium;
}
