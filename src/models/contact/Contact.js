module.exports = function (sequelize, DataTypes) {
  /**
   * All information encapsuled, belonging to one contact at a certain time.
   */
  var Contact = sequelize.define('Contact', {
    // recognizable name, displayed e.g. when taking care of a request
    name: { type: DataTypes.TEXT, allowNull: false },

    // personal info
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    nickName: DataTypes.TEXT,
    birthDate: DataTypes.DATE,

    // address
    street: DataTypes.TEXT,
    addition: DataTypes.TEXT,
    zip: DataTypes.TEXT,
    city: DataTypes.TEXT,

    // contact information fields
    email: { type: DataTypes.TEXT, validate: { isEmail: true } },
    emailAlternative: { type: DataTypes.TEXT, validate: { isEmail: true } },
    phone: DataTypes.TEXT,
    phoneAlternative: DataTypes.TEXT,
    website: { type: DataTypes.TEXT, isUrl: true },
    otherContactMedia: DataTypes.TEXT,

    comment: DataTypes.TEXT,
    // for member listing section
    webDescription: DataTypes.TEXT

    // #out n groups
  })

  Contact.associate = function (models) {
    Contact.belongsToMany(models.ContactGroup, {
      through: 'ContactToGroup', as: 'group'
    })
  }

  return Contact
}
