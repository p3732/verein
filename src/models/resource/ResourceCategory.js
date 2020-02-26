module.exports = function createScheme (sequelize, DataTypes) {
  /**
   * A category to sort resource groups and other categories.
   */
  var ResourceCategory = sequelize.define('ResourceCategory', {
    title: {
      type: DataTypes.TEXT, allowNull: false, unique: true, primaryKey: true
    }

    // (in n child categories)
    // out parent category
  }, {
    timestamps: false
  })

  ResourceCategory.associate = function (models) {
    ResourceCategory.belongsTo(models.ResourceCategory, {
      as: 'parentCategory'
    })
  }

  return ResourceCategory
}
