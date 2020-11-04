const Sequelize = require('sequelize');
// ! 暗号：哈希算法
module.exports.initModel = async sequelize => {
  const idConfig = {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV1,
    primaryKey: true
  }
  // User model
  const User = sequelize.define("User", {
    idConfig,
    name: { type: Sequelize.STRING(20), allowNull: false }
  });
  // Product model
  const Product = sequelize.define("Product", {
    idConfig,
    title: { type: Sequelize.STRING(20), allowNull: false }
  })
  // 建立两个模型之间的联系
  Product.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE"
  })
  User.hasMany(Product)
  // 同步
  await sequelize.sync()
  return { User, Product }
} 
