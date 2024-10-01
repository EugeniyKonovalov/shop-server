import sequelize from "./../db";
import { DataTypes, Model } from "sequelize";
import {
  CartAttributes,
  CartProductAttributes,
  BrandAttributes,
  ProductAttributes,
  ProductInfoAttributes,
  RatingAttributes,
  TypeAttributes,
  TypeBrandAttributes,
  UserAttributes,
} from "../types/modelInterfaces";

class User extends Model<UserAttributes> {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: { type: DataTypes.STRING(64), unique: true, allowNull: false },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
  },
  {
    tableName: "user",
    sequelize,
  }
);

class Cart extends Model<CartAttributes> {}
Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { tableName: "cart", sequelize }
);

class CartProduct extends Model<CartProductAttributes> {}
CartProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    count: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { tableName: "cart_products", sequelize }
);

class Product extends Model<ProductAttributes> {}
Product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { tableName: "product", sequelize }
);

class Type extends Model<TypeAttributes> {}
Type.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { tableName: "type", sequelize }
);

class Brand extends Model<BrandAttributes> {}
Brand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { tableName: "brand", sequelize }
);

class Rating extends Model<RatingAttributes> {}
Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rate: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "rating", sequelize }
);

class ProductInfo extends Model<ProductInfoAttributes> {}
ProductInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "product_info", sequelize }
);

class TypeBrand extends Model<TypeBrandAttributes> {}
TypeBrand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { tableName: "type_brand", sequelize }
);

User.hasOne(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(CartProduct, { onDelete: "CASCADE" });
CartProduct.belongsTo(Cart);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Product.hasMany(Rating, { onDelete: "CASCADE" });
Rating.belongsTo(Product);

Product.hasMany(CartProduct, { onDelete: "CASCADE" });
CartProduct.belongsTo(Product);

Product.hasMany(ProductInfo, { as: "info", onDelete: "CASCADE" });
ProductInfo.belongsTo(Product);

Cart.belongsToMany(Product, { through: CartProduct, onDelete: "CASCADE" });
Product.belongsToMany(Cart, { through: CartProduct, onDelete: "CASCADE" });

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export default {
  User,
  Cart,
  CartProduct,
  Product,
  Type,
  Brand,
  Rating,
  TypeBrand,
  ProductInfo,
};
