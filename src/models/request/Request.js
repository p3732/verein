module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * A request for an event or resources.
   * Needs a date and a person in charge of it.
   */
  var Request = sequelize.define('Request', {
    // date request was created
    dateRequested: { type: DataTypes.DATE, allowNull: false }

    // (in n reservations)
    // (in n events)
    // out acceptedBy (person who allowed request creation)
    // out organizer
    // out organisation
    // out state
    // out type
    // # managers (people taking care of request)
  })

  Request.associate = function (models) {
    Request.belongsTo(models.Contact, { as: 'acceptedBy' }) // TODO allowNull: false ?
    Request.belongsTo(models.Contact, { as: 'organizer', allowNull: false })
    Request.belongsTo(models.ContactGroup, { as: 'organisation', allowNull: false })
    Request.belongsTo(models.RequestState, { as: 'state', allowNull: false })
    Request.belongsTo(models.RequestType, { as: 'type', allowNull: false })
    Request.belongsToMany(models.Contact, { through: 'RequestManager', as: 'managers' })
  }

  return Request
}
