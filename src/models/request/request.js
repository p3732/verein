module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * A request for an event or resources.
   * Needs a date and a person in charge of it.
   */
  var Request = sequelize.define("Request", {
    // date request was created
    requestDate: {type: DataTypes.DATE, allowNull: false}
    // (-> n resources)
    // -> n managers (people taking care of request) through manager role
    // <- 1 state
    // <- n organizer
    // <- 1 organisation
    // <- 1 acceptedBy (person who allowed request creation)
    // <- 1 log
  });

  Request.associate = function(models) {
    Request.belongsTo(models.RequestState, {as: "state"});
    Request.belongsTo(models.Contact, {as: "organizer"});
    Request.belongsTo(models.ContactGroup, {as: "organisation"});
    Request.belongsTo(models.Contact, {as: "acceptedBy"});
    Request.belongsTo(models.Log);
  };

  return Request;
}
