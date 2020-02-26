module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * An issue with a resource, for example when something is broken.
   */
  var ResourceIssue = sequelize.define('ResourceIssue', {
    comment: DataTypes.TEXT,
    issueDate: { type: DataTypes.DATE, allowNull: false },
    resolveDate: DataTypes.DATE

    // out issued by
    // out resolved by
    // out resource instance
  })

  ResourceIssue.associate = function (models) {
    ResourceIssue.belongsTo(models.Contact, { as: 'issuedBy' })
    ResourceIssue.belongsTo(models.Contact, { as: 'resolvedBy' })
    ResourceIssue.belongsTo(models.Resource)
  }

  return ResourceIssue
}
