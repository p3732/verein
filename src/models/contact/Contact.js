module.exports = function(sequelize, DataTypes) {
  /**
   * A contact can basically be anything, as long as there is a way to contact it.
   */
  var Contact = sequelize.define("Contact", {
    // recognizable name, displayed e.g. when taking care of a request
    name: {type: DataTypes.TEXT, allowNull: false, unique: true},
    title: DataTypes.TEXT,
    firstName: DataTypes.TEXT,
    secondName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    nickName: DataTypes.TEXT,
    gender: DataTypes.ENUM("penis", "vagina", "other"),
    birthDate: DataTypes.DATE,

    email: {
      type: DataTypes.TEXT,
      validate: {isEmail: true}
    },
    phone: DataTypes.TEXT,
    ldap: DataTypes.TEXT,
    comment: DataTypes.TEXT,

    description: DataTypes.TEXT

    // -> m groups
    // <- 1 address
    // <- 1 log
    // <- m media via which this contact is reachable; through contact_media_value
  });

  Contact.associate = function(models) {
    Contact.belongsTo(models.ContactAddress, {as: "address"});
    Contact.belongsTo(models.Log);
    Contact.belongsToMany(models.ContactGroup, {through: "ContactGroupContact"});
    Contact.belongsToMany(models.ContactMedium, {through: models.ContactMediumValue});
  }

  return Contact;
}
