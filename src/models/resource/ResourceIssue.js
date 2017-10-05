module.exports = function createScheme(sequelize, DataTypes) {
  /**
   * An issue with a resource, for example when something is broken.
   */
  var ResourceIssue = sequelize.define("ResourceIssue", {
    description: DataTypes.TEXT, //comments also go here
    issueDate: {type: DataTypes.DATE, allowNull: false},
    resolveDate: DataTypes.DATE
    // <- 1 resource
    // <- 1 issued by
    // <- 1 resolved by
    // <- 1 log
  });

  ResourceIssue.associate = function(models) {
    ResourceIssue.belongsTo(models.Resource);
    ResourceIssue.belongsTo(models.Contact, {as: "issuedBy"});
    ResourceIssue.belongsTo(models.Contact, {as: "resolvedBy"});
    ResourceIssue.belongsTo(models.Log);
  }

  return ResourceIssue;
}
